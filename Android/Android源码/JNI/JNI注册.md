---
tags: JNI
---

## Android JNI 
1. 静态注册 JNI 函数
	- 静态注册基于命名约定建立映射关系，而动态注册通过 `JNINativeMethod` 结构体建立映射关系
	- 静态注册在首次调用该 native 方法搜索并建立映射关系，而动态注册会在调用该 native 方法前建立映射关系
	- 静态注册需要将所有 JNI 函数暴露到动态符号表，而动态注册不需要暴露到动态符号表，可以精简 so 文件体积
2. 动态注册 JNI 函数
	- RegisterNatives 方式的本质是直接通过结构体指定映射关系，而不是等到调用 native 方法时搜索 JNI 函数指针，因此动态注册的 native 方法调用效率更高
	- 减少生成 so 库文件中导出符号的数量，则能够优化 so 库文件的体积

## Link 
- [JNI 提示  |  Android NDK  |  Android Developers](https://developer.android.google.cn/training/articles/perf-jni#kotlin)