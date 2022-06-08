---
tags: Android,Makefile
---

# Android 编写模板
最简单的模板：hardware/ril/rild/Android.mk
```shell
#获取Androd.mk所在路径  
LOCAL\_PATH:= $(call my-dir)  
#清空以LOCAL\_xxx的变量， 除了LOCAL\_PATH  
include $(CLEAR\_VARS)  
#指定源文件  
LOCAL\_SRC\_FILES:= \\  
        rild.c  
#指定目标文件  
LOCAL\_MODULE:= rild  
#编译规则  
include $(BUILD\_EXECUTABLE)  
```
---

* c/c++代码编译成 elf 可执行程序：
```Makefile
LOCAL\_PATH:= $(call my-dir)  
include $(CLEAR\_VARS)  
LOCAL\_SRC\_FILES:= \\  
       hello.c

# optional表示在任何模式下都会编译

LOCAL\_MODULE\_TAGS := optional  
LOCAL\_MODULE:= hello\_elf  
include $(BUILD\_EXECUTABLE)  
```

---
* 编译成动态库
```Makefile
LOCAL\_PATH:= $(call my-dir)  
include $(CLEAR\_VARS)  
LOCAL\_MODULE\_TAGS := optional  
LOCAL\_SRC\_FILES:= myled\_jni.cpp  
LOCAL\_SHARED\_LIBRARIES := \\  
        libutils  
LOCAL\_MODULE:=libled\_jni  
include $(BUILD\_SHARED\_LIBRARY)  
```

---
* 预编译： 表示拷贝  
prebuilt/android-arm/gdbserver$ vim Android.mk  
```Makefile
LOCAL\_PATH := $(call my-dir)  
include $(CLEAR\_VARS)  
LOCAL\_SRC\_FILES := ADV7123.pdf  
LOCAL\_MODULE := ADV7123.pdf

#指定目标文件安装路径  
LOCAL\_MODULE\_PATH := $(TARGET\_OUT\_ETC)  
LOCAL\_MODULE\_CLASS := ETC  
LOCAL\_MODULE\_TAGS := optional

#预编译方式  
include $(BUILD\_PREBUILT)
```


## Link
- [Android.mk](https://developer.android.com/ndk/guides/android_mk)