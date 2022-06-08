---
tags: CPU 
---

## Rockchip RK3588 Android12 在 Android 层调整 CPU 的变频策略等参数

RK3588的CPU是4个A55+4个A76的大小核架构，其中A55的最高频率是1.8GHz，低功耗；A76的最高主频2.4GHz，高性能，同时功耗也会比A55高。在具体的产品上面如何平衡功耗和性能，可以根据实际需求在Android层调整CPU的一些策略，这个策略的配置文件在： `device/rockchip/rk3588/init.rk3588.rc`,具体如下：

```
@sys2_206:~/3_Android12_29_debug/device/rockchip/rk3588$ vim init.rk3588.rc
#变频的负载阈值参数配置
write /sys/devices/system/cpu/cpufreq/policy0/interactive/target_loads 65
    write /sys/devices/system/cpu/cpufreq/policy4/interactive/target_loads 65
    write /sys/devices/system/cpu/cpufreq/policy6/interactive/target_loads 65

#CPU的进程管理
write /dev/cpuset/foreground/cpus 0-7
    write /dev/cpuset/foreground/boost/cpus 0-7
    write /dev/cpuset/background/cpus 0-7
    write /dev/cpuset/system-background/cpus 0-7
    write /dev/cpuset/top-app/cpus 0-7
```

## 变频的负载阈值

RK3588的CPU根据硬件电源的设计在软件实现上分为3组来控制，分别是:

-   CPU0：4个A55分别是CPU0-CPU3
-   CPU4：2个A76分别是CPU4-CPU5
-   CPU6：2个A76分别是CPU6-CPU7  
    三组CPU的频点分别是：
-   CPU0：408000 600000 816000 1008000 1200000 1416000 1608000 1800000
-   CPU4：408000 600000 816000 1008000 1200000 1416000 1608000 1800000 2016000 2208000 2400000
-   CPU6：408000 600000 816000 1008000 1200000 1416000 1608000 1800000 2016000 2208000 2400000  
    这3组CPU对应的变频阈值的配置设备节点如下：

```
/sys/devices/system/cpu/cpufreq/policy0/interactive/target_loads
/sys/devices/system/cpu/cpufreq/policy4/interactive/target_loads
/sys/devices/system/cpu/cpufreq/policy6/interactive/target_loads
```

配置的具体方式如下：

```
write /sys/devices/system/cpu/cpufreq/policy0/interactive/target_loads 65
write /sys/devices/system/cpu/cpufreq/policy4/interactive/target_loads 65
write /sys/devices/system/cpu/cpufreq/policy6/interactive/target_loads 65
```

其中：  
target\_loads:负载；这个参数的目的是根据 CPU 负载来调整频率：  
当 CPU 负载升高到该参数时，内核就会升高 CPU 的运行频率以便降低 CPU 负载。该参数的默认值这里配置为 65%。  
该参数的格式是单个固定数值，或者是频率和负载值成对出现用冒号隔开。  
比如 85 1008000:90 2016000:99 表示负载在 85% 以下时，CPU 频率要运行在 1008MHz 以下；  
负载达到 90% 时，CPU 频率要运行在 1008MHz~2016MHz，直到 CPU 负载达到 99% 时，频率才会升到 2016MGHz 以上。  
一般地，该参数设置的越低，CPU 升频就会越快、越频繁。  
90 1008000:95 表示在90以下运行在1G以下频点，90～95运行在1008MHz的频点

```
write /sys/devices/system/cpu/cpufreq/policy4/interactive/target_loads "65 1008000:70 1200000:75 1416000:80 1608000:90"
```

## CPU的进程管理

-   system-background 一些低优先级的任务会被划分到这里，只能跑到小核心里面
-   foreground 前台进程
-   top-app 目前正在前台和用户交互的进程
-   background 后台进程
-   foreground/boost 前台 boost 进程，通常是用来联动的，现在已经没有用到了，之前的时候是应用启动的时候，会把所有 foreground 里面的进程都迁移到这个进程组里面

- 配置所有前台的进程都运行在 cpu0-7上面，如果需要更好的性能则可以把前台进程配置在大核上面即配置为4-7  
```shell
write /dev/cpuset/foreground/cpus 0-7  
```
- 配置前台运用点击的时候运行在 cpu0-7上面，如果需要更快的点击响应则可以配置在大核上面即配置为4-7  
```shell
write /dev/cpuset/foreground/boost/cpus 0-7 
``` 
- 配置所有后台的进程都运行在 cpu0-7上面，如果需要更好的功耗则可以把后台进程配置在小核上面即配置为0-3  
```shell
write /dev/cpuset/background/cpus 0-7
```  
- 配置低优先级后台的进程都运行在 cpu0-7上面，如果需要更好的功耗则可以把低优先级后台进程配置在小核上面即配置为0-3  
```shell
write /dev/cpuset/system-background/cpus 0-7
```  
- 配置当前运行的进程运行在 cpu0-7上面，如果需要更好的性能则可以把当前运行的进程配置在大核上面即配置为4-7  
```shell
write /dev/cpuset/top-app/cpus 0-7
```

## Link 
-  [Rockchip RK3588 Android12 在Android层调整CPU的变频策略等参数\_rk 超频\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/124175382)

