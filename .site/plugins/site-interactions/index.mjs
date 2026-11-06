import fs from "node:fs";
const script = fs.readFileSync(
  new URL("./sidebar.js", import.meta.url),
  "utf8",
);
export default function SiteInteractions() {
  return {
    name: "SiteInteractions",
    markdownPlugins: () => [],
    externalResources: () => ({
      js: [
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
