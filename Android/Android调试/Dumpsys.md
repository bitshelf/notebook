---
tags: Android
---

# dumpsys
- Dumpsys 工具是 Android 系统中自带的一款调试工具，运行在设备侧的 shell 环境下。
- 提供系统中正在运行的服务状态信息功能。正在运行的服务是指 Android binder 机制中的服务端进程。

### dumpsys 输出打印的条件
- 只能打印已经加载到 ServiceManager 中的服务。
- 如果服务端代码中的 dump 函数没有被实现，则没有信息输出。
---
- 查看 dumpsys 包含服务列表： `dumpsys -l`
- 输出指定服务的信息：`dumpsys [servicename]`
- 输出指定服务和应有进程的信息:  `dumpsys [servicename] [应用名]`
	- 输出服务名为 meminfo，进程名为 com. android. systemui 的内存信息
```shell
dumpsys meminfo com.android.systemui
```

