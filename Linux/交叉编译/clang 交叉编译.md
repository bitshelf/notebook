---
tags:
  - clang
---
使用 clang 交叉编译
```shell
make ARCH=arm CROSS_COMPILE=arm-linux-gnueabi- CC=clang HOSTCC=clang
```