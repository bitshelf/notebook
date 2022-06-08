---
tags: Linux Kernel
---

# Linux 内核版本查看
1. `vim kernel/Makefile`
![[../assets/LInux kernel version.png]]
2. 内核目录查看
~~~shell
$ kernel-**$ make kernelversion
~~~
3. Android 串口查看 Linux 内核版本：`uname -r` 或者 `cat /proc/version`

---
# 参考
* [[Resource/Project/Rockchip/RK3588 android]]
* [[../../ubuntu/ubuntu 查看镜像生成时间]]

