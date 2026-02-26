---
tags: Linux
---

# Linux 性能分析基础
#### 查看 CPU 核数
~~~shell
grep 'model name' /proc/cpuinfo | wc -l
~~~

#### 平均负载
平均负载是指单位时间内，处于可运行状态和不可中断状态的进程数。包括了
1. 正在使用 CPU 的进程
2. 等待 CPU 和等待 I/O 的进程

## 性能分析工具
1. 平均负载是指单位时间内，处于可运行状态和不可中断状态的进程数。所以，它不仅包括了正在使用 CPU 的进程，还包括等待 CPU 和等待 I/O 的进程。
2. pidstat 是一个常用的进程性能分析工具，用来实时查看进程的 CPU、内存、I/O 以及上下文切换等性能指标。

### 压力测试
### 模拟一个 CPU 使用率 100% 的场景：
```shell
stress --cpu 1 --timeout 600
```

### 模拟 I/O 压力，即不停地执行 sync
~~~shell
 stress -i 1 --timeout 600
~~~

### 模拟的是 8 个进程
~~~shell
 stress -c 8 --timeout 600
~~~

## Link
[系统调试基础名词释义](assets/book-tuning_color_zh_cn.pdf)