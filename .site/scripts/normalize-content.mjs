import fs from "node:fs"
import path from "node:path"
import YAML from "yaml"

// The Obsidian vault contains a few notes whose frontmatter is not valid YAML
// (e.g. full-width "：" used as a key separator, or a plain scalar). Quartz
// treats frontmatter as an object, so those notes crash the whole build.
// This script repairs what it can and drops the rest, without touching the
// original GitHub repository (it only runs on the build-time clone).

const root = process.argv[2] ?? "content"
let fixed = 0
let stripped = 0
let scanned = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.isFile() && p.endsWith(".md")) normalize(p)
  }
}

function normalize(file) {
  scanned++
  let text = fs.readFileSync(file, "utf8")
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  if (!text.startsWith("---")) return
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return
  const raw = m[1]
  let data
  try {
    data = YAML.parse(raw)
  } catch {
    data = undefined
  }
  if (data && typeof data === "object" && !Array.isArray(data)) return

  // Try the common Obsidian mistake: full-width colon as key separator.
  const repaired = raw.replace(/^(\s*)([^\s:#][^:\n]*?)：(?=\S)/gm, "$1$2: ")
  let repairedData
  try {
    repairedData = YAML.parse(repaired)
  } catch {
    repairedData = undefined
  }
  if (repairedData && typeof repairedData === "object" && !Array.isArray(repairedData)) {
    fs.writeFileSync(file, text.replace(raw, repaired))
    fixed++
    return
  }

  // Last resort: drop the malformed frontmatter block.
  fs.writeFileSync(file, text.replace(m[0], ""))
  stripped++
}

walk(root)
console.log(`normalize-content: scanned=${scanned} fixed=${fixed} stripped=${stripped}`)
