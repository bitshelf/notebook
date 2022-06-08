---
tags: [Android, 编译]
---

# 示例
~~~Makefile
LOCAL_PATH:=$(call my-dir)
include $(CLEAR_VARS)
LOCAL_MODULE_PATH := $(LOCAL_PATH)
LOCAL_SRC_FILES := filename.c
include $(BUILD_EXECUTANLE)
~~~
* https://sunnybird.github.io/2017/04/11/Android%E5%B9%B3%E5%8F%B0%E5%8F%AF%E6%89%A7%E8%A1%8C%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%A8%8B%E5%BA%8F/
* 
# 编译符号
* `-I` : 头文件
* `-L` : 原路径
* `-l` : 链接
* `LOCAL_LDFLAGS` ：指定第三方库（动态库，动态库）
# 单编命令
## 编译命令的使用
1. Android 目录执行 `source build/envsetup.sh`
2. 选择板型：`lunch <target>`
3. `m` : 编译目标模块
---
* `m` : Makes from the top of the tree.   编译所有的模块
- `mm` : 编译当前目录下的所有模块，不编译依赖模块。当前目录下要有 Android. mk 文件，否则就往上找最近的 Android. mk 文件，会将生成的可执行文件拷到指定目录
- `mmm` : 编译指定路径下所有模块，不编译它所依赖的其它模块，指定路径下要有 Android. mk 文件
* `mma`：编译当前目录下的模块及其依赖项。
* `mmma`：编译指定路径下所有模块，并且包含依赖
# MK 文件
* `Android.mk` : 编译源码 mk 文件，每个 module 和 package 目录都有
* `main.mk` ：定义编译全部代码依赖关系
* `config.mk` ：用于配置编译系统，决定如何编译
* `envsetup.mk` ：定义了编译环境配置
* `product_config.mk` ：读取 Androidproducts.mk 生成 TARGET_DEVICE
* `AndroidProducts.mk` ：定义某厂商所有产品文件列表
* `BoardConfig.mk` : 定义开发板软件相关配置项，将会系统条件编译

# Android.mk 变量
* `include $(BUILD_SHARED_LIBRARY)` 指向编译脚本，动根据 `LOCAL_XXX` 变量把列出来的源代码文件编译成一个共享库(`lib$(LOCAL_MODULE).so)`)，**必须在包含这个文件之前定义 `LOCAL_MODULE` 和 `LOCAL_SRC_FILES` 变量**
* `include $(BUILD_STATIC_LIBRARY)` 编译静态库，生成 `lib$(LOCAL_MODULE).a` 文件，静态库不会复制到 APK 包中，但是能够用于编译共享库
* `include $(BUILD_EXECUTABLE)` ： 指定生成可执行文件
* `include $(BUILD_PACKAGE)` ：指定编译生成 APK
* `include $(CLEAR_VARS)` :*CLEAR_VARS*变量由 build system 提供，并指向指定的 GNU Makefile，由他负责清理 `LOCAL_xxx`
	* 清除 *LOCAL_PATH*
	* 清理动作是必须的，因为所有编译控制文件由同一个 GNU Make 解析和执行，其变量是全局的。清理后能避免相互影响

---

* `LOCAL_MODULE` 必须定义，表示 Android.mk 中的每一个模块，例如：`LOCAL_MODULE := foo` 生成动态库*libfoo.so*
	* `LOCAL_SRC_FILES := hello.c` 需要打包的模块 *C/C++* 源码，不需要列出头文件，C++ 的源码扩展名为*.cpp*, 可以通过 `LOCAL_CPP_EXTENSION` 修改
* `LOCAL_LDLIBS := -lz` ：用于指定那些存在于系统目录下本模块需要链接的库。如果某一个库既有动态库又有静态库，那么默认链接动态库
	* 例子：`LOCAL_LDLIBS += -lm -lz -lc -lcutils -lutils -llog`
* `LOCAL_LDFLAGS += ` : 编译变量传递给链接器一个额外的参数，比如库、库的路径或者传递给 ld linker 的一些链接参数（`-EL(B)` 大小端字节序）
		* 例子：`LOCAL_LDFLAGS += -L$(LOCAL_PATH)/lib/ -EB{EL} -O{n}`
*  `LOCAL_LDFLAGES := ` 链接第三方库 `-L` 链接路径、`-l` 链接库
* `LOCAL_PATH := $(call my-dir)` :Android.mk 文件必须以 LOCAL_PATH 变量作为开始，它的作用是用于定位源码在源码树中的位置，`my-dir` 是一个宏，用于返回源码的路径，定义在 `core/definitiions.mk` 中

# Link & References
* https://developer.android.com/ndk/guides/android_mk
* [(AOSP) Build Systems](https://proandroiddev.com/android-open-source-platform-aosp-build-systems-c98abb390d2d)


