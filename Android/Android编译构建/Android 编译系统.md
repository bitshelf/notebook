---
tags: Android
---

# Android 编译系统
1. `main.mk` 整个编译系统的主导配置文件
2. `config.mk` 产品配置的主导文件
3. `base_rules.mk` 编译系统需要遵循的基础规则定义。以下是一些重要的变量：
	1. `ALL_MODULES` : 他负责将各个 `Android.mk` 中的 `LOCAL_MODULE` 添加到全局依赖树中，从而保证所有的的模块都参与到整个系统的编译中
	2. `LOCAL_BUILD_MODULE` : `LOCAL_BUILD_MODULE=out/target/product/generic/obj/JAVA_LIBRARIES/framework/intermediates/javalib.jar`
	4. `LOCAL_INSTALLED_MODULE` : `LOCAL_INSTALLED_MODULE=out/target/product/generic/system/framework/framework.jar`
	5. 添加到 `ALL_MODULES` 的是 `my_register_name`，依赖于 `LOCAL_BUILD_MODULE` 和 `LOCAL_INSTALLED_MODULE`
4. `build_id.mk` : 版本 id 号的定义
5. `cleanbuild.mk` clean 操作的定义
6. `clear_vars.mk` ： 清空以 LOCAL 开头的相关系统变量
7. `definitions.mk` : 提供了实用函数的定义
8. `envsetup.mk` : 配置编译时的环境变量，注意要与 `envsetup.sh` 区分开来
9. `executable.mk` : 负责 `BUILD_EXECUTABLE` 的具体实现
10. `Java.mk` ： 负责与 Java 语言相关的编译实现，是 `java_libarymk` 是基础
11. `host_executable.mk` : 负责 `BUILD_HOST_EXECUTABLE` 的具体实现
12. `host_static_libary.mk` : 负责 BUILD_ HOST_ STATIC_ LIBRARY 的具体实现, 另外，其他类型的BUILD_ XX变量也都有其对应的Makefile文件实现
13. `product_config.mk` : 产品级别的配置，属于 config 的一部分
14. `version_defaults.mk` : 负责生成版本信息，默认格式为：`BUILD_NUMBER :=  eng.$(USER).$(shell date+%Y%m%d.%H%M%S)`

# Link
- [android.cloudchou.com/build/core/product_config.html](http://android.cloudchou.com/build/core/product_config.html)
- [Android编译系统详解(一)——build/envsetup.sh](http://www.cloudchou.com/android/post-134.html)