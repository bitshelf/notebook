import { optimizeOutput } from "./optimize-output.mjs";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const siteRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const repoRoot = path.dirname(siteRoot);

// Quartz clears its output directory. Restrict that operation to owned outputs,
// checking existing ancestors as well so symlinks cannot escape the boundary.
export function resolveOutput(value = "public", root = siteRoot) {
  const output = path.resolve(root, value);
  const relative = path.relative(root, output);
  const parts = relative.split(path.sep);
  if (!(
    relative === "public" ||
    (parts[0] === ".dsh-tmp" && parts.length > 1)
  )) {
    throw new Error("Output must be .site/public or a child of .site/.dsh-tmp");
  }
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) {
      throw new Error(`Output cannot contain a symlink: ${current}`);
    }
  }
  return output;
}

const excluded = new Set([
  ".site",
  ".git",
  ".github",
  ".obsidian",
  ".agent",
  ".vaultexplorer",
  ".trash",
  ".smart-env",
  ".dsh-tmp",
  "node_modules",
  "pdf",
]);
const extensions = new Set([
  ".md",
  ".canvas",
  ".base",
  ".excalidraw",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".bmp",
  ".ico",
  ".avif",
]);
export function copyContent(source, destination, relative = "") {
  for (const entry of fs.readdirSync(path.join(source, relative), {
    withFileTypes: true,
  })) {
    const rel = path.join(relative, entry.name);
    if (
      (!relative && excluded.has(entry.name)) ||
      rel.split(path.sep).join("/") === "Tools/Obsidian/Excalidraw"
    )
      continue;
    if (entry.isDirectory()) copyContent(source, destination, rel);
    else if (entry.isFile() && extensions.has(path.extname(entry.name))) {
      const target = path.join(destination, rel);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(source, rel), target);
    }
  }
}

function run(script, args = []) {
  execFileSync(process.execPath, [path.join(siteRoot, script), ...args], {
    cwd: siteRoot,
    stdio: "inherit",
  });
}

export async function build() {
  const output = resolveOutput(process.env.QUARTZ_OUTPUT_DIR);
  if (process.env.QUARTZ_CONTENT_DIR)
    throw new Error(
      "QUARTZ_CONTENT_DIR is no longer supported; content uses a private temporary directory",
    );
  if (
    process.env.SITE_URL &&
    !["http:", "https:"].includes(new URL(process.env.SITE_URL).protocol)
  )
    throw new Error("SITE_URL must be an HTTP(S) URL");
  if (process.env.SKIP_INSTALL !== "1") {
    // npm's JS entry point works on Windows without shell quoting or npm.cmd.
    if (!process.env.npm_execpath)
      throw new Error("Run npm run build, or set SKIP_INSTALL=1 after npm ci");
    execFileSync(
      process.execPath,
      [process.env.npm_execpath, "ci", "--no-audit", "--no-fund"],
      { cwd: siteRoot, stdio: "inherit" },
    );
  }
  run("scripts/check-quartz-vendor.mjs");
  execFileSync(
    process.execPath,
    ["--import", "tsx", path.join(siteRoot, "scripts/prepare-plugins.mjs")],
    { cwd: siteRoot, stdio: "inherit" },
  );
  run("scripts/patch-plugins.mjs");
  const content = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-content-"));
  try {
    copyContent(repoRoot, content);
    fs.copyFileSync(
      path.join(siteRoot, "homepage.md"),
      path.join(content, "index.md"),
    );
    run("scripts/restore-dates.mjs", [repoRoot, content]);
    run("scripts/normalize-content.mjs", [content]);
    run("quartz/bootstrap-cli.mjs", ["build", "-d", content, "-o", output]);
    optimizeOutput(output);
    fs.copyFileSync(
      path.join(siteRoot, "platform/_headers"),
      path.join(output, "_headers"),
    );
  } finally {
    const resolved = fs.realpathSync(content);
    if (
      path.dirname(resolved) !== fs.realpathSync(os.tmpdir()) ||
      !path.basename(resolved).startsWith("bitshelf-content-")
    )
      throw new Error("Unexpected temporary directory");
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await build();
