---
tags: Android
---

# APK 编译
### 编译生成 jar 包
```shell
LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)
LOCAL_SRC_FILES := $(call all-subdir-java-files)
include $(BUILD_STATIC_JAVA_LIBRARY)
# include $(BUILD_JAVA_LIBRARY)
```
- `include $(BUILD_STATIC_JAVA_LIBRARY)` ：编译生成静态 jar 包，使用 `.class` 文件打包而成的 JAR 文件，可以在任何 Java 虚拟机运行
- `include $(BUILD_JAVA_LIBRARY)` : 编译生成共享 jar 包。在静态 jar 包基础上使用 `.dex` 打包而成的 jar 文件，`.dex` 是 Android 系统使用的文件格式

### 依赖 jar 包
```shell
LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)

LOCAL_STATIC_JAVA_LIBRARIES := static-library
# or
# LOCAL_JAVA_LIBRARIES := share-library

LOCAL_SRC_FILES := $(call all_subdir_java-files)
LOCAL_PACKAGE_NAME := LocalPackage
include $(BUILD_PACKAGE)
```
- `LOCAL_STATIC_JAVA_LIBRARIES` : 静态 jar 包
- `LOCAL_JAVA_LIBRARIES` : 动态 jar 包