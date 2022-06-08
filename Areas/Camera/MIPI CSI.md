---
tags: Camera
---

# MIPI CSI
- MIPI 是差分串口传输，速度快，抗干扰
- MIPI 摄像头有三个电源：
	- VDDIO（IO 电源）
	- AVDD（模拟电源）
	- DVDD（内核数字电源）

- CSI-2 软件框架主要分成三层
	- 应用层: 上层数据流的编码以及解码格式，规定了像素转换为字节的映射关系
	- 协议层: 像素/字节打包/字节解包层，LLP层提供了串行传输数据的同步机制，通道管理层提供了数据位宽可扩展功能
		- 像素字节打包层/解包层
		- LLP (Low LevelProtocol)层
		- 通道管理层(Lane Management)
	- 物理层: 基本传输介质规范，确定了CSI-2协议物理层的输入输出特性参数，并确定其电气特性以及时钟时序
![](assets/CSI-2%20软件框架.png)
---
## Link
- [解读MIPI C-PHY D-PHY子系统](https://mixel.com/mipi-c-phy-d-phy-overview-ch/)
- [MIPI协议中的DSI和CSI是什么？ - 知乎](https://zhuanlan.zhihu.com/p/79813885)