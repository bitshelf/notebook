---
tags:
  - Linux/boottime
---
## bootconfig
- Kernel Cmdline因为受到长度和格式比较受限，不能处理更复杂的参数格式
- bootconfig在start_kernel阶段，由 `setup_boot_config` 来加载，加载成功后，会打印如下Log
```
Load bootconfig: xxx bytes xxx nodes
```
- 启动后，在 `/proc/bootconfig` 中，也可以查看加载的bootconfig
- Debug时，可以通过`saved_boot_config`变量来获取加载的bootconfig
## Link
- [引导配置 — The Linux Kernel documentation](https://www.kernel.org/doc/html/v6.11/translations/zh_CN/admin-guide/bootconfig.html)