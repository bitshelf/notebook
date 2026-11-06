import fs from "node:fs"
import YAML from "yaml"
import { installPlugins } from "../quartz/plugins/loader/gitLoader.ts"
const config = YAML.parse(fs.readFileSync("quartz.config.yaml", "utf8"))
const sources = [...new Set(config.plugins.map((plugin) => plugin.source))]
const installed = await installPlugins(sources, { verbose: true })
if (installed.size !== sources.length)
  throw new Error(
    `Plugin preparation failed: ${installed.size}/${sources.length}`,
  )
