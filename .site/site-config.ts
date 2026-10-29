import type { FilePath } from "./quartz/util/path"
import {
  loadQuartzConfig,
  loadQuartzLayout,
} from "./quartz/plugins/loader/config-loader"

export async function loadSiteConfig() {
  const diagnostics: string[] = []
  const warn = console.warn,
    error = console.error
  const collect = (...args: unknown[]) => {
    diagnostics.push(args.map(String).join(" "))
  }
  console.warn = (...args) => {
    collect(...args)
    warn(...args)
  }
  console.error = (...args) => {
    collect(...args)
    error(...args)
  }
  let config
  try {
    const baseUrl = process.env.SITE_URL
      ? new URL(process.env.SITE_URL)
          .toString()
          .replace(/^https?:\/\//, "")
          .replace(/\/$/, "")
      : undefined
    config = await loadQuartzConfig(baseUrl ? { baseUrl } : undefined)
  } finally {
    console.warn = warn
    console.error = error
  }
  const failures = diagnostics.filter((message) =>
    /Failed to|Skipping\.|Could not.*plugin/i.test(message),
  )
  if (failures.length)
    throw new Error(`Site plugin configuration failed:\n${failures.join("\n")}`)
  // Adapt generated page metadata through the public configuration interface.
  // Quartz core remains byte-for-byte identical to the official stable release.
  for (const page of config.plugins.pageTypes ?? []) {
    const generate = page.generate
    if (!generate) continue
    page.generate = (...args) =>
      generate(...args).map((vp) => ({
        ...vp,
        data: {
          ...vp.data,
          virtual: true,
          frontmatter: {
            title: vp.title,
            tags: [],
            ...vp.data?.frontmatter,
            virtual: true,
          },
          ...(/\.(canvas|excalidraw)$/.test(vp.slug)
            ? { relativePath: vp.slug as FilePath }
            : {}),
        },
      }))
  }
  return config
}
export { loadQuartzLayout }
