# 官方 Quartz 基线

- quartz-upstream.json：官方正式版本 tag、提交 pin、覆盖文件和本站 package.json 叠加字段。
- quartz-manifest.json：官方文件哈希；构建前校验。
- core-patches.mjs：核心补丁登记，当前为空。优先使用本站配置或插件，不修改上游源码。
- patch-utils.mjs：补丁重放工具。补丁不兼容时在写入之前失败。

升级、依赖管理及隔离约定见 [MAINTENANCE.md](../MAINTENANCE.md)。
