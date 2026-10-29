# 与上游 Quartz 解耦：vendor 管理与升级指南

`.site` 是 **vendored（内置）** 的 Quartz v5 仓库：`quartz/` 目录是上游源码的拷贝，
构建时不需要外部 Quartz。为了让以后升级上游 Quartz 尽量省事，这里把「上游文件」
与「本站定制」明确分开，并提供同步/对账脚本。

> 一键检查当前是否漂移：`node scripts/check-quartz-vendor.mjs --verbose`
> 一键升级上游：`node scripts/sync-quartz.mjs`（详见下文）

## 当前审计结论（对上游 `v5` 的一次完整对比）

对比基线：`jackyzha0/quartz` `v5` 分支（pin 在 `vendor/quartz-upstream.json`）。

| 分类 | 数量/说明 |
| --- | --- |
| 上游文件（vendored） | 151 个，其中 `quartz/**` 143 个 + 根目录 8 个（`tsconfig.json`、`quartz.ts`、`globals.d.ts`、`index.d.ts`、`LICENSE.txt`、`.gitattributes`、`.node-version`、`.npmrc`）；要求在磁盘上与上游逐字节一致 |
| 允许覆盖（override） | 2 个：`quartz/styles/custom.scss`（整站 Obsidian 风格主题，约 3000 行）、`quartz/static/icon.png`（favicon）；升级时保留本站版本，只在上游也改动时提示人工合并 |
| 核心补丁（patched） | 2 个：`quartz/plugins/pageTypes/dispatcher.ts`、`quartz/plugins/vfile.ts`（见下方补丁清单）；由 `vendor/core-patches.mjs` 描述、`scripts/patch-core.mjs` 应用 |
| 本站自有文件（site-owned） | `quartz.config.yaml`、`homepage.md`、`package.json`（上游 + 叠加字段）、`package-lock.json`、`.gitignore`、`.nvmrc`、`README.md`、`edgeone.json`、`platform/`、`scripts/`、`vendor/`；升级时完全不动 |
| 未 vendored 的上游文件 | 145 个：`docs/`（128）、`.github/`（11）、`CODE_OF_CONDUCT.md`、`content/`、`Dockerfile`、`quartz.config.default.yaml`、`.prettierrc`、`.prettierignore`；站点构建不需要这些文件 |

除了上面两个核心补丁文件，`quartz/` 里**没有其它手工改动**：这是能随时用上游覆盖的前提。

### 两个核心补丁在做什么

1. **生成页扩展名**：`PageTypeDispatcher` 给生成页拼接 `slug + ".md"`，导致 Canvas/Excalidraw
   生成页的 relativePath 变成 `xxx.excalidraw.md` / `xxx.canvas.md`；补丁让它们保留原扩展名。
2. **生成页标记**：给所有生成页（folder index / tag / canvas / base / excalidraw）的
   `vfile.data` 和 frontmatter 打上 `virtual: true`，并同步扩展 `QuartzPluginData` 类型。
   这样 Bases 数据库视图可以用 `note.virtual == true` 过滤掉它们，真实文件列表不被污染。

这两处都足够通用，**建议向上游提 PR**（`upstreamCandidate` 字段已写在 `vendor/core-patches.mjs`）；
上游合并后即可删除对应补丁。

## 第三方插件补丁（与核心分离）

`@quartz-community/*` 插件是 npm 安装的，不在 `quartz/` 源码里，升级 Quartz 核心不需要动它们。
但 Bases / Explorer / Excalidraw / Canvas 插件的上游行为不满足本站需求，由
`scripts/patch-plugins.mjs` 在每次 `npm install` 之后对 `node_modules` 打幂等补丁：

| 插件 | 补丁 |
| --- | --- |
| `@quartz-community/bases-page` | 虚拟页不进入 fileLookup；排序缺失值置底、Date 按时间戳比较；`kanban` 视图别名；日期格式化为 `YYYY-MM-DD HH:mm`（UTC+8）；暴露 `file.size`；`not` 过滤器按 Obsidian 语义（任一匹配即排除）；补 zh-CN/zh-TW 文案 |
| `@quartz-community/explorer` | 打开页面时只滚动文件树、不滚动窗口；注入左侧栏收起/抽屉 + 右上角快捷栏 + 生成页「返回」按钮等站点交互脚本（`scripts/explorer-sidebar-toggle.js`） |
| `@quartz-community/obsidian-plugin-excalidraw` | 给生成的 Excalidraw 虚拟页补源文件 mtime（Bases 排序/展示用） |
| `@quartz-community/canvas-page` | 给生成的 Canvas 虚拟页补源文件 mtime |

