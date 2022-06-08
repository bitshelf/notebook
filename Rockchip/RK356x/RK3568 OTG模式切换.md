---
tags: USB 
---

## rk 3568 otg 模式切换
```shell
## host
echo host > /sys/devices/platform/fe8a0000.usb2-phy/otg_mode
## device
echo peripheral > /sys/devices/platform/fe8a0000.usb2-phy/otg_mode
```