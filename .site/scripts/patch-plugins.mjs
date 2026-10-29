#!/usr/bin/env node
/**
 * patch-plugins.mjs
 *
 * Idempotent post-install patches for npm-installed Quartz plugins whose
 * upstream behaviour is not sufficient for this site.
 *
 * Why this exists: `npm install` / `quartz plugin install` resets
 * `node_modules`, so fixes that live in published plugin bundles must be
 * re-applied after every install. `scripts/build.sh` runs this script after
 * installing dependencies; the build must fail loudly if a patch no longer
 * applies (e.g. after a plugin version bump) instead of silently regressing.
 *
 * Patched files:
 *   node_modules/@quartz-community/bases-page/dist/chunk-EL2TIBZL.js
 *   node_modules/@quartz-community/explorer/dist/index.js
 *
 * Patches:
 *   1. resolveBasesEntries(): skip `virtual === true` file data in the
 *      fileLookup loop only. Generated pages (folder index, tag, canvas,
 *      excalidraw, base pages) are still emitted as Bases entries so views can
 *      explicitly list them (e.g. "all Excalidraw drawings" via the
 *      `note.virtual == true` filter); normal views exclude them by adding
 *      `not: 'note.virtual == true'` to their filters.
 *   2. sortEntries(): missing values (undefined/null) sort last for both ASC
 *      and DESC. Upstream compareSort() returns "missing is greater", which
 *      DESC turns into "missing first"; without dates those entries used to
 *      occupy the head of the "most recently updated" view.
 *   3. compareSort(): compare Date objects by timestamp. Upstream only compares
 *      numbers and strings, so Date values (file.mtime/ctime) fall through to
 *      `String(date).localeCompare(...)` — i.e. they are ordered by weekday
 *      name, which makes "最近更新" ordering wrong as soon as dates differ.
 *   4. registerBuiltinViews(): register a `kanban` view type that delegates to
 *      the already registered `board` renderer. `Kanban.md` uses
 *      `type: kanban`, which upstream does not register ("Unknown view type").
 *   5. Date values: Bases' own `buildFileProperties()` exposes
 *      `mtime`/`ctime` as Date objects; upstream formats them by
 *      `JSON.stringify()` (renderCellValue) or `String()` (formatValue), which
 *      renders `"2026-10-28T07:35:54.000Z"` (with quotes) in every cell, list
 *      chip and group label. Add a shared `formatBasesDate()` helper and use it
 *      for both code paths; format `YYYY-MM-DD HH:mm` in UTC+8 (fixed offset so
 *      CI time zone does not change the output; the site is Asia/Shanghai).
 *   6. buildFileProperties(): expose the documented `file.size` property by
 *      stat()-ing the source file. Upstream's d.ts declares `size?: number`
 *      but never sets it, so `file.size` filters/formulas (used by the
 *      "深度长文" view: `file.size > 8000`, `file.size / 1024`) always
 *      evaluate to undefined and the view renders empty.
 *   7. i18n: register `zh-CN` (and `zh-TW`) Bases locale strings so the site
 *      locale `zh-CN` renders "显示 20 / 1421 条" / "暂无数据" instead of
 *      falling back to English.
 *
 * Usage (from the .site directory):
 *   node scripts/patch-plugins.mjs           # apply patches (idempotent)
 *   node scripts/patch-plugins.mjs --check   # verify only, exit 1 if not patched
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(scriptDir, "..")
const targetFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "bases-page",
  "dist",
  "chunk-EL2TIBZL.js",
)

// The explorer plugin ships the same inline script twice (plugin entry and the
// component subpath that Quartz actually loads), so both copies must be patched.
const explorerFiles = [
  path.join(
    siteRoot,
    "node_modules",
    "@quartz-community",
    "explorer",
    "dist",
    "index.js",
  ),
  path.join(
    siteRoot,
    "node_modules",
    "@quartz-community",
    "explorer",
    "dist",
    "components",
    "index.js",
  ),
]

// Bases views share the compiler's filter and link resolution functions.
const basesCompilerFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "bases-page",
  "dist",
  "chunk-OBABVQK6.js",
)
const basesCompilerPatches = [
  {
    id: "bases:preserve-page-slugs",
    description: "Use existing page slugs before attempting to rewrite the target",
    edits: [
      {
        find: '    const folderTail = isFolderPath(targetSlug) ? "/" : "";',
        replace: [
          "    // An emitted page can share its basename with its parent (e.g. Excalidraw).",
          "    if (opts.allSlugs.includes(target)) return resolveRelative(effectiveSrc, target);",
          '    const folderTail = isFolderPath(targetSlug) ? "/" : "";',
        ].join("\n"),
        marker: "    if (opts.allSlugs.includes(target)) return resolveRelative(effectiveSrc, target);",
      },
    ],
  },
  {
    id: "bases:not-semantics",
    description:
      "evaluateFilter(): `not` excludes entries that match ANY of its filters (Obsidian semantics; upstream used !every)",
    edits: [
      {
        find: "    return !node.not.every((child) => evaluateFilter(child, context));",
        replace:
          "    return !node.not.some((child) => evaluateFilter(child, context));",
        marker:
          "    return !node.not.some((child) => evaluateFilter(child, context));",
      },
    ],
  },
]

// Excalidraw / Canvas virtual pages have no dates; the Bases tables need
// file.mtime, so attach the source file's modified time while generating them.
const excalidrawPageFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "obsidian-plugin-excalidraw",
  "dist",
  "index.js",
)
const canvasPageFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "canvas-page",
  "dist",
  "index.js",
)

// `crawl-links` strips the leading "." from "./note" and "../note" with
// `targetSlug.slice(".".length)`, which leaves "./note" (from "../note")
// polluted. The trailing shortest-match lookup `endsWith("/" + target)` then
// never fires, wikilinks like ![[../assets/foo.excalidraw]] fall through to
// the relative-path branch and resolve against the wrong directory, so
// cross-folder excalidraw/markdown transcludes render as "Transclude of ..."
// placeholders. Strip all leading dot segments so the canonical target is
// clean and shortest resolution works for ../ and ../../ alike.
const crawlLinksFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "crawl-links",
  "dist",
  "index.js",
)
const crawlLinksPatches = [
  {
    id: "crawl-links:canonical-prefix",
    description:
      "transformLink(): strip leading ./ and ../ segments before shortest-path resolution",
    edits: [
      {
        find: 'const canonicalSlug = stripSlashes(targetSlug.slice(".".length));',
        replace:
          'const canonicalSlug = stripSlashes(targetSlug.replace(/^(?:\\.\\.?\\/)+/, ""));',
        marker:
          'const canonicalSlug = stripSlashes(targetSlug.replace(/^(?:\\.\\.?\\/)+/, ""));',
      },
    ],
  },
]

// `alias-redirects` writes case-variant redirect shells (e.g.
// `Android.bp.html` for `android.bp.html`) next to the real pages. The site's
// published URLs are all lowercase slugs, so the variants are never requested
// — but on case-sensitive CI filesystems with Unicode-normalizing paths the
// shell and the real page land on the SAME path and the 300-byte shell wins,
// leaving every Chinese-named note as a redirect to itself (404 loop). The
// site ships no case-variant aliases, so disable case redirects entirely.
const aliasRedirectsFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "alias-redirects",
  "dist",
  "index.js",
)
const aliasRedirectsManifestFile = path.join(
  siteRoot,
  "node_modules",
  "@quartz-community",
  "alias-redirects",
  "package.json",
)
// The loader merges the package manifest's defaultOptions OVER the code-level
// defaults (config-loader.ts: `options = { ...manifest?.defaultOptions,
// ...entry.options }`), so both copies must be flipped or the manifest wins.
const aliasRedirectsPatches = [
  {
    id: "alias-redirects:no-case-shells",
    description:
      "defaultOptions: disable enableCaseRedirects (shells overwrite real pages on case-sensitive CI paths)",
    edits: [
      {
        find: "var defaultOptions = {\n  enableCaseRedirects: true\n};",
        replace:
          "var defaultOptions = {\n  enableCaseRedirects: false\n};",
        marker:
          "var defaultOptions = {\n  enableCaseRedirects: false\n};",
      },
    ],
  },
]
const aliasRedirectsManifestPatches = [
  {
    id: "alias-redirects:manifest-no-case-shells",
    description:
      "package.json quartz.defaultOptions.enableCaseRedirects → false (loader overrides code defaults)",
    edits: [
      {
        find: '"defaultOptions": {\n      "enableCaseRedirects": true\n    }',
        replace:
          '"defaultOptions": {\n      "enableCaseRedirects": false\n    }',
        marker:
          '"defaultOptions": {\n      "enableCaseRedirects": false\n    }',
      },
    ],
  },
]

const excalidrawDatesPatches = [
  {
    id: "excalidraw:virtual-dates",
    description:
      "ExcalidrawPage.generate(): attach source mtime to virtual pages for Bases file.mtime",
    edits: [
      {
        find: "import { readFileSync } from 'fs';",
        replace: "import { readFileSync, statSync } from 'fs';",
        marker: "import { readFileSync, statSync } from 'fs';",
      },
      {
        find: [
          "      const data = parseExcalidraw(content, filePath);",
          "      if (!data) continue;",
          "",
        ].join("\n"),
        replace: [
          "      const data = parseExcalidraw(content, filePath);",
          "      if (!data) continue;",
          "      let virtualDates;",
          "      try {",
          "        const stats = statSync(fullPath);",
          "        virtualDates = { modified: stats.mtime };",
          "      } catch (e) {}",
          "",
        ].join("\n"),
        marker: "        virtualDates = { modified: stats.mtime };",
      },
      {
        find: [
          "          excalidrawOptions: opts,",
          "          excalidrawImagePaths: resolvedImagePaths",
          "        }",
        ].join("\n"),
        replace: [
          "          excalidrawOptions: opts,",
          "          excalidrawImagePaths: resolvedImagePaths,",
          "          dates: virtualDates",
          "        }",
        ].join("\n"),
        marker: "          dates: virtualDates",
      },
    ],
  },
]

const canvasDatesPatches = [
  {
    id: "canvas:virtual-dates",
    description:
      "CanvasPage.generate(): attach source mtime to virtual pages for Bases file.mtime",
    edits: [
      {
        find: "import { readFileSync } from 'fs';",
        replace: "import { readFileSync, statSync } from 'fs';",
        marker: "import { readFileSync, statSync } from 'fs';",
      },
      {
        find: [
          "        canvasData = JSON.parse(raw2);",
          "      } catch {",
          "        continue;",
          "      }",
        ].join("\n"),
        replace: [
          "        canvasData = JSON.parse(raw2);",
          "      } catch {",
          "        continue;",
          "      }",
          "      let virtualDates;",
          "      try {",
          "        const stats = statSync(fullPath);",
          "        virtualDates = { modified: stats.mtime };",
          "      } catch (e) {}",
        ].join("\n"),
        marker: "        virtualDates = { modified: stats.mtime };",
      },
      {
        find: [
          "          canvasData: processedData,",
          "          canvasOptions: opts",
          "        }",
        ].join("\n"),
        replace: [
          "          canvasData: processedData,",
          "          canvasOptions: opts,",
          "          dates: virtualDates",
          "        }",
        ].join("\n"),
        marker: "          dates: virtualDates",
      },
    ],
  },
]

const checkOnly = process.argv.includes("--check")

/**
 * Each patch groups one or more independent text edits. Every edit has:
 *   - `find`: string that must occur exactly once in the unpatched file
 *   - `replace`: substitution inserted in place of `find`
 *   - `marker`: text that must occur exactly once after patching (also used to
 *     detect an already-patched file). All markers of a patch are applied
 *     atomically, so a patch is either fully applied or not applied at all.
 */
