---
tags: Android
---

# Android Studio 阅读 Android 源码
1. Android 源码下执行：
```shell
make idegen
./development/tools/idegen/idegen.sh # 生成 ipr 文件

# or
mmm development/tools/idegen/
sh ./development/tools/idegen/idegen.sh
```
- 修改生成的 `android.iml` 文件，排除文件夹，减少 Android studio 运行卡顿

## Android studio 设置
1. 设置 Android Studio 运行内存 `Help` > `Edit Custom VM Options`
```shell
	-Xms1g  #启动时分配的内存
	-Xmx2g  #运行过程中分配的最大内存
	-Dfile.encoding=UTF-8  # Build output 乱码
```
 2. 大文件阀值："Help -> Edit custom properties" 
```
idea.max.intellisense.filesize=100000
```

### Android studio 配置文件路径
```shell
C:\Users\%USERNAME%\AppData\Roaming\Google\
```

---
# Link
- [Android - 系统级源码调试](https://mp.weixin.qq.com/s/q7biXMWpV0ev02d1OnO_kA)
- [如何使用Android Studio开发/调试Android源码](https://www.cnblogs.com/Lefter/p/4176991.html)
- [AOSP source in Android Studio](https://android.googlesource.com/platform/development/+/master/tools/idegen/README)
- [How to import the sources to Android Studio / IntelliJ | LineageOS Wiki](https://wiki.lineageos.org/how-to/import-to-android-studio)
- [Android Studio查看和调试AOSP源码](https://www.jiangkang.tech/2020/08/21/android/androidstudio-cha-kan-he-diao-shi-aosp-yuan-ma/)
