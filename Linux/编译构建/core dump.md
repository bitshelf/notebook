---
tags: Linux 
---

# core dump
1. 修改生成 core dump 文件名格式：`echo /corefilels/%e-%p > /proc/sys/kernel/core_pattern` 
	1. `%e` ：executable name
	2. `%p` : PID
2. 运行*core file*：`gdb <program executable> <core file>`
3. 