---
tags: V4l2 
---

## 架构
- **主设备**：Camera Host 控制器为主设备，负责图像数据的接收和传输
- **从设备**：从设备为 Camera Sensor，一般为 I2C 接口，可通过从设备控制 Camera 采集图像的行为，如图像的大小、图像的 FPS等

![](assets/V4l2%20Camera架构.png)

* camera 的模组
	* 常包括 Lens
	* Sensor
	* CSI 接口等，其中 CSI 接口用于视频数据的传输
		* SoC 的 Mipi 接口对接 Camera，并通过 I 2 C/SPI 控制 camera 模组

## Linux系统中视频输入设备
![V4L2基础](../../Linux/多媒体子系统/V4L2基础.md)