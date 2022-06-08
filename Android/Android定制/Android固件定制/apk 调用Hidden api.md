---
tags: Android 
---

## AOSP 使用 `Android.bp` 编译
- 在 Android. bp 中配置相关权限：`platform_apis: true,`
- 在 `AndroidManifest.xml` 中对相关权限进行声明
```go
android_app {
    name: "App_Name",

    owner: "google",

    srcs: ["src/**/*.java"],

    resource_dirs: ["res"],

    // registerReceiverForAllUsers() is a hidden api.need this setting
    platform_apis: true,

}
```

### 权限申明
```xml
<!-- for registerReceiverForAllUsers() -->
<uses-permission android:name="android.permission.INTERACT_ACROSS_USERS_FULL" />
```

## Android Stuido 环境下使用 Gradle 配置编译
 - `AndroidManifest.xml` 中对相关权限进行声明
 - 替换掉 Android Studio 下载的 SDK 中的 `${Android Sdk}/platforms/andorid-api/` 的 jar 包
 - jar 查找
```shell
$ jar xf android.jar | grep -nr registerReceiverForAllUsers
Binary file android/content/ContextWrapper.class matches
Binary file android/content/Context.class matches
```

## Link 
-  [Android SDK Hidden API使用 - FranzKafka Blog](https://coderfan.net/using-android-sdk-hidden-api.html)
- [Android.bp 文件中引入aar、jar、so库正确编译方法(值得收藏)-阿里云开发者社区](https://developer.aliyun.com/article/1198035)