---
tags: [service, command]
---

# 系统服务管理
~~~shell
service ServiceName restart|start|stop|
~~~
* **service**本身就是一个 shell 命令
* service 命令其实是去 `/etc/init. d` 目录下，去执行相关程序
## 查看状态
~~~shell
service ServiceName status
~~~
---
* 重载配置：`service ServiceName reload`
> [!tip] reload
> 
> 不同于重启，restart 是重启了整个服务，而 reload 则是重新加载配置，也并不是每一个应用程序都有所谓的 reload 和 restart
> 
# chkconfig
* 列出所有系统服务 `chkconfig --list`
* 列出所有启动的系统服务：`chkconfig --list|grep on`
---
# 相关链接
* https://www.cnblogs.com/ggzhangxiaochao/p/15039617.html
* 