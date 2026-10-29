#!/usr/bin/env node
/**
 * 对 Quartz 核心应用/校验 `vendor/core-patches.mjs` 里的补丁。
 *
 * 正常构建不需要运行它：仓库里的两个核心补丁文件已经是打好补丁的版本，
 * `scripts/check-quartz-vendor.mjs` 会校验它们的哈希。
 * 它主要在升级上游时被 `scripts/sync-quartz.mjs` 调用（先复制上游原文件，再打补丁），
 * 也方便单独确认补丁是否还在：
 *
 *   node scripts/patch-core.mjs           # 补齐缺失的补丁（幂等）
 *   node scripts/patch-core.mjs --check   # 只检查，缺补丁则退出码 1
 *   node scripts/patch-core.mjs --root .dsh-tmp/upstream-quartz   # 对别的目录试打
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { applyEdits } from "../vendor/patch-utils.mjs"
import { corePatches } from "../vendor/core-patches.mjs"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(scriptDir, "..")
const argv = process.argv.slice(2)
const checkOnly = argv.includes("--check")
const rootIndex = argv.indexOf("--root")
const root = rootIndex >= 0 ? path.resolve(argv[rootIndex + 1] ?? "") : siteRoot

if (!fs.existsSync(path.join(root, "quartz", "bootstrap-cli.mjs"))) {
  console.error(`✗ [patch-core] 目标目录看起来不是 Quartz 仓库：${root}`)
  process.exit(1)
}

const results = []
let changed = 0

for (const patch of corePatches) {
  for (const target of patch.targets) {
    const filePath = path.join(root, target.file)
    if (!fs.existsSync(filePath)) {
      console.error(`✗ [patch-core] 缺少文件：${target.file}`)
      process.exit(1)
    }
    let source = fs.readFileSync(filePath, "utf8")
    let result
    try {
      result = applyEdits(source, target.edits, `${patch.id} (${target.file})`)
    } catch (error) {
      console.error(`✗ [patch-core] ${patch.id} 打补丁失败：${error.message}`)
      process.exit(1)
    }
    if (result.status === "patched") {
      changed += 1
      if (!checkOnly) fs.writeFileSync(filePath, result.source, "utf8")
    }
    results.push({ patch: patch.id, file: target.file, status: result.status })
  }
}

for (const result of results) {
  const icon = result.status === "patched" ? (checkOnly ? "✗ 待修补" : "✓ 已修补") : "✓ 已就绪"
  console.log(`${icon}  ${result.patch} — ${result.file}`)
}

if (checkOnly && changed > 0) {
  console.error(`✗ [patch-core] 有 ${changed} 个文件尚未应用核心补丁（--check 模式不会写入）`)
  process.exit(1)
}

console.log(
  `✓ [patch-core] ${changed} 个文件已${checkOnly ? "" : "写入"}补丁，共 ${results.length} 个目标文件检查完成`,
)
