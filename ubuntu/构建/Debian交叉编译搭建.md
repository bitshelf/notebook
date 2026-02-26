---
tags:
  - Debian
---
## x 86 ubuntu 环境搭建
 /etc/schroot/chroot. d/jammy-arm 64. conf  

```shell
sudo apt install schroot debootstrap

sudo mkdir -p ~/chroot/jammy-arm64
#  ~/chroot/jammy-arm64 可以自己选择一个路径
sudo debootstrap --arch=arm64 jammy ~/chroot/jammy-arm64 http://ports.ubuntu.com/
# Debian
sudo debootstrap --arch=arm64 bookworm  bookworm-arm64 http://mirrors.ustc.edu.cn/debian

# 使用国内源
sudo debootstrap --arch=arm64 jammy ~/chroot/jammy-arm64 https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/
# https://mirrors.ustc.edu.cn/ubuntu-ports/
# https://mirrors.aliyun.com/ubuntu-ports/
# https://repo.huaweicloud.com/ubuntu-ports/
```

### 创建 `/etc/schroot/chroot.d/jammy-arm64.conf`
```shell
[jammy-arm64]
description=Ubuntu 22.04 Jammy on arm64
type=directory
directory=/home/myir/chroot/jammy-arm64 #  ~/chroot/jammy-arm64 的绝对路径
users=myir # x86 host 主机普通用户
root-groups=root
personality=linux
preserve-environment=true
```

### 切换到 arm 64 Ubuntu 22
```shell
schroot -c jammy-arm64 # 以普通用户
sudo schroot -c jammy-arm64  # 以 root 用户切换
```

### 在 arm 64 Ubuntu 22 安装编译工具
```shell
sudo apt install build-essential vim
```

## 验证编译环境
![](https://cdn.nlark.com/yuque/0/2025/png/22336850/1757136300168-97dfe088-f90c-4b56-b8bd-aff6cdd92b69.png)

---

### 交叉编译 QT  Quick 3 D  
1. 修改 arm 64 Ubuntu 22 的源

```diff
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy main restricted
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-updates main restricted
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy universe
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-updates universe
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy multiverse
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-updates multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-backports main restricted universe multiverse

deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-security main restricted
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-security main restricted
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-security universe
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-security universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-security multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ jammy-security multiverse
```

2. 更新源：`sudo apt update`
3. 修改 `/etc/apt/sources.list`, 把 deb-src 注释去掉
4. 安装 QT Quick 3 D  的依赖：`sudo apt build-dep qt6-quick3d-dev`
5. 由于 qt 6-quick 3 d 6.2.* 依赖与 libassimp v 5.0.1，所以需要先编译 libassimp v 5.0.1

```shell
# 卸载系统 assimp
sudo apt remove libassimp-dev

# 下载旧版
git clone https://github.com/assimp/assimp.git
cd assimp
git checkout v5.0.1

cmake -B build -S . -DCMAKE_BUILD_TYPE=Release
cmake --build build -j$(nproc)
sudo cmake --install build
```

6. 从 github 拉取 quick 3 D demo 源码，`git clone https://github.com/qt/qtquick3d -b 6.2.4` (Ubuntu 支持的 QT 版本查看：`apt search qt6-quick3d-dev`)
7. 编译 QT Quick 3 D

```shell
cd qtquick3d
cmake -B build  -GNinja
cmake --build build -j$(nproc)
sudo cmake --install build

# 编译 demo
cd examples/quick3d/intro
cmake -B build  -GNinja
cmake --build build -j$(nproc)
file build/intro # 查看编译后可执行文件
```

## Link
1. [Packaging/Pre-Requisites - Debian Wiki](https://wiki.debian.org/Packaging/Pre-Requisites)
2. [A beginner's guide to debian packaging - YouTube](https://www.youtube.com/watch?v=fr_5n2hJ2eU)
3. [Packaging/Learn - Debian Wiki](https://wiki.debian.org/Packaging/Learn)
4. [DebootstrapChroot - Ubuntu Wiki](https://wiki.ubuntu.com/DebootstrapChroot)
