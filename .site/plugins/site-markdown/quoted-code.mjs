const quotePrefix = /^(?: {0,3}>[ \t]?)*/
const fencePattern = /^ {0,3}(`{3,}|~{3,})(.*)$/

// Obsidian accepts omitted quote markers inside fences. Restore the markers
// before CommonMark parses the block, only when the closing fence is present.
export function repairQuotedCode(source) {
  const newline = source.includes("\r\n") ? "\r\n" : "\n"
  const lines = source.split(/\r?\n/)
  const endOfFrontmatter = lines[0] === "---" ? lines.indexOf("---", 1) : -1
  let open

  for (let i = endOfFrontmatter + 1; i < lines.length; i++) {
    const prefix = quotePrefix.exec(lines[i])[0]
    const fence = fencePattern.exec(lines[i].slice(prefix.length))
    if (!fence) continue
    const depth = prefix.split(">").length - 1
    const [, marker, suffix] = fence

    if (
      open && depth === open.depth && marker[0] === open.marker[0] &&
      marker.length >= open.marker.length && !suffix.trim()
    ) {
      for (let j = open.line + 1; depth && j < i; j++) {
        const existing = quotePrefix.exec(lines[j])[0]
        if (existing.split(">").length - 1 < depth)
          lines[j] = open.prefix + lines[j].slice(existing.length)
      }
      open = undefined
    } else if (!open || (open.depth > 0 && depth <= open.depth)) {
      open = { depth, marker, prefix, line: i }
    }
  }
  return lines.join(newline)
}
