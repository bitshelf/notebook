---
tags: CSI
---

# CSI 概览
- **CSI**：CMOS Sensor Interface
- MIPI-CSI-2 协议是 MIPI 联盟协议的子协议，专门针对摄像头芯片的接口而设计
- CSI协议有两个版本协议，分别为CSI-2和CSI-3
- CSI-2 协议遵循的物理标准有两个，分别为 C-PHY 和 D-PHY
- CSI-3协议的物理标准对应M-PHY，且应用层协议栈还需要连接Uni-Pro层
- @ D-PHY 与 C-PHY 区别：从实用角度来看，主要是数据线和时钟线的区别，还有传输速率，C-PHY 通过某些技术改良，使数据传输速度更快
- @ 瑞芯微 3568 用的 CSI-2 && D-PHY，所以内核中，我们会看到 CSI2 和 D-PHY 相关代码
## link
- [Camera | 2.MIPI、CSI基础Camera | 2.MIPI、CSI基础](https://mp.weixin.qq.com/s/5qYO5RjCDUcxo4tR3_f_ow)
# Media bus and capture formats
1. To see the current settings of the media bus, use
~~~shell
media-ctl --print-topology
~~~

2. the media device may not be the default one
~~~shell
media-ctl --device /dev/mediaN --print-topology
~~~

