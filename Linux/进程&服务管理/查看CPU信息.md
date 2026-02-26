---
tags: Linux 
---

# 查看 CPU 温度
## 查看 CPU 温度
```shell
cat /sys/devices/virtual/thermal/thermal_zone0/temp
# or
cat /sys/class/thermal/thermal_zone0/temp
```
- 输出的是 millidegrees Celsius
- 除以 1000 才能得到常规的温度

## 查看 CPU 当前频率
* `cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_cur_freq`

## Link
- [Temperature Sensor (Linux) | Toradex Developer Center](https://developer.toradex.com/software/linux-resources/linux-features/temperature-sensor-linux/)