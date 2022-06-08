---
tags: U-Boot
---

# U-Boot
RK U-Boot 基于开源的 U-Boot 进行开发，工作模式有启动加载模式和下载模式
- 启动加载模式：主要用于开机时把内存中的内核加载到内存中，启动操作系统。
- 下载模式：主要用于将固件下载到闪存，开机时长按 Recovery 键可进入下载模式
- fastboot: Bootloader 支持交互式启动、也就是说我们可以让 Bootloader 初始化完成硬件之后，不是马上去启动 OS，而是停留在当前的状态，等待用户输人命令告诉它接下来该干什么。这种启动方式就称为 Fastboot 模式。通常、在关机状态下，同时按下音量下键和电源键，可以进人 Fastboot 模式。

## 进入 U-Boot 命令行模式
- 把宏 `CONFIG_BOOTDELAY` 改为 0 即默认不进入命令行模式

## 一级 Loader
U-BOOT 作为一级 Loader 模式，那么仅支持 EMMC 存储设备，编译完成后生成的镜像

## 二级 Loader
U-Boot 作为二级 Loader 模式，那么固件支持所有的存储设备，该模式下，需要 MiniLoader 支持，通过宏 `CONFIG_MERGER_MINILOADER` 进行配置生成。同时引入 `Arm Trusted`，Firmware 会生成 `trust image`，这个通过宏`CONFIG_MERGER_TRUSTIMAGE` 进行配置生成