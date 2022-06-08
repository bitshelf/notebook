---
tags:
  - Ubuntu
---
## 无法打开浏览器
```
cannot mount bpf filesystem under /sys/fs/bpf: No such file or directory
```
内核添加配置
```
CONFIG_BPF_SYSCALL=y
```