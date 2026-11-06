import fs from "node:fs";
const script = fs.readFileSync(
  new URL("./sidebar.js", import.meta.url),
  "utf8",
);
const resizeScript = fs.readFileSync(
  new URL("./table-resize.js", import.meta.url),
  "utf8",
);
const resizeCss = fs.readFileSync(
  new URL("./table-resize.css", import.meta.url),
  "utf8",
);
export default function SiteInteractions() {
  return {
    name: "SiteInteractions",
    markdownPlugins: () => [],
    externalResources: () => ({
      css: [{ content: resizeCss, inline: true }],
      js: [
        {
          contentType: "inline",
          script: resizeScript,
          loadTime: "afterDOMReady",
          spaPreserve: true,
        },
        {
          contentType: "inline",
          script,
          loadTime: "afterDOMReady",
          spaPreserve: true,
        },
      ],
    }),
  };
}
