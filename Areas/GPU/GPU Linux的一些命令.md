---
tags:
  - GPU
---
# Debian
1. 查看 GPU 的占用情况
```shell
cat  /sys/devices/platform/ff9a0000.gpu/devfreq/ff9a0000.gpu/load
```
* `ff9a0000.gpu` : 可以通过 `cat /proc/interrupts` 查看