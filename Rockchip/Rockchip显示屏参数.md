---
tags:
  - mipi
---

# Dual-channel
* 子模式①和 Single-channel 的主要区别是 `dsi, lanes` 的值大于 4
* 子模式②和 Single-channel 的主要区别是 `dsi,lanes`，`clock-frequency`，`hactive`，`hfront-porch`，`hsync-len`，`hback-portch` 在单个 panel 的基础上 x2
## dsi,flags
*  `MIPI_DSI_MODE_VIDEO`,  `MIPI_DSI_MODE_VIDEO_BURST` 表示 Video Burst Mode
*  `MIPI_DSI_MODE_LPM` 表示默认在 LP 模式下发送初始化序列。  
*  `MIPI_DSI_MODE_EOT_PACKET` 表示关闭 EOTP 特性
* `dsi,lanes` Lane Number (1~8), 大于 4 表示为**Dual-channel MIPI-DSI Panel**
# 初始化序列
## 初始化序列命令格式
~~~
39 00 04 b9 ff 83 94
~~~
头部三个字节分别代表*Data Type*，*Delay*，*Payload Length*
第四个字节开始的数据代表长度为 Length 的 Payload 
* Data Type: `0x39` (DCS Lone Write)
* Delay: `0x00` (0ms)
* Payload Length: `0x04` (4 Bytes)
* Payload: `0xb9 0xff 0x83 0x94`