const patches = [
  {
    id: "bases:skip-virtual-in-fileLookup",
    description:
      "resolveBasesEntries(): do not index virtual pages in fileLookup",
    edits: [
      {
        find: [
          "  for (const fd of allFiles) {",
          "    if (fd.unlisted === true) continue;",
          "",
        ].join("\n"),
        replace: [
          "  for (const fd of allFiles) {",
          "    if (fd.unlisted === true) continue;",
          "    if (fd.virtual === true) continue;",
          "",
        ].join("\n"),
        marker: "    if (fd.virtual === true) continue;\n",
      },
    ],
  },
  {
    id: "bases:sort-missing-last",
    description:
      "sortEntries(): missing (undefined/null) values always sort last",
    edits: [
      {
        find: [
          "      const cmp = compareSort(leftValue, rightValue);",
          "      if (cmp !== 0) return sign * cmp;",
          "",
        ].join("\n"),
        replace: [
          "      const leftMissing = leftValue === void 0 || leftValue === null;",
          "      const rightMissing = rightValue === void 0 || rightValue === null;",
          "      if (leftMissing && rightMissing) continue;",
          "      if (leftMissing) return 1;",
          "      if (rightMissing) return -1;",
          "      const cmp = compareSort(leftValue, rightValue);",
          "      if (cmp !== 0) return sign * cmp;",
          "",
        ].join("\n"),
        marker:
          "      const leftMissing = leftValue === void 0 || leftValue === null;\n",
      },
    ],
  },
  {
    id: "bases:sort-date-values",
    description:
      "compareSort(): compare Date values by timestamp instead of weekday-name strings",
    edits: [
      {
        find: [
          "function compareSort(a, b) {",
          "  if (a === b) return 0;",
          "  if (a === void 0 || a === null) return 1;",
          "  if (b === void 0 || b === null) return -1;",
          '  if (typeof a === "number" && typeof b === "number") return a - b;',
        ].join("\n"),
        replace: [
          "function compareSort(a, b) {",
          "  if (a === b) return 0;",
          "  if (a === void 0 || a === null) return 1;",
          "  if (b === void 0 || b === null) return -1;",
          "  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();",
          '  if (typeof a === "number" && typeof b === "number") return a - b;',
        ].join("\n"),
        marker:
          "  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();\n",
      },
    ],
  },
  {
    id: "bases:register-kanban-view",
    description:
      "registerBuiltinViews(): register `kanban` as an alias of the `board` view",
    edits: [
      {
        find: ["  viewRegistry.register(boardViewRegistration);", "}", ""].join(
          "\n",
        ),
        replace: [
          "  viewRegistry.register(boardViewRegistration);",
          '  const boardRegistration = viewRegistry.get("board");',
          "  if (!boardRegistration) {",
          '    throw new Error("bases-page: `board` view is not registered; cannot register the `kanban` view alias");',
          "  }",
          '  viewRegistry.register({ ...boardRegistration, id: "kanban", name: "Kanban", icon: "kanban" });',
          "}",
          "",
        ].join("\n"),
        marker:
          '  viewRegistry.register({ ...boardRegistration, id: "kanban", name: "Kanban", icon: "kanban" });\n',
      },
    ],
  },
  {
    id: "bases:format-date-values",
    description:
      "renderCellValue()/formatValue(): render Date values as `YYYY-MM-DD HH:mm` (UTC+8) via shared helper",
    edits: [
      {
        find: "function formatValue(value) {\n",
        replace: [
          "function formatBasesDate(value) {",
          "  const d = new Date(value.getTime() + 8 * 3600 * 1000);",
          '  const pad = (n) => String(n).padStart(2, "0");',
          "  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;",
          "}",
          "function formatValue(value) {",
          "",
        ].join("\n"),
        marker: "function formatBasesDate(value) {\n",
      },
      {
        find: [
          "function formatValue(value) {",
          '  if (value === void 0 || value === null) return "";',
        ].join("\n"),
        replace: [
          "function formatValue(value) {",
          "  if (value instanceof Date) return formatBasesDate(value);",
          '  if (value === void 0 || value === null) return "";',
        ].join("\n"),
        marker: "  if (value instanceof Date) return formatBasesDate(value);\n",
      },
      {
        find: [
          '  if (typeof value === "object") {',
          "    if (isFileValue(value)) {",
        ].join("\n"),
        replace: [
          "  if (value instanceof Date) {",
          '    return /* @__PURE__ */ u("span", { class: "bases-date", children: formatBasesDate(value) });',
          "  }",
          '  if (typeof value === "object") {',
          "    if (isFileValue(value)) {",
        ].join("\n"),
        marker:
          '    return /* @__PURE__ */ u("span", { class: "bases-date", children: formatBasesDate(value) });\n',
      },
    ],
  },
  {
    id: "bases:file-size-property",
    description:
      "buildFileProperties(): expose the documented `file.size` property (stat source file)",
    edits: [
      {
        find: "import { createRequire } from 'module';\n",
        replace:
          "import { createRequire } from 'module';\nimport fs from 'node:fs';\n",
        marker: "import fs from 'node:fs';\n",
      },
      {
        find: [
          "function buildFileProperties(fileData, slug, frontmatter) {",
          "  const filePath = getFilePath(fileData, slug);",
        ].join("\n"),
        replace: [
          "function buildFileProperties(fileData, slug, frontmatter) {",
          "  let size;",
          "  try {",
          '    if (typeof fileData.size === "number") size = fileData.size;',
          '    else if (typeof fileData.filePath === "string") size = fs.statSync(fileData.filePath).size;',
          "  } catch {",
          "    size = void 0;",
          "  }",
          "  const filePath = getFilePath(fileData, slug);",
        ].join("\n"),
        marker:
          '    else if (typeof fileData.filePath === "string") size = fs.statSync(fileData.filePath).size;\n',
      },
      {
        find: [
          "    links,",
          "    embeds,",
          "    created: ctime?.toISOString(),",
        ].join("\n"),
        replace: [
          "    links,",
          "    embeds,",
          "    size,",
          "    created: ctime?.toISOString(),",
        ].join("\n"),
        marker: "    embeds,\n    size,\n    created: ctime?.toISOString(),",
      },
    ],
  },
  {
    id: "bases:zh-cn-locale",
    description: "i18n: register zh-CN / zh-TW Bases locale strings",
    edits: [
      {
        find: ["var locales = {", '  "en-US": en_US_default', "};"].join("\n"),
        replace: [
          "var zh_CN_default = {",
          "  components: {",
          "    bases: {",
          '      title: "数据库",',
          '      noData: "暂无数据",',
          '      noViews: "未定义视图",',
          '      mapPlaceholder: "静态站点暂不支持地图视图。",',
          '      allNotes: "全部笔记",',
          '      allEntries: "全部条目",',
          '      galleryView: "图库",',
          '      boardView: "看板",',
          '      noImage: "暂无图片",',
          '      uncategorized: "未分类",',
          '      showingCount: "显示 {count} / {total} 条"',
          "    }",
          "  }",
          "};",
          "var locales = {",
          '  "en-US": en_US_default,',
          '  "zh-CN": zh_CN_default,',
          '  "zh-TW": zh_CN_default',
          "};",
        ].join("\n"),
        marker: '  "zh-CN": zh_CN_default,\n',
      },
    ],
  },
]

