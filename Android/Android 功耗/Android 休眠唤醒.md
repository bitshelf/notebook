---
tags:
  - Android/休眠
---
## Android 查看电源管理日志
```shell
logcat -s PM
logcat -s PowerManagerService # 查看 power 键
```
- PowerManagerService是android系统电源管理的核心服务
- PowerManager(简称PM)是PowerManagerService(后简称PMS)的代理类


