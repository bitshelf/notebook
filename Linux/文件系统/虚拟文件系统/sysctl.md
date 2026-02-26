---
tags:
  - Linux/sysctl
---
# sysctl
sysctl命令来自英文词组“system control”的缩写，其功能是用于配置系统内核参数

sysctl是一种用于在运行时检查和更改内核参数的工具。sysctl在procfs中实现，procfs 是位于/proc/的虚拟进程文件系统

**sysctl** 预加载/配置文件可以在 `/etc/sysctl.d/99-sysctl.conf` 中创建。对于 [systemd]( https://wiki.archlinuxcn.org/wiki/Systemd "Systemd")，`/etc/sysctl.d/` 和 `/usr/lib/sysctl.d/` 是内核 sysctl 参数的配置目录。命名和源目录决定了处理的顺序，这很重要，因为处理的最后一个参数可能会覆盖前面的参数。例如，`/usr/lib/sysctl.d/50-default.conf` 中的参数将被 `/etc/sysctl.d/50-default.conf` 中的相同参数以及之后从这两个目录处理的任何配置文件覆盖

## 获取 Sysctl 的参数列表

在 Linux 中，管理员可以通过 sysctl 接口修改内核运行时的参数。在 `/proc/sys/` 虚拟文件系统下存放许多内核参数。这些参数涉及了多个内核子系统，如：

- 内核子系统（通常前缀为: `kernel.`）
- 网络子系统（通常前缀为: `net.`）
- 虚拟内存子系统（通常前缀为: `vm.`）
- MDADM 子系统（通常前缀为: `dev.`）
- 更多子系统请参见[内核文档](https://www.kernel.org/doc/Documentation/sysctl/README)。

若要获取完整的参数列表，请执行以下命令：

```shell
sudo sysctl -a
``` 
永久配置一个参数：
```shell
sysctl -w <TUNABLE_CLASS>.<PARAMETER>=<TARGET_VALUE> >> /etc/sysctl.conf
```
系统配置调整后，需要重启系统或者运行以下 `sysctl` 命令方能生效：
```shell
sysctl --system
```
如果只改动 `/etc/sysctl. conf` ，则只需以 `-p` 选项运行 `sysctl` 命令：
```shell
sysctl -p
```
## Link
- [sysctl](https://wiki.archlinuxcn.org/wiki/Sysctl)
- [5.3. 使用 sysctl 永久配置内核参数 \| 管理、监控和更新内核 \| Red Hat Enterprise Linux \| 8 \| Red Hat Documentation](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/8/html/managing_monitoring_and_updating_the_kernel/configuring-kernel-parameters-permanently-with-sysctl_configuring-kernel-parameters-at-runtime)
- [sysctl.d(5) — manpages-zh — Debian trixie — Debian Manpages](https://manpages.debian.org/trixie/manpages-zh/sysctl.d.5.zh_CN.html)
- [在 Kubernetes 集群中使用 sysctl \| Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/sysctl-cluster/)
- [使用 sysctl 变量提高网络安全性 \| 安全和强化指南 \| SLES 15 SP5](https://documentation.suse.com/zh-cn/sles/15-SP5/html/SLES-all/cha-sec-sysctl.html)