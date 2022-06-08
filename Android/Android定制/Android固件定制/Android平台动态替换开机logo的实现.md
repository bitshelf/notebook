---
tags:
  - android/logo
---
- 本文的实现适用于 Rockchip 的 Android 10 及以上版本的 SDK

### 在 Android 上层增加 logo 分区：
```Makefile
# BoardConfig.mk
 BOARD_GSENSOR_MXC6655XA_SUPPORT := true
 BOARD_CAMERA_SUPPORT_EXT := true
 BOARD_HS_ETHERNET := true
+BOARD_WITH_SPECIAL_PARTITIONS := logo:16M
```

### 替换 logo
1. 把logo图片push到机器的sdcard/目录下，注意logo图片需要是bmp格式的
```shell
adb push ./logo.bmp sdcard/
adb push ./logo_kernel.bmp sdcard/
```

2. 制作 logo. img
```shell
cat logo.bmp > logo.img && \
truncate -s %512 logo.img && \
cat logo_kernel.bmp >> logo.img
```

3. 通过dd命令将logo.img文件写到logo分区中
```shell
dd if=logo.img of=/dev/block/by-name/logo       
```

## Windows 自动化脚本
1. 解压后，将 logo 目录下的 logo
2. 双击运行 `update_logo.bat`完成替换，重启查看效果
[Open: update_logo.zip](assets/update_logo.zip)
![](assets/update_logo.zip)

## link 
- [rockchip Android平台动态替换开机logo的实现\_命令cat logo.bmp-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/125212221?spm=1001.2014.3001.5502)