/**
 * Explorer plugin: when the tree is rendered, the active file is scrolled into
 * view with `scrollIntoView()`. Because the explorer list lives in a sticky
 * sidebar, that call can also scroll the window, so opening a note from the
 * explorer lands the reader somewhere in the middle of the page. Scroll only
 * the explorer list instead.
 */
const explorerPatches = [
  {
    id: "explorer:no-window-scroll",
    description:
      "Explorer: keep auto-scroll inside the explorer list (no page jump)",
    edits: [
      {
        find: 'else{let o=n.querySelector(".active");o&&o.scrollIntoView({behavior:"smooth"})}',
        replace:
          'else{const o=n.querySelector(".active");if(o){const r=o.getBoundingClientRect(),c=n.getBoundingClientRect();r.top<c.top?n.scrollTop-=c.top-r.top:r.bottom>c.bottom&&(n.scrollTop+=r.bottom-c.bottom)}}',
        marker:
          "const r=o.getBoundingClientRect(),c=n.getBoundingClientRect();",
      },
    ],
  },
]

function countOccurrences(haystack, needle) {
  if (needle.length === 0) return 0
  let count = 0
  let index = haystack.indexOf(needle)
  while (index !== -1) {
    count += 1
    index = haystack.indexOf(needle, index + needle.length)
  }
  return count
}

