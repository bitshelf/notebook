---
tags: Linux
---

# proc 文件系统
-  `/proc` 实际上是 Linux 的一个虚拟文件系统，用于内核空间与用户空间之间的通信。/proc/interrupts 就是这种通信机制的一部分，提供了一个只读的中断使用情况

-  `/proc` 下文件基本都是只读的，除了 `/proc/sys` 目录，是可写的（查看和修改内核的运行参数）

##  	cpu 信息
-  `/proc/cpuinfo` CPU 的信息
- Linux 通过 /proc 虚拟文件系统，向用户空间提供了系统内部状态的信息，而 /proc/stat 提供的就是系统的 CPU 和任务统计信息
- CPU 使用率是单位时间内 CPU 使用情况的统计，以百分比的方式展示
- 为了维护 CPU 时间，Linux 通过事先定义的节拍率（内核中表示为 HZ），触发时间中断，并使用全局变量 Jiffies 记录了开机以来的节拍数。每发生一次时间中断，Jiffies 的值就加 1

### 设备信息
-  `/proc/devices` 	查看设备号