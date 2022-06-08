---
tags: Android
---
# Android adb 查看用户目录
1. Download 目录：`/mnt/user/0/emulated/0/Download/`

# Android 运行时根文件系统
| 目录                                                             | 作用                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| acct                                                             | Android Cgroup 的挂载点， Cgroup 是 control group 的缩写。这是一个 Linux 内核的特性。用来对组内进程所使用的资源（如 CPU、[内存](https://so.csdn.net/so/search?q=%E5%86%85%E5%AD%98&spm=1001.2101.3001.7020)、磁盘输入输出等）进行限制、统计与隔离                                                                                                                       |
| apex                                                             | apex 文件安装路径， android10 引进的技术， Android Pony EXpress (APEX) ， APEX 和 APK 类似，它原来存在于只读系统分区的功能模块搞成一个个可更新升级的模块，然后可以单独升级这些模块，这样就没必要升级整个系统。其 apex 就是一个压缩包，后缀名叫. apex，apex 中独立配置运行时的加载的 java 库， c 库等信息。apex 文件安装的时候会通过关联 loop 设备挂载在/apex/xxx 目录下 |
| bin -> /system/bin                                               | 为 android 系统提供各种命令，如 cp, ls, input, dumpsys 等。当然还包括各种 android 的本地进程对应的二进制文件，如 app_process，netd 等                                                                                                                                                                                                                                   |
| bugreports -> /data/user_de/0/com.android.shell/files/bugreports |                                                                                                                                                                                                                                                                                                                                                                         |
| cache                                                            | 在系统升级的过程中使用 /cache 分区的。系统升级包会被下载到这                                                                                                                                                                                                                                                                                                            |
| charger                                                                 |  charger -> /system/bin/charger，软连接，充电模式下系统显示的图标进程                                                                                                                                                                                                                                                                                                                                                                       |
| config                                                           | 用于配置系统某些子模块的入口                                                                                                                                                                                                                                                                                                                                            |
| d -> /sys/kernel/debug                                           | debugfs 文件系统是用于（输出）内核级的调试信息的。驱动以及类似的子系统可以自由地把驱动的调试信息转储到这个文件系统中                                                                                                                                                                                                                                                    |
| data                                                             | 存放用户安装的软件以及各种数据                                                                                                                                                                                                                                                                                                                                          |
| debug_ramdisk                                                    | 用于在兼容性测试时挂载 ramdisk 的                                                                                                                                                                                                                                                                                                                                       |
| default.prop                                                     | 系统默认属性文件，init 进程启动时会读取该文件                                                                                                                                                                                                                                                                                                                           |
| dev                                                              | 设备节点存放路径，内存文件系统，掉电消失，开机重新创建                                                                                                                                                                                                                                                                                                                  |
| etc -> /system/etc                                               | 系统配置文件，包括部分硬件                                                                                                                                                                                                                                                                                                                                              |
| init -> /system/bin/init                                         | Andrid 祖先进程，第一个用户空间进程                                                                                                                                                                                                                                                                                                                                     |
| init.rc                                                          | Init 进程的启动脚本，里面设置了 init 进程启动之后还需要做什么事情                                                                                                                                                                                                                                                                                                       |
| mnt                                                              | 子目录中包含内部和外部存储的挂载路径，同时还是其他文件系统的挂载点。/mnt/asec 目录是一个 tmpfs 文件系统的挂载点，它是 Android 安全机制的一部分。/mnt/obb 目录是一个 tmpfs 文件系统的挂载点，它用来存储应用程序文件超出 50MB 后的扩展文件。/mnt/secure 目录是 Android 安全机制的另外一个组件。你也可以看到一个或多个 USB 设备的挂载点                                    |
| odm                                                              | ODM 相关定制，主要包括 lib， bin, jar 等                                                                                                                                                                                                                                                                                                                                |
| oem                                                              | 和 product 类似                                                                                                                                                                                                                                                                                                                                                         |
| proc                                                             | Procfs 文件系统挂载点，记录系统信息，如 cpuinfo, meminfo, filesystem, interrupt 等                                                                                                                                                                                                                                                                                      |
| product                                                          | OEM 相关定制，主要包括 Apps，产品 sysprops 等                                                                                                                                                                                                                                                                                                                           |
| res                                                              | 资源图片，比如存放充电时的图标                                                                                                                                                                                                                                                                                                                                          |
| sdcard -> /storage/self/primary                                  | 一个符号链接，一般指向外部存储的挂载点                                                                                                                                                                                                                                                                                                                                  |
| storage                                                          | 外部 SD 卡所在目录                                                                                                                                                                                                                                                                                                                                                      |
| sys                                                              | syscfs 文件系统挂载点，记录驱动相关信息，如 class, bus, kernel 等                                                                                                                                                                                                                                                                                                       |
| system                                                           | 统核心目录，包含各种 lib, bin, framework 库                                                                                                                                                                                                                                                                                                                             |
| vendor                                                           | 硬件厂商相关定制，主要包括 lib， bin, jar 等                                                                                                                                                                                                                                                                                                                            |
| uevent.rc                                                        | 设备创建或者热拔插时，设备的配置规则，如权限等                                                                                                                                                                                                                                                                                                                          |

---
# data 目录
| 目录 | 作用 |
| ---- | ---- |
| adb | |
| anr |应用发生无响应时，系统存放无响应的先关记录 |
| app |用户自己安装的应用，下载下来的 . apk 文件都可以在这里被找到 |
| app-lib |应用（不论是系统应用还是用户自己安装的应用) 的 JNI 库都可以在这里被找到 |
| app-private |OEM 相关定制，主要包括 Apps，产品 sysprops 等 |
| dalvik-cache | 用于存放优化过的系统应用手日用户安装的应用的 classes. dex 。每个应用的 dex 文件名都是它 apk 包的存放路径，并用“＠”替换掉了路径分隔符|
| data |各个己安装应用的数据目录 |
| drm | |
| fonts | |
| gsi | |
| incremental | |
| local | |
| lost+found | |
| media | |
| mediadrm | |
| misc |供各个组件存放“各式各样的”数据和配置文件的目录。如 adb 存储可信的允许进行 ADB 连接的电脑的公钥，sensors 用于存储传感器调试数据， sms 存储短信 (sms) codes 数据库， wifi 用于存储 Wi-Fi 子系统的配置文件（比如：wpa_supptdcant. conf）和套接字（socket) |
| property |存放持久性属性 |
| system |存放了大量系统配置文件，目录中含有对维护设备状态非常重要的文件，访问该目录需要 root 权限。如 packages.list 用于 PackageManager 列出所有安装在系统中的包（APK) |
| tombstones |用于存放由 debuggerd 生成的应用崩溃报告 |
| user |不同的用户会把各自的数据和应用存储/安装在 /data/user/用户号/（用户号从 0 开始顺序编号，0 , 1...）下的各个目录中，系统运行时，把 /data/data 下的对应目录做符号链接，使之指向 /data/user/用户号/ 下的对应目录，以这种方式让 Android 系统能支持“多用户”。在一个单用户系统中, /data/data 会被直接指向 /data/user/0 符 |