/** Apply all edits of a single patch to `source`. */
function applyPatch(source, patch) {
  const appliedEdits = patch.edits.filter(
    (edit) => countOccurrences(source, edit.marker) > 0,
  )
  for (const edit of appliedEdits) {
    const markerCount = countOccurrences(source, edit.marker)
    if (markerCount !== 1) {
      throw new Error(
        `已修补标记出现 ${markerCount} 次（期望 1 次），文件内容与补丁脚本假设不符: ${JSON.stringify(edit.marker.slice(0, 80))}`,
      )
    }
  }
  if (appliedEdits.length === patch.edits.length) {
    return { source, status: "already-patched" }
  }
  if (appliedEdits.length > 0) {
    throw new Error(
      `检测到部分已应用的编辑（${appliedEdits.length}/${patch.edits.length}），文件处于不一致状态；` +
        `请删除 node_modules/@quartz-community/bases-page 后重新 npm install，再重新运行本脚本`,
    )
  }

  let patched = source
  for (const edit of patch.edits) {
    const findCount = countOccurrences(patched, edit.find)
    if (findCount !== 1) {
      throw new Error(
        `目标片段出现 ${findCount} 次（期望恰好 1 次）。` +
          `插件版本可能已更新，请检查 chunk 内容后同步更新 scripts/patch-plugins.mjs。片段: ${JSON.stringify(edit.find.slice(0, 100))}`,
      )
    }
    patched = patched.replace(edit.find, () => edit.replace)
    if (countOccurrences(patched, edit.marker) !== 1) {
      throw new Error("替换后标记缺失或不是唯一，补丁逻辑有误")
    }
  }
  return { source: patched, status: "patched" }
}

