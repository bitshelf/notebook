import { posix } from "node:path"
import { visit } from "unist-util-visit"
import { repairQuotedCode } from "./quoted-code.mjs"

export default function SiteMarkdown() {
  return {
    name: "SiteMarkdown",
    textTransform: (_ctx, source) => repairQuotedCode(source),
    markdownPlugins: () => [
      () => (tree, file) => {
        visit(tree, "image", (node, index, parent) => {
          if (!parent || index === undefined) return
          const section = /^([^?#]+\.md)#(.+)$/i.exec(node.url)
          const drawing = /^([^?#]+\.excalidraw)(?:\.md)?$/i.exec(node.url)
          const target = section ?? drawing
          if (!target) return

          let path, heading
          try {
            path = decodeURIComponent(target[1])
            heading = section ? decodeURIComponent(section[2]).trim() : undefined
          } catch {
            return
          }

          if (
            /^[\\/]|:|[<>"'?#\x00-\x1f]/.test(path) ||
            (section && (!heading || /[<>"'\x00-\x1f]/.test(heading)))
          ) return
          if (drawing) {
            // Markdown image links are relative to the source note, even when
            // another drawing with the same name exists elsewhere in the vault.
            path = posix.normalize(posix.join(posix.dirname(file.data.relativePath), path))
            if (path.startsWith("../")) return
          }
          parent.children[index] = { type: "wikilink", path, heading, embedded: true }
        })
      },
    ],
  }
}
