---
tags: [Android]
---

# 一些例子
#### 查看上次 log
可以加-L 参数来打印出上次系统复位前的 logcat 信息。若出现拷机异常或者异常掉电的情况，可通过该命令打印出上一次 Android 运行状态的日志。
```shell
logcat -L
```

1. 将缓冲区日志输出：`adb logcat -d`
2. 输出最新 $10$ 行的日志：`adb logcat -t 10`
3.  `-v` ：设置日志消息的输出格式，默认格式为 `threadtime` ：`logcat -v time` 
4. 获取的简短 Logcat 输出的示例： `logcat -v brief output` 
5. 查看类型缓冲区：`logcat -b 缓冲区类型`
	1. **system**  - 存储源自 Android 操作系统的消息
	2. **radio**  - 无线装置/电话相关消息的缓冲区
	3. **events**  - 事件相关的日志信息
	4. **crash** - 用于存储崩溃日志
	5. **main**  - 默认的缓冲区
	6. **all**  - 查看所有缓冲区
	7. **default** - 查看*main*、*system*和*crash*缓冲区
````ad-example
```shell
adb logcat ActivityManager:I  *:S
```
- `*:S` 将所有标记的优先级设为“静默”，只输出`ActivityManager`的日志消息
````
# 过滤项
* `V` :Verbose 详细（最低优先级）
* `D` ：Debug 调试
* `I` ：info 信息
* `W` ：Warn 警告
* `E` ：Error 错误
* `F` ：Fatal 严重错误
* `S` ：静默（最高优先级，绝不会输出任何内容）

---
## Link 
- [Android logcat](https://developer.android.com/studio/command-line/logcat?hl=zh-cn)
- [logcat | Android Developers](https://stuff.mit.edu/afs/sipb/project/android/docs/tools/help/logcat.html)
---
# 基础知识
* Android 日志记录系统是系统进程 `logd` 维护的一组结构化环形缓冲区。这组可用的缓冲区是固定的，并由系统定义
## 通过代码记录日志

通过 `Log` 类，在代码中创建日志条目，而这些条目会显示在 Logcat 工具中。常用的日志记录方法包括：
* `Log.v(String, String)`（详细）
* `Log.d(String, String)`（调试）
* `Log.i(String, String)`（信息）
* `Log.w(String, String)`（警告）
* `Log.e(String, String)`（错误）

