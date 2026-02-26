---
tags: Linux
---

# GNU Binutils
## demo
```shell
cpp hello.c > hello.i
gcc -Wall -S hello.i

# as
as hello.s -o hello.o

# size
size hello.o

# readelf
readelf -h hello.o
readelf -h /bin/ls
readelf -h /lib64/libc.so.6
readelf -x .rodata  a.out

# ldd
ldd /bin/ls

# strings
strings -d hello.o

# objdump
objdump -d hello.o

# addr2line
addr2line -e a.out 400532
```

## Link
- [GNU开发工具链简介](assets/GNU开发工具链简介.pdf)
- [Binutils - GNU Project - Free Software Foundation](https://www.gnu.org/software/binutils/)
- [9 essential GNU binutils tools](https://opensource.com/article/19/10/gnu-binutils)