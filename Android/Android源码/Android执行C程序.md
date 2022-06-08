---
tags: Android
---

# Android 执行 C 程序
1. 在 development 目录下创建 hello 目录
2. 编写 C 程序
	~~~c
	#include <stdio.h>  
	int main(int argc, char **argv)  
	{  
	    printf("Hello World!\n");  
	return 0;  
	}
	~~~

3. hello 目录下编译 Android.mk 文件
~~~Makefile
	LOCAL_PATH:= $(call my-dir)  
	include $(CLEAR_VARS)  
	LOCAL_MODULE_TAGS := optional  
	LOCAL_SRC_FILES:= \  
    hello.c  
	LOCAL_MODULE := helloworld  
	include $(BUILD_EXECUTABLE)
~~~

* Android.mk 另一种写法
~~~Makefile:Android.mk
	LOCAL_PATH:= $(call my-dir)  
	include $(CLEAR_VARS)  
	   
	LOCAL_STATIC_LIBRARIES := libcutils libc  
	LOCAL_MODULE := helloworld  
	LOCAL_MODULE_TAGS := eng  
	   
	LOCAL_FORCE_STATIC_EXECUTABLE := true  
	LOCAL_SRC_FILES:= \  
	        hello.c  
	   
	LOCAL_C_INCLUDES := bionic/libc/bionic  
	   
	ifeq ($(HAVE_SELINUX),true)  
	LOCAL_CFLAGS += -DHAVE_SELINUX  
	LOCAL_SHARED_LIBRARIES += libselinux  
	LOCAL_C_INCLUDES += external/libselinux/include  
	endif  
	   
	include $(BUILD_EXECUTABLE)
~~~
LOCAL_SRC_FILES 用来指定源文件；，LOCAL_MODULE 指定要编译的模块的名字，下一步骤编译时就要用到；include `$(BUILD_EXECUTABLE)` 表示要编译成一个可执行文件，如果想编译成动态库则可用 BUILD_SHARED_LIBRARY，这些可以在$ (YOUR_ANDROID)/build/core/config. mk 查到
# Link
* <https://blog.csdn.net/zlcchina/article/details/12974257>
* <https://shareprogrammingtips.blogspot.com/2018/07/cross-compile-cc-based-programs-and-run.html>

