---
tags: AOSP 
---

## `Android.bp` 编译 jar 包
```go
android_library {
    name: "launcher-aosp-tapl",
    static_libs: [
        "androidx.annotation_annotation",
        "androidx.test.runner",
        "androidx.test.rules",
        "androidx.test.uiautomator_uiautomator",
        "androidx.preference_preference",
        "SystemUISharedLib",
    ],  
    srcs: [
        "tests/tapl/**/*.java",                                                                                                                                                                                                          
        "src/com/android/launcher3/ResourceUtils.java",
        "src/com/android/launcher3/testing/TestProtocol.java",
    ],  
    resource_dirs: [ ],
    manifest: "tests/tapl/AndroidManifest.xml",
    platform_apis: true,
}
```

### Link 
- [Android编译之bp文件编写 - FranzKafka Blog](https://coderfan.net/how-to-compose-blueprint-file-to-compile-module-in-android.html)