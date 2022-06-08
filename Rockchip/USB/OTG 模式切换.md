---
tags: Linux USB
---

## 切换到 device 模式
```shell
echo peripheral > /sys/devices/platform/fe8a0000.usb2-phy/otg_mode
```

## 切换到 host 模式
```shell
echo host > /sys/devices/platform/fe8a0000.usb2-phy/otg_mode
```

## RK356x OTG 切换
```shell
echo host > /sys/devices/platform/fe8a0000.usb2-phy/otg_mode
echo peripheral > /sys/devices/platform/fe8a0000.usb2-phy/otg_mode
```

## RK3588 OTG 切换
```shell
echo host > /sys/kernel/debug/usb/fc000000.usb/mode # to host
echo device > /sys/kernel/debug/usb/fc000000.usb/mode  # to device
```