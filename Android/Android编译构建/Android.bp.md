---
tags: Android
---

# Android bp
## Android.mk 与 Android.bp 对应关系
~~~shell
gogrep addStandardProperties
~~~
* Android12 对应文件夹为：`build/soong/androidmk/androidmk/android.go`
由于 make 在编译时表现出效率不够高、增量编译速度慢等问题，Google 在 android 7.0 版本引进了编译速度更快的 soong 来替代 make。最开始，Ninja 是用于 Chromium 浏览器中，Ninja 其实就是一个编译系统，类似 make ，使用 Ninja 主要目的就是因为其编译速度快

![[../assets/Android.bp各工具关系.excalidraw|100%]]

Android. bp 文件很简单。它们不包含任何条件语句，也不包含控制流语句；每一个模块以模块类型开始，后面跟着一组模块的属性，以名值对 (name: value) 表示, 类似 JSON 语句，每个模块都必须有一个 name 属性. 其属性值必须是全局唯一的，基本格式如下
```android.bp
[module type] {

	name: "[name value]",

	[property1 name]："[property1 value]",

	[property2 name]："[property2 value]",

}
```

* 简单的 Android. mk 和 Android.bp 比对
![[../assets/简单的Android.mk和Android.bp比对.excalidraw|100%]]

* Android. mk 转换成 Android.bp
~~~shell
androidmk Android.mk > Android.bp
~~~

> [!attention] 文件命名
> soong 的编译配置文件以. bp 结尾，通常命名为 Android. bp，但也有少数情况不以 Android. bp 命名。例如：external/libdrm/Android. sources. bp， frameworks/rs/support.bp
* 注释
Android.mk 中可以进行注释，当然 Android.bp 里面也可以，Android.mk 中使用" `#` "然后添加注释，Android.bp 使用单行注释 `//` 和多行注释 `/* */` 两种方式


# Link 
* <https://android.googlesource.com/platform/build/soong/+/refs/heads/master/README.md>
* <https://source.android.com/setup/build>
* <https://blog.csdn.net/ldswfun/article/details/120730546?spm=1001.2014.3001.5502>
