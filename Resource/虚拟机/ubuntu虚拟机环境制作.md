---
tags: Ubuntu
---

# 环境搭建
## ubuntu22
```shell
sudo apt-get install git bc bison build-essential curl flex g++-multilib gcc-multilib gnupg gperf imagemagick lib32ncurses5-dev lib32readline-dev lib32z1-dev liblz4-tool libncurses5-dev libsdl1.2-dev libssl-dev libxml2 libxml2-utils lzop pngcrush rsync schedtool squashfs-tools xsltproc yasm zip zlib1g-dev python-is-python3 device-tree-compiler expect g++ patchelf gawk texinfo chrpath diffstat binfmt-support qemu-user-static live-build fakeroot cmake  ssh make gcc unzip ncurses-dev python3-pip libncurses5 libc6:i386 genext2fs u-boot-tools mtools parted libudev-dev libusb-1.0-0-dev autoconf autotools-dev libsigsegv2 m4 intltool libdrm-dev  sed binutils wget libglib2.0-dev libgtk2.0-dev libglade2-dev cvs mercurial openssh-client subversion asciidoc w3m dblatex graphviz swig
```

## ubuntu20

```shell
sudo apt-get install git bc bison build-essential curl flex g++-multilib \
gcc-multilib gnupg gperf imagemagick lib32ncurses5-dev lib32readline-dev \
lib32z1-dev liblz4-tool libncurses5-dev libsdl1.2-dev libssl-dev libxml2 \
libxml2-utils lzop pngcrush rsync schedtool squashfs-tools xsltproc yasm zip \
zlib1g-dev python device-tree-compiler expect g++ patchelf gawk texinfo \
chrpath diffstat binfmt-support qemu-user-static live-build fakeroot cmake  \
ssh make gcc unzip ncurses-dev python3-pip libncurses5 libc6:i386 genext2fs \
u-boot-tools gcc-arm-linux-gnueabihf gcc-aarch64-linux-gnu mtools parted \
libudev-dev libusb-1.0-0-dev python-linaro-image-tools linaro-image-tools \
autoconf autotools-dev libsigsegv2 m4 intltool libdrm-dev  sed binutils \
wget libqt4-dev libglib2.0-dev libgtk2.0-dev libglade2-dev cvs mercurial \
openssh-client subversion asciidoc w3m dblatex graphviz python-matplotlib \
swig
```

```shell
sudo snap install git-repo
```

```shell
sudo pip install pyelftools
```

安装 Java 环境
~~~shell
sudo apt-get install openjdk-8-jdk
~~~

# 编译测试安装包
## ubuntu 1804 虚拟机 SDK 验证测试
![[ubuntu 1804 虚拟机 SDK 验证测试]]