---
tags: Android 
---

## Rockchip Android 平台挂在 samba 共享文件夹

使⽤ mount命令挂载 samba 共享⽂件夹，需要 kernel⽀持 CIFS，因而需要修改 kernel config

-   确认`.config` 是否有打开如下配置：

```
CONFIG_CIFS=y
```

如果没有开可以在 `arch/arm64/config/rockchip_defconfig` 中加上改配置

-   电脑端开启 samba 功能，获取电脑端的 ip
-   在设备中使⽤mount 命令挂载 samba 服务器的共享⽂件夹

```
1|rk3588_s_sdio:/ $ su
1|rk3588_s_sdio:/ $ mkdir -p sdcard/share
1|rk3588_s_sdio:/ # mount -t cifs -o username=xxx,password=xxx,vers=2.1 //10.10.10.234/xxx sdcard/share
rk3588_s_sdio:/ # ls sdcard/share/
```

## Link 
- [Rockchip Android平台挂在samba共享文件夹\_android 挂载smb\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/123413564)