import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export function optimizeOutput(root) {
  const shared = new Map();
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) files.push(full);
    }
  }
  walk(root);
  let saved = 0;
  for (const file of files.filter((f) => f.endsWith(".html"))) {
    const original = fs.readFileSync(file, "utf8");
    let html = original.replace(
      /<style\b([^>]*)>([\s\S]*?)<\/style>/gi,
      (tag, attributes, css) => {
        if (css.length < 1024) return `<style${attributes}>${css}</style>`;
        // Moving relative URL references would change their resolution base.
        const urls = [
          ...css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/gi),
        ];
        if (
          urls.some(
            (m) =>
              !/^(?:https?:|data:|\/\/)/i.test((m[1] ?? m[2] ?? m[3]).trim()),
          )
        )
          return `<style${attributes}>${css}</style>`;
        const hash = crypto
          .createHash("sha256")
          .update(css)
          .digest("hex")
          .slice(0, 20);
        const target = path.join(root, "static", `site-css-${hash}.css`);
        shared.set(target, css);
        const href = path
          .relative(path.dirname(file), target)
          .split(path.sep)
          .join("/");
        return `<link rel="stylesheet" href="${href}"${attributes}>`;
      },
    );
    if (html !== original) {
      saved += Buffer.byteLength(original) - Buffer.byteLength(html);
      fs.writeFileSync(file, html);
    }
  }
  for (const [file, css] of shared) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, css);
    saved -= Buffer.byteLength(css);
  }
  console.log(
    `Shared ${shared.size} inline stylesheets; saved ${(saved / 1024 ** 2).toFixed(1)} MiB`,
  );
}
