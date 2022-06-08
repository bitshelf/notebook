---
tags: Ubuntu
---

# ARM 平台 ubuntu 编译库
## libjpeg.so.8 编译安装
1. 下载源码：
```bash
wget https://jpegclub.org/support/files/jpegsrc.v8d1.tar.gz)
```

2. 编译安装
```bash
 ./configure
 make
 make install
 make test

```
## 执行`./configure`报错
> [!error]  `LIBJPEG_8.0'
> configure: error: cannot guess build type; you must specify one

### 指定编译参数
```bash
./configure --build=arm-linux --prefix=/usr
```
