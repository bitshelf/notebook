---
tags:
  - Android/Settings
---
## SettingsProvider
SettingsProvider 顾名思义是一个提供设置数据共享的 Provider，SettingsProvider 和 Android 系统其它 Provider 有很多不一样的地方，如：
- SettingsProvider只接受int、float、string等基本类型的数据；
- SettingsProvider由Android系统framework进行了封装，使用更加快捷方便
- SettingsProvider 的数据由键值对组成

### 数据分类
- Global：所有的偏好设置对系统的所有用户公开，第三方 APP 有读没有写的权限
- System：包含各种各样的用户偏好系统设置
- Secure：安全性的用户偏好系统设置，第三方 APP 有读没有写的权限

### SettingsProvider 和 SystemProperties 的不同点
- 数据保存方式不同：SystemProperties 的数据保存属性文件中（/system/build. prop 等），开机后会被加载到 system properties store；SettingsProvider 的数据保存在文件`/data/system/users/0/settings_***. xml` 和数据库 settings. db中
- 作用范围不同：SystemProperties 可以实现跨进程、跨层次调用，即底层的 c/c++可以调用，java 层也可以调用；SettingProvider 只能能在 java 层（APP）使用
- 公开程度不同：SettingProvider有部分功能上层第三方APP可以使用，SystemProperties上层第三方APP不可以使用
- 在 Android 6.0 版本时，SettingsProvider 被重构，Android 从性能、安全等方面考虑，把 SettingsProvider 中原本保存在 settings. db 中的数据，目前全部保存在 XML 文件中

