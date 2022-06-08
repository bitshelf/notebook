---
tags:
  - Ubuntu
---
## RK Ubuntu 去除 userdata 分区，并划分到 root 分区
1. 修改 `Parameter` 文件，将 `root` 改为 `rootfs:grow`
2. 安装 `sudo apt install gparted` 后，使用 `sudo gparted` 打开图形界面操作