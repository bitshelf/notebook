---
tags: Linux Kernel
---

# Linux  Dynamic debug
## 挂载
```shell
mount -t debugfs debugfs /sys/kernel/debug
cat /sys/kernel/debug/dynamic_debug/control
```

## Link
- `kernel/Documentation/admin-guide/dynamic-debug-howto.rst`