import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { siteRoot, hash, walk, verify } from "./check-quartz-vendor.mjs"
import { corePatches } from "../vendor/core-patches.mjs"
import { applyEdits } from "../vendor/patch-utils.mjs"

export function latestStable(refs) {
  const tags = [...refs.matchAll(/refs\/tags\/(v\d+\.\d+\.\d+)$/gm)].map(
    (m) => m[1],
  )
  tags.sort((a, b) => {
    const av = a.slice(1).split(".").map(Number),
      bv = b.slice(1).split(".").map(Number)
    return bv[0] - av[0] || bv[1] - av[1] || bv[2] - av[2]
  })
  if (!tags.length) throw new Error("No official stable version tags found")
  return tags[0]
}
export function prepare(source, root, config) {
  const previous = JSON.parse(
    fs.readFileSync(path.join(root, "vendor/quartz-manifest.json")),
  )
  const overrides = new Set(config.overrides)
  const sourcePaths = [
    ...walk(path.join(source, "quartz")).map((rel) => `quartz/${rel}`),
    ...config.vendoredFiles,
  ]
  const candidates = new Map(),
    files = {}
  for (const rel of sourcePaths) {
    const full = path.join(root, rel)
    if (!previous.files[rel] && fs.existsSync(full) && !overrides.has(rel))
      throw new Error(`Upstream path collides with site file: ${rel}`)
    const buffer = fs.readFileSync(path.join(source, rel))
    const upstreamHash = hash(buffer)
    files[rel] = {
      category: overrides.has(rel) ? "override" : "vendored",
      hash: upstreamHash,
      upstreamHash,
    }
    if (!overrides.has(rel)) candidates.set(rel, buffer)
    else if (!fs.existsSync(full))
      throw new Error(`Missing site override: ${rel}`)
  }
  for (const patch of corePatches)
    for (const target of patch.targets) {
      const buffer = candidates.get(target.file)
      if (!buffer) throw new Error(`Missing patch target: ${target.file}`)
      const result = applyEdits(buffer.toString("utf8"), target.edits, patch.id)
      candidates.set(target.file, Buffer.from(result.source))
      files[target.file] = {
        ...files[target.file],
        category: "patched",
        hash: hash(Buffer.from(result.source)),
      }
    }
  const upstream = JSON.parse(
    fs.readFileSync(path.join(source, "package.json")),
  )
  const overlay = config.packageJsonOverlay
  const pkg = { ...upstream, ...overlay }
  for (const key of ["scripts", "engines", "dependencies", "devDependencies"])
    pkg[key] = { ...upstream[key], ...overlay[key] }
  candidates.set(
    "package.json",
    Buffer.from(JSON.stringify(pkg, null, 2) + "\n"),
  )
  const removed = Object.keys(previous.files).filter(
    (rel) => !files[rel] && !overrides.has(rel),
  )
  return { candidates, files, removed }
}

function main() {
  const args = process.argv.slice(2),
    options = {}
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === "--dry-run") options.dryRun = true
    else if (
      ["--tag", "--from"].includes(arg) &&
      args[i + 1] &&
      !args[i + 1].startsWith("--")
    )
      options[arg.slice(2)] = args[++i]
    else throw new Error(`Unknown or incomplete argument: ${arg}`)
  }
  const config = verify()
  const git = (...argv) =>
    execFileSync("git", argv, {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    }).trim()
  const tag =
    options.tag ?? latestStable(git("ls-remote", "--tags", config.repo))
  if (!/^v\d+\.\d+\.\d+$/.test(tag))
    throw new Error("Only stable release tags are supported")
  let temp
  try {
    const source = options.from
      ? path.resolve(options.from)
      : ((temp = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-quartz-"))),
        path.join(temp, "source"))
    if (!options.from)
      git("clone", "--depth", "1", "--branch", tag, config.repo, source)
    if (
      fs.realpathSync(git("-C", source, "rev-parse", "--show-toplevel")) !==
      fs.realpathSync(source)
    )
      throw new Error("--from must be a repository root")
    if (git("-C", source, "status", "--porcelain"))
      throw new Error("Upstream checkout must be clean")
    const ref = git("-C", source, "rev-parse", "HEAD")
    if (ref !== git("-C", source, "rev-parse", `${tag}^{commit}`))
      throw new Error("Source checkout does not match the selected stable tag")
    const { candidates, files, removed } = prepare(source, siteRoot, config)
    const overridesChanged = config.overrides.filter(
      (rel) =>
        files[rel]?.upstreamHash !==
        JSON.parse(
          fs.readFileSync(path.join(siteRoot, "vendor/quartz-manifest.json")),
        ).files[rel]?.upstreamHash,
    )
    config.tag = tag
    config.ref = ref
    candidates.set(
      "vendor/quartz-upstream.json",
      Buffer.from(JSON.stringify(config, null, 2) + "\n"),
    )
    candidates.set(
      "vendor/quartz-manifest.json",
      Buffer.from(
        JSON.stringify(
          { upstream: { repo: config.repo, tag, ref }, files },
          null,
          2,
        ) + "\n",
      ),
    )
    console.log(
      `Quartz ${tag}@${ref.slice(0, 12)}; removed=${removed.length}; upstream override changes=${overridesChanged.join(", ") || "none"}`,
    )
    if (options.dryRun) {
      console.log(
        "✓ Patch and package preparation passed; no site files changed",
      )
      return
    }
    const backup = new Map(
      [...new Set([...candidates.keys(), ...removed])].map((rel) => [
        rel,
        fs.existsSync(path.join(siteRoot, rel))
          ? fs.readFileSync(path.join(siteRoot, rel))
          : null,
      ]),
    )
    try {
      for (const [rel, buffer] of candidates) {
        fs.mkdirSync(path.dirname(path.join(siteRoot, rel)), {
          recursive: true,
        })
        fs.writeFileSync(path.join(siteRoot, rel), buffer)
      }
      for (const rel of removed)
        fs.rmSync(path.join(siteRoot, rel), { force: true })
      verify()
    } catch (error) {
      for (const [rel, buffer] of backup) {
        if (buffer === null)
          fs.rmSync(path.join(siteRoot, rel), { force: true })
        else fs.writeFileSync(path.join(siteRoot, rel), buffer)
      }
      throw error
    }
    console.log(
      "✓ Synced. Next: npm install --package-lock-only --ignore-scripts; npm ci; npm run test:site; npm run build",
    )
  } finally {
    if (temp) {
      const resolved = fs.realpathSync(temp)
      if (
        path.dirname(resolved) !== fs.realpathSync(os.tmpdir()) ||
        !path.basename(resolved).startsWith("bitshelf-quartz-")
      )
        throw new Error("Unsafe temporary path")
      fs.rmSync(resolved, { recursive: true, force: true })
    }
  }
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main()
