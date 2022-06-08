---
tags:
  - GPIO
---
# libgpiod 源码编译 
```shell
sudo apt install autoconf
sudo apt install autoconf-archive
wget https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/snapshot/libgpiod-1.6.3.tar.gz
./autogen.sh --enable-tools=no  --host=arm-linux-gnueabihf --prefix=${pwd}/source
make
make install
```

- `--host` 指定交叉编译链，注意不带后缀
- `--prefix`指定安装路径，必须是绝对路径

## Python gpiod 软件包安装
```shell
sudo apt-get install python3-libgpiod
```
## link
- [libgpiod/README at master · brgl/libgpiod · GitHub](https://github.com/brgl/libgpiod/blob/master/README)
- [gpiod C 语言示例](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/examples)
- [gpiod python 示例](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/bindings/python/examples)