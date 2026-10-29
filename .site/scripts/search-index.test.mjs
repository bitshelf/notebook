import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { searchRecord, buildSearchIndex } from "./search-index.mjs";

test("search records include full content, title, tags and path with portable URLs", () => {
  const record = searchRecord("linux/显示/index", {
    title: "显示",
    content: "drm_atomic_commit",
    tags: ["graphics"],
  });
  assert.equal(record.url, "/linux/显示/");
  assert.ok(record.content.includes("drm_atomic_commit"));
  assert.ok(record.content.includes("graphics"));
  assert.deepEqual(record.filters.tags, ["graphics"]);
  assert.equal(record.language, "zh");
});

test("Pagefind generates a self-hosted Wasm index from published records only", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-search-test-"));
  try {
    fs.mkdirSync(path.join(dir, "static"));
    fs.writeFileSync(
      path.join(dir, "static/contentIndex.json"),
      JSON.stringify({
        "linux/显示": {
          title: "显示系统",
          content: "屏幕旋转 drm_atomic_commit",
          tags: ["graphics"],
        },
        "android/gpio": { title: "GPIO", content: "gpio_set_value", tags: [] },
      }),
    );
    await buildSearchIndex(dir);
    const files = fs.readdirSync(path.join(dir, "pagefind"));
    assert.ok(files.includes("pagefind.js"));
    assert.ok(files.some((name) => /^wasm\..*\.pagefind$/.test(name)));
    assert.ok(files.some((name) => name.includes("zh")));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
