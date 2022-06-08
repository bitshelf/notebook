---
tags: Ubuntu 
---

## ctags 源码编译安装
```shell
sudo apt-get install libjansson-dev
git clone https://github.com/universal-ctags/ctags.git --depth=1
cd ctags
./autogen.sh
./configure --prefix=/where/you/want/to/install # install to where you have access
make -j && make install
```