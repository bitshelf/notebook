---
tags: Linux perf
---

# perf
- 利用 PMU（Performance Monitoring Unit）、tracepoint 和核心内部的特殊计数器（counter）来进行统计
	- Tracepoint 是内核的一些 hook，一旦使能，在指定程序运行时，Tracepoint 就会被触发，这个被各种 trace/debug 工具使用
- 可以分析运行中的核心源码
### perf 基本使用
- Hardware： 由 PMU 产生的事件，比如：cache-misses、cpu-cycles、instructions、branch-misses …等等，通常是需要了解程序硬件性能时使用
- software：有内核产生的事件，比如：context-switches、page-faults、cpu-clock、cpu-migrations …等等
- tracepoint：内核中静态 tracepoint 所触发的事件
- 帮助文档
```shell
perf help <command>
```
- 查看 perf 可以触发那些 event
```shell
perf list
```
- 其他命令
```shell
perf top -e cache-misses -c 5000  # perf top实时分析那个event的热点

perf stat --repeat 5 -e cache-misses,cache-references,instructions,cycles ./perf_stat_cache_miss

perf record -e branch-misses:u,branch-instructions:u ./perf_record_example

perf report

# 打开内核符号表
echo 0 > /proc/sys/kernel/kptr_restrict
# 精简的报告，可以快速看到哪个函数占用最高
perf record `pgrep xxx(你的程序)`
perf report > simple_report.txt
# 带调用栈，结合simple_report.txt， 找到热点函数的调用栈
perf record -g `pgrep xxx(你的程序)`
perf report > stack_report.txt
```


What you can do with `perf` without being root depends on the [`kernel.perf_event_paranoid`](https://www.kernel.org/doc/Documentation/sysctl/kernel.txt) [sysctl setting](http://en.wikipedia.org/wiki/Sysctl).

-   `kernel.perf_event_paranoid` = 2: you can't take any measurements. The `perf` utility might still be useful to analyse existing records with `perf ls`, `perf report`, `perf timechart` or `perf trace`.
-   `kernel.perf_event_paranoid` = 1: you can trace a command with `perf stat` or `perf record`, and get kernel profiling data.
-   `kernel.perf_event_paranoid` = 0: you can trace a command with `perf stat` or `perf record`, and get CPU event data.
-   `kernel.perf_event_paranoid` = -1: you get raw access to kernel tracepoints (specifically, you can `mmap` the file created by [`perf_event_open`](http://lxr.linux.no/#linux+v2.6.39/kernel/perf_event.c#L6420), I don't know what the implications are)

---
# Link
- [IBM Developer](https://developer.ibm.com/)
- [Wiki - Linux 效能分析工具: Perf](http://wiki.csie.ncku.edu.tw/embedded/perf-tutorial)
- [perf Examples](https://www.brendangregg.com/perf.html)
- [Tutorial - Perf Wiki](https://perf.wiki.kernel.org/index.php/Tutorial#Sample_analysis_with_perf_report)
- [Linux Performance](https://www.brendangregg.com/linuxperf.html)