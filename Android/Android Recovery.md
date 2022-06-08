---
tags: Android 
---

# Recovery
- Recovery 模式指的是一种可以对安卓机内部的数据或系统进行修改的模式（类似于 windows PE 或 DOS）。也可以称之为安卓的恢复模式，在这个所谓的恢复模式下，我们可以刷入新的安卓系统，或者对已有的系统进行备份或升级，也可以在此恢复出厂设置（格式化数据和缓存）
- 安卓 Recovery 模式是一个独立的、轻量级的运行环境，安装有恢复控制台。它是一个独立于安卓主操作系统的分区，类似于 iOS 用户的 iPhone 恢复模式。你可以使用安卓恢复模式对安卓设备进行出厂重置，删除缓存分区，应用软件更新，以及从安卓调试桥更新等等。它可以访问手机的不同功能，而不需要访问手机的操作系统。
- Recovery 分区 ：存放安卓急救模式所使用到的内核和初始内存文件系统

> [!info] Android 分区
> -   `uboot` ：是用来存放第二阶段 (stage two) U-Boot，如果开发板用的是 eMMC 分区，其 U-Boot 就不需要分阶段。
> -   `misc` ：非常有用的一个分区，下面会介绍到，用来控制启动模式的。
> -   `resource` ：存放内核的开机图片和设备树 (Device Tree) 信息。
> -   `kernel` ：存放安卓的内核
> -   `boot` : 存放安卓的正常系统启动的初始内存文件系统 (initramfs)。注意，如果在 OTA 方式下， `boot` 分区跟 `recovery` 分区一样，含有内核和初始内存文件系统，此时 `kernel` 分区不作使用。
> -   `recovery` : 存放安卓急救模式所使用到的内核和初始内存文件系统。
> -   `backup` : RK 设计的用来存放备份固件的分区, FireNow 系统开发板没有用到。
> -   `cache` : 安卓的缓存分区
> -   `kpanic` : 安卓的 kernel panic 分区（？）
> -   `system` : 安卓的系统分区（挂载于 `/system` ）
> -   `metadata` : RK 的元数据分区，使用情况不详
> -   `userdata` : 安卓的数据分区（挂载于 `/data` ）
> -   `radical_update` : RK 的升级分区，使用情况不详
> -   `user` : 安卓的内部存储分区（挂载于 `/mnt/sdcard` ）；用户分区，也就是平时我们所说的内置 sdcard。另外还有外置的 sdcard 分区，用于存放用户相片、视频、文档、ROM 安装包等
> - Misc：一个非常小的分区，4 MB左右。recovery用这个分区来保存一些关于升级的信息，应对升级过程中的设备掉电重启的状况，Bootloader启动的时候，会读取这个分区里面的信息，以决定系统是否进Recovery System 或 Main System

- 在 Fastboot 模式下，我们可以通过 fastboot 工具将一个镜像（recovery. img）刷入设备的 Recovery 分区。这个过程称为刷 Recovery
- Recovery. img 包含了标准内核 (和 boot. img 中的内核相同) 以及 recovery 根文件系统
- Boot：包含 Linux 内核和一个最小的 root 文件系统（装载到 ramdisk 中），用于挂载系统和其他的分区，并开始 Runtime。
---
# Link
-  [Android Recovery升级原理](https://www.cnblogs.com/linhaostudy/p/11543687.html)
-  [Rockchip_User_Guide_Recovery_CN&EN.pdf](assets/Rockchip_User_Guide_Recovery_CN&EN.pdf)