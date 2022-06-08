---
tags:
  - AOSP
---


在 Linux 系统中，`wake_lock` 是一直锁机制，只要有驱动占用这个锁，系统就不会进入深度休眠。

## 获取此锁的方法有两种 ：

1. 在 adb 中通过指令获取 `wake_lock`，系统就不会进入深度休眠

```shell
echo "PowerManagerService.noSuspend" > /sys/power/wake_lock
```

2. 在驱动文件中获取 wake\_lock
（1）添加头文件
```c
#include <linux/wakelock.h>
```

（2）定义 wake\_lock 结构体
```c
static struct wake_lock wake_lock_always
```

（3）在 xxx\_init 函数中初始化锁

```c
wake_lock_init(&wake_lock_always, WAKE_LOCK_SUSPEND, "wake_lock_always");
```

（4）在 xxx_suspend 函数中获取锁
```c
wake_lock(&wake_lock_always);
```

（5）在 xxx_resume 函数中释放锁
```c
wake_unlock(&wake_lock_always);
```