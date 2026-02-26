---
tags:
  - Ubuntu/coredump
---
## core文件在哪里
在系统开发过程中，部署在设备的版本通常是release版本，所以一般是不带调试信息的，当问题出现时，我们如何排查呢？ 实际上在linux中提供了coredump的功能，当程序出现崩溃时，会给我们转储core文件，只要我们拿到core文件，就相当于拿到了问题现场

如果systemd-coredump不安装，那么core文件是存放在默认的内核位置，内核会将其写成core，故core文件会存在启动用户的根目录

可以通过内核提供的proc文件查看core的位置
```
cat /proc/sys/kernel/core_pattern
```

使用 GDB 调试
```
gdb -c coredump executable_file -d source_code
```

查询可执行文件所在包名
```
dpkg -S /usr/bin/lscpu
```

查询软件包所包含的文件
```shell
dpkg -L util-linux
```

## link
- [gdb调试方法(10)-coredump](https://mp.weixin.qq.com/s/UBzUOvTYN4q_I6wCNdNfmw)