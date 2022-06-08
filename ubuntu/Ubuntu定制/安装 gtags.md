---
tags:
  - gtags
---
## 源码安装 gtags
```shell
wget https://ftp.gnu.org/pub/gnu/global/global-6.6.tar.gz
tar -zxvf global-6.6.tar.gz
cd global-6.6/
./configure --prefix=$HOME/.local/ --with-sqlite3
make -j`nproc` install
```

## 安装 universal-ctags
```shell
# install libjansson first
sudo apt-get install libjansson-dev

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

