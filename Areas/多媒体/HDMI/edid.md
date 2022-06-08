---
tags: HDMI
---

# HDMI EDID
## EDID 延伸显示能力识别
- 其中包含有关显示器及其性能的参数，包括供应商信息、最大图像大小、颜色设置、厂商预设置、频率范围的限制以及显示器名和序列号的字符串等等(共有 128 字节)
- 一般存在于 PROM 或者 EEPROM 中
- 读取 EDID 都是透过$I^2C$

## ubuntu 读取
~~~shell
xrandr --verbose
~~~

