import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(process.env.QA_ROOT || "public");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};
http
  .createServer((req, res) => {
    let name;
    try {
      name = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      ).replace(/^\/notebook\/?/, "");
    } catch {
      res.writeHead(400).end();
      return;
    }
    let file = path.resolve(root, name || "index.html");
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";
    if (!fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(Number(process.env.QA_PORT || 8777), "127.0.0.1");
