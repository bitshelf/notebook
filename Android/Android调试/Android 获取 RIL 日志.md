---
tags:
  - Android/RIL
---
## Android 自动获取 RIL 日志
1. 关闭SELinux
```shell
adb root
adb shell setenforce 0
```

2. 创建文件夹，然后重启系统
```shell
adb shell mkdir /data/quectel_debug_log
adb shell chmod 777 /data/quectel_debug_log
adb reboot
```

3. pull 日志
```shell
adb pull /data/quectel_debug_log/. ./
```