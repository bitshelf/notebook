---
tags:
  - Allwinner
---
## 全志命令行烧录工具
1. 查看开发板是否进入烧录模式
```prompt:bash
sunxi-fel version
sunxi-fel list
```


2. 烧录固件
```prompt:bash
sudo phoenixconsole /home/linaro/t527-buildroot.img  EA 1
```

## sunxi-fel 的编译安装
```shell
sudo apt update
sudo apt install -y \
    git build-essential pkg-config \
    libusb-1.0-0-dev zlib1g-dev libfdt-dev

git clone https://github.com/linux-sunxi/sunxi-tools.git
cd sunxi-tools

make -j"$(nproc)"
sudo make install
```
## Link
- [GitHub - linux-sunxi/sunxi-tools: A collection of command line tools for ARM devices with Allwinner SoCs. · GitHub](https://github.com/linux-sunxi/sunxi-tools)

