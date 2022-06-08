---
tags: Android, 
---

# init 语法说明
* `Action` ：包含一系列的 command
* `Command` ：init 中的命令
* `Service` ：init 进程启动的服务
* `Option` : 对于服务配置选项
* `Import` : 引入其他配置文件
`Action` 和 `Service` 需要包装名称成唯一
## import 的 .rc 文件
-   `/init.${ro.hardware}.rc` ： 硬件厂商提供的主配置文件
-   `/system/etc/init` ：核心系统模块的配置文件
-   `/vendor/etc/init/` ：Soc厂商提供的配置文件
-   `/odm/etc/init/` ： 设备制造商提供的配置文件

## Link
* [Android系统开发进阶-init.rc 详解 | 一叶知秋](http://qiushao.net/2020/03/01/Android%E7%B3%BB%E7%BB%9F%E5%BC%80%E5%8F%91%E8%BF%9B%E9%98%B6/init.rc%E4%BB%8B%E7%BB%8D/)
* [init进程与Android Init Language](https://www.freesion.com/article/38101165636/)