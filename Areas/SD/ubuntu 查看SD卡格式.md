---
tags: Linux command 
---

# 查看 SD 卡格式
1. `fdisk -l`
2. 插拔 sd 卡查看打印信息(`dmesg -n 7` 降低打印级别)
3. `file -s /dev/mmcblk**`