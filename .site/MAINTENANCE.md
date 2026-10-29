# Quartz 官方稳定版与本站定制边界

本站跟随 jackyzha0/quartz 的最新正式版本标签（vX.Y.Z），不把 v5 分支 HEAD 当作稳定发布。
当前版本、提交 pin 见 vendor/quartz-upstream.json；逐文件基线见 vendor/quartz-manifest.json。

## 上游源码

- quartz/ 保持官方标签源码。core-patches.mjs 当前为空；升级时不得直接覆盖未登记的核心修改。
- custom.scss 和 icon.png 是明确登记的站点覆盖文件，修改不触发核心校验；上游改变这些文件时同步脚本提示合并。
- 原官方 CLI 完整保留，包括同步、升级、远程插件管理入口。本站在 .site 子目录中，整库级 git 同步/升级命令会操作笔记仓库，常规 Quartz 核心升级应使用下述本站同步脚本。
- quartz.ts、site-config.ts、plugins/、scripts/ 是本站文件。虚拟页标记、附件 GitHub 链接、侧栏交互和运行时 SITE_URL 覆盖在这里实现。
- v5.0.0 的插件加载器使用本地/Git 路径，因此配置中的 ./node_modules/@quartz-community/... 指向 npm 锁文件安装的插件；prepare-plugins.mjs 准备它们并生成忽略跟踪的索引。第三方插件补丁独立于 Quartz 核心。

## 升级流程

```sh
npm run sync:quartz -- --dry-run
npm run sync:quartz
npm install --package-lock-only --ignore-scripts --no-audit --no-fund
npm ci --no-audit --no-fund
npm run test:site
npm run build
```

同步自动选择官方最高正式语义版本标签，跳过 prerelease。也可传 --tag vX.Y.Z；--from 只接受 HEAD 与所选标签相符的干净 Git 仓库根目录。
同步前拒绝核心漂移；先在内存准备代码、补丁和依赖配置，写入或校验失败时恢复原文件。
同步不会改写本站配置、插件、主题和图标；依赖变化由 packageJsonOverlay 显式合并并通过锁文件验证。

.github/workflows/update-quartz.yml 每日检查正式标签，测试和全量构建通过后创建升级 PR；合并 PR 后由现有部署工作流发布。避免未经验证的官方新版本直接进入线上。

构建使用 npm ci，内容使用独享临时目录，不修改原笔记或源码配置。QUARTZ_CONTENT_DIR 已移除；QUARTZ_OUTPUT_DIR 仅允许 public 或 .dsh-tmp 子目录。
原 MIT 许可证保留。不要取消跟踪核心源码、锁文件、pin 或 manifest；依赖、输出、缓存和本机路径记录不跟踪。
