---
tags: Rockchip
---

# Rockchip 固件说明
| 分区 | 对应文件 |说明|
|:---:| -------- | ---- |
|loader|Miniloader|由u-boot下rkbin等文件合成，一级引导，负责初始化DDR等| 
|parameter| parameter.txt | 保存着CMDLINE参数，包含分区信息，rootfs  挂载信息等，传给内核 |
|misc|misc.img|记录系统状态辅助完成升级流程等，非必须|
|recovery|recovery.img|负责系统升级和擦除用户数据，非必须|
|oem|oem.img|来自buildroot或者device/rockchip,主要放有些RK原厂的库，脚本和可执行文件|
|userdata|userdata.img|存放用户数据，非必须|

## Android 名词说明
1. OTA 介绍
    - OTA （over the air）升级是 Android 系统提供的标准软件升级方式。它功能强大，提供了完全升级（完整包）、增量升级模式（差异包），可以通过本地升级，也可以通过网络升级
2. Boot：
    - boot意思是手机系统的引导，进入ROM系统先加载boot，每个ROM中均含有boot.img的文件
3. ADB
    - Android 调试桥 (adb) 是一种功能多样的命令行工具，可让您与设备进行通信
    - 如要在通过 USB 连接的设备上使用 adb，您必须在设备的系统设置中启用 **USB 调试**（位于**开发者选项**下）
    - 也可以通过 WLAN 连接的设备上使用 adb
4. markrom
    - `MaskRom` 模式是设备变砖的最后一条防线。强行进入 `MaskRom` 涉及硬件操作，有一定风险，因此仅在设备进入不了 `Loader` 模式的情况下，方可尝试 `MaskRom` 模式
5. Recovery
    - Recovery 模式指的是一种可以对安卓机内部的数据或系统进行修改的模式，（类似于 windows pe 或 DOS）。在这个模式下我们可以刷入新的安卓系统，或者对已有的系统进行备份或升级，也可以在此恢复出厂设置
    - Recovery 分区, 该分区由 kernel+resource+ramdisk 组成, 主要用于升级操作
6. MBR
    - MBR：Master Boot Record，主分区引导记录
7. u-boot 
	- 会根据 misc 分区存放的字段来判断将要引导的系统是 Normal 系统还是 Recovery 系统。由于系统的独立性, 所以 Recovery 模式能保证升级的完整性, 即升级过程被中断, 如异常掉电, 升级仍然能继续执行
## 编译
- Buildroot 的配置取决于我们最终生成的固件里运行什么程序
- Boardconfig 的配置决定我们的固件最终在怎样的设备上运行