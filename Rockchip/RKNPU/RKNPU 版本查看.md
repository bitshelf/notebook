---
tags: Rockchip NPU
---

# RKNPU 版本查看
- librknnrt runtime 版本：1.3.0
~~~shell
strings librknnrt.so | grep version | grep lib
~~~

- rknpu driver 版本：0.7.2
~~~shell
dmesg | grep rknpu
~~~

> [!attention]
> 查看开发板 /usr/lib/librknnrt. so 没有找到，可以查看源码编译出来的 librknnrt. so