---
# /etc 目录

> [!info] etc 其实是个软链接
> ```shell
> etc -> /system/etc
>```

| 目录             | 作用                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| asound.conf      | 设备 ALSA ( Advanced Linux Sound Architecture ）的配置文件，它会在某些设备上被使用                                   |
| event-log-tags   | 各个不同 Android 系统组件的日志 tag（被 android. util. EventLog 使用）                                               |
| gps.conf         | GPS 配置文件                                                                                                         |
| media_codecs.xml | 列出了 Stage Fright 所支持的所有 codec（编码/译码器）                                                                |
| permissions      | 存放了多个 XML 文件，每个 XML 文件规定了个内置应用（不论是 AOSP 的还是厂商提供的〕的权限，它会被 PackageManager 使用 |
| wifi             | WPA supplicant 适配层的配置目录，用于控制 Wi-Fi 和 Wi-Fi P2P 连接活动                                                |

---
# /system 目录
| 目录      | 作用                                                                                      |
| --------- | ----------------------------------------------------------------------------------------- |
| app       | 内置 app，都是 apk                                                                        |
| apex      | 系统内置 apex 安装包，类似内置 apk，里面都是 apex 文件                                    |
| priv-app  | 内置特权 app，都是 apk                                                                    |
| bin       | 系统命令二进制目录，包含各种命令，如 ls, cp 等                                            |
| framework | Android 系统框架层的 java 代码二进制文件，以 jar 文件存在，如 framework. jar， service.ja |
| lib       | 32 位的系统动态库                                                                         |
| lib64     | 64 位的系统动态库                                                                         |
| xbin      | 特殊命令，如 su                                                                           |
| fonts     | 系统字体库                                                                                |
| usr          |      用户配置文件，如输入设备的 kl, idc 文件等                                                                                     |