function applyFilePatches(filePath, filePatches) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`目标文件不存在: ${filePath}（请先 npm install）`)
  }
  const original = fs.readFileSync(filePath, "utf8")
  let source = original
  if (explorerFiles.includes(filePath)) {
    const legacy = fs
      .readFileSync(
        path.join(siteRoot, "plugins/site-interactions/sidebar.js"),
        "utf8",
      )
      .trimEnd()
    source = source.replace("\n" + legacy, "")
  }
  const results = []
  for (const patch of filePatches) {
    const result = applyPatch(source, patch)
    source = result.source
    results.push({ patch, status: result.status })
  }
  return { filePath, original, source, results }
}

function main() {
  const targets = [
    {
      label: "types:stable-frontmatter",
      filePath: path.join(
        siteRoot,
        "node_modules/@quartz-community/types/dist/index.d.ts",
      ),
      filePatches: [
        {
          id: "types:stable-frontmatter",
          description:
            "Align plugin type augmentation with official stable core without editing Quartz",
          edits: [
            {
              find: "        frontmatter: {\n            [key: string]: unknown;\n        } & {\n            title: string;\n        } & Partial<{\n            tags: string[];\n            aliases: string[];\n            modified: string;\n            created: string;\n            published: string;\n            description: string;\n            socialDescription: string;\n            publish: boolean | string;\n            draft: boolean | string;\n            lang: string;\n            enableToc: string;\n            cssclasses: string[];\n            socialImage: string;\n            comments: boolean | string;\n        }>;\n",
              replace:
                "        // Site compatibility: match official Quartz v5.0.0 frontmatter augmentation.\n        frontmatter: {\n            title: string;\n            tags: string[];\n            description?: string;\n            socialDescription?: string;\n            lang?: string;\n            [key: string]: unknown;\n        };\n",
              marker:
                "// Site compatibility: match official Quartz v5.0.0 frontmatter augmentation.",
            },
          ],
        },
      ],
    },
    { label: "bases-page", filePath: targetFile, filePatches: patches },
    {
      label: "bases-page:compiler",
      filePath: basesCompilerFile,
      filePatches: basesCompilerPatches,
    },
    {
      label: "excalidraw-page",
      filePath: excalidrawPageFile,
      filePatches: excalidrawDatesPatches,
    },
    {
      label: "canvas-page",
      filePath: canvasPageFile,
      filePatches: canvasDatesPatches,
    },
    {
      label: "crawl-links",
      filePath: crawlLinksFile,
      filePatches: crawlLinksPatches,
    },
    {
      label: "alias-redirects",
      filePath: aliasRedirectsFile,
      filePatches: aliasRedirectsPatches,
    },
    {
      label: "alias-redirects:manifest",
      filePath: aliasRedirectsManifestFile,
      filePatches: aliasRedirectsManifestPatches,
    },
    ...explorerFiles.map((filePath, index) => ({
      label: index === 0 ? "explorer" : `explorer#${index}`,
      filePath,
      filePatches: explorerPatches,
    })),
  ]

  const processed = []
  for (const target of targets) {
    try {
      processed.push(applyFilePatches(target.filePath, target.filePatches))
    } catch (error) {
      console.error(`✗ [patch-plugins] ${target.label}: ${error.message}`)
      process.exit(1)
    }
  }

  const allResults = processed.flatMap((p) => p.results)
  const needsPatching = allResults.some((r) => r.status === "patched")

  if (checkOnly) {
    for (const { patch, status } of allResults) {
      console.log(
        `${status === "patched" ? "✗ 待修补" : "✓ 已修补"}  ${patch.id}`,
      )
    }
    if (needsPatching) {
      console.error(
        "✗ [patch-plugins] 存在尚未应用的补丁（--check 模式不会写入文件）",
      )
      process.exit(1)
    }
    console.log("✓ [patch-plugins] 全部补丁均已应用")
    return
  }

  for (const p of processed) {
    if (p.source !== p.original) fs.writeFileSync(p.filePath, p.source, "utf8")
  }

  // Re-read from disk and verify every marker is present exactly once, so a
  // failed/partial write can never be reported as success.
  for (const p of processed) {
    const written = fs.readFileSync(p.filePath, "utf8")
    for (const { patch } of p.results) {
      for (const edit of patch.edits) {
        const markerCount = countOccurrences(written, edit.marker)
        if (markerCount !== 1) {
          console.error(
            `✗ [patch-plugins] ${patch.id}: 写入后校验失败（标记出现 ${markerCount} 次）`,
          )
          process.exit(1)
        }
      }
    }
  }

  for (const { patch, status } of allResults) {
    const label = status === "patched" ? "patched    " : "unchanged  "
    console.log(`✓ [patch-plugins] ${label}${patch.id} — ${patch.description}`)
  }
  console.log(
    `✓ [patch-plugins] ${allResults.filter((r) => r.status === "patched").length} 个补丁已应用, ` +
      `${allResults.filter((r) => r.status !== "patched").length} 个已是最新状态`,
  )
}

