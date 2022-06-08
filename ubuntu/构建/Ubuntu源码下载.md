---
tags: Ubuntu
---

# Ubuntu 源码下载
### 开发者文档
- [Derivatives/Census/Ubuntu - Debian Wiki](https://wiki.debian.org/Derivatives/Census/Ubuntu)
---

### Ubuntu 源码下载
-  [Kernel/SourceCode - Ubuntu Wiki](https://wiki.ubuntu.com/Kernel/SourceCode)
- [kernel.ubuntu.com](https://kernel.ubuntu.com/git/)
- [ARM64 ubuntu-ports](http://ports.ubuntu.com/ubuntu-ports/)
- [Ubuntu 源码服务器根目录](https://cdimage.ubuntu.com/)
- [Ubuntu 22.04.1 LTS (Jammy Jellyfish)](https://cdimage.ubuntu.com/releases/22.04/release/source/)
- [Ubuntu Releases](https://releases.ubuntu.com/)

## Ubuntu 符号文件下载
- [Index of /pool/main/l/linux](http://ddebs.ubuntu.com/pool/main/l/linux/)
- [Ubuntu 符号服务器根目录](http://ddebs.ubuntu.com/)
- Ubuntu 调试参考：[Debug Symbol Packages - Ubuntu Wiki](https://wiki.ubuntu.com/Debug%20Symbol%20Packages)
- [software installation - How to install a package that contains Ubuntu kernel debug symbols? - Ask Ubuntu](https://askubuntu.com/questions/197016/how-to-install-a-package-that-contains-ubuntu-kernel-debug-symbols)

## Ubuntu 2204 测试无效
%%
~~~shell
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse
deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse
deb http://ddebs.ubuntu.com $(lsb_release -cs)-proposed main restricted universe multiverse" | \
sudo tee -a /etc/apt/sources.list.d/ddebs.list
~~~

### add GPG key for ddebs. ubuntu. com
```shell
wget -O http://ddebs.ubuntu.com/dbgsym-release-key.asc| sudo apt- key add -

# or
wget -q http://ddebs.ubuntu.com/dbgsym-release-key.asc
sudo apt-key add dbgsym-release-key.asc
```

#### update 
```shell
sudo apt update
```

#### install symbols package
```shell
sudo apt install linux-image-`uname -r`-dbgsym
```
%%
