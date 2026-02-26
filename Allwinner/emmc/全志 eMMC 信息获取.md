---
tags:
  - Allwinner/eMMC
---
## 全志获取 eMMC 信息
当前emmc频率，速度模式，线宽，用来评估当前emmc存储系统的性能
```shell
mount -t debugfs none /sys/kernel/debug
cat /sys/kernel/debug/mmc0/ios

# 得到信息如下  
clock: 100000000 Hz  
vdd: 23 (3.5 ~ 3.6 V)  
bus mode: 2 (push-pull)  
chip select: 0 (don’t care)  
power mode: 2 (on)  
bus width: 3 (8 bits)  
timing spec: 10 (mmc HS400)  
signal voltage: 1 (1.80 V)  
driver type: 0 (driver type B)
```