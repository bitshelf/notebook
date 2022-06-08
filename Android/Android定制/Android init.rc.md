---
tags: Android
---

# Android rc 语法
- 参考：`Android SDK/system/core/init/README.md`
## Action （动作）
通过 trigger，即以 on 开头的语句，决定何时执行相应的 service
-   on early-init; 在初始化早期阶段触发；
-   on init; 在初始化阶段触发；
-   on late-init; 在初始化晚期阶段触发；
-   on boot/charger： 当系统启动/充电时触发，还包含其他情况，此处不一一列举；
-   on property:`<key>=<value>`: 当属性值满足条件时触发

启动顺序：on early-init -> init -> late-init -> boot

##  Service 服务
### Command
-   class_start <service_class_name>： 启动属于同一个 class 的所有服务；
-   start <service_name>： 启动指定的服务，若已启动则跳过；
-   stop <service_name>： 停止正在运行的服务
-   setprop `<name> <value>`：设置属性值
-   mkdir `<path>`：创建指定目录
-   symlink `<target> <sym_link>`： 创建连接到`<target>`的`<sym_link>`符号链接；
-   write `<path>` `<string>`： 向文件path中写入字符串；
-   exec： fork并执行，会阻塞init进程直到程序完毕；
-   exprot `<name>` `<name>`：设定环境变量；
-   loglevel `<level>` ：设置 log 级别

### Option
Options 是 Services 的可选项，与 service 配合使用

-   disabled: 不随 class 自动启动，只有根据 service 名才启动； 
-   oneshot: service 退出后不再重启； 
-   user/group： 设置执行服务的用户/用户组，默认都是root；
-   class：设置所属的类名，当所属类启动/退出时，服务也启动/停止，默认为default；
-   onrestart:当服务重启时执行相应命令；
-   socket: 创建名为`/dev/socket/<name>`的socket
-   critical: 在规定时间内该 service 不断重启，则系统会重启并进入恢复模式

## init*. rc 位置 (Android 运行时)
 - `/system/etc/init`，包含系统核心服务的定义，如SurfaceFlinger、MediaServer、Logcatd等。
  -   `/vendor/etc/init`， SOC 厂商针对 SOC 核心功能定义的一些服务。比如高通、MTK 某一款 SOC 的相关的服务。
 -   `/odm/etc/init`，OEM/ODM 厂商如小米、华为、OPP 其产品所使用的外设以及差异化功能相关的服务
 - 第一挂载阶段会取挂载 `/system`，`/vendor` 目录的设备而言，会自动读取 `/{system,vendor,odm}/etc/init/` 目录下全部的. rc 文件
 - 不具备第一挂载阶段的设备而言，会在`/init. rc` 中引入`/init.${ro. hardware}. rc` 文件，如 `init. vivo. rc`。并且通过 `mount_all` 命令去加载系统的`/{system, vendor, odm}/etc/init/`目录下全部的. rc 文件

## AOSP 源码目录下
- `/system/core/rootdir/init. rc` 该文件在运行时位于系统根目录，系统正常启动时，会读取该文件
- `/bootable/recovery/etc/init. rc`，从名字可以得知，系统进入 recovery 模式时读取该文件