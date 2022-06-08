---
tags:
  - OpenHarmony
---
## hdc 使用
### remount 分区
以读写模式挂载`/vendor`、`/data`等分区
```shell
hdc target mount
```
因为安全性问题，需要挂在根目录或者`/system` 分区请单独使用
```shell
hdc shell mount -o rw,remount /
```

- [hdc 命令行工具使用](https://gitee.com/openharmony/developtools_hdc)
- [zh-cn/application-dev/dfx/hdc.md · OpenHarmony/docs - Gitee.com](https://gitee.com/openharmony/docs/blob/4f4570e7b3581c71e5f1a40367b1c2bde9a3616b/zh-cn/application-dev/dfx/hdc.md#hdc)