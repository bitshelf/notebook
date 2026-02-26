---
tags:
  - GPU
---
## 查看GPU频率
```bash
$ cat /sys/devices/platform/ff9a0000.gpu/devfreq/ff9a0000.gpu/cur_freq 	//rk3399
$ cat /sys/devices/ffa30000.gpu/dvfs						//rk3288
$ cat /sys/devices/ffa30000.gpu/clock						//rk3288
$ cat /d/clk/clk_summary | grep gpu
```

## 设置GPU定频

```bash
$ echo userspace > /sys/class/devfreq/ff9a0000.gpu/governor
$ echo 400000000 > /sys/class/devfreq/ff9a0000.gpu/userspace/set_freq
```

## 查看GPU温度

```bash
$ cat /sys/class/hwmon/hwmon0/device/temp2_input		#rk3288	
```

## 查看GPU使用负载

```bash
#RK3399PRO Android9
$ cat  /sys/devices/platform/ff9a0000.gpu/utilisation					
```