---
tags: Linux glibc
---

# glibc 编译
### glibc 源码下载
```shell
$ mkdir $HOME/src
$ cd $HOME/src
$ git clone git://sourceware.org/git/glibc.git
$ mkdir -p $HOME/build/glibc
$ cd $HOME/build/glibc
$ $HOME/src/glibc/configure --prefix=/usr
$ make
$ make check
```

## Link
- [INSTALL - Glibc source code (glibc-2.36) - Bootlin](https://elixir.bootlin.com/glibc/glibc-2.36/source/INSTALL)
- [Testing/Builds - glibc wiki](https://sourceware.org/glibc/wiki/Testing/Builds)
- [How to build and use glibc for Kernel Mode Linux](http://www.yl.is.s.u-tokyo.ac.jp/~tosh/kml/how_to_build_and_use_glibc.html)
- [The GNU C Library](https://www.gnu.org/software/libc/started.html)
- [FAQ - glibc wiki](https://sourceware.org/glibc/wiki/FAQ)
- [HomePage - glibc wiki](https://sourceware.org/glibc/wiki/HomePage)
