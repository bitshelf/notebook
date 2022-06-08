---
tags: sys
---

# 在 /sys/目录下创建文件
1. 使用`DEVICE_ATTR`，可以实现驱动在 sys 目录自动创建文件, 需要实现 show 和 store 函数
2. `DEVICE_ATTR()`宏定义，`DEVICE_ATTR()`定义位于 `include/linux/device.h` 中
```c
#define DEVICE_ATTR(_name, _mode, _show, _store) \
    struct device_attribute dev_attr_##_name = __ATTR(_name, _mode, _show, _store)
```