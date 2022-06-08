---
tags: Android 
---

## 打开指针反馈
- android 系统中有一个命令 setting，通过它可以设置 com. android. setting 中的 item 开关
```shell
settings put system pointer_location 1
# 关闭
settings put system pointer_location 0
```

## 命令行模拟触摸滑动
```shell
input swipe 0 0 0 300 # （0,0） 滑动到 （0,300）
```

## 打开设置显示配置界面
```shell
am start -a android.settings.DISPLAY_SETTINGS
```

---
## Link 
- [adb-command-to-open-settings-and-change-them](https://stackoverflow.com/questions/14432706/adb-command-to-open-settings-and-change-them)