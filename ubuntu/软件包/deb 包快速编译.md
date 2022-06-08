---
tags: Ubuntu
---

# deb 包编译
## deb 编译环境准备
```shell
sudo apt install schroot debootstrap
```

```shell
sudo mkdir -p /srv/chroot/debian-sid
sudo debootstrap sid /srv/chroot/debian-sid
```
- [Packaging/Pre-Requisites - Debian Wiki](https://wiki.debian.org/Packaging/Pre-Requisites)

## dpkg-buildpackage
依赖软件包：`dpkg-dev`

从源代码构建包
```shell
dpkg-buildpackage -rfakeroot -b -uc -us

# 重编
fakeroot debian/rules binary
```
- **`dpkg-buildpackage`** - 用于从源构建二进制或源代码包的命令。
- **`-rfakeroot`** - 创建 fakeroot 环境来模拟 root 权限（以避免所有权和权限问题）。
- **`-b`** - 仅构建二进制包。
- **`-uc`** - 不要对变更日志进行加密签名。即不要签署 `.buildinfo` 和 `.changes` 文件
- **`-us`** - 不对源码包进行签名。

## debuild
依赖软件包：`devscripts`
```shell
debuild -b -uc -us
```
成功构建后，生成的 .deb 包将保存在父目录中

## 直接下载并构建
```shell
sudo apt-get source --compile hello
```