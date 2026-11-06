import { loadSiteConfig, loadQuartzLayout } from "./site-config"
export default await loadSiteConfig()
export const layout = await loadQuartzLayout()
