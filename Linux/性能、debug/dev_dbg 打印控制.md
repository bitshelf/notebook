---
tags:
  - DebugFS
---
# dev_dbg 调试打印开启
## 最佳实践
在文件的最开头，头文件之前定义
```c
#define DEBUG
```
- 在需要打印`dev_dbg`调试信息的驱动文件开头定义 `#define DEBUG` 宏, 注意必须是在`<linux/device.h>` 或者`<linux/paltforam_device.h>`前面定义

## 方式一 
- 在需要开启调试文件的头部添加如下修改 
```c
#undef dev_dbg
#undef dev_info
#undef dev_warn
#undef dev_notice

#define dev_dbg dev_err
#define dev_info dev_err
#define dev_warn dev_err
#define dev_notice dev_err
```
## 方式二
> [!tip] 
> 内核使能 `CONFIG_DYNAMIC_DEBUG`, 会导致重新编译大部分内核源码

1. 查看内核配置
```shell
zcat /proc/config.gz | grep CONFIG_DYNAMIC_DEBUG
```

2. 挂载 debuggfs
```shell
mount | grep debugfs
mount -t debugfs none /sys/kernel/debug
```

3. 将打印输出到串口
```shell
dmesg -n 8 # echo "8    4    1    7" > /proc/sys/kernel/printk
echo 'file <driverfilename.c> +p'>/sys/kernel/debug/dynamic_debug/control

# 例如打开 bq25890_charger.c 的调试信息
echo 'file bq25890_charger.c +p' > /sys/kernel/debug/dynamic_debug/control
```

## link 
- [Dynamic debug — The Linux Kernel documentation](https://www.kernel.org/doc/html/v5.15/admin-guide/dynamic-debug-howto.html)
- [Linux kernel debug技巧----开启DEBUG选项](http://www.wowotech.net/linux_application/kernel_debug_enable.html)