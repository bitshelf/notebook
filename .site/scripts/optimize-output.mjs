import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export function optimizeOutput(root, { katexPath } = {}) {
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
  const versioned = new Map();
  for (const name of ["index.css", "prescript.js", "postscript.js"]) {
    const source = path.join(root, name);
    if (!fs.existsSync(source)) continue;
    const bytes = fs.readFileSync(source);
    const hash = crypto
      .createHash("sha256")
      .update(bytes)
      .digest("hex")
      .slice(0, 20);
    const extension = path.extname(name);
    const target = `${path.basename(name, extension)}-${hash}${extension}`;
    fs.writeFileSync(path.join(root, target), bytes);
    versioned.set(name, target);
  }
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
    html = html.replace(/<img\b[^>]*>/gi, (tag) => {
      const loading = /\bloading\s*=/i.test(tag) ? "" : ' loading="lazy"';
      const decoding = /\bdecoding\s*=/i.test(tag) ? "" : ' decoding="async"';
      return tag.replace(/^<img\b/i, "<img" + loading + decoding);
    });
    if (katexPath) {
      html = html.replace(
        /https:\/\/cdn\.jsdelivr\.net\/npm\/katex@[^/"\s]+\/dist\/(katex\.min\.css|contrib\/copy-tex\.min\.js)/g,
        (_, asset) =>
          path
            .relative(path.dirname(file), path.join(root, katexPath, asset))
            .split(path.sep)
            .join("/"),
      );
      html = html.replace(
        /<link\b(?=[^>]*\brel=["'](?:preconnect|dns-prefetch)["'])(?=[^>]*\bhref=["']https:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)["'])[^>]*>/gi,
        "",
      );
    }
    html = html.replace(
      /(<(?:link|script)\b[^>]*?\b(?:href|src)=["'])([^"']*)(["'])/gi,
      (tag, prefix, url, quote) => {
        if (/^(?:[a-z]+:|\/\/)/i.test(url)) return tag;
        const name = url.split("/").at(-1);
        return versioned.has(name)
          ? prefix + url.slice(0, -name.length) + versioned.get(name) + quote
          : tag;
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
