import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { repairQuotedCode } from "../plugins/site-markdown/quoted-code.mjs";

const cases = [
  [
    "Allwinner/编译/编译报错.md",
    ["update:unable to open sboot file", "Build android failed!"],
  ],
  ["Areas/Media/音频/音频调试.md", ["alsaloop -C hw:0,0"]],
  [
    "Areas/网络通信/WiFi/wpa_cli.md",
    ["wpa_cli v2.9", "Could not connect to wpa_supplicant"],
  ],
  ["Linux/Systemd/systemd开机配置.md", ["[Unit]", "Alias=sshd.service"]],
  [
    "Linux/shell命令及脚本/bash扩展模式.md",
    ["echo [[:upper:]]*", "echo [![:digit:]]*", "$ ls abc?(def)"],
  ],
  [
    "Resource/Amlogic/S905 MAC地址烧写.md",
    ["start = 02:E1:E2:35:40:70", "[fragment]"],
  ],
  ["buildroot/编译/buildroot 编译.md", ["make"]],
  ["Allwinner/全志pinctrl调试方法.md", ["mount  -t debugfs", "echo PC2 1 > pull"]],
];
for (const [file, snippets] of cases) {
  test(`quoted code preserves content inside callout: ${file}`, () => {
    const text = execFileSync("git", ["show", `HEAD:${file}`], {
      cwd: new URL("../../", import.meta.url),
      encoding: "utf8",
    });
    const tree = unified().use(remarkParse).parse(repairQuotedCode(text));
    const blocks = [];
    function walk(node, quoted = false) {
      quoted ||= node.type === "blockquote";
      if (node.type === "code" && quoted) blocks.push(node.value);
      for (const child of node.children || []) walk(child, quoted);
    }
    walk(tree);
    for (const snippet of snippets)
      assert.ok(
        blocks.some((code) => code.includes(snippet)),
        `missing quoted code: ${snippet}`,
      );
    if (file.endsWith("/编译报错.md")) {
      assert.equal(blocks.length, 1);
      assert.equal(blocks[0].trim().split("\n").length, 19);
    }
  });
}

test("quoted examples inside a top-level fence stay literal", () => {
  const example = "````markdown\n> ```sh\nexample\n> ```\n````";
  assert.equal(repairQuotedCode(example), example);
});

test("an unclosed quoted fence leaves following prose unchanged", () => {
  const example = "> ```sh\nprose";
  assert.equal(repairQuotedCode(example), example);
});
