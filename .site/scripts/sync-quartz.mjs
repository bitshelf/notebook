#!/usr/bin/env node
/**
 * 从上游 Quartz 同步 vendored 核心，并重新登记 vendor/quartz-manifest.json。
 *
 * 升级流程（详细说明见 vendor/README.md）：
 *   1. node scripts/sync-quartz.mjs --branch v5          # 拉取上游 v5 最新提交
 *      或 node scripts/sync-quartz.mjs --from <本地克隆>  # 用本地克隆（离线/锁定提交）
 *   2. git diff 审查 .site 的改动（package.json、核心补丁、允许覆盖文件的上游变更警告）
 *   3. npm install && bash scripts/build.sh 验证
 *
 * 默认不会自动 npm install / 不会构建；确认 diff 后自行执行。
 * 脚本是幂等的：同样的上游版本重复运行不会产生额外变化。
 */

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { applyEdits } from "../vendor/patch-utils.mjs"
import { corePatches, corePatchedFiles } from "../vendor/core-patches.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(scriptDir, "..")
const configPath = path.join(siteRoot, "vendor", "quartz-upstream.json")
const manifestPath = path.join(siteRoot, "vendor", "quartz-manifest.json")

function fail(message) {
  console.error(`✗ [sync-quartz] ${message}`)
  process.exit(1)
}

function sha256File(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex")
}

function sha256Buffer(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex")
}

function walkFiles(dir, base = dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkFiles(full, base))
    else if (entry.isFile()) out.push(path.relative(base, full).split(path.sep).join("/"))
  }
  return out
}

function parseArgs(argv) {
  const options = { branch: undefined, ref: undefined, from: undefined, dryRun: false, keep: false, install: false, skipVerify: false }
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === "--branch") options.branch = argv[++i]
    else if (arg === "--ref") options.ref = argv[++i]
    else if (arg === "--from") options.from = path.resolve(argv[++i] ?? "")
    else if (arg === "--dry-run") options.dryRun = true
    else if (arg === "--keep") options.keep = true
    else if (arg === "--install") options.install = true
    else if (arg === "--skip-verify") options.skipVerify = true
    else fail(`未知参数：${arg}`)
  }
  return options
}

const options = parseArgs(process.argv.slice(2))
if (!fs.existsSync(configPath)) fail(`缺少 ${configPath}`)
const config = JSON.parse(fs.readFileSync(configPath, "utf8"))
const previousManifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { files: {} }
const overrides = new Set(config.overrides ?? [])
let tempClone = null

/** 解析上游源码目录（本地目录或临时 clone） */
function resolveSourceDir() {
  if (options.from) {
    if (!fs.existsSync(path.join(options.from, "quartz", "bootstrap-cli.mjs"))) {
      fail(`--from 目录不是有效的 Quartz 仓库（缺少 quartz/bootstrap-cli.mjs）：${options.from}`)
    }
    return options.from
  }
  const targetRef = options.ref ?? options.branch ?? config.branch ?? "v5"
  const tempRoot = path.join(siteRoot, ".dsh-tmp", "quartz-sync")
  fs.mkdirSync(tempRoot, { recursive: true })
  const cloneDir = path.join(tempRoot, `src-${Date.now()}`)
  try {
    execFileSync("git", ["clone", "--depth", "1", "--branch", targetRef, config.repo, cloneDir], {
      stdio: "pipe",
    })
  } catch (error) {
    // 提交哈希不能用 --branch 浅克隆：单独 fetch 一次
    try {
      fs.rmSync(cloneDir, { recursive: true, force: true })
      fs.mkdirSync(cloneDir, { recursive: true })
      execFileSync("git", ["-C", cloneDir, "init", "-q"], { stdio: "pipe" })
      execFileSync("git", ["-C", cloneDir, "remote", "add", "origin", config.repo], { stdio: "pipe" })
      execFileSync("git", ["-C", cloneDir, "fetch", "--depth", "1", "origin", targetRef], { stdio: "pipe" })
      execFileSync("git", ["-C", cloneDir, "checkout", "-q", "FETCH_HEAD"], { stdio: "pipe" })
    } catch (fetchError) {
      fail(`无法获取上游 ${config.repo}@${targetRef}：${String(fetchError.message ?? fetchError)}`)
    }
  }
  tempClone = cloneDir
  return cloneDir
}

