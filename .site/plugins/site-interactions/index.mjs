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
    externalResources: (ctx) => ({
      css: [{ content: resizeCss, inline: true }],
      js: [
        {
          contentType: "inline",
          // Publish the configured site path before navigation plugins initialize.
          script: `;(() => { const basePath = ${JSON.stringify(new URL(`https://${ctx.cfg.configuration.baseUrl}`).pathname.replace(/\/$/, ""))}; const apply = () => { document.body.dataset.basepath = basePath }; apply(); document.addEventListener("nav", apply); })();`,
          loadTime: "afterDOMReady",
          spaPreserve: true,
        },
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
