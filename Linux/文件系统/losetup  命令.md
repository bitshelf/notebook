---
tags:
  - losetup
---
## losetup 挂载 img 文件
```shell
# 将 img 文件作为虚拟 loop 设备连接到系统中
sudo losetup --find --partscan nixos-lp4a.img

# 查看挂载的 loop 设备
lsblk | grep loop

# 分别挂载镜像中的 boot 跟 rootfs 分区
mkdir boot root
sudo mount /dev/loop0p1 boot
sudo mount /dev/loop0p2 root
```