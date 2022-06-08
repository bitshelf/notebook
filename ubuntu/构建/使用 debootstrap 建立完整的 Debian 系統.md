---
tags:
  - Ubuntu
---
## 使用 debootstrap 创建完整的 Debian 系统

在制作嵌入式系统的过程中，常常会尽可能精简整个系统，因此将 gdb、strace 等除错的好帮手拿掉。如果精简的 Linux 系统出了问题，要怎进行除错呢？ `debootstrap + chroot` 是我最常用的组合。

debootstrap 是 Debian 提供用于创建迷你 Debian 系统的方案，使用他可以在你所指定的目录下安装一个基本的 Debian 系统，除了一些配置以外，其内容与使用 Debian 安装光盘第一阶段安装的内容基本相同。除此之外，你也可以指定产生出来的 Debian 架构，使用 debootstrap 产生出 armel、armhf、mips 等不同的 CPU 架构的 Debian 系统，再透过 qemu chroot 进行订制，从而产生自己需要的 Debian Linux 版本以及 Live USB、Live CD 等工具。

## 安装 debootstrap

debootstrap 在任何 Debian 系列的 Linux 皆可随手取得，若您是 Gentoo Linux 的用户，您也可以在 Portage 系统中找到 debootstrap 的 ebuild。
-   Debian / Ubuntu
```shell
    sudo apt-get install debootstrap
```

## 创建 x86/amd 64 的 Debian 系统

由于 chroot 需要 **root 权限** ，下面命令皆为 **root** 用户所执行的命令，若使用一般账号，请在命令前加上 **sudo** 。

要创建和主系统相同架构下的 Debian 系统，是非常简单的事情。首先我们先创建一个 `rootfs-debian` 目录。

接着使用下面这行 debootstrap 命令，Debian 就会安装到 /rootfs-deebian 下了
```shell
debootstrap --arch i386 sid rootfs-debian http://debian.linux.org.tw/debian
```

整个 debootstrap 的命令架构如下
```shell
debootstrap --arch <ARCH> <VERSION> <DIRECTORY>  <MIRROR>
```

-   ARCH
    目标系统的 CPU 架构，常用的有 i 386、amd 64、armel、armhf 等。
-   VERSION
    Debian 的版本，你可以使用目前的稳定版本 **wheezy** ，或是永远的测试版 **sid** ，当然你也可以选择更不稳定的 **testing** ，详细版本名称请见 Debian 官网。
-   DIRECTORY
    安装的目录，这个根据自己的需求设置即可
-   MIRROR    
    下载 Debian 套件的服务器，通常选择该用户局域内的服务器，以下为台湾的 Debian Mirror
    [http://ftp.tw.debian.org/debian/](http://ftp.tw.debian.org/debian/)
    

## 修改你的 Debian 系统
刚创建好的 Debian Rootfs 还是有一些需要你去修改的文件，比如说 `/etc/fstab` 、 `/etc/inittab` 等。

如果你使用 debootstrap 创建 Debian rootfs 的目的是进行 chroot，你只需要修改 `/etc/apt/source.list` 即可。

一开始 debootstrap 创建出来的 `/etc/apt/source.list` 是一个空白文件，你需要自己去添加自己想要的 debian mirror，debian mirror 取得的方式可以参考 [Debian Source List Generator](http://debgen.simplylinux.ch/) ，以下是我常添加的信息 (for unstable version)。

```shell
deb http://ftp.tw.debian.org/debian unstable main contrib
deb-src http://ftp.tw.debian.org/debian unstable main contrib
```

## 将你的 Debian 安装到 U 盘

如果你使用 debootstrap 的目的，是创建一个轻巧的 Debian 随身碟，则除了将刚刚所产生的文件移到随身碟下，你同时还要进行以下步骤。

为了简化说明，这里假设你的 USB disk 只切割成一个分割区。

-   1\. 产生基本的 Debian Root File System
    请参照前面说明产生 Debian RootFS 到你的随身碟上
-   2\. 修改 /etc/fstab
    根据你的需求修改 /etc/fstab 文件，以下为范例
```shell
    /dev/sda1  /         etx4 defaults 0 1
    proc       /proc     proc none     0 0
```
    
-   3\. 挂载系统信息，并 chroot 进去
    假设你的 usb 随身碟挂载于系统的 /mnt/usbdisk 上，则你需要再挂载一些系统目录以方便使用 chroot
    
```shell
    mount -t proc none /mnt/usbdisk/proc
    mount -o bind dev /mnt/usbdisk/dev
        
```
    
    接着使用 chroot 切换到 Debian 系统上

-   4. 更新系统，安装 grub 与 kernel image
    
```shell
    apt-get update
    apt-get install linux-image-generic
    apt-get install grub
```
    
-   5\. 将 grub 装到 MBR 上
-   6\. 进行一些其他杂七杂八的设置


## 参考链接

`[1]` [通过 debootstrap 安装 Debian](http://rediceli.blogspot.tw/2006/08/debootstrapdebian.html)
`[2]` [使用 debootstrap 安装 Debian 于 USB 大拇哥](http://rd-life.blogspot.tw/2009/08/debootstrap-debian-usb.html)
`[3]` [EmDebian/CrossDebootstrap - Debian Wiki](https://wiki.debian.org/EmDebian/CrossDebootstrap)
`[4]` [Debootstrap BlankBerry pada Gentoo](http://staff.blog.ui.ac.id/jp/2012/09/28/debootstrap-blankberry-pada-gentoo/)


## link 
- [blog-src/使用 debootstrap 建立完整的 Debian 系統.org at master · KingBing/blog-src · GitHub](https://github.com/KingBing/blog-src/blob/master/%E4%BD%BF%E7%94%A8%20debootstrap%20%E5%BB%BA%E7%AB%8B%E5%AE%8C%E6%95%B4%E7%9A%84%20Debian%20%E7%B3%BB%E7%B5%B1.org)