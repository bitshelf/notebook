---
tags: Rockchip
---

# RK3588 运行报错

> [!error] LIBJPEP 8.0 not found
> ```shell
> ImportError: /usr/lib/aarch64-1inux-gnu/libjpeg.so.8: version 'LIBJPEG_8.0' not found
> ```
## 解决办法
```shell
apt source  libjpeg-turbo8  
autoreconf -i -f  
./configure  --with-jpeg8 --disable-static --prefix=/usr/
make;make install
```

* 重新编译 libjpeg 的库文件，编译时指定一个参数，兼容之前的版本

![](assets/libjpeg.so.8.1.2)
