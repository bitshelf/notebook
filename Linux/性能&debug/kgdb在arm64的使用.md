---
tags:
  - Linux/kgdb
---
## 内核配置kgdb
```shell
CONFIG_KGDB
CONFIG_KGDB_SERIAL_CONSOLE
CONFIG_KALLSYMS
```

启动后内核就有如下参数配置项
```
/sys/module/kgdboc/parameters/kgdboc
```

rk的tty叫做ttyFIQ0，所以我们可以设置kgdb管理此tty，如下
```
echo ttyFIQ0 >  /sys/module/kgdboc/parameters/kgdboc
```

主动触发linux进入debug模式
```shell
echo g > /proc/sysrq-trigger
```

# 主机配置
代码放在服务器，而我们笔记本如果想访问不是很方便，所以我们要借助sshfs来映射
```shell
mkdir ~/sshfs
sshfs root@172.25.1x.x:/x/01-3588-x11/squashfs-root/root/kernel/ ~/sshfs
```

host 主机进入 gdb 调试
```shell
gdb vmlinux
set serial baud 1500000
target remote /dev/ttyUSB0
```

## Link
- [kgdb在arm64的使用](https://mp.weixin.qq.com/s/GSbHmYo6415f4H-woGktqg)
- [Chapter 1. Introduction](https://www.kernel.org/pub/linux/kernel/people/jwessel/kgdb/ch01.html)