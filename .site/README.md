# .site

BitShelf Notebook 的 Quartz 5 站点配置。笔记本体在仓库根目录，这里只放构建所需的配置和脚本。

- 线上地址（GitHub Pages）：<https://bitshelf.github.io/notebook/>
- 同一套构建脚本可以部署到 **GitHub Pages / Cloudflare Pages / EdgeOne Pages**，见下文「部署」

## 支持的内容

- **Obsidian Bases（数据库）**：` ```base ` 代码块与 `.base` 文件，支持 table / list / cards / board(kanban) 视图、filters、formulas、sort、groupBy
- **Canvas 白板**：`.canvas`（JSON Canvas）页面，支持文本/文件/链接/分组节点、连线和缩放平移
- **Excalidraw 绘图**：`.excalidraw.md` 与 `.excalidraw`，服务端渲染为可缩放 SVG，笔记中的 `![[drawing.excalidraw]]` 内嵌也会展开
- **全文搜索**：CJK 友好（中文按字切分），`Ctrl/Cmd + K` 打开
- 其余：`[[wikilink]]`、callout、标签、属性、LaTeX、Mermaid、代码高亮、关系图谱、反向链接、阅读模式、亮/暗色

## 构建规则

- 不改动、不删除仓库里的任何笔记或附件
- 构建时只把 Markdown、图片、`.canvas` / `.base` / `.excalidraw` 复制到临时目录
- zip / exe / apk / pdf 等附件保留在仓库，但不会发布到网页
- 从 git 历史恢复每个文件的最后修改时间，保证 Bases「最近更新」等视图有意义

本地构建（Node 22+，需要 git）：

```bash
npm --prefix .site run build            # 输出 .site/public
SITE_URL=https://example.com npm --prefix .site run build   # 覆盖 canonical URL
cd .site && npx quartz build --serve     # 本地预览 http://localhost:8080
```

脚本顺序：`npm ci` → 插件补丁 → 独享临时目录复制内容 → 恢复日期与规范化内容 → 构建 → 复制平台配置。`SITE_URL` 在运行时覆盖配置，不改写源码文件。

## 部署（三平台）

三套部署互不冲突，可任选其一或同时启用。构建入口都是：

| 配置项 | 值 |
| --- | --- |
| 根目录 / Root directory | `.site` |
| 安装命令 / Install command | `npm ci`（`build.sh` 内也会执行，可留空） |
| 构建命令 / Build command | `npm run build` |
| 输出目录 / Output directory | `public` |
| Node.js | 22.21.1（`.site/.nvmrc`；GitHub Actions 用 24） |

每个平台的 `SITE_URL` 必须换成该平台的最终域名（写进 `baseUrl`，用于 sitemap/RSS/404 绝对路径等）：

| 平台 | SITE_URL 示例 |
| --- | --- |
| GitHub Pages | `https://bitshelf.github.io/notebook` |
| Cloudflare Pages | `https://bitshelf-notebook.pages.dev` |
| EdgeOne Pages | `https://bitshelf-notebook.edgeone.app` |

### GitHub Pages（主站，已启用）

- `.github/workflows/deploy-site.yml`：push 到 `main` 自动构建部署，另有每天 UTC 18:00（北京时间 02:00）定时重建
- 仓库 Settings → Pages → Source 选 **GitHub Actions**
- workflow 会自动把 `SITE_URL` 设为 `https://<owner>.github.io/<repo>`

### Cloudflare Pages

**方式 A：Git 集成（推荐，零 secrets）**

1. 控制台 <https://dash.cloudflare.com/?to=/:account/workers-and-pages> → Create application → Pages → Connect to Git → 选本仓库
2. 构建配置：Root directory `.site`、Build command `npm run build`、Build output `public`
3. 环境变量：`NODE_VERSION=22`、`SITE_URL=https://<项目名>.pages.dev`
4. 保存并部署；自定义域名在项目 → Custom domains 添加

**方式 B：GitHub Actions**

1. 仓库 Settings → Secrets and variables → Actions 添加 secrets：
   - `CLOUDFLARE_API_TOKEN`（API token，权限：Cloudflare Pages: Edit）
   - `CLOUDFLARE_ACCOUNT_ID`
2. 可选 variables：`CLOUDFLARE_PAGES_PROJECT`（默认 `bitshelf-notebook`）、`CLOUDFLARE_SITE_URL`（默认 `https://bitshelf-notebook.pages.dev`）
3. `.github/workflows/deploy-cloudflare-pages.yml` 会自动构建并 `wrangler pages deploy`；未配置 secrets 时该 workflow 直接跳过（不会失败）

说明：`platform/_headers` 会被复制到 `public/_headers`，由 Cloudflare Pages 应用安全响应头与 `/static/*` 缓存策略。Cloudflare Pages 限制单文件 ≤25 MiB（本方案不发布大附件，正常不会触发）。

### EdgeOne Pages

**方式 A：Git 集成（推荐，零 secrets）**

