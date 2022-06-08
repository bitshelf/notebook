---
tags:
  - Android/Debug
---

## Android framework 调试
### Java 代码调试
```java
import android.util.Log;

public static void main(String[] args) {
		Log.d("debug", "SystemServer is starting");
		//打印调用堆栈的方法
        for (StackTraceElement e : Thread.currentThread().getStackTrace()) {
            Log.d("debug", e.toString());
        }
}
```

### Java 打印堆栈方式二
```java
import android.os.RemoteException; // 需要的声明

// 加在函数入口处
try{
		throw new Exception();
}catch(Exception e){
		e.printStackTrace();
}
```
### `C++`
```c
//log的头文件
#include "log/log.h"
//直接 define LOG_TAG 会报已定义错误，因为 SurFaceFlinger 模块的 Android.bp 已经定义了 LOG_Tag
//下面这样定义就不会出错了
#ifdef LOG_TAG
#undef LOG_TAG
#define LOG_TAG "debug_native"
#endif

//打印堆栈的头文件
#include <utils/CallStack.h>

//在 main 函数中打印信息

int main(int, char**) {

    //打印日志
    ALOGD("surfaceflinger is starting");

    //打印堆栈
    android::CallStack callStack(LOG_TAG, 1);

    //省略后面的代码
    //......
}
```
- 修改 `/frameworks/native/services/surfaceflinger/Android.bp`,添加 CallStack 的库依赖：
```json
cc_binary {
	shared_libs: [
		"libutilscallstack"
	]
}
```

## Link 
- [如何阅读 Android 系统源码 —— Java 篇 - 掘金](https://juejin.cn/post/7231809738203611194)
- [如何阅读 Android 系统源码 —— C/C++ 篇 - 掘金](https://juejin.cn/post/7231944822101098554)