维护约定：
- 补丁脚本幂等；目标代码找不到或出现多次会**让构建失败**，不会静默产出错误站点；
- 升级插件（`npm update @quartz-community/...`）后先跑 `node scripts/patch-plugins.mjs --check`，
  失败则按报错更新 `scripts/patch-plugins.mjs` 中的 find/replace；
- 长期方向：把这些修复逐个提交到对应上游插件仓库，减少本地补丁。

## 升级上游 Quartz 的流程

### 方式 A：锁定分支/标签（日常小版本升级，推荐）

```bash
cd .site
node scripts/sync-quartz.mjs --branch v5 --dry-run   # 先看会改动哪些文件
node scripts/sync-quartz.mjs --branch v5             # 复制上游 + 重打核心补丁 + 重写 manifest
git diff -- .site                                    # 审查：package.json、补丁、覆盖文件警告
npm install                                          # 上游依赖变化时更新 lockfile
node scripts/patch-plugins.mjs                       # 插件补丁（npm install 后必跑）
bash scripts/build.sh                                # 本地构建验证（CI 也会跑 check + 构建）
```

### 方式 B：指定提交（离线 / 可复现升级）

先本地克隆上游，然后用 `--from`：

```bash
git clone --depth 1 --branch v5 https://github.com/jackyzha0/quartz.git /tmp/quartz-upstream
node scripts/sync-quartz.mjs --from /tmp/quartz-upstream
```

`--dry-run` 只看计划，`--keep` 保留临时 clone，`--install` 同步后自动 `npm install`，
`--skip-verify` 跳过对账（不建议）。

### 同步脚本会做什么

1. 拉取上游（本地目录或临时 clone），收集要 vendored 的文件清单；
2. 复制上游文件到 `.site`，**允许覆盖文件保留本站版本**（若上游也改了，会打印人工合并警告）；
3. 删除上游已移除、且本地未改动过的文件（本地改过的会保留并警告）；
4. 用 `vendor/core-patches.mjs` 重新打核心补丁（失败即中止并提示更新补丁）；
5. 用上游 `package.json` + `vendor/quartz-upstream.json#packageJsonOverlay` 重建 `package.json`；
6. 重新生成 `vendor/quartz-manifest.json`（每个上游文件的期望哈希）并更新 pin。

### 升级后一定要检查

- `git diff .site`：
  - `quartz/**` 只应出现「上游变化 + 两个补丁文件」；
  - `package.json` 只应有上游字段变化（叠加字段由脚本维护）；
  - `quartz/styles/custom.scss`、`icon.png` 不应被改动（本站覆盖文件）；
- `node scripts/check-quartz-vendor.mjs --verbose` 通过；
- `bash scripts/build.sh` 构建成功（CI 的 build 步骤已包含对账，不一致会直接失败）。

## 回滚

- 升级同步本身不提交：`git checkout -- .site` 可丢弃未提交的同步结果；
- 已提交的升级回滚：`git revert`/`git reset` 相应提交即可；
- `vendor/quartz-manifest.json` 是纯数据文件，还原它和 `quartz/` 即可回到旧基线。

## 文件索引

| 文件 | 作用 |
| --- | --- |
| `vendor/quartz-upstream.json` | 上游仓库/分支 pin、vendored 清单、允许覆盖清单、package.json 叠加字段 |
| `vendor/quartz-manifest.json` | 由同步脚本生成：核心文件的期望哈希与分类（不要手改） |
| `vendor/core-patches.mjs` | 核心补丁定义（find/replace/marker + 上游 PR 候选说明） |
| `vendor/patch-utils.mjs` | 幂等补丁引擎（核心补丁与插件补丁共用） |
| `scripts/patch-core.mjs` | 应用/检查核心补丁 |
| `scripts/sync-quartz.mjs` | 从上游同步核心、重建 manifest |
| `scripts/check-quartz-vendor.mjs` | 对账核心文件与上游基线（CI/构建时执行） |
| `scripts/patch-plugins.mjs` | 对 npm 安装的第三方 Quartz 插件打补丁 |
| `scripts/explorer-sidebar-toggle.js` | 注入 explorer 的站点交互脚本（左侧栏/快捷栏/返回键） |
