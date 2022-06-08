---
tags: Android 
---

## Uboot 引导
- RK3566/RK3568/RK3588的 uboot 固件格式是 FIT 格式由 SPL 负责引导
- **uboot. img**：U-Boot mainline 支持的一种灵活性极高的固件格式。U-Boot、trust 以及 mcu 等固件一起打包为 uboot. img

- [Rockchip Android修改uboot分区大小的方法\_rk uboot分区大小修改\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/125608150)

---
### ARM SoC 启动过程
```
RomBoot --> SPL --> u-boot --> Linux kernel --> file system --> start application
```
- SPL是由固化在芯片内部的ROM引导的
- RomBoot 读取这一小段代码就叫 spl
- SPL（Secondary program loader）是 uboot 第一阶段执行的代码。主要负责搬移 uboot 第二阶段的代码到系统内存（System Ram，也叫片外内存）中运行

---
## Link 
- [u-boot SPL启动流程 | wowothink](https://wowothink.com/1e031f74/)