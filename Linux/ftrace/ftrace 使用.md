---
tags:
  - ftrace
---
## 挂载 tracefs 文件系统
```shell
mount -t tracefs /sys/kernel/tracing
```

## 使用 vim 插件
```shell
vim -S Documentation/trace/function-graph-fold.vim trace.txt
```