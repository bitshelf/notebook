---
tags: Android
---

# Android 硬件抽象层模块
- Android 系统为硬件抽象层中的模块接口定义了编写规范，我们必须按照这个规范来编写自己的硬件模块接口，否则就会导致无法正常访问硬件。
- 在系统内部，每一个硬件抽象层模块都使用结构体 `hw_module_t` 来描述，而硬件设备则使用结构体 `hw_devcie_t` 来描述。

- 硬件抽象层模块文件的命名规范定义 `hardware/libhardware/hardware.c` 文件中
```c
/**
* There are a set of variant filename for modules. The form of the
* filename is "<MODULE_ID>.variant.so" so for the led module the 
* Dream variants of base "ro.product.board", "ro.board.platform"
* and "ro.arch" would be:
* led.trout.so
* led.msm7k.so
* led.ARMV6.so
* led.default.so
*/

static const char *variant_keys[] = {
    "ro.hardware",  /* This goes first so that it can pick up a
                         differentfile on the emulator. */
    "ro.product.board",
    "ro.board.platform",
    "ro.arch"
};
```

- 结构体 `hw_module_t` 和 `hw_devices_t` 及其相关的其他结构体定义在文件 `hardware/libhardware/include/hardware/hardware.h` 
	- 硬件抽象层中的每一个模块都必须自定义一个硬件抽象层模块结构体，而且他的第一个成员变量了类型必须为 `hw_module_t`
	- 硬件抽象层中的每一个模块都必须存在一个导出符号 `HAL_MODULE_IFNO_SYM`，即“HMI”，它指向一个自定义的硬件抽象层模块结构体。

## AIDL
**AIDL**： Android 系统提供了一种描述语言来定义具有跨进程访问能力的服务接口
- 在编译时，编译系统会将它们转换成 Java 文件，然后再对它们进行编译
- 服务接口定义一般放在：`frameworks/base/core/java/android/os`
- 用 AIDL 定义的服务接凵是用来进行进程间通信的
	- 提供服务的进程称为 Server 进程，Binder 本地对象，他通过一个桩（Stub）来等待 Client 进程发送进程间通信请求
	- 使用服务的进程称为 Client进程

#### AIDL 编译
```Makefile
LOCAL_SRC_FILES += \
......
test.aidl # 将AIDL 文件编译为Java文件 
```

### 硬件访问服务
硬件访问服务实现在 `frameworks/base/services/java/com/android/server/` 目录中