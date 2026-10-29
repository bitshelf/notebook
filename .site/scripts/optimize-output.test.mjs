import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { optimizeOutput } from "./optimize-output.mjs";
test("images load lazily and decode asynchronously while explicit priorities are preserved", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-images-test-"));
  try {
    const file = path.join(dir, "note.html");
    fs.writeFileSync(
      file,
      '<img src="diagram.png"><img loading="eager" decoding="sync" src="cover.jpg">',
    );
    optimizeOutput(dir);
    const html = fs.readFileSync(file, "utf8");
    assert.ok(
      html.includes('<img loading="lazy" decoding="async" src="diagram.png">'),
    );
    assert.ok(
      html.includes('<img loading="eager" decoding="sync" src="cover.jpg">'),
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
test("KaTeX uses local versioned assets and removes unused external preconnections", () => {
  const dir = fs.mkdtempSync(
    path.join(os.tmpdir(), "bitshelf-local-assets-test-"),
  );
  try {
    fs.mkdirSync(path.join(dir, "notes"));
    const file = path.join(dir, "notes/note.html");
    fs.writeFileSync(
      file,
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"><script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js"></script>',
    );
    optimizeOutput(dir, { katexPath: "static/katex-0.16.47" });
    const html = fs.readFileSync(file, "utf8");
    assert.ok(!html.includes("https://"));
    assert.ok(html.includes("../static/katex-0.16.47/katex.min.css"));
    assert.ok(html.includes("../static/katex-0.16.47/contrib/copy-tex.min.js"));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
test("entry assets use content hashes so deployments cannot retain old CSS and scripts", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-assets-test-"));
  try {
    fs.mkdirSync(path.join(dir, "notes"));
    fs.writeFileSync(path.join(dir, "index.css"), "body{color:red}");
    fs.writeFileSync(path.join(dir, "postscript.js"), "console.log('new')");
    fs.writeFileSync(
      path.join(dir, "notes/note.html"),
      '<link href="../index.css" rel="stylesheet"><script src="../postscript.js"></script><script src="https://example.com/postscript.js"></script>',
    );
    optimizeOutput(dir);
    const file = path.join(dir, "notes/note.html");
    const html = fs.readFileSync(file, "utf8");
    assert.match(html, /href="\.\.\/index-[a-f0-9]{20}\.css"/);
    assert.match(html, /src="\.\.\/postscript-[a-f0-9]{20}\.js"/);
    assert.ok(html.includes('src="https://example.com/postscript.js"'));
    optimizeOutput(dir);
    assert.equal(fs.readFileSync(file, "utf8"), html);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
test("large shared CSS is deduplicated with correct nested links, without moving relative URLs", () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-css-test-"));
  try {
    const css = ".theme{color:red}".repeat(100);
    fs.mkdirSync(path.join(fixture, "notes"));
    const html = `<style data-persist="true">${css}</style><style>${".relative{background:url(../image.png)}".repeat(60)}</style>`;
    fs.writeFileSync(path.join(fixture, "index.html"), html);
    fs.writeFileSync(path.join(fixture, "notes/note.html"), html);
    optimizeOutput(fixture);
    assert.equal(fs.readdirSync(path.join(fixture, "static")).length, 1);
    assert.match(
      fs.readFileSync(path.join(fixture, "index.html"), "utf8"),
      /href="static\/site-css-/,
    );
    const nested = fs.readFileSync(
      path.join(fixture, "notes/note.html"),
      "utf8",
    );
    assert.match(nested, /href="\.\.\/static\/site-css-/);
    assert.match(nested, /data-persist="true"/);
    assert.match(nested, /<style>\.relative/);
    optimizeOutput(fixture);
    assert.equal(
      fs.readFileSync(path.join(fixture, "notes/note.html"), "utf8"),
      nested,
    );
  } finally {
    const resolved = fs.realpathSync(fixture);
    assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});
