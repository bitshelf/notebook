---
tags:
  - Allwinner/Camera
---
## debug 信息查看
1. mipi 硬件通道信息：`cat /sys/kernel/debug/mpp/mipi`
2. mipi 信号识别情况：`cat /sys/kernel/debug/mpp/vi`
3. 挂载 debugfs: `mount -t debugfs none /sys/kernel/debug`

## Link
- [bootlin.com/pub/conferences/2021/elc/kocialkowski-advanced-camera-support-allwinner-socs-mainline-linux/kocialkowski-advanced-camera-support-allwinner-socs-mainline-linux.pdf](https://bootlin.com/pub/conferences/2021/elc/kocialkowski-advanced-camera-support-allwinner-socs-mainline-linux/kocialkowski-advanced-camera-support-allwinner-socs-mainline-linux.pdf)