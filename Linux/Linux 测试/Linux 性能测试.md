---
tags:
  - Linux/test
---
# Linux性能测试简介
## 综合测试

### unixbench

项目地址：[GitHub - kdlucas/byte-unixbench: Automatically exported from code.google.com/p/byte-unixbench](https://github.com/kdlucas/byte-unixbench)
UnixBench（即曾经的BYTE基准测试）为类UNIX系统提供了基础的衡量指标，其官方主页为http://code.google.com/p/byte-unixbench。它并不是专门测试CPU的基准测试，而是测试了系统的许多方面，它的测试结果不仅会受系统的CPU、内存、磁盘等硬件的影响，也会受操作系统、程序库、编译器等软件系统的影响。UnixBench中包含了许多测试用例，如文件复制、管道的吞吐量、上下文切换、进程创建、系统调用、基本的2D和3D图形测试，等等。

### stress

项目地址：[GitHub - resurrecting-open-source-projects/stress: Tool to impose load on and stress test a computer system](https://github.com/resurrecting-open-source-projects/stress)
stress是一个cpu、内存、磁盘的压力测试工具。

### sysbench

项目地址：[GitHub - akopytov/sysbench: Scriptable database and system performance benchmark](https://github.com/akopytov/sysbench)  
SysBench是一个模块化的、跨平台的、支持多线程的基准测试工具，它主要评估的是系统在模拟的高压力的数据库应用中的性能，其官方主页为http://sysbench.sourceforge.net。其实，SysBench并不是一个完全CPU密集型的基准测试，它主要衡量了CPU调度器、内存分配和访问、文件系统I/O操作、线程创建等多方面的性能。

### Phoronix Test Suite

项目地址: [Title Unavailable \| Site Unreachable](https://github.com/akopytov/sysbench)
phoronix Test Suite是综合的测试和benchmark平台，可以在Linux, Solaris, OS X, 和 BSD操作系统上进行benchmark测试。  
默认自带60多个测试套件和200多个独立的测试profile。每个profile都可以在phoronix-test-suite中单独进行测试。测试套件则由一组测试profile组成。一个profile由Bash/shell脚本和xml文件组成。

### Linux Kernel Selftests
- 文档：[Linux Kernel Selftests — The Linux Kernel documentation](https://www.kernel.org/doc/html/latest/dev-tools/kselftest.html)
- 内核源码自带的一个测试程序，位于路径 `tools/testing/selftests/` 下。

### perf bench
- 项目地址：[Introduction - perf: Linux profiling with performance counters](https://perfwiki.github.io/main/tutorial/#benchmarking-with-perf-bench)
- perf工具自带的测试程序，包括对内存、调度等测试用例

#### lkp-test
- 项目地址： https://github.com/intel/lkp-tests.git  
- lkp-test项目由Intel工程师创建，其集成了许多Linux内核性能测试工具和脚本。
## cpu测试

### SpecCPU2006

项目地址： https://www.spec.org/cpu2006/ 
SPEC CPU 2006 benchmark是SPEC新一代的行业标准化的CPU测试基准套件。重点测试系统的处理器，内存子系统和编译器。这个基准测试套件包括的SPECint基准和SPECfp基准。 其中SPECint2006基准包含12个不同的基准测试和SPECfp2006年基准包含19个不同的基准测试。SPEC设计了这个套件提供了一个比较标准的计算密集型，高性能的跨硬件的CPU测试工具。在SPEC CPU 2006基准有几种不同的方法来衡量计算机性能。 一种方式是测量计算机完成单一任务的速度; 另一种方式吞吐量，容量或速率的测量。 说明：由于spec2006支持多种类型操作系统。以下安装、测试、移植等介绍均基于Unix 和其他的 Unix-like system如linux。Windows系统不在此范围内。

### SpecCPU2017

项目地址：[SPEC CPU 2017](https://www.spec.org/cpu2017/)  
作为SpecCPU2006的继任者

### SPECjbb2015

项目地址：[SPECjbb2015](https://www.spec.org/jbb2015/)  
SPECjbb2015 是 SPEC 组织的一个用于评估服务器端 Java 应用性能的基准测试程序，其官方主页为[SPECjbb2015](https://www.spec.org/jbb2015)。在其之前还有 SPECjbb2013、SPECjbb2005 等版本。该基准测试主要测试 Java 虚拟机（JVM）、JIT 编译器、垃圾回收、Java 线程等方面，也可对 CPU、缓存、内存结构的性能进行度量。SPECjbb2015 既是 CPU 密集型也是内存密集型的基准测试程序，它利用 Java 应用能够比较真实地反映 Java 程序在某个系统上的运行性能。

### Super PI

项目地址：[GitHub - Fibonacci43/SuperPI: the source code of performing single thread CPU benchmark](https://github.com/Fibonacci43/SuperPI)  
通过计算指定位数的圆周率π小数点的位数， 统计时间， 即可得知当前CPU的性能， 花费时间越短， 性能越优秀。

### linpack
用来测试CPU浮点运算的性能，代码路径： https://www.netlib.org/benchmark/linpackc

## 内存测试

### lmbench

项目地址： https://lmbench.sourceforge.net/  
LMbench是一个使用GNU GPL许可证发布的免费和开源的自由软件，可以运行在类UNIX系统中，以便比较它们的性能，其官方网址是：https://lmbench.sourceforge.net/。  
LMbench是一个用于评价系统综合性能的可移植性良好的基准测试工具套件，它主要关注两个方面：带宽（bandwidth）和延迟（latency）。LMbench中包含了很多简单的基准测试，它覆盖了文档读写、内存操作、管道、系统调用、上下文切换、进程创建和销毁、网络等多方面的性能测试。  
另外，LMbench能够对同级别的系统进行比较测试，反映不同系统的优劣势，通过选择不同的库函数我们就能够比较库函数的性能。更为重要的是，作为一个开源软件，IMbench提供一个测试框架，假如测试者对测试项目有更高的测试需要，能够修改少量的源代码就达到目的（比如现在只能评测进程创建、终止的性能和进程转换的开销，通过修改部分代码即可实现线程级别的性能测试）。  
目前最新的版本是3.0。

#### Memtest86+

项目地址：[Memtest86+ \| The Open-Source Memory Testing Tool](https://www.memtest.org/)  
Memtest86+是基于由Chris Brady所写的著名的Memtest86改写的一款内存检测工具，其官方网址为：[Memtest86+ \| The Open-Source Memory Testing Tool](http://www.memtest.org)。该软件的目标是提供一个可靠的软件工具，进行内存故障检测。Memtest86+同Memtest86一样是基于GNU GPL许可证进行开发和发布的，它也是免费和开源的。  
Memtest86+对内存的测试不依赖于操作系统，它提供了一个可启动文件镜像（如ISO格式的镜像文件），将其烧录到软盘、光盘或U盘中，然后启动系统时就从软驱、光驱或U盘中的Memtest86+启动，之后就可以对系统的内存进行测试。在运行Memtest86+时，操作系统都还没有启动，所以此时的内存基本上是未使用状态（除了BIOS等可能占用了小部分内存）。一些高端计算机主板甚至将Mestest86+默认集成到BIOS中。

### stream

STREAM: Sustainable Memory Bandwidth in High Performance Computers，是一个用于衡量系统在运行一些简单矢量计算内核时能达到的最大内存带宽和相应的计算速度的基准测试程序
STREAM可以运行在DOS、Windows、Linux等系统上。另外，STREAM的作者还开发了对STREAM进行扩充和功能增强的工具STREAM2
#### mbw
项目地址：[Title Unavailable \| Site Unreachable](https://github.com/raas/mbw/tree/master)

mbw作为一个内存宽带测试工具，可以测试在内存拷贝memcpy、字符串拷贝dumb、内存块拷贝mcblock三种不同方式下的内存拷贝速度。  


### memtester

项目地址： https://pyropus.ca./software/memtester/  
memtester是一个内存压力测试工具，用于测试内存子系统是否存在故障。它具有可移植性，可以在任何 32 位或 64 位的类 Unix 系统上编译和运行。

### pmbench

项目地址：[Title Unavailable \| Site Unreachable](https://github.com/blakecaldwell/pmbench.git)  
论文地址：https://web.cs.unlv.edu/jisooy/paper/yang_pmbench.pdf  
PMBench是一款针对内存和存储设备的性能测试工具。它可以用来评估计算机系统的内存性能以及存储子系统的读写速度、响应时间等指标。PMBench可以进行吞吐量测试、延迟测试和带宽测试等，通过运行各种测试场景并记录结果，可以对系统的性能进行量化评估和比较。

### vm-scalability

项目地址：[GitHub - aristeu/vm-scalability](https://github.com/aristeu/vm-scalability.git)  
用来测试linux内核内存管理模块的扩展性

## 磁盘/文件系统测试

### hdparm

项目地址： https://sourceforge.net/projects/hdparm/  
hdparm是一个用于获取和设置SATA和IDE设备参数的工具。

### dd

dd命令目前属于coreutils项目：[Coreutils - GNU core utilities](https://www.gnu.org/software/coreutils/)

### fio

项目地址： https://github.com/axboe/fio  
fio是一个被广泛使用的进行磁盘性能及压力测试的工具。它功能强大而灵活，可以用它定义（模拟）出各种工作负载（workload），模拟真实使用场景，以更准确地衡量磁盘的性能。除了测试磁盘读写的带宽以外，它还统计IOPS并且以不同的延迟时间分布表示；除了总的延迟时间，它还分别统计I/O递交的时间延迟和I/O完成的时间延迟。

### iozone

项目地址： https://www.iozone.org/  
IOzone是一个开源文件系统基准工具，用来测试文件系统的读写性能，也可以进行测试磁盘读写性能。

### bonnie++

项目地址：[Bonnie++ now at 1.03e (last version before 2.0)!](https://www.coker.com.au/bonnie++/)  
Bonnie++是以Bonnie 的代码为基础编写而成的软件，它使用一系列对硬盘驱动器和文件系统的简单测试来衡量其性能。Bonnie++可以模拟像数据库那样去访问一个单一的大文件，也可以模拟像Squid那样创建、读取和删除许许多多的小文件。它可以实现有序地读写一个文件，也可以随机地查找一个文件中的某个部分，而且支持按字符方式和按块方式读写。

### bonnie

项目地址：[textuality - Bonnie](https://www.textuality.com/bonnie/)

#### DBENCH

项目地址：[DBENCH](https://dbench.samba.org/web/index.html)  
代码地址：`git://git.samba.org/sahlberg/dbench.git`  
用来测试I/O性能的工具

## 网络测试

#### iperf

项目地址： https://iperf.fr/  
Iperf是一个常用的网络性能测试工具，它是用`C++`编写的跨平台的开源软件，可以在Linux、UNIX和Windows系统上运行，其项目主页是：[Iperf download \| SourceForge.net](http://sourceforge.net/projects/iperf)。  
Iperf支持TCP和UDP的数据流模式的测试，用于衡量其吞吐量。与Netperf类似，Iperf也实现了客户机/服务器模式，Iperf有一个客户端和一个服务端，可以测量两端的单向和双向数据吞吐量。当使用TCP功能时，Iperf测量有效载荷的吞吐带宽；当使用UDP功能时，Iperf允许用户自定义数据包大小，并最终提供一个数据包吞吐量值和丢包值。

### netperf

项目地址：[The Netperf Homepage](https://hewlettpackard.github.io/netperf/)  
Netperf是由HP公司开发的一个网络性能基准测试工具，它是非常流行网络性能测试工具。

### netio

项目地址： https://www.nwlab.net/art/netio/netio.html  
代码：[GitHub - kai-uwe-rommel/netio: A simple TCP/IP network benchmark.](https://github.com/kai-uwe-rommel/netio)  
netio也是个跨平台的、源代码公开的网络性能测试工具，它支持UNIX、Linux和Windows平台。NETIO也是基于客户机/服务器的架构，它可以使用不同大小的数据报文来测试TCP和UDP网络连接的吞吐量。

### SCP

包含在openssh项目中：[OpenSSH](https://www.openssh.com/)  
SCP是Linux系统上最常用的远程文件复制程序，它可以作为实际的应用来测试网络传输的效率。用SCP远程传输同等大小的一个文件，根据其花费时间的长短可以粗略评估出网络性能的好坏。

### 图形测试

### glxgears 锯齿测试

包含在mesa-utils项目中：[Home — The Mesa 3D Graphics Library](https://mesa3d.org/)  
GLX齿轮是一种受欢迎的OpenGL测试，它是“mesa-utils”软件包的一部分。

### glmark2

项目地址：[GitHub - glmark2/glmark2: glmark2 is an OpenGL 2.0 and ES 2.0 benchmark](https://github.com/glmark2/glmark2)  
GLMark2是一个广泛使用的图形性能测试工具，它是GLBenchmark 2.7的更新版本。GLMark2在多个平台上都可以运行，包括桌面计算机、笔记本电脑、移动设备等。用户可以通过GLMark2测试系统硬件所提供的图形性能，检查显卡是否正常工作，并进行性能优化调整。可以有效评估系统硬件图形性能和光照效果，并优化系统性能。多个测试场景提供了不同的测试方式，每个场景都覆盖了一个或多个方面的图形计算。用户可以通过GLMark2基准测试结果，根据新硬件的性能进行比较，找出系统瓶颈并进行优化。

### Unigine Benchmark

项目地址：[UNIGINE Benchmarks](https://benchmark.unigine.com/)  
Unigine Benchmark 是一个用于测试 GPU 性能的流行的基准测试工具，它可以渲染逼真的图像和场景，测试 GPU 的渲染性能。你可以从 Unigine 官网下载并安装该工具。

### x11perf

项目地址：[xorg / test / x11perf · GitLab](https://gitlab.freedesktop.org/xorg/test/x11perf)  
x11perf用于测试X11 server的性能，用户可以通过添加选项选择进行哪些测试。

#### GFXbenchmark

项目地址：[GFXBench - unified graphics benchmark based on DXBenchmark (DirectX) and GLBenchmark (OpenGL ES)](https://gfxbench.com/benchmark.jsp)  
linux下载地址：[GFXBench Linux Download](https://gfxbench.com/linux-download/)  
用来测试GPU性能的工具

## Link
- 网页版：[ICE SDK 使用户手册](https://yoc.docs.t-head.cn/icebook/)
![](assets/ICE%20SDK%20使用户手册.pdf)