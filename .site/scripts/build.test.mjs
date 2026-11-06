import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { build as bundle } from "esbuild";
import {
  resolveOutput,
  copyContent,
  copyCommittedContent,
  build,
} from "./build.mjs";

test("publication excludes untracked and staged notes and reads committed note contents", async () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-test-"));
  try {
    const repo = path.join(fixture, "repo"),
      output = path.join(fixture, "output");
    fs.mkdirSync(repo);
    const git = (...args) =>
      execFileSync("git", args, { cwd: repo, stdio: "pipe" });
    git("init");
    fs.writeFileSync(path.join(repo, "中文笔记.md"), "committed content");
    git("add", "中文笔记.md");
    git(
      "-c",
      "user.name=Site Test",
      "-c",
      "user.email=site@example.invalid",
      "commit",
      "-m",
      "fixture",
    );
    fs.writeFileSync(
      path.join(repo, "中文笔记.md"),
      "private unpublished changes",
    );
    fs.writeFileSync(path.join(repo, "staged.md"), "private staged note");
    git("add", "staged.md");
    fs.writeFileSync(path.join(repo, "untracked.md"), "private draft");
    await copyCommittedContent(repo, output);
    assert.deepEqual(fs.readdirSync(output), ["中文笔记.md"]);
    assert.equal(
      fs.readFileSync(path.join(output, "中文笔记.md"), "utf8"),
      "committed content",
    );
  } finally {
    const resolved = fs.realpathSync(fixture);
    assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});

test("output deletion is restricted to owned directories", () => {
  for (const value of ["..", ".", "/", "quartz", "public/..", ".dsh-tmp"])
    assert.throws(() => resolveOutput(value));
  assert.match(resolveOutput(), /public$/);
  assert.match(resolveOutput(".dsh-tmp/smoke"), /smoke$/);
});
test("content overrides are rejected before installation or writes", async () => {
  const previous = process.env.QUARTZ_CONTENT_DIR;
  process.env.QUARTZ_CONTENT_DIR = ".";
  try {
    await assert.rejects(build, /no longer supported/);
  } finally {
    if (previous === undefined) delete process.env.QUARTZ_CONTENT_DIR;
    else process.env.QUARTZ_CONTENT_DIR = previous;
  }
});
test("content copy excludes tooling, binaries and symlinks", () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-test-"));
  try {
    const source = path.join(fixture, "source"),
      output = path.join(fixture, "output");
    fs.mkdirSync(path.join(source, ".site"), { recursive: true });
    fs.writeFileSync(path.join(source, "note.md"), "note");
    fs.writeFileSync(path.join(source, "archive.zip"), "binary");
    fs.writeFileSync(path.join(source, ".site", "internal.md"), "internal");
    fs.symlinkSync(
      source,
      path.join(source, "loop"),
      process.platform === "win32" ? "junction" : "dir",
    );
    copyContent(source, output);
    assert.deepEqual(fs.readdirSync(output), ["note.md"]);
    fs.symlinkSync(
      output,
      path.join(source, "public"),
      process.platform === "win32" ? "junction" : "dir",
    );
    assert.throws(() => resolveOutput("public", source), /symlink/);
  } finally {
    const resolved = fs.realpathSync(fixture);
    assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});

test("invalid plugin factories fail the build instead of being skipped", async () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-test-"));
  try {
    const plugin = path.join(fixture, "broken");
    fs.mkdirSync(plugin);
    fs.writeFileSync(
      path.join(plugin, "package.json"),
      JSON.stringify({
        name: "broken",
        type: "module",
        main: "index.mjs",
        quartz: { name: "broken", category: "transformer", version: "1.0.0" },
      }),
    );
    fs.writeFileSync(
      path.join(plugin, "index.mjs"),
      "export default () => ({name:'Broken'})",
    );
    fs.writeFileSync(
      path.join(fixture, "quartz.config.yaml"),
      'configuration: {}\nplugins:\n  - source: "./broken"\n    enabled: true\n',
    );
    const loader = new URL("../site-config.ts", import.meta.url);
    const scratch = new URL("../.dsh-tmp/", import.meta.url);
    fs.mkdirSync(scratch, { recursive: true });
    const bundled = new URL("check-loader.mjs", scratch);
    await bundle({
      entryPoints: [fileURLToPath(loader)],
      outfile: fileURLToPath(bundled),
      bundle: true,
      platform: "node",
      format: "esm",
      packages: "external",
      loader: { ".scss": "text", ".css": "text" },
      plugins: [
        {
          name: "inline-scripts",
          setup(build) {
            build.onLoad({ filter: /\.inline\.(ts|js)$/ }, (args) => ({
              contents: fs.readFileSync(args.path, "utf8"),
              loader: "text",
            }));
          },
        },
      ],
    });
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `const {loadSiteConfig}=await import(${JSON.stringify(bundled.href)});await loadSiteConfig()`,
      ],
      { cwd: fixture, encoding: "utf8" },
    );
    assert.notEqual(result.status, 0);
    assert.match(
      result.stderr,
      /Site plugin configuration failed|no factory function/,
    );
  } finally {
    const resolved = fs.realpathSync(fixture);
    assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});
