#!/usr/bin/env node
/**
 * 校验 .site/quartz 是否仍与「上游 Quartz + 已登记补丁」一致。
 *
 * 这是「与上游解耦」的守门员：任何没有写进 vendor/core-patches.mjs、
 * 也没有登记在 vendor/quartz-manifest.json 里的核心改动，都会让本脚本失败。
 * CI（scripts/build.sh）每次构建都会执行它，避免手工魔改悄悄漂移。
 *
 * 用法：
 *   node scripts/check-quartz-vendor.mjs            # 校验并通过/失败
 *   node scripts/check-quartz-vendor.mjs --verbose  # 额外打印文件分类统计
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { fileURLToPath } from "node:url"
import { applyEdits } from "../vendor/patch-utils.mjs"
import { corePatches } from "../vendor/core-patches.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(scriptDir, "..")
const verbose = process.argv.includes("--verbose")

const upstreamConfigPath = path.join(siteRoot, "vendor", "quartz-upstream.json")
const manifestPath = path.join(siteRoot, "vendor", "quartz-manifest.json")

function fail(message) {
  console.error(`✗ [check-quartz-vendor] ${message}`)
  process.exit(1)
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex")
}

function walkFiles(dir, base = dir) {
  /** @type {string[]} */
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkFiles(full, base))
    else if (entry.isFile()) out.push(path.relative(base, full).split(path.sep).join("/"))
  }
  return out
}

if (!fs.existsSync(upstreamConfigPath)) fail(`缺少 ${upstreamConfigPath}`)
if (!fs.existsSync(manifestPath)) fail(`缺少 ${manifestPath}（先运行 node scripts/sync-quartz.mjs）`)

const upstreamConfig = JSON.parse(fs.readFileSync(upstreamConfigPath, "utf8"))
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))

// 1. 上游 pin 与 manifest 必须一致
if (upstreamConfig.ref !== manifest.upstream?.ref) {
  fail(
    `vendor/quartz-upstream.json 的 ref=${upstreamConfig.ref} 与 manifest 的 ` +
      `ref=${manifest.upstream?.ref} 不一致，请重新运行 scripts/sync-quartz.mjs。`,
  )
}

// 2. 计算「当前磁盘上应存在的核心文件集合」
const expectedPaths = new Set()
const quartzDir = path.join(siteRoot, "quartz")
if (!fs.existsSync(quartzDir)) fail("缺少 quartz/ 目录（上游 Quartz 核心）")
for (const rel of walkFiles(quartzDir)) {
  const posix = `quartz/${rel}`
  if (posix.startsWith("quartz/.quartz-cache/") || posix.startsWith("quartz/node_modules/")) continue
  expectedPaths.add(posix)
}
for (const rel of upstreamConfig.vendoredFiles ?? []) expectedPaths.add(rel)

// 3. 逐项比对 manifest 里登记的内容
const problems = []
const categories = { vendored: 0, override: 0, patched: 0 }
const overridePaths = new Set(upstreamConfig.overrides ?? [])
const patchedPaths = new Set(Object.keys(manifest.files ?? {}).filter((p) => manifest.files[p].category === "patched"))

for (const [rel, entry] of Object.entries(manifest.files ?? {})) {
  if (!expectedPaths.has(rel)) {
    problems.push(`manifest 登记了已不存在的上游文件：${rel}`)
    continue
  }
  const full = path.join(siteRoot, rel)
  if (!fs.existsSync(full)) {
    problems.push(`上游文件缺失：${rel}`)
    continue
  }
  const actual = sha256(fs.readFileSync(full))
  if (actual !== entry.hash) {
    problems.push(
      entry.category === "override"
        ? `允许覆盖文件被改动（这是站点的定制文件，请确认后运行 scripts/sync-quartz.mjs 重新登记）：${rel}`
        : entry.category === "patched"
          ? `核心补丁文件内容漂移：${rel}（请检查是否手工改过，或补丁需要更新）`
          : `上游核心文件内容漂移：${rel}（请运行 scripts/sync-quartz.mjs，或把改动迁进 vendor/core-patches.mjs）`,
    )
  }
  categories[entry.category] = (categories[entry.category] ?? 0) + 1
}

// 4. 检查未登记的新文件 / 缺失文件
for (const rel of expectedPaths) {
  if (!(rel in (manifest.files ?? {}))) {
    problems.push(`未登记的核心文件：${rel}（运行 scripts/sync-quartz.mjs 重新生成 manifest）`)
  }
}

// 5. 允许覆盖文件必须存在（custom.scss 是整站主题，icon.png 是 favicon）
for (const rel of overridePaths) {
  if (!fs.existsSync(path.join(siteRoot, rel))) {
    problems.push(`允许覆盖文件不存在：${rel}`)
  }
}

// 6. package.json 的站点叠加字段必须生效
const pkgPath = path.join(siteRoot, "package.json")
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
  const overlay = upstreamConfig.packageJsonOverlay ?? {}
  for (const [key, value] of Object.entries(overlay.engines ?? {})) {
    if (pkg.engines?.[key] !== value) {
      problems.push(`package.json engines.${key} 应为 ${value}（sync-quartz 会补上）`)
    }
  }
  for (const [key, value] of Object.entries(overlay.dependencies ?? {})) {
    if (pkg.dependencies?.[key] !== value) {
      problems.push(`package.json dependencies.${key} 应为 ${value}（sync-quartz 会补上）`)
    }
  }
  for (const [key, value] of Object.entries(overlay.scripts ?? {})) {
    if (pkg.scripts?.[key] !== value) {
      problems.push(`package.json scripts.${key} 缺失或不同（sync-quartz 会补上）`)
    }
  }
} else {
  problems.push("缺少 package.json")
}

// 4. 核心补丁文件必须真的带着补丁标记（防止「标记选得宽松」导致的假通过）
for (const file of Object.keys(manifest.files ?? {})) {
  if (manifest.files[file].category !== "patched") continue
  const full = path.join(siteRoot, file)
  if (!fs.existsSync(full)) continue
  const source = fs.readFileSync(full, "utf8")
  const patches = corePatches.filter((patch) => patch.targets.some((target) => target.file === file))
  for (const patch of patches) {
    for (const target of patch.targets.filter((target) => target.file === file)) {
      try {
        const applied = applyEdits(source, target.edits, `${patch.id} (${file})`).status === "already-patched"
        if (!applied) problems.push(`核心补丁未应用：${patch.id} (${file})`)
      } catch (error) {
        problems.push(`核心补丁校验失败：${patch.id} (${file}) — ${error.message}`)
      }
    }
  }
}

if (problems.length > 0) {
  console.error("✗ [check-quartz-vendor] 检测到与上游基线不一致：")
  for (const problem of problems) console.error(`  - ${problem}`)
  console.error(
    "\n提示：升级上游 Quartz 请运行 `node scripts/sync-quartz.mjs`；" +
      "本站自己的改动请写进 vendor/core-patches.mjs 或登记进 manifest。",
  )
  process.exit(1)
}

if (verbose) {
  console.log(
    `[check-quartz-vendor] 上游 ${manifest.upstream.branch}@${String(manifest.upstream.ref).slice(0, 12)}；` +
      `vendored=${categories.vendored}，override=${categories.override}，patched=${categories.patched}；` +
      `共 ${Object.keys(manifest.files ?? {}).length} 个核心文件`,
  )
  if (patchedPaths.size > 0) console.log(`[check-quartz-vendor] 已登记的补丁文件：${[...patchedPaths].join(", ")}`)
}
console.log("✓ [check-quartz-vendor] 核心与上游基线一致（仅允许覆盖/已登记补丁不同）")
