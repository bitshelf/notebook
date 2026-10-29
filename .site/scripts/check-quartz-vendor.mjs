import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { fileURLToPath } from "node:url"

export const siteRoot = path.resolve(import.meta.dirname, "..")
export const hash = (data) =>
  crypto.createHash("sha256").update(data).digest("hex")
export function walk(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.name === ".quartz-cache" || entry.name === "node_modules")
      return []
    return entry.isDirectory()
      ? walk(full, base)
      : entry.isFile()
        ? [path.relative(base, full).split(path.sep).join("/")]
        : []
  })
}
export function verify(root = siteRoot) {
  const config = JSON.parse(
    fs.readFileSync(path.join(root, "vendor/quartz-upstream.json")),
  )
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "vendor/quartz-manifest.json")),
  )
  if (
    config.ref !== manifest.upstream.ref ||
    config.tag !== manifest.upstream.tag
  )
    throw new Error("Upstream pin and manifest disagree")
  const overrides = new Set(config.overrides)
  for (const [rel, entry] of Object.entries(manifest.files)) {
    const full = path.join(root, rel)
    if (!fs.existsSync(full)) throw new Error(`Missing upstream file: ${rel}`)
    if (!overrides.has(rel) && hash(fs.readFileSync(full)) !== entry.hash)
      throw new Error(`Unregistered core modification: ${rel}`)
  }
  for (const rel of walk(path.join(root, "quartz"))) {
    if (!manifest.files[`quartz/${rel}`])
      throw new Error(`Unregistered core file: quartz/${rel}`)
  }
  return config
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const pin = verify()
  console.log(
    `✓ Official Quartz ${pin.tag}@${pin.ref.slice(0, 12)}: core baseline verified`,
  )
}
