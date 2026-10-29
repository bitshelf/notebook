import assert from "node:assert/strict"
import test from "node:test"
import { unified } from "unified"
import remarkParse from "remark-parse"
import SiteMarkdown from "../plugins/site-markdown/index.mjs"

test("local Markdown section images use the Obsidian embed renderer", async () => {
  const markdown = [
    "![GPIO 设备树信息](全志pinctrl系统.md#GPIO%20设备树信息)",
    "![diagram](diagram.svg#detail)",
    "![remote](https://example.com/note.md#section)",
    "[section](note.md#section)",
    "`![example](note.md#section)`",
  ].join("\n\n")
  const processor = unified().use(remarkParse).use(SiteMarkdown().markdownPlugins())
  const tree = await processor.run(processor.parse(markdown))
  const [embed, image, remote, link, example] = tree.children.map((node) => node.children[0])
  assert.deepEqual(embed, {
    type: "wikilink",
    path: "全志pinctrl系统.md",
    heading: "GPIO 设备树信息",
    embedded: true,
  })
  assert.deepEqual([image.type, remote.type, link.type, example.type], [
    "image", "image", "link", "inlineCode",
  ])
})

test("relative Excalidraw image links resolve from the note's directory", async () => {
  const markdown = [
    "![GPIO 说明](../assets/%E5%85%A8%E5%BF%97GPIO.excalidraw)",
    "![](assets/board.excalidraw.md)",
    "![](https://example.com/board.excalidraw)",
  ].join("\n\n")
  const processor = unified().use(remarkParse).use(SiteMarkdown().markdownPlugins())
  const tree = await processor.run(processor.parse(markdown), {
    data: { relativePath: "Allwinner/T527/note.md" },
  })
  const [relative, markdownFile, remote] = tree.children.map((node) => node.children[0])
  assert.equal(relative.type, "wikilink")
  assert.equal(relative.path, "Allwinner/assets/全志GPIO.excalidraw")
  assert.equal(markdownFile.path, "Allwinner/T527/assets/board.excalidraw")
  assert.equal(remote.type, "image")
})