1. 控制台：国内 <https://console.cloud.tencent.com/edgeone> / 国际 <https://console.tencentcloud.com/edgeone> → Pages → 创建项目 → 导入 Git 仓库
2. 生产分支选择 `main`，框架选择 Other / 自定义，项目根目录填 **`.site`**；配置文件为 `.site/edgeone.json`。
3. 确认安装命令 `npm ci --no-audit --no-fund`、构建命令 `SKIP_INSTALL=1 npm run build`、输出目录 `public`、Node `22.21.1`。平台安装一次依赖，构建脚本跳过重复安装。不要用 Node 22.11.0：当前 yargs 依赖要求 22.12 以上。
4. 环境变量：`SITE_URL` 填控制台实际分配的完整 HTTPS 域名或最终自定义域名，不要照抄项目名推测域名。保存后部署；域名变化时更新变量并重新构建。
5. 自定义域名与可用加速区域按控制台要求配置。

推荐只启用一种自动部署入口：使用原生 Git 集成时，不再配置下面的 Actions token，避免同一次推送触发两次部署。

> 说明：`edgeone.json` 不能放进 `.github/` 等其它目录（EdgeOne 不会读取）。如果坚持用仓库根作为项目根，则没有自动配置，需要在控制台手动填：安装命令 `npm --prefix .site ci`、构建命令 `npm --prefix .site run build`、输出目录 `.site/public`、Node 22。

**方式 B：GitHub Actions**

1. 添加 secret：`EDGEONE_API_TOKEN`（EdgeOne Pages → API Token）
2. 可选 variables：`EDGEONE_PROJECT`（默认 `bitshelf-notebook`）、`EDGEONE_SITE_URL`（默认 `https://bitshelf-notebook.edgeone.app`）
3. `.github/workflows/deploy-edgeone-pages.yml` 会执行 `edgeone pages deploy .site/public -n <project> -t <token> -e production`；项目不存在时会自动创建

## 平台相关文件

| 文件 | 用途 |
| --- | --- |
| `.site/edgeone.json` | EdgeOne Pages 项目配置：**只从项目根目录读取**（EdgeOne 项目根目录需设为 `.site`），包含构建命令、输出目录、Node 版本、响应头 |
| `.site/platform/_headers` | Cloudflare Pages 响应头配置；`build.sh` 构建后复制到输出根目录 |
| `.site/.nvmrc` | 平台构建的 Node 版本提示（22） |
| `scripts/build.sh` | 三平台共用构建入口 |
| `scripts/patch-plugins.mjs` | npm 安装后给第三方 Quartz 插件打幂等补丁（失败则构建失败） |
| `scripts/restore-dates.mjs` | 从 git 提交时间恢复文件 mtime（`fetch-depth: 0` 时最准；平台浅克隆时会退化为可用状态） |

## 第三方插件补丁

Quartz 5 的 Bases 插件对"虚拟页"（Quartz 生成的 folder index 页、Canvas/Excalidraw 页）没有区分，会让这些页面混进数据库视图的条目里；`Kanban` 视图类型也需要映射到内置 board 渲染器；另外还修了日期排序/格式化、`file.size`、中文文案和 explorer 打开页面时窗口自动滚动的问题。`scripts/patch-plugins.mjs` 在每次 `npm ci` 之后对 `@quartz-community/bases-page`、`@quartz-community/explorer` 打幂等补丁（补丁目标不存在时构建直接失败，避免静默回归）。

## 官方 Quartz 升级与本站扩展

Quartz 核心跟随官方最新稳定标签，源码与本站配置、插件隔离。维护边界、升级流程和验证方式见 [MAINTENANCE.md](MAINTENANCE.md)。

## 已知限制

- zip / exe / apk / rar / tgz / pdf 等附件不发布到站点；构建时自动将附件链接和嵌入转换为 GitHub 文件链接。未跟踪或无法唯一定位的附件转到仓库搜索页
- 更新时间来自 git 提交时间；同一次提交的大量文件时间相同，Bases「最近更新」里大量并列属于正常现象。Cloudflare/EdgeOne 的 Git 集成构建通常是浅克隆，能取到的提交历史更少，时间精度会进一步下降（只影响排序展示，不影响内容）
- 中文字体/Excalidraw 手写字体走 Google Fonts / unpkg CDN，访问受限时会回退系统字体，不影响功能
- 三平台同时部署时，请确认每边自定义域名后同步修改对应的 `SITE_URL`，否则绝对 URL（RSS/sitemap/404）会指向别的域名
- Cloudflare Pages 限制单文件 ≤25 MiB、20,000 个文件；EdgeOne Pages 国内版绑定自定义域名需要 ICP 备案


## Cloudflare Workers 静态资源部署

`wrangler.jsonc` 对应现有 Worker `notebook`，公开域名为 `https://notebook.ljzyx86.workers.dev`。
本地先登录官方 Wrangler，再设置 `SITE_URL=https://notebook.ljzyx86.workers.dev` 构建，最后运行 `npm run deploy:cloudflare`。
Cloudflare 原生 Git 构建根目录为 `.site`，构建命令为 `npm run build`，部署命令为 `npm run deploy:cloudflare`。
原生 Git 检出失败时可用本地直接部署；这不依赖 Cloudflare 克隆笔记仓库。
构建后将重复的大块内联主题 CSS 提取成带内容哈希的共享文件，以控制 GitHub Pages 发布体积。
Bases 表格默认列宽统一为 45% / 30% / 25%，可独立拖动表头边界调整，自动记忆；双击边界恢复默认。