main()

// Virtual folder htmlAst is already rendered for transclusion; do not nest it.
for (const relative of ["dist/index.js", "dist/components/index.js"]) {
  const file = path.join(siteRoot, "node_modules/@quartz-community/folder-page", relative);
  const before = "const hastRoot = tree;";
  const after = 'const hastRoot = fileData?.virtual ? { type: "root", children: [] } : tree;';
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes(after)) {
    if (!source.includes(before)) throw new Error(`Folder renderer changed: ${relative}`);
    if (process.argv.includes("--check")) throw new Error(`Folder patch missing: ${relative}`);
    fs.writeFileSync(file, source.replace(before, after));
  }
}

// Graph redraw emits render; TOC must not accumulate duplicate click listeners.
{
  const file = path.join(siteRoot, "node_modules/@quartz-community/table-of-contents/dist/components/index.js");
  const source = fs.readFileSync(file, "utf8");
  const before = 'if(!n||!o)return;n.addEventListener("click",r);';
  const after = 'if(!n||!o)continue;if(n.dataset.bsTocBound)continue;n.dataset.bsTocBound="1";n.addEventListener("click",r);';
  if (!source.includes(after)) {
    if (!source.includes(before)) throw new Error("TOC renderer changed");
    if (process.argv.includes("--check")) throw new Error("TOC listener patch missing");
    fs.writeFileSync(file, source.replace(before, after));
  }
}

