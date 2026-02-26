---
tags: Android
---

# Android 启动动画制作
1. 自 Android7.0 开始，动画与铃音合并
2. 将 `device/rockchip/common/BoardConfig.mk` 文件的 `BOOT_SHUTDOWN_ANIMATION_RINGING:=false` 改为 `BOOT_SHUTDOWN_ANIMATION_RINGING:=true`，打开编译时将文件打包进固件的功能
3. 将开机的动画（及铃声）复制到 `device/rockchip/common/bootshutdown/bootanimation.zip` (PC 源码路径)
4.   压缩成名为 bootanimation. zip 的压缩文件，要注意：压缩格式必须是. zip，还有最重要的是，压缩方式必须选择为“存储”，否则系统读不到
```shell
zip -0r bootanimation.zip desc.txt part2
```
5. desc. txt 文件分析
![[../../Android/Android运行/assets/desc文件分析.excalidraw|80%]]

> [!important] 改权限为 755
>   替换的时候不要忘记 bootanimation.zip 的权限为 755

# Link
RK Android SDK：`<RKDocs/android/Rockchip_Introduction_Android_Power_On_Off_Animation_and_Tone_Customization_CN&EN.pdf>`
* <https://android.googlesource.com/platform/frameworks/base/+/master/cmds/bootanimation/FORMAT.md>
* [[rk3568修改开启logo及动画例子]]
