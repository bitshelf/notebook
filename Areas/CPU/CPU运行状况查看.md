---
tags: CPU
---

# CPU 运行状态查看
## sysfs CPUFreq Stats 的一般说明
* cpufreq-stats 是一个为每个 CPU 提供 CPU 频率统计的驱动
* 这个接口（在配置好后）将出现在 `/sysfs（<sysfs root>/devices/system/cpu/cpuX/cpufreq/stats/）`中 [[cpufreq]] 下的一个单独的目录中，提供给每个 CPU。各种统计数据将在此目录下形成只读文件

1. 查看 CPU 温度
~~~shell
cat /sys/devices/virtual/thermal/thermal_zone0/temp
~~~

2. 查看 CPU 可用频率
~~~shell
cat /sys/devices/system/cpu/cpu[0-7]/cpufreq/scaling_available_frequencies
~~~

3. CPU 最大频率
~~~shell
cat /sys/devices/system/cpu/cpu[0-7]/cpufreq/cpuinfo_max_freq
~~~

4. 查看 CPU 交互策略
~~~shell
cat /sys/devices/system/cpu/cpu[0-7]/cpufreq/scaling_governor
echo performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
~~~
* **performance**: 运行于最大频率
* **powersave**: 运行于最小频率
* **userspace**：行于用户指定的频率
* **ondemand**：按需快速动态调整 CPU 频率，一有 cpu 计算量的任务，就会立即达到最大频率运行，空闲时间增加就降低频率
* **conservation**：按需快速动态调整 CPU 频率，比 ondemand 的调整更保守
* **schedutil**：基于调度程序调整 CPU 频率

5. 查看 CPU 频率转换的细粒度信息
~~~shell
cat /sys/devices/system/cpu/cpu4/cpufreq/stats/trans_table
~~~

6. 查看 CPU 所支持的每个频率所花费的时间
~~~shell
cat /sys/devices/system/cpu/cpu4/cpufreq/stats/time_in_state
~~~

7. 调整 CPU 运行模式
~~~shell
echo performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
~~~

8. 查看 CPU 每个核的运行频率
~~~shell
grep ''  /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_cur_freq
~~~

### CPU 定频
1. 先查看支持的频率  
  ```shell
  cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_frequencies  
408000 600000 816000 1008000 1200000 1416000  
```
2. 写入 userspace 策略说明要用户定频  
  ```shell
echo userspace > /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor  
```
3. 设定需要的频率  
  ```shell
echo 1416000> /sys/devices/system/cpu/cpu*/cpufreq/scaling_setspeed  
echo 696000 > /sys/devices/system/cpu/cpu0/cpufreq/scaling_setspeed
```

