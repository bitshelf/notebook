---
tags: Android
---

# Android 8 编译报错
### 生成最后的镜像报错
```
processing option: updateimg
Make update.img
start to make update.img...
Android Firmware Package Tool v1.62
------ PACKAGE ------
Add file: ./package-file
Add file: ./Image/MiniLoaderAll.bin
Error:<AddFile> open file failed,err=2!
------ FAILED ------
Press any key to quit:
Make update image failed!
```
> [!summary] 解决办法
> 清理 u-boot 目录，重新编译
> ```shell
> cd u-boot; make clean
> cd -; ./build.sh uboot
>```

