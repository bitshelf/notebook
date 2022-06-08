---
tags:
  - Android/App
---

##  Step1 把 .so file 放到 Android Studio project 正确的路径中

需要新建一个名为 `jniLibs` 文件夹，根据目标机器的 CPU-ABI 类型，把 .so file 放入对应的路径下：

```
weiyi$ <span>cd</span> app/src/main/
weiyi$ tree -L 2
.
├── AndroidManifest.xml
├── java
├── jniLibs
│   ├── armeabi
│   │   └── libhello-jni.so
│   └── armeabi-v7a
│       └── libhello-jni.so
└── res
```

至于在其它编译器（eclipse等）中的路径，以及 `armeabi` 和 `armeabi-v7a` 的解释，参考 [StackOverflow - System.loadLibrary(…) couldn't find native library in my case](http://stackoverflow.com/questions/27421134/system-loadlibrary-couldnt-find-native-library-in-my-case)

.so file 需要通过 NDK tool 编译 c/c++ 得到，可以从 [android.googlesource.com](https://android.googlesource.com/platform/development/+/c817c5210e4207908b83faaf08a2c5b95251f871/ndk/samples/hello-jni/libs/armeabi/libhello-jni.so) 下载 `libhello-jni.so`。

## Step2 加载 .so library 并声明 native method

Java 端实现加载 .so library：（HelloJni.java）

```java
package com.example.hellojni;

public class HelloJni {
    public native String stringFromJNI();

    static {
        System.loadLibrary("hello-jni");
    }
}
```

这篇开发文档 [Developer - Sample: hello-jni](http://developer.android.com/ndk/samples/sample_hellojni.html#ji) 解释了 `native` 关键字。

## Step3 最后就可以调用 .so library native method 了

类似调用任何一个类的方法：

```javA
    HelloJni helloJni = <span>new</span> HelloJni();
    LOGD(TAG, helloJni.stringFromJNI());
```

可以看到 log：`Hello from JNI !`。而整个工程目录应该是这样：

```
weiyiWorkCell:main weiyi$ tree -L 5
.
├── AndroidManifest.xml
├── java
│   └── com
│       ├── example
│       │   └── hellojni
│       │       └── HelloJni.java
├── jniLibs
│   ├── armeabi
│   │   ├── libhello-jni.so
│   └── armeabi-v7a
│       ├── libhello-jni.so
└── res
```

## UnsatisfiedLinkError: No implementation found

在 step2 时，假如把 native method 声明在了一个**随意命名**的 package 或者随意命名的 java file 内，比如 `com.example.hellojni21.HelloJni`，你会遇到如下 exception：

```
java.lang.UnsatisfiedLinkError:
No implementation found <span>for</span> java.lang.String com.example.hellojni21.HelloJni.stringFromJNI() tried
Java_com_example_hellojni21_HelloJni_stringFromJNI and
Java_com_example_hellojni21_HelloJni_stringFromJNI__
```

这是因为命名存在一个默认的规则。 .so file 需要通过 NDK tool 编译 c/c++ 得到，c/c++ 实现 native method 时，要按如下规则命名，以 libhello-jni.so 为例：

```java
jstring
Java_com_example_hellojni_HelloJni_stringFromJNI( JNIEnv* env, jobject thiz )
// 规则如下：
Java_package_file_method(...)
```

所以，Java 端的包名、文件名、方法名就被规定好了，包名必须是 `com_example_hellojni`，文件名必须是 `HelloJni`，native method 声明必须是 `String stringFromJNI()`。

这篇开发文档 [Developer - Sample: hello-jni](http://developer.android.com/ndk/samples/sample_hellojni.html#ci) 描述了命名规则。

我们还可以通过命令行列出 shared library 中的方法：

```shell
weiyi$ nm -D libhello-jni.so
00000b90 T Java_com_example_hellojni_HelloJni_stringFromJNI
```

参考：

-   [Develper - Android NDK Preview](http://tools.android.com/tech-docs/android-ndk-preview)
-   [Developer - NDK Setup](http://developer.android.com/ndk/guides/setup.html)
-   [Developer - JNI Tips](http://developer.android.com/training/articles/perf-jni.html#native_libraries)
-   [Developer - Create Hello-JNI with Android studio](https://codelabs.developers.google.com/codelabs/android-studio-jni/index.html)
-   [Developer - Sample: hello-jni](http://developer.android.com/ndk/samples/sample_hellojni.html#ci)
-   [GitHub - googlesamples/android-ndk](https://github.com/googlesamples/android-ndk)
-   [StackOverflow - How to include \*.so library in Android Studio?](http://stackoverflow.com/questions/24357687/how-to-include-so-library-in-android-studio)
-   [StackOverflow - Using existing shared library (.so) in Android application](http://stackoverflow.com/questions/6449225/using-existing-shared-library-so-in-android-application)
-   [StackOverflow - System.loadLibrary(…) couldn't find native library in my case](http://stackoverflow.com/questions/27421134/system-loadlibrary-couldnt-find-native-library-in-my-case)
-   [StackOverflow - How do I view the list of functions a Linux shared library is exporting?](http://stackoverflow.com/questions/4514745/how-do-i-view-the-list-of-functions-a-linux-shared-library-is-exporting)
-   [blog - The new NDK support in Android Studio](http://ph0b.com/new-android-studio-ndk-support/)
-   [blog - java.lang.UnsatisfiedLinkError: Native method not found 三种可能解决方案](http://blog.csdn.net/lilu_leo/article/details/10950047)
-   [blog - Android动态加载补充 加载SD卡中的SO库 by kaede](https://segmentfault.com/a/1190000004062899)

## link 
- [Android Studio 中包含*.so library，并使用库中定义](https://li2.gitbooks.io/android-programming-journey/content/Blog/2016-04-13-how-to-include-and-use-so-library-in-android-studio.html)