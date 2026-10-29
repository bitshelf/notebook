import fs from "node:fs";
import path from "node:path";
import * as pagefind from "pagefind";

export function searchRecord(slug, entry) {
  return {
    url: "/" + slug.replace(/\/index$/, "/"),
    // Search exactly the published content, plus useful title/path/tag terms.
    content: [
      entry.title,
      entry.content,
      slug,
      slug.replace(/[-_/]/g, " "),
      ...(entry.tags || []),
    ].join("\n"),
    language: "zh",
    meta: {
      title: entry.title || slug,
      path: slug,
      tags: JSON.stringify(entry.tags || []),
    },
    filters: { tags: entry.tags || [] },
  };
}

export async function buildSearchIndex(output) {
  const data = JSON.parse(
    fs.readFileSync(path.join(output, "static/contentIndex.json"), "utf8"),
  );
  const { index, errors } = await pagefind.createIndex({ forceLanguage: "zh" });
  if (errors?.length || !index)
    throw new Error(`Pagefind initialization failed: ${errors}`);
  try {
    for (const [slug, entry] of Object.entries(data)) {
      const result = await index.addCustomRecord(searchRecord(slug, entry));
      if (result.errors?.length)
        throw new Error(`Pagefind failed for ${slug}: ${result.errors}`);
    }
    const result = await index.getFiles();
    if (result.errors?.length)
      throw new Error(`Pagefind output failed: ${result.errors}`);
    // Node owns filesystem writes on every platform; the native indexer returns bytes.
    const destination = path.resolve(output, "pagefind");
    for (const file of result.files) {
      const target = path.resolve(destination, file.path);
      if (!target.startsWith(destination + path.sep))
        throw new Error("Invalid search artifact path");
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, file.content);
    }
    fs.writeFileSync(path.join(destination, "files.json"), JSON.stringify(
      Object.entries(data).map(([slug, entry]) => ({path:slug,title:entry.title || slug.split("/").pop()}))
    ));
    console.log(
      `Pagefind: indexed ${Object.keys(data).length} published pages (Chinese segmentation + Wasm)`,
    );
  } finally {
    await index.deleteIndex();
    await pagefind.close();
  }
}
