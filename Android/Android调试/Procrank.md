---
tags: Android
---

# Procrank
Procrank 是 Android 自带一款调试工具，运行在设备侧的 shell 环境下，用来输出进程的内存快照，便于有效的观察进程的内存占用情况。
#### 包括如下内存信息
- VSS：Virtual Set Size 虚拟耗用内存大小（包含共享库占用的内存）
- RSS：Resident Set Size 实际使用物理内存大小（包含共享库占用的内存）
- PSS：Proportional Set Size 实际使用的物理内存大小（比例分配共享库占用的内存）
- PSS：Proportional Set Size 实际使用的物理内存大小（比例分配共享库占用的内存)
> [!attention] 注意
> - USS 大小代表只属于本进程正在使用的内存大小，进程被杀死后会被完整回收
> - VSS/RSS 包含了共享库使用的内存，对查看单一进程内存状态没有参考价值
> - PSS 是按照比例将共享内存分割后，某单一进程对共享内存区的占用情况

```shell
procrank [ -W ] [ -v | -r | -p | -u | -h ]
```
常用指令说明 :
- -v：按照 VSS 排序
- -r：按照 RSS 排序
- -p：按照 PSS 排序
- -u：按照 USS 排序
- -R：转换为递增[递减]方式排序
- -w：只显示 working set 的统计计数
- -W：重置 working set 的统计计数