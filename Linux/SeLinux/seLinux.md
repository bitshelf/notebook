---
tags: Linux, 
---

# SELInux
> [!tip] SELinux
> * 安全增强型 Linux（SELinux）是一种采用安全架构的 Linux® 系统
> * SELinux 定义了每个人对系统上的应用、进程和文件的访问权限
> * MAC: 强制访问控制
> * DAC： 自主访问控制
> * SELinux 会对性能造成影响，因为还要处理SELInux的标签匹配
## SELinux 配置
* **目标策略**为默认选项，它涵盖了多种流程、任务和服务
* 多级安全防护（MLS）
* 查看 `/etc/sysconfig/selinux` 文件，以判断系统所采用的配置方式
## SELinux 启用/关闭
* 编辑 /etc/selinux/config 并设置 SELINUX=permissive 来启用 SElinux
* 查看SELinux的命令
	* `getenforce`
	* `/usr/sbin/sestatus`
	* `ps -Z`
	* `ls -Z`
	* `id -Z`
* 关闭SELinux
	* `setenforce 0`
	* `/etc/selinux/sysconfig`
---
# 相关链接
1. [SELinux Notebooks](https://github.com/SELinuxProject/selinux-notebook/blob/main/src/toc.md) ，SELinux 的最新参考文档
	<iframe 
		height = 300
		width = 100%
		src = " https://github.com/SELinuxProject/selinux-notebook/blob/main/src/toc.md">
	</iframe>
