import fs from "node:fs";
import { Search as QuartzSearch } from "@quartz-community/search/components";

// Reuse the public Quartz component and theme hooks; replace only its engine.
export function Search(options = {}) {
  const component = QuartzSearch(options);
  component.afterDOMLoaded = fs.readFileSync(
    new URL("./search.js", import.meta.url),
    "utf8",
  );
  return component;
}
