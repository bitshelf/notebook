---
tags:
  - JNI
---

## 基础 CMakeList. txt
```CMakelist
# 设置CMake版本
cmake_minimum_required(VERSION 3.18.1)
 
# 设置变量
set(jnicpp_src "${CMAKE_SOURCE_DIR}/src")    #src源码路径
set(jnicpp_inc "${CMAKE_SOURCE_DIR}/inc")    #inc头文件路径
set(jnilibs_dir "${CMAKE_SOURCE_DIR}/src/main/jnilibs")  #so/.a
 
# 1.创建和命名库，本demo里是要生成的库jnidemo.so
# 2.设置要生成的库的属性：STATIC(.a) 或 SHARED(.so)
# 3.设置生成库的源码路径
# 4.可以定义多个库，CMake都会进行编译，Gradle再自动将库打包到Apk
add_library(
        jnidemo    #设置so文件名称
        SHARED     #设置这个so文件为共享
        ${jnicpp_src}/jnidemo.cpp)   #源码路径
 
#指定需要使用的公共NDK库
find_library(
        log-lib  # 设置路径变量名称
        log)     # 指定需要CMake去搜寻定位的公共NDK库
 
#链接头文件
target_include_directories(
        jnidemo    #Jni库
        PRIVATE    #对外引用属性
        ${jnicpp_inc})  #头文件路径
 
#包含头文件
#这个方法与target_include_directories()不同
#设置后，当前目录的所有子目录中的CMakeLists.txt头文件包含都会引用该方法中的变量定义
#include_directories(${jnicpp_inc})
 
# 指定需要用CMake链接到目标库的库。
# 可以链接多个库，例如在本脚本中定义的库、预构建的第三方库或系统库。
target_link_libraries(
        jnidemo     #指定目标库
        ${log-lib}  # 链接NDK中的log-lib库到目标库
)
```

### JNI CPP JNI_OnLoad
```cpp
static const JNINativeMethod nativeMethod[] = {
        {"gpiod_chip_open_by_name", "(Ljava/lang/String;)I", (void *)gpiod_1chip_1open_1by_1name},
        {"gpiod_chip_get_line", "(I)I", (void *)gpiod_1chip_1get_1line},
        {"gpiod_line_set_value", "(II)I", (void *)gpiod_1line_1set_1value},
        {"gpiod_line_release", "(I)I", (void *)gpiod_1line_1release},
        {"gpiod_chip_close", "(I)I", (void *)gpiod_1chip_1close},
        {"gpiod_line_request_output", "(ILjava/lang/String;I)I", (void *)gpiod_1line_1request_1output},

};

static int registNativeMethod(JNIEnv *env) {
    int result = -1;

    jclass class_text = env->FindClass("com/jni/gpio/gpio");
    if (env->RegisterNatives(class_text, nativeMethod,
                             sizeof(nativeMethod) / sizeof(nativeMethod[0])) == JNI_OK) {
        result = 0;
    }
    return result;
}

jint JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env = NULL;
    int result = -1;

    if (vm->GetEnv((void **) &env, JNI_VERSION_1_1) == JNI_OK) {
        if (registNativeMethod(env) == JNI_OK) {
            result = JNI_VERSION_1_6;
        }
        return result;
    }
}
```

### JNI C JNI_OnLoad 
```c
JNIEXPORT jint JNICALL
JNI_OnLoad(JavaVM *jvm, void *reserved) {

    JNIEnv *env = NULL;
    jclass cls;

    if ((*jvm)->GetEnv(jvm, (void **)&env, JNI_VERSION_1_6)) {
        return JNI_ERR; /* JNI version not supported */
    }
    cls = (*env)->FindClass(env, "com/jni/gpio/gpio");
    if (cls == NULL) {
        return JNI_ERR;
    }

    /* 2. map java hello <-->c c_hello */
    if ((*env)->RegisterNatives(env, cls, nativeMethod, 1) < 0)
        return JNI_ERR;

    return JNI_VERSION_1_6;
}
```
## link 
- [Android：JNI实战，加载三方库、编译C/C++\_android studio jni-CSDN博客](https://blog.csdn.net/geyichongchujianghu/article/details/135514428)
- [Fetching Title#f0uf](https://github.com/starnight/libgpiod-example/blob/master/libgpiod-scan/main.c)