{
  const file = path.join(siteRoot, "node_modules/@quartz-community/table-of-contents/dist/components/index.js");
  const source = fs.readFileSync(file, "utf8");
  const before = 'let s=()=>n.removeEventListener("click",r);';
  const after = 'let s=()=>{n.removeEventListener("click",r);delete n.dataset.bsTocBound};';
  if (!source.includes(after)) {
    if (!source.includes(before)) throw new Error("TOC cleanup changed");
    if (process.argv.includes("--check")) throw new Error("TOC cleanup patch missing");
    fs.writeFileSync(file, source.replace(before, after));
  }
}

// Numeric dates remain readable and compact in both folder lists and articles.
for (const plugin of ["folder-page", "content-meta"]) {
  for (const relative of ["dist/index.js", "dist/components/index.js"]) {
    const file = path.join(siteRoot, "node_modules/@quartz-community", plugin, relative);
    const source = fs.readFileSync(file, "utf8");
    const before = /toLocaleDateString\(locale, \{\s*year: "numeric",\s*month: "short",\s*day: "2-digit"\s*\}\)/g;
    const after = 'toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" })';
    if (!source.includes(after)) {
      if (!before.test(source)) throw new Error(`Date formatter changed: ${plugin}/${relative}`);
      before.lastIndex = 0;
      if (process.argv.includes("--check")) throw new Error(`Date patch missing: ${plugin}/${relative}`);
      fs.writeFileSync(file, source.replace(before, after));
    }
  }
}

// Expose folder semantics so lists have distinct, accessible visual indicators.
for (const relative of ["dist/index.js", "dist/components/index.js"]) {
  const file = path.join(siteRoot, "node_modules/@quartz-community/folder-page", relative);
  let source = fs.readFileSync(file, "utf8");
  const marker = '"data-entry-kind": page.bsIsFolder ? "folder" : "note"';
  if (!source.includes(marker)) {
    const before = 'class: "section-li", children:';
    if (!source.includes(before) || !source.includes("return nodeData;")) throw new Error("Folder semantics changed");
    if (process.argv.includes("--check")) throw new Error("Folder icon patch missing");
    source = source.replace("return nodeData;", "return { ...nodeData, bsIsFolder: node.isFolder };")
      .replace('slug: node.slug,', 'slug: node.slug, bsIsFolder: true,')
      .replace(before, 'class: "section-li", ' + marker + ', children:');
    fs.writeFileSync(file, source);
  }
}
