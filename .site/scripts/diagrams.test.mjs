import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { render } from "pele";

test("Pele renders the repository's Mermaid diagrams in wide and phone layouts", () => {
  const note = fs.readFileSync(
    new URL("../../Areas/网络通信/移动通信/4G 休眠唤醒.md", import.meta.url),
    "utf8",
  );
  const sources = [...note.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)].map(
    (match) => match[1],
  );
  assert.ok(sources.length > 0);
  for (const source of sources)
    for (const width of [360, 1200]) {
      const result = render(source, { maxWidth: width });
      assert.ok(result.svg.includes("pele-flowchart"));
      assert.ok(result.width > 0 && result.height > 0);
      assert.ok(!result.svg.includes("<script"));
    }
});
