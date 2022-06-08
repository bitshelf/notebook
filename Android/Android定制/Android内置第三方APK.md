---
tags: Android
---

# Android 12 内置 apk
### 内置 apk 报错
> [!error]  内置失败
> <font color=red> error</font>：mismatch in the \<uses-library> tags between  the build system and the Manifes 
> 修改 Android.mk，添加 `LOCAL_ENFORCE_USES_LIBRARIES := false`


#### 替换 launcher 桌面，不删除 launcher3 的源码
```Makefile
LOCAL_OVERRIDES_PACKAGES := Launcher3
```

### 修改 PRODUCT_PACKAGES 变量
PRODUCT_DEL_PACKAGES，表示需要删掉的module