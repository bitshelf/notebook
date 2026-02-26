---
tags:
  - Ubuntu
---
# 文件系统无法启动
> [!fail] 失败
> ~~~shell
> Failed to switch root, dropping to a shell
> ~~~
解决办法
将内核启动后的init程序链接到文件系统的*systemd*
~~~shell
ln -s  ../../lib/systemd/systemd /usr/sbin/init
~~~
# 可能用到的命令
* `./build.sh firmware ./build.sh`
* 分区表 `parameter` 修改：`rootfs:grow` (查看 `parameter` 的链接源文件)
* 