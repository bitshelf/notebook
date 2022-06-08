---
tags:
  - Camera
---
## MIPI VI 软件架构
![](assets/RK3588%20MIPI%20VI软件架构.png)

### 以OV13850为例，整个软硬件框架分为：

- 硬件层：包含I2C Master、OV13850、DPHY、CSI2、VICAP、ISP等。
- 内核驱动层：I2C Master Driver、OV13850 Driver、DPHY Driver、CSI2 Host Driver、RKCIF Driver、ISP Driver、v4l2 Subsystem、I2C Subsystem、Media Subsystem等。
- 用户层：基于/dev/videoX设备的用户程序以及测试程序等。
![](assets/OV13850%20软硬件架构.png)

