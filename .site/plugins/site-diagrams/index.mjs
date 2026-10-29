import fs from "node:fs";
export default function SiteDiagrams() {
  return {
    name: "SiteDiagrams",
    markdownPlugins: () => [],
    externalResources: () => ({
      css: [
        {
          content: fs.readFileSync(
            new URL("./diagrams.css", import.meta.url),
            "utf8",
          ),
          inline: true,
        },
      ],
      js: [
        {
          contentType: "inline",
          script: fs.readFileSync(
            new URL("./diagrams.js", import.meta.url),
            "utf8",
          ),
          loadTime: "afterDOMReady",
          spaPreserve: true,
        },
      ],
    }),
  };
}
