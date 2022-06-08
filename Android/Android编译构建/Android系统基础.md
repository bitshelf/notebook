---
tags: Android
---

# build 系统
* Android 的 Build 系统可以分成 3 大块：
	1. 第一块是位于 build/core 目录下的文件，这是 Android Build 系统的框架和核心
	2. 第二块是位于 device 目录下的文件，存放的是具体产品的配置文件
	3. 第三块是各模块的编译文件：Android. mk，位于模块的源文件目录下

* makefile
Makefile 文件看上去很庞大，其实主要由 3 种内容构成：变量定义、函数定义和目标依赖规则

