import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { optimizeOutput } from "./optimize-output.mjs";
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
