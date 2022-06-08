---
tags: buildroot
---

# buildroot 软件包配置
1.  查看文件系统版本
    
    ```shell
    ls buildroot/output/rockchip_rk1808
    ```
    
2.  `source envsetup.sh` 选择 output 下看到的目录名
3.  执行 `make ARCH=arm64 menuconfig` 配置 buildroot 所需的软件包
4.  `make savedefconfig` 保存 buildroot 配置
