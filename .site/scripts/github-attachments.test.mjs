import test from "node:test"
import assert from "node:assert/strict"
import {
  createResolver,
  rewriteAttachments,
} from "../plugins/github-attachments/index.mjs"
const resolve = createResolver([
  "Android/assets/中文 文档.pdf",
  "Tools/file.zip",
  "a/duplicate.pdf",
  "b/duplicate.pdf",
])
test("relative, encoded and wiki-style attachment paths resolve to tracked GitHub files", () => {
  assert.equal(
    resolve("assets/中文%20文档.pdf#page=2", "Android/note.md"),
    "https://github.com/bitshelf/notebook/blob/main/Android/assets/%E4%B8%AD%E6%96%87%20%E6%96%87%E6%A1%A3.pdf#page=2",
  )
  assert.match(
    resolve("../assets/中文 文档.pdf", "Android/sub/note.md"),
    /blob\/main\/Android/,
  )
  assert.match(resolve("file.zip", "note.md"), /blob\/main\/Tools\/file.zip$/)
  assert.match(resolve("missing.pdf", "note.md"), /\/search\?q=missing.pdf/)
  assert.match(resolve("duplicate.pdf", "note.md"), /\/search\?/)
  for (const url of [
    "https://example.com/file.pdf",
    "//example.com/file.pdf",
    "image.png",
    "note.md",
    "#section",
  ])
    assert.equal(resolve(url, "note.md"), null)
})
test("embeds become links; references work; code remains unchanged", () => {
  const tree = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          { type: "image", url: "file.zip", alt: "Download" },
          {
            type: "wikilink",
            path: "file.zip",
            alias: "Package",
            embedded: true,
          },
          { type: "inlineCode", value: "![[file.zip]]" },
          { type: "imageReference", identifier: "manual", alt: "Manual" },
        ],
      },
      { type: "definition", identifier: "manual", url: "file.zip" },
      { type: "code", value: "[file](file.zip)" },
    ],
  }
  rewriteAttachments(tree, "note.md", resolve)
  const nodes = tree.children[0].children
  assert.equal(nodes[0].type, "link")
  assert.equal(nodes[0].children[0].value, "Download")
  assert.equal(nodes[1].children[0].value, "Package")
  assert.equal(nodes[2].value, "![[file.zip]]")
  assert.equal(nodes[3].type, "linkReference")
  assert.match(tree.children[1].url, /github.com/)
  assert.equal(tree.children[2].value, "[file](file.zip)")
})
