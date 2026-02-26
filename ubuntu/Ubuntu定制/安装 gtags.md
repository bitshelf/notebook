---
tags:
  - gtags
---
## 源码安装 gtags
1. 下载源码：[Index of /pub/gnu/global](https://ftp.gnu.org/pub/gnu/global/)
```shell
wget https://ftp.gnu.org/pub/gnu/global/global-6.6.14.tar.gz

./configure --prefix=$HOME/.local/ \
--with-sqlite3 \
--with-universal-ctags=$HOME/.local/bin/ctags

make -j`nproc` install
```

## 安装 universal-ctags
```shell
# install libjansson first
sudo apt-get install libjansson-dev

sudo apt install universal-ctags
# or

# then compile and install universal-ctags.
#
# NOTE: Don't use `sudo apt install ctags`, which will install exuberant-ctags and it's not guaranteed to work with vista.vim.
#
git clone https://github.com/universal-ctags/ctags.git --depth=1
cd ctags
./autogen.sh
./configure
make
sudo make install
```

