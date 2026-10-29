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

// Publication reads HEAD, never the working tree or staging area.
// Build environments that distribute sources without a .git directory
// (e.g. Vercel) cannot use git plumbing; there the working tree is the
// committed state, so fall back to a direct copy with the same filters.
export async function copyCommittedContent(repository, destination) {
  if (!fs.existsSync(path.join(repository, ".git"))) {
    console.warn(
      "source: no .git directory, copying the working tree (CI checkout)",
    );
    copyContent(repository, destination);
    return { archiveBytes: 0 };
  }
  const snapshot = fs.mkdtempSync(path.join(os.tmpdir(), "bitshelf-source-"));
  try {
    // Select root entries before archive creation. In particular, never expand
    // excluded attachment directories or gitlinks such as the large pdf vault.
    const tree = execFileSync("git", ["ls-tree", "-z", "HEAD"], {
      cwd: repository,
      encoding: "utf8",
    });
    const sources = tree
      .split("\0")
      .filter(Boolean)
      .flatMap((entry) => {
        const separator = entry.indexOf("\t");
        const type = entry.slice(0, separator).split(" ")[1];
        const name = entry.slice(separator + 1);
        if (excluded.has(name) || type === "commit") return [];
        return type === "tree" ||
          extensions.has(path.extname(name).toLowerCase())
          ? [name]
          : [];
      });
    if (!sources.length) return { archiveBytes: 0 };
    const archive = path.join(snapshot, "snapshot.tar");
    let started = performance.now();
    execFileSync(
      "git",
      [
        "archive",
        "--format=tar",
        `--output=${archive}`,
        "HEAD",
        "--",
        ...sources,
      ],
      {
        cwd: repository,
        stdio: "pipe",
      },
    );
    const archiveBytes = fs.statSync(archive).size;
    console.log(
      `source: archive ${(performance.now() - started).toFixed(0)}ms, ${(archiveBytes / 1048576).toFixed(1)} MiB`,
    );
    const tar = await import("tar");
    started = performance.now();
    tar.x({ file: archive, cwd: snapshot, sync: true });
    console.log(
      `source: extract ${(performance.now() - started).toFixed(0)}ms`,
    );
    started = performance.now();
    copyContent(snapshot, destination);
    console.log(`source: copy ${(performance.now() - started).toFixed(0)}ms`);
    return { archiveBytes };
  } finally {
    const resolved = fs.realpathSync(snapshot);
    if (
      path.dirname(resolved) !== fs.realpathSync(os.tmpdir()) ||
      !path.basename(resolved).startsWith("bitshelf-source-")
    )
      throw new Error("Unexpected source snapshot directory");
    const started = performance.now();
    fs.rmSync(resolved, { recursive: true, force: true });
    console.log(
      `source: cleanup ${(performance.now() - started).toFixed(0)}ms`,
    );
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
    await copyCommittedContent(repoRoot, content);
    fs.copyFileSync(
      path.join(siteRoot, "homepage.md"),
      path.join(content, "index.md"),
    );
    run("scripts/restore-dates.mjs", [repoRoot, content]);
    run("scripts/normalize-content.mjs", [content]);
    run("quartz/bootstrap-cli.mjs", ["build", "-d", content, "-o", output]);
    const katexPackage = fileURLToPath(
      import.meta.resolve("katex/package.json"),
    );
    const katexRoot = path.dirname(katexPackage);
    const katexVersion = JSON.parse(
      fs.readFileSync(katexPackage, "utf8"),
    ).version;
    const katexPath = `static/katex-${katexVersion}`;
    const katexOutput = path.join(output, katexPath);
    fs.mkdirSync(path.join(katexOutput, "contrib"), { recursive: true });
    for (const asset of ["katex.min.css", "contrib/copy-tex.min.js"]) {
      fs.copyFileSync(
        path.join(katexRoot, "dist", asset),
        path.join(katexOutput, asset),
      );
    }
    fs.cpSync(
      path.join(katexRoot, "dist/fonts"),
      path.join(katexOutput, "fonts"),
      { recursive: true },
    );
    fs.copyFileSync(
      path.join(katexRoot, "LICENSE"),
      path.join(katexOutput, "LICENSE"),
    );
    optimizeOutput(output, { katexPath });
    fs.copyFileSync(
      fileURLToPath(import.meta.resolve("pele")),
      path.join(output, "static/pele.js"),
    );
    fs.copyFileSync(
      fileURLToPath(new URL("../LICENSE", import.meta.resolve("pele"))),
      path.join(output, "static/pele.LICENSE"),
    );
    // npm ci above must complete before loading dependencies added by the site.
    const { buildSearchIndex } = await import("./search-index.mjs");
    await buildSearchIndex(output);
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
