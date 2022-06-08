---
tags: [adb,command]
---

# 一些例子
* 进入 adb shell 重新挂载 system 目录：`mount -o remount /system`

*  查看可用工具的列表：`adb shell ls /system/bin`

* 截屏保存到 `/data` 目录下：
```shell
adb shell screencap -p /data/screenname.png
````

* 录屏：`adb shell screenrecord /sdcard/demo.mp4`
	* *Ctrl + C* 键停止屏幕录制；如果不手动停止，到三分钟或 --time-limit 设置的时间限制时，录制将会自动停止
	* 音频不与视频文件一起录制
	* 在录制期间屏幕发生了旋转，则在录制时将被切断
	* 设置分辨率 `--size widthxheight`
	* 录制比特率设为 6Mbps：`screenrecord --bit-rate 6000000 /sdcard/demo.mp4`
	* 设置最大录制时长：`--time-limit time`
	* 在命令行屏幕显示日志信息：`--verbose`
	* 在串口输入: `setprop persist.internet.adb.enable 1` 开启 adb 网络测试
	* 查看**adb**端口号：`getprop service.adb.tcp.port` 检查 adb 是否启动成功

# Windows 客户端
*  `adb devices -l` 查看已连接设备列表，*device*状态：设备现已连接到 adb 服务器

> [!attention] 请注意，此状态并不表示 Android 系统已完全启动并可正常运行，因为在设备连接到 adb 时系统仍在启动。不过，在启动后，这将是设备的正常运行状态

* 在 **Android 平台工具 23** 及更高版本中， `adb shell setprop foo 'a b'` 命令现在会返回错误，因为==单引号 (`'`) 会被本地 shell 消去==，设备看到的是 `adb shell setprop foo a b`。如需使该命令正常运行，请引用两次，一次用于本地 shell，另一次用于远程 shell，与处理 `ssh(1)` 的方法相同。例如，`adb shell setprop foo "'a b'"`

*  adb shell 中，您可以使用 Activity 管理器 (`am`) 工具发出命令, 如启动 Activity、强行停止进程、广播 intent、修改设备屏幕属性。语法为 `am command`

---
* adb 工具下载：< https://developer.android.com/studio/releases/platform-tools>
# Ubuntu
1. 添加到*plugdev*组 `sudo usermod -aG plugdev $LOGNAME`，需要重新登录，更改才能生效，可以使用 `id` 检查自己是否在 *plugdev* 组中
2. 添加规则：`apt-get install android-sdk-platform-tools-common`
---
# 相关连接
1. [Android ADB 官网](https://developer.android.com/studio/command-line/adb?hl=zh-cn#Enabling)
2. <https://adbshell.com/commands/adb-install>
<iframe 
    height = 400
    width = 100%
    src="https://adbshell.com/commands/adb-install">
</iframe>

# ADB 工具
1. QtSrccpy：[QtScrcpy: Android实时投屏软件](https://gitee.com/Barryda/QtScrcpy)
2. ARDC![](../assets/ARDC(B1669).rar)
3. scrcpy：[GitHub - Genymobile/scrcpy: Display and control your Android device](https://github.com/Genymobile/scrcpy)
