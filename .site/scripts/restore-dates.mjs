import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

// Restore meaningful file timestamps on the build-time content copy.
//
// Quartz derives `file.mtime` / `file.created` from the filesystem when the
// content directory is not a git repository (the site build copies the vault
// into a temporary folder, so this is always the case). Without this step
// every page would get the copy timestamp, which would make "recently
// updated" listings (Obsidian Bases views, recent notes, RSS ...) meaningless
// and unstable.
//
// We read the last commit date of every tracked file from the source
// repository in one pass and apply it to the copied file with `utimes`.
//
// usage: node scripts/restore-dates.mjs <repo-root> <content-dir>

const repoRoot = path.resolve(process.argv[2] ?? ".")
const contentDir = path.resolve(process.argv[3] ?? "content")

if (!fs.existsSync(contentDir)) {
  console.error(`restore-dates: content directory not found: ${contentDir}`)
  process.exit(1)
}

/** @type {Map<string, number>} repo-relative posix path -> commit timestamp (seconds) */
const commitTimes = new Map()

function collectCommitTimes() {
  let out
  try {
    out = execFileSync(
      "git",
      [
        "-c",
        "core.quotepath=false",
        "-C",
        repoRoot,
        "log",
        "--pretty=format:C%ct",
        "--name-only",
        "--no-renames",
        "--",
        ".",
      ],
      { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 },
    )
  } catch {
    return false
  }

  let current = 0
  for (const rawLine of out.split("\n")) {
    const line = rawLine.replace(/\r$/, "")
    if (line === "") continue
    if (line.startsWith("C") && /^C\d+$/.test(line)) {
      current = Number(line.slice(1))
      continue
    }
    if (!current) continue
    // git log walks newest -> oldest, so the first time we see a path is its
    // latest modification.
    if (!commitTimes.has(line)) commitTimes.set(line, current)
  }
  return true
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.isFile()) out.push(full)
  }
  return out
}

const hadGit = collectCommitTimes()
const files = walk(contentDir).filter((f) => f.endsWith(".md"))
let restored = 0
let fallback = 0

for (const file of files) {
  const rel = path.relative(contentDir, file).split(path.sep).join("/")
  let ts = commitTimes.get(rel)
  if (ts === undefined) {
    // Untracked note: keep the mtime of the source file if it is available.
    try {
      ts = Math.floor(fs.statSync(path.join(repoRoot, rel)).mtimeMs / 1000)
      fallback++
    } catch {
      continue
    }
  }
  const date = new Date(ts * 1000)
  fs.utimesSync(file, date, date)
  restored++
}

console.log(
  `restore-dates: git=${hadGit ? "yes" : "no"} files=${files.length} ` +
    `restored=${restored} fallback=${fallback}`,
)
