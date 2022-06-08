---
tags: Android
---

# Android 镜像
## Android 镜像布局
- 在 Android 10 中，根文件系统已不再包含在 `ramdisk.img` 中，而是合并到了 `system.img`（即在创建 `system.img` 时始终将 `BOARD_BUILD_SYSTEM_ROOT_IMAGE` 视为已设置

- system-as-root 配置的含义在 Android 9 和 Android 10 之间有所不同。在 Android 9 system-as-root 配置中，`BOARD_BUILD_SYSTEM_ROOT_IMAGE` 设为 `true`，这会强制编译将根文件系统合并到 `system.img` 中，然后将 `system.img` 作为根文件系统 (rootfs) 进行装载。此配置对于搭载 Android 9 的设备是强制性的，但对于升级到 Android 9 及搭载较低 Android 版本的设备是可选的。在 Android 10 system-as-root 配置中，编译始终将 `$TARGET_SYSTEM_OUT` 和 `$TARGET_ROOT_OUT` 合并到 `system.img` 中；此配置是搭载 Android 10 的所有设备的默认行为。





---
## Link
- [https://source.android.com/docs/core/architecture/bootloader/system-as-root#about-system-as-root](https://source.android.com/docs/core/architecture/bootloader/system-as-root#about-system-as-root)

