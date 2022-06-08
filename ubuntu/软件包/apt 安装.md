---
tags: Ubuntu 
---

# ubuntu 无 sudo 权限安装软件包
## apt source 编译安装
```shell
apt-get source PACKAGE
./configure --prefix=$HOME/.config
make
make install
```
- 没有 `configure` 文件，可以执行 `make configure` 生成
- [APT HOWTO (Obsolete Documentation) - 源码包操作](https://www.debian.org/doc/manuals/apt-howto/ch-sourcehandling.zh-cn.html)
- [software installation - How to install program locally without sudo privileges? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/42567/how-to-install-program-locally-without-sudo-privileges)

## apt download 下载安装
```shell
apt-get download package_name 
dpkg -x package.deb dir
```
### Link
- [software installation - How can I install a package without root access? - Ask Ubuntu](https://askubuntu.com/questions/339/how-can-i-install-a-package-without-root-access)

## apt 下载依赖安装包
```shell
PACKAGES="wget unzip"
apt-get download $(apt-cache depends --recurse --no-recommends --no-suggests \
  --no-conflicts --no-breaks --no-replaces --no-enhances \
  --no-pre-depends ${PACKAGES} | grep "^\w")
```
- [apt get - How to download all dependencies and packages to directory - Stack Overflow](https://stackoverflow.com/questions/13756800/how-to-download-all-dependencies-and-packages-to-directory)

## Link
- [software installation - How to install program locally without sudo privileges? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/42567/how-to-install-program-locally-without-sudo-privileges)