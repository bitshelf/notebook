/**
 * 补丁引擎（Quartz 核心补丁与第三方插件补丁共用）。
 *
 * 设计原则：
 *  - 每个 edit 都要求 `find` 在原文中恰好出现一次，避免误伤；
 *  - `marker` 用于判断补丁是否已经应用（幂等），因此重复执行安全；
 *  - 上游代码一旦变化（find 找不到或出现多次）立即抛错，让升级时明确地
 *    去更新补丁，而不是静默产生错误构建。
 */

export function countOccurrences(haystack, needle) {
  if (needle.length === 0) return 0
  let count = 0
  let index = haystack.indexOf(needle)
  while (index !== -1) {
    count += 1
    index = haystack.indexOf(needle, index + needle.length)
  }
  return count
}

/**
 * 判断一组 edits 是否已经全部应用（每个 marker 恰好出现一次）。
 * @param {string} source
 * @param {Array<{find: string, replace: string, marker: string}>} edits
 * @returns {boolean}
 */
export function areEditsApplied(source, edits) {
  return edits.every((edit) => countOccurrences(source, edit.marker) === 1)
}

/**
 * 对单个文件应用一组 edits。
 * @param {string} source 原始文件内容
 * @param {Array<{find: string, replace: string, marker: string}>} edits
 * @param {string} label 失败时用于定位补丁的名字
 * @returns {{source: string, status: "patched" | "already-patched"}}
 */
export function applyEdits(source, edits, label) {
  const appliedEdits = edits.filter((edit) => countOccurrences(source, edit.marker) > 0)

  for (const edit of appliedEdits) {
    const markerCount = countOccurrences(source, edit.marker)
    if (markerCount !== 1) {
      throw new Error(
        `${label}: 已修补标记出现 ${markerCount} 次（期望 1 次），文件内容与补丁假设不符：` +
          JSON.stringify(edit.marker.slice(0, 80)),
      )
    }
  }

  if (appliedEdits.length === edits.length) {
    // 全部 marker 都在：确认原始片段确实已被替换，避免 marker 选得不好时误判
    for (const edit of edits) {
      if (countOccurrences(source, edit.find) > 0) {
        throw new Error(
          `${label}: marker 存在但原始片段仍在，补丁状态不一致（marker 定义需要更严格）：` +
            JSON.stringify(edit.find.slice(0, 80)),
        )
      }
    }
    return { source, status: "already-patched" }
  }
  if (appliedEdits.length > 0) {
    throw new Error(
      `${label}: 检测到 ${appliedEdits.length}/${edits.length} 个编辑已应用，文件处于不一致状态；` +
        "请用 scripts/sync-quartz.mjs 重新同步上游文件后再试。",
    )
  }

  let patched = source
  for (const edit of edits) {
    const findCount = countOccurrences(patched, edit.find)
    if (findCount !== 1) {
      throw new Error(
        `${label}: 目标片段出现 ${findCount} 次（期望恰好 1 次）。` +
          "上游 Quartz 代码可能已更新，请对照新代码更新 vendor/core-patches.mjs（或对应插件补丁）。" +
          `片段：${JSON.stringify(edit.find.slice(0, 120))}`,
      )
    }
    patched = patched.replace(edit.find, () => edit.replace)
    if (countOccurrences(patched, edit.marker) !== 1) {
      throw new Error(`${label}: 替换后标记缺失或不是唯一，补丁逻辑有误。`)
    }
  }

  return { source: patched, status: "patched" }
}
