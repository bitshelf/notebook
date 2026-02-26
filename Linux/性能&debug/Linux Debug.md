---
tags:
  - Linux/debug
---
### 内核 Oops / 崩溃调试

| 发行版 | 文档 | Tips |
|--------|------|------|
| **Ubuntu** | [Kernel/Debugging](https://wiki.ubuntu.com/Kernel/Debugging) · [DebuggingKernelOops](https://wiki.ubuntu.com/DebuggingKernelOops) · [CrashdumpRecipe](https://wiki.ubuntu.com/Kernel/CrashdumpRecipe) · [KernelDebuggingTricks](https://wiki.ubuntu.com/Kernel/KernelDebuggingTricks) | Apport 自动收集崩溃信息; `ubuntu-bug linux` 提交; GDB 反汇编定位 panic 行 |
| **Debian** | [Kernel Handbook](https://kernel-handbook.debian.net/) · [Kernel Wiki](https://wiki.debian.org/Kernel/) · [Git Bisect](https://wiki.debian.org/DebianKernel/GitBisect) | `make bindeb-pkg` 自编译内核; git bisect 二分法定位回归; reportbug 提交 |
| **Arch Linux** | [Kernel](https://wiki.archlinux.org/title/Kernel) · [Boot debugging](https://wiki.archlinux.org/title/Boot_debugging) · [Debugging](https://wiki.archlinux.org/title/Debugging) · [panic.archlinux.org](https://panic.archlinux.org) | 内核参数 `debug ignore_loglevel`; emergency shell; `pr_debug`/`dev_dbg()` 动态调试; panic.archlinux.org 自动栈分析 |
| **Red Hat** | [RHEL10 Kernel 管理](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_monitoring_and_updating_the_kernel) · [kdump 排障](https://access.redhat.com/site/node/223403) | crash 工具全家桶; `makedumpfile -c` 压缩 vmcore; `kdumpctl status` 检查状态; Firmware-assisted dump (FADump) on Power |
| **Fedora** | [Early Debugging](https://fedoraproject.org/wiki/Kernel/EarlyDebugging) · [kdump 指南](https://fedoraproject.org/wiki/How_to_use_kdump_to_debug_kernel_crashes) · [Debug Strategy](https://fedoraproject.org/wiki/KernelDebugStrategy) | 按发布阶段调整调试级别; CoreOS 专用 kdump 指南 |

### 性能优化

| 发行版 | 文档 | Tips |
|--------|------|------|
| **Ubuntu** | [KVM 性能调优](https://wiki.ubuntu.com/KVM_performance_tuning) · [Boot 性能](https://wiki.ubuntu.com/FoundationsTeam/Specs/BootPerformance) | `systemd-analyze blame` 找启动瓶颈; hugepages 配置; virtio 调优 |
| **Debian** | [Hugepages](https://wiki.debian.org/Hugepages) · [Troubleshooting](https://wiki.debian.org/TroubleShooting) | sysfs + proc 手动调优; apt 安装 linux-perf 包; `perf top` 实时分析 |
| **Arch Linux** | [**Improving performance**](https://wiki.archlinux.org/title/Improving_performance) ★ · [Sysctl](https://wiki.archlinux.org/title/Sysctl) | **最详尽的社区 wiki**: CPU 调频 / I/O 调度器 / 文件系统选择 / swap 优化 / 内存调优 / 应用专项; sysctl.d 持久化 |
| **Red Hat** | [RHEL9 系统监控](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/monitoring_and_managing_system_status_and_performance) · [RHEL9 RT 低延迟](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_for_real_time/9/html-single/optimizing_rhel_9_for_real_time_for_low_latency_operation) · [RHEL7 性能调优指南](https://access.redhat.com/documentation/zh-tw/red_hat_enterprise_linux/7/html/performance_tuning_guide/) | **TuneD profiles**: throughput-performance / latency-performance / network-throughput; RHEL RT: CPU 隔离 / RCU 回调 / 线程调度; `tuned-adm` 一键切换 |
| **openEuler** | [A-Tune 文档](https://openeuler.org/zh/docs/22.09/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.html) · [oeAware](https://www.openeuler.org/zh/docs/24.03_LTS/docs/Releasenotes/%E5%85%B3%E9%94%AE%E7%89%B9%E6%80%A7.html) | A-Tune AI 自动调优; oeAware 微架构感知; 毕昇编译器 ARM 优化; 动态复合页自动大页 |

### 网络分析与调优

| 发行版 | 文档 | Tips |
|--------|------|------|
| **Ubuntu** | [NetworkManager 调试](https://wiki.ubuntu.com/DebuggingNetworkManager) · [WiFi 排障](https://help.ubuntu.com/community/WifiDocs/WirelessTroubleShootingGuide) | `nmcli general logging level DEBUG`; syslog 收集; wireless-info 脚本 |
| **Debian** | [NetworkConfiguration](https://wiki.debian.org/NetworkConfiguration) · [DebianReference/Network](https://wiki.debian.org/DebianReference/Network) · [DebianFirewall](https://wiki.debian.org/DebianFirewall) | ifupdown2 高级配置; nftables (默认); bonding/bridge/VLAN 手册 |
| **Arch Linux** | [**Network Debugging**](https://wiki.archlinux.org/title/Network_Debugging) ★ · [Network configuration](https://wiki.archlinux.org/title/Network_configuration) | **最系统**: ip link/ping → dig/nslookup → traceroute → nc/ss; `journalctl -u systemd-networkd`; ethtool 诊断; tcpdump 抓包 |
| **Red Hat** | [**RHEL10 网络排障与调优**](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/network_troubleshooting_and_performance_tuning) ★ · [RHEL9 网络调优](https://docs.redhat.com/de/documentation/red_hat_enterprise_linux/9/html/monitoring_and_managing_system_status_and_performance/tuning-the-network-performance_monitoring-and-managing-system-status-and-performance) | socket buffer 大小; ring buffer 配置; IRQ 亲和性; ethtool -G/-K/-C; `dropwatch` 看丢包点; `ss -s` 统计; `tc` 流量控制 |
| **openEuler** | [Gazelle 文档](https://docs.openeuler.openatom.cn/zh/docs/24.03_LTS_SP3/cloud/Gazelle/) · [Kmesh](https://openeuler.org/en/docs/23.03/docs/Releasenotes/key-features.html) | Gazelle 用户态协议栈 (UDP +50%); Kmesh 内核级服务网格 (5x); ARM 向量指令 TCP 加速; 原生 RDMA |

---

## 三、按场景选文档

### Oops 调试

```
入门 → ArchWiki Boot_debugging + Kernel (最易读)
      → Ubuntu KernelDebuggingTricks (GDB 实操)

生产 → Red Hat crash dump guide (最完整企业级流程)
      → Fedora How_to_use_kdump (轻量实用)

回归定位 → Debian GitBisect (git bisect 二分法)
```

### 性能优化

```
通用 → ArchWiki Improving_performance (知识面最广, 社区维护最好)
      → Red Hat TuneD profiles (开箱即用的调优方案)

实时/低延迟 → Red Hat RT 低延迟指南 (CPU 隔离 / RCU / 调度)
            → openEuler 潮汐调度 + 混部多优先级

ARM 专项 → openEuler A-Tune + 毕昇编译器 + oeAware
          → openEuler 动态复合页 + 自适应 NUMA

AI 驱动 → openEuler A-Tune (7000+ 参数自动调优)
```

### 网络分析

```
排障流程 → ArchWiki Network_Debugging (最系统: ip→dig→traceroute→nc)
          → Red Hat RHEL10 网络排障与调优 (最权威企业级)

丢包分析 → Red Hat dropwatch + ss -s + tc
          → ethtool -S 看 NIC 统计

高性能网络 → openEuler Gazelle (用户态协议栈)
            → openEuler Kmesh (内核级服务网格)
            → Red Hat RDMA / DPDK 指南
```


---
## Link
> 参考：  · [ArchWiki](https://wiki.archlinux.org) · [Red Hat Docs](https://docs.redhat.com) · [Debian Kernel Handbook](https://kernel-handbook.debian.net/) · [Ubuntu Kernel Wiki](https://wiki.ubuntu.com/Kernel/Debugging)
- [Improving performance - ArchWiki 性能优化 (社区最强)](https://wiki.archlinux.org/title/Improving_performance)
- [Network Debugging - ArchWiki](https://wiki.archlinux.org/title/Network_Debugging)
- [General troubleshooting - ArchWiki](https://wiki.archlinux.org/title/Boot_debugging)
- [Managing, monitoring, and updating the kernel](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_monitoring_and_updating_the_kernel)
- [Network troubleshooting and performance tuning](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/network_troubleshooting_and_performance_tuning)
- [Optimizing RHEL 9 for Real Time for low latency operation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_for_real_time/9/html-single/optimizing_rhel_9_for_real_time_for_low_latency_operation)
- [How to use kdump to debug kernel crashes - Fedora Project Wiki](https://fedoraproject.org/wiki/How_to_use_kdump_to_debug_kernel_crashes)
### ubuntu
- https://wiki.ubuntu.com/Kernel/Debugging 
- [CrashdumpRecipe](https://wiki.ubuntu.com/Kernel/CrashdumpRecipe)
### Debian
- [Debian Linux Kernel Handbook](https://kernel-handbook.debian.net/)
- [I Challenge Thee](https://wiki.debian.org/DebianKernel/GitBisect)