const sourceDir = resolveSourceDir()
const resolvedRef = (() => {
  try {
    return execFileSync("git", ["-C", sourceDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim()
  } catch {
    return options.ref ?? previousManifest.upstream?.ref ?? config.ref
  }
})()
const resolvedBranch = options.branch ?? config.branch

// 1. 收集上游应同步的文件清单
const sourceFiles = new Map() // site 相对路径 -> 上游绝对路径
for (const rel of walkFiles(path.join(sourceDir, "quartz"))) {
  const siteRel = `quartz/${rel}`
  if (siteRel.startsWith("quartz/.quartz-cache/") || siteRel.startsWith("quartz/node_modules/")) continue
  sourceFiles.set(siteRel, path.join(sourceDir, "quartz", rel))
}
for (const rel of config.vendoredFiles ?? []) {
  const full = path.join(sourceDir, rel)
  if (!fs.existsSync(full)) fail(`上游缺少 vendor 根文件：${rel}（请更新 vendor/quartz-upstream.json）`)
  sourceFiles.set(rel, full)
}

// 2. 生成变更计划
const plan = { added: [], changed: [], removed: [], overridesChanged: [] }
for (const [siteRel, sourcePath] of sourceFiles) {
  const dest = path.join(siteRoot, siteRel)
  const upstreamHash = sha256File(sourcePath)
  const old = previousManifest.files?.[siteRel]
  if (overrides.has(siteRel)) {
    if (old?.upstreamHash && old.upstreamHash !== upstreamHash) {
      plan.overridesChanged.push(siteRel)
    }
    if (!fs.existsSync(dest)) plan.changed.push(siteRel)
    continue
  }
  if (!fs.existsSync(dest)) {
    plan.added.push(siteRel)
    continue
  }
  const destHash = sha256File(dest)
  if (old?.hash !== destHash || old?.upstreamHash !== upstreamHash) plan.changed.push(siteRel)
}
for (const siteRel of Object.keys(previousManifest.files ?? {})) {
  if (!sourceFiles.has(siteRel) && !overrides.has(siteRel)) plan.removed.push(siteRel)
}

console.log(
  `[sync-quartz] 上游 ${resolvedBranch}@${String(resolvedRef).slice(0, 12)}：新增 ${plan.added.length}，` +
    `更新 ${plan.changed.length}，删除 ${plan.removed.length}，允许覆盖文件被上游改动 ${plan.overridesChanged.length}`,
)
if (options.dryRun) {
  const list = (title, items) => {
    if (items.length === 0) return
    console.log(`  ${title}：`)
    for (const item of items) console.log(`    - ${item}`)
  }
  list("新增", plan.added)
  list("更新", plan.changed)
  list("删除", plan.removed)
  list("需要人工确认的覆盖文件（上游改动但本站保留自己的版本）", plan.overridesChanged)
  if (tempClone && !options.keep) fs.rmSync(tempClone, { recursive: true, force: true })
  console.log("[sync-quartz] --dry-run：未修改任何文件")
  process.exit(0)
}

// 3. 复制上游文件（允许覆盖的文件保留本站版本）
for (const [siteRel, sourcePath] of sourceFiles) {
  const dest = path.join(siteRoot, siteRel)
  if (overrides.has(siteRel)) {
    if (!fs.existsSync(dest)) fail(`允许覆盖文件不存在，无法保留站点版本：${siteRel}`)
    continue
  }
  const buffer = fs.readFileSync(sourcePath)
  if (fs.existsSync(dest) && sha256Buffer(buffer) === sha256File(dest)) continue
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, buffer)
}

// 4. 删除上游已移除的文件（只有本地内容与上版 manifest 一致时才删除，避免误删）
for (const siteRel of plan.removed) {
  const dest = path.join(siteRoot, siteRel)
  const oldHash = previousManifest.files?.[siteRel]?.hash
  if (!fs.existsSync(dest)) continue
  if (oldHash && sha256File(dest) !== oldHash) {
    console.warn(`⚠ [sync-quartz] 上游已移除 ${siteRel}，但本地内容有改动，保留文件待人工确认`)
    continue
  }
  fs.rmSync(dest)
}

// 5. 重新应用核心补丁（复制上来的是上游原文件）
const patchedHashes = new Map()
for (const patch of corePatches) {
  for (const target of patch.targets) {
    const filePath = path.join(siteRoot, target.file)
    if (!fs.existsSync(filePath)) fail(`打补丁时缺少文件：${target.file}`)
    let result
    try {
      result = applyEdits(fs.readFileSync(filePath, "utf8"), target.edits, `${patch.id} (${target.file})`)
    } catch (error) {
      fail(
        `${patch.id} 在新上游上无法应用：${error.message}\n` +
          "→ 请对照上游新代码更新 vendor/core-patches.mjs 后重新运行 scripts/sync-quartz.mjs。",
      )
    }
    if (result.status === "patched") fs.writeFileSync(filePath, result.source, "utf8")
    patchedHashes.set(target.file, sha256File(filePath))
  }
}

// 6. package.json：上游版本 + 站点叠加字段
const upstreamPkg = JSON.parse(fs.readFileSync(path.join(sourceDir, "package.json"), "utf8"))
const pkgPath = path.join(siteRoot, "package.json")
const currentPkg = fs.existsSync(pkgPath) ? JSON.parse(fs.readFileSync(pkgPath, "utf8")) : {}
const overlay = config.packageJsonOverlay ?? {}
const mergedPkg = JSON.parse(JSON.stringify(upstreamPkg))
mergedPkg.engines = { ...(mergedPkg.engines ?? {}), ...(overlay.engines ?? {}) }
mergedPkg.dependencies = { ...(mergedPkg.dependencies ?? {}), ...(overlay.dependencies ?? {}) }
mergedPkg.devDependencies = { ...(mergedPkg.devDependencies ?? {}), ...(overlay.devDependencies ?? {}) }
mergedPkg.scripts = { ...(mergedPkg.scripts ?? {}), ...(overlay.scripts ?? {}) }
// 保留站点自有的顶层字段（如 version/branch 等如与上游不同，交由人工处理，这里不做合并）
const packageJsonChanged = JSON.stringify(currentPkg) !== JSON.stringify(mergedPkg)
if (packageJsonChanged) fs.writeFileSync(pkgPath, `${JSON.stringify(mergedPkg, null, 2)}\n`, "utf8")

// 7. 重新生成 manifest
const files = {}
for (const [siteRel, sourcePath] of [...sourceFiles.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const dest = path.join(siteRoot, siteRel)
  const upstreamHash = sha256File(sourcePath)
  if (overrides.has(siteRel)) {
    files[siteRel] = { category: "override", hash: sha256File(dest), upstreamHash }
  } else if (corePatchedFiles.includes(siteRel)) {
    files[siteRel] = { category: "patched", hash: patchedHashes.get(siteRel), upstreamHash }
  } else {
    files[siteRel] = { category: "vendored", hash: upstreamHash, upstreamHash }
  }
}
const manifest = {
  $comment:
    "由 scripts/sync-quartz.mjs 生成，请勿手工编辑。记录 .site 中每个上游 Quartz 文件的期望哈希，scripts/check-quartz-vendor.mjs 用它对账。",
  upstream: { repo: config.repo, branch: resolvedBranch, ref: resolvedRef },
  files,
}
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8")

// 8. 更新 vendor/quartz-upstream.json 的 pin
config.ref = resolvedRef
config.branch = resolvedBranch
fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8")

if (tempClone && !options.keep) fs.rmSync(tempClone, { recursive: true, force: true })

if (options.install) {
  console.log("[sync-quartz] 运行 npm install 更新依赖锁文件…")
  execFileSync("npm", ["install", "--no-audit", "--no-fund"], { cwd: siteRoot, stdio: "inherit" })
}

if (!options.skipVerify) {
  execFileSync(process.execPath, [path.join(scriptDir, "check-quartz-vendor.mjs"), "--verbose"], {
    cwd: siteRoot,
    stdio: "inherit",
  })
}

console.log("\n✓ [sync-quartz] 同步完成，请审查 git diff：")
if (plan.overridesChanged.length > 0) {
  console.log("  ⚠ 上游改动了这些「允许覆盖」文件，你可能需要人工合并：")
  for (const rel of plan.overridesChanged) console.log(`    - ${rel}`)
}
if (packageJsonChanged) console.log("  - package.json 已按上游 + 站点叠加字段重建")
console.log("  下一步：npm install（如未加 --install）→ bash scripts/build.sh")
