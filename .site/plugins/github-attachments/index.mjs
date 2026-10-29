import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const published = new Set([
  ".md",
  ".canvas",
  ".base",
  ".excalidraw",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".bmp",
  ".ico",
  ".avif",
])
const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
)
const repository = "https://github.com/bitshelf/notebook"

export function createResolver(files, repo = repository, ref = "main") {
  const tracked = new Set(files)
  return (url, note) => {
    if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return null
    const match = url.match(/^([^?#]*)([?#].*)?$/)
    let target
    try {
      target = decodeURIComponent(match[1]).replace(/\\/g, "/")
    } catch {
      return null
    }
    const extension = path.posix.extname(target).toLowerCase()
    if (!extension || published.has(extension)) return null
    const relative = path.posix.normalize(
      path.posix.join(path.posix.dirname(note), target),
    )
    const rooted = path.posix.normalize(target.replace(/^\//, ""))
    let resolved = tracked.has(relative)
      ? relative
      : tracked.has(rooted)
        ? rooted
        : undefined
    if (!resolved) {
      const matches = files.filter(
        (file) => file.endsWith("/" + rooted) || file === rooted,
      )
      if (matches.length === 1) resolved = matches[0]
    }
    if (!resolved) {
      const matches = files.filter(
        (file) => path.posix.basename(file) === path.posix.basename(target),
      )
      if (matches.length === 1) resolved = matches[0]
    }
    if (!resolved)
      return `${repo}/search?q=${encodeURIComponent(path.posix.basename(target))}&type=code`
    return `${repo}/blob/${encodeURIComponent(ref)}/${resolved.split("/").map(encodeURIComponent).join("/")}${match[2] ?? ""}`
  }
}

export function rewriteAttachments(tree, note, resolve) {
  function walk(parent) {
    if (!parent.children) return
    parent.children = parent.children.map((node) => {
      if (
        node.type === "code" ||
        node.type === "inlineCode" ||
        node.type === "html"
      )
        return node
      if (node.type === "wikilink") {
        const url = resolve(node.path, note)
        if (url)
          return {
            type: "link",
            url,
            children: [
              {
                type: "text",
                value: node.alias || path.posix.basename(node.path),
              },
            ],
          }
      }
      if (["link", "image", "definition"].includes(node.type)) {
        const url = resolve(node.url, note)
        if (url) {
          if (node.type === "image")
            return {
              type: "link",
              url,
              children: [
                {
                  type: "text",
                  value:
                    node.alt ||
                    path.posix.basename(decodeURIComponent(node.url)),
                },
              ],
            }
          node.url = url
        }
      }
      walk(node)
      return node
    })
  }
  // Reference-style image embeds must become links as GitHub blob URLs are HTML.
  const attachments = new Set()
  function definitions(node) {
    if (node.type === "definition" && resolve(node.url, note))
      attachments.add(node.identifier)
    node.children?.forEach(definitions)
  }
  definitions(tree)
  walk(tree)
  function references(node) {
    if (node.type === "imageReference" && attachments.has(node.identifier)) {
      node.type = "linkReference"
      node.children = [
        { type: "text", value: node.alt || node.label || node.identifier },
      ]
      delete node.alt
    }
    node.children?.forEach(references)
  }
  references(tree)
}

export default function GitHubAttachments() {
  let resolve
  return {
    name: "GitHubAttachments",
    markdownPlugins: () => {
      const files = execFileSync("git", ["ls-files", "-z"], {
        cwd: repoRoot,
        maxBuffer: 32 * 1024 * 1024,
      })
        .toString("utf8")
        .split("\0")
        .filter(Boolean)
      resolve ??= createResolver(files)
      return [
        () => (tree, file) =>
          rewriteAttachments(tree, file.data.relativePath, resolve),
      ]
    },
  }
}
