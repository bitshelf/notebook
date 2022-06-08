---
tags: Android 
---

# Android系统服务
| 引导服务       | 作用                                        |
| -------------- | ------------------------------------------- |
| PackageManager | 用来对apk进行安装、解析、删除、卸载等等操作 |
|     ActivityManagerService           | 负责四大件的启动、切换、调度                |
|     Installer           |        系统安装apk时的一个服务类，启动完成Installer服务之后才能启动其他的系统服务                                     |

| 核心服务              | 作用                                   |
| --------------------- | -------------------------------------- |
| DropBoxManagerService | 用于生成和管理系统运行时的一些日志文件 |
| BatteryService        | 管理电池相关的服务                     |
| UsageStatsService     | 收集用户使用每一个APP的频率，使用时长  |

| 其他服务             | 作用           |
| -------------------- | -------------- |
| WindowManagerService | 窗口管理服务   |
| InputMangerService   | 管理输入事件   |
| CameraService        | 摄像头相关服务 |
