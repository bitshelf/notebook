---
tags: Android
---

# Android 状态查看
## CPU 
1. CPU 频率查看
```shell
cat /sys/devices/system/cpu/cpu[0-7]/cpufreq/scaling_cur_freq
```
或者
```shell
cat /sys/kernel/debug/clk/clk_summary | grep arm
```

2. 查看 CPU 可用频率
```shell
cat /sys/devices/system/cpu/cpufreq/policy0/scaling_available_frequencies
```

3. 设置 CPU 频率
```shell
echo userspace > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor;
echo 1800000 > /sys/devices/system/cpu/cpufreq/policy0/scaling_setspeed
```

## DDR 
1. 查看 DDR 频率
```shell
cat /sys/class/devfreq/dmc/cur_freq
```
或者
```shell
cat /sys/kernel/debug/clk/clk_summary | grep ddr
```

2. 查看 DDR 可用频率
```shell
cat /sys/class/devfreq/dmc/available_frequencies
```

3. 设置 DDR 频率 （需要固件支持）
```shell
echo userspace > /sys/class/devfreq/dmc/governor;
echo 528000000 > /sys/class/devfreq/dmc/userspace/set_freq
```

## NPU 
1. 查看 NPU 频率
```shell
cat /sys/kernel/debug/clk/clk_summary | grep npu
```
或者
```shell
cat /sys/class/devfreq/****.npu/cur_freq
```