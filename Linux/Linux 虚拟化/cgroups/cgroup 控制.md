---
tags:
  - Linux/cgroup
---
## cgroup 系统资源控制
### 查看当前的 cgroup 版本
```shell
stat -fc %T /sys/fs/cgroup/ # cgroup v1时使用 `stat` 命令显示的是 `tmpfs`
```
### 查看 cgroup 支持哪些子系统
```shell
cat /proc/cgroups 
```

