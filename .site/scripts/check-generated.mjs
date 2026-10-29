import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fromHtml } from "hast-util-from-html";
import { toString } from "hast-util-to-string";
import { render } from "pele";

const root = path.resolve(process.argv[2] || "public");
const counts = { html: 0, excalidraw: 0, canvas: 0, mermaid: 0 };
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith(".html")) check(file);
  }
}
function check(file) {
  const html = fs.readFileSync(file, "utf8");
  const pageRoot = /<div\b[^>]*\bid="quartz-root"[^>]*>/.exec(html)?.[0] ?? "";
  counts.html++;
  if (pageRoot.includes('data-frame="excalidraw"')) {
    counts.excalidraw++;
    assert.match(html, /class="excalidraw-container"[^>]*>[\s\S]*?<svg/, file);
  }
  if (pageRoot.includes('data-frame="canvas"')) {
    counts.canvas++;
    assert.match(html, /class="[^"]*\bcanvas-node\b/, file);
  }
  for (const match of html.matchAll(
    /<code\b[^>]*data-language="mermaid"[^>]*>([\s\S]*?)<\/code>/g,
  )) {
    const source = toString(fromHtml(match[1], { fragment: true }));
    for (const maxWidth of [360, 1440]) {
      const result = render(source, { maxWidth });
      assert.ok(result.width > 0 && result.height > 0, file);
      assert.match(result.svg, /<svg/, file);
    }
    counts.mermaid++;
  }
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(
    (m) => m[1],
  );
  const styles = [...html.matchAll(/<link\b[^>]*>/g)]
    .filter((m) => /rel="stylesheet"/.test(m[0]))
    .map((m) => /href="([^"]+)"/.exec(m[0])?.[1])
    .filter(Boolean);
  for (const ref of [...scripts, ...styles]) {
    if (/^(?:https?:|data:|\/\/)/.test(ref)) continue;
    const pathname = decodeURIComponent(ref.split(/[?#]/)[0]);
    const target = pathname.startsWith("/")
      ? path.join(root, pathname.replace(/^\/notebook\//, "/"))
      : path.resolve(path.dirname(file), pathname);
    assert.ok(fs.existsSync(target), `Missing ${ref} in ${file}`);
  }
}
walk(root);
assert.ok(counts.html > 0, "No generated pages found");
console.log("Generated-page audit:", JSON.stringify(counts));
