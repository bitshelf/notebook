---
tags: Android 
---

## 调试串口获取当前输入法
```shell
settings get secure default_input_method 
# 设置当前默认输入法
settings put secure default_input_method 
```

### 增加默认输入法配置
```xml
frameworks/base/packages/SettingsProvider/res/values/default.xml

<string name="enabled_input_methods" translatable="false">com.android.inputmethod.latin/.LatinIME</string>

<string name="default_input_method" translatable="false">com.android.inputmethod.latin/.LatinIME</string>
```

### 数据库加载默认输入法
```java
1.安装对应输入法的安装包，install或者系统内置都可以；

2.在设置的数据库中直接加载默认的输入法
frameworks/base/packages/SettingsProvider/src/values/default
private void loadSecureSettings(SQLiteDatabase db) {
    
    .....
    //在这里加上默认输入法的加载
    loadStringSetting(stmt, Settings.Secure.DEFAULT_INPUT_METHOD, R.string.default_input_method);
    
    loadStringSetting(stmt, Settings.Secure.ENABLED_INPUT_METHODS, R.string.enabled_input_methods);
    
    ....
}
```

![[Android 获取应用信息]]