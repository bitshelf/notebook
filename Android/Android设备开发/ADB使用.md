---
tags: Android adb
---
# ADB工具

文档：[Android 调试桥 (adb)  |  Android 开发者  |  Android Developers](https://developer.android.com/studio/command-line/adb?hl=zh-cn "Android 调试桥 (adb)  |  Android 开发者  |  Android Developers")

**adb**（*Android Debug Bridge*）通过adb可以管理、操作模拟器和设备，如安装软件、查看设备软硬件参数、系统升级、运行shell命令等

## ADB 命令
1.  `adb remount` : 将 '/system' 部分置于可写入的模式

    默认情况下 `/system`部分是只读模式的。这个命令只适用于已被 root 的设备。

    在将文件 `push` 到 `/system` 文件夹之前，必须先输入命令 `adb remount`

    `adb remount` 的作用相当于 `adb shell mount -o rw,remount,rw /system`

2. `adb root` ：切换到 root 用户
3.  `adb start-server`:启动adb进程

4.  `adb kill-server`：杀死adb进程

5.  `adb shell`进入`linux`命令行

6.  `adb install`:安装应用

7.  `adb uninstall`:卸载应用

8.  `adb devices`：查看当前已连接的设备

9.  `netstat -ano`：查看端口的进程

## 显示系统中全部 Android 平台

11. `adb pull <remote> <local> `:获取文件

12. `adb push <local> <remote> `:写文件

13. `adb help `: 查看adb命令帮助信息

14. `adb logcat -s 标签名 `: 在命令行中查看LOG信息

15. `adb get-product` `adb get-serialno`:获取设备的ID和序列号

16. `adb shell pm list packages`: 获取当前设备内安装的所有app包名

17. `adb shell getprop ro.product.model`:  手机型号

18. `adb shell dumpsys battery`:  电池状况

19. `adb shell wm size`:  屏幕分辨率

20. `adb shell wm density`:  屏幕密度

21. `adb shell getprop ro.build.version.release`:  安卓版本

22. `adb shell cat /proc/cpuinfo`:  cpu信息

23. `adb shell cat /proc/meminfo`:  内存信息

24. `adb shell dumpsys activity | find "mFocusedActivity"` 获取前台正在运行的app包名

25. `adb devices -l`:查询设备

    说明：如果您包含 `-l` 选项，`devices` 命令会告知您设备是什么。当您连接了多个设备时，此信息很有用，可帮助您将它们区分开来

26. `adb shell pm list packages -[option]` 命令查看已经安装的应用，列出包名，后面加不同的后缀输出不同信息

27. `adb shell pm list packages`     查看当前连接设备或者虚拟机的所有包

28. `adb shell pm list packages -d`   只输出禁用的包

29. `adb shell pm list packages -e`    只输出启用的包

30. `adb shell pm list packages -s `   只输出系统的包

31. `adb shell pm list packages -i`   只输出包和安装信息（安装来源）

32. `adb shell pm list packages -u`  只输出包和未安装包信息（安装来源）

33. `adb shell pm list packages -i`   只输出包和安装信息（安装来源）

34. `adb shell pm list packages -f`   输出包和包相关联的文件

35. `adb shell pm list packages -3`   输出所有第三方包

36. `adb shell pm list packages -[option] "sina"`   按照要求搜索包

#### 状态：设备的连接状态可以是以下几项之一

1.  `offline`：设备未连接到 adb 或没有响应

2.  `device`：设备现已连接到 adb 服务器。请注意，此状态并不表示 Android 系统已完全启动并可正常运行，因为在设备连接到 adb 时系统仍在启动。不过，在启动后，这将是设备的正常运行状态

3.  `no device`：未连接任何设备

说明：如果您包含 -l 选项，devices 命令会告知您设备是什么。当您连接了多个设备时，此信息很有用，可帮助您将它们区分开来

## 网络ADB测试

* 在串口输入: `setprop persist.internet.adb.enable 1` 开启 adb 网络测试
* 查看**adb**端口号：`getprop service.adb.tcp.port` 检查 adb 是否启动成功
* 网络 adb 连接：`adb connect 192.168.0.111:5555`
* 断开 adb 连接：`adb disconnect`
* 选择设备：`adb -s serial-number`

## Android 开启 adb
1. `setprop service.adb.tcp.port 5555`
2. `stop adbd`
3. `start adbd`

## adb 输入文本
```shell
adb shell input text <text>
```
## 设备的端口转发
```shell
adb forward tcp:23946  tcp:23946  
adb forward tcp:8700 jdwp:1786
```

- 查看设备中可以被调试的应用的进程号：`adb jdwp`

## 操作 apk 命令  
1. 查看 aapt 中的信息以及编辑 apk 程序包  
~~~shell
aapt dump xmltree [apk包][需要查看的资源文件xml] 
aapt dump xmltree demo.apk AndroidManifest.xml
aapt dump xmltree demo.apk AndroidManifest.xml>D:/123/456.txt 
~~~

2. 用 dexdump 查看 dex 文件的详细信息  
~~~shell
dexdump [dex文件路径]  
~~~

3. 查看当前运行应用、进程的包名与 Activity 名
~~~shell
adb shell dumpsys window | findstr mCurrentFocus
~~~

## adb shell 用户切换
```shell
# 对应 su
su shell

# 对应 adb root
adb unroot
```

## 对程序进行调试  
~~~shell
adb shell am start -D -n [包名]/[包名].[活动activity名称]  
~~~

- `-D` 的意思是用 Debug 方式启动应用
### 启动一个应用/服务/发送一个广播  
~~~shell
adb shell am start -n [包名]/[包名].[活动activity名称]  
adb shell am startservice -n [包(package)名]/[包名].[服务(service)名]  
adb shell am broadcast -a [广播动作]
# 启动nubia手机的抓拍功能
adb shell am broadcast -a com.android.captureCamera.CaptureCameraService  
~~~

## adb 设置全局代{过}{滤}理  
- 设置代{过}{滤}理  
~~~shell
adb shell settings put global http_proxy IP地址:端口号  
~~~
-  移除代{过}{滤}理  
~~~shell
adb shell settings delete global http_proxy  
adb shell settings delete global global_http_proxy_host  
adb shell settings delete global global_http_proxy_port
~~~
