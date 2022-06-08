---
tags: [Ubuntu,Debian,Linux/systemd]
---
> [!info] info
> * Systemd 并不是一个命令，而是一组命令
> * Systemd 可以管理所有系统资源。不同的资源统称为 Unit（单位）
# hostnamectl
* `hostnamectl` : 显示当前主机的信息
* `localectl` : 查看本地化设置
# timedatectl
* `timedatectl` : 命令用于查看当前时区设置
* [[RTC]]
# loginctl
* `loginctl` : 查看当前用户

# systemctl
![[assets/systemctl .excalidraw]]
* `systemctl help <Unit>`：查看单元的帮助手册页
* `systemctl list-units` : 列出正在运行的 Unit
* `systemctl --failed`：查看运行失败的单元
* `systemctl list-units --all` : 列出所有 Unit，包括没有找到配置文件的或者启动失败的
* `systemctl list-units --all --state=inactive` : 列出所有没有运行的 Unit
* `systemctl list-units --failed` : 列出所有加载失败的 Unit
* `systemctl --reverse list-dependencies sshd` 查找 sshd 的依赖
* `systemctl list-units --type=service` : 列出所有正在运行的、类型为 service 的 Unit
* `systemctl daemon-reload`：重新装载所有守护进程的 unit 文件，然后重新生成依赖关系树
	* it's a "soft" reload, essentially; taking changed configurations from filesystem and regenerating dependency trees
	* The `daemon-reload` option reloads the entire systemd manager configuration without disrupting active services
	* `reload` reloads the configuration files for specific services without disrupting service
# systemctl status
看系统状态和单个 Unit 的状态
* `systemctl status` : 显示系统状态
* `sysystemctl status bluetooth.service` : 显示单个 Unit 的状态
* `systemctl is-active application.service` ：显示某个 Unit 是否处于启动失败状态
* `systemctl is-enabled application.service` ：显示某个 Unit 服务是否建立了启动链接
* `systemctl list-dependencies target`： 查看启动级别依赖


~~~shell
# 立即启动一个服务
$ sudo systemctl start apache.service

# 立即停止一个服务
$ sudo systemctl stop apache.service

# 重启一个服务
$ sudo systemctl restart apache.service

# 杀死一个服务的所有子进程
$ sudo systemctl kill apache.service

# 重新加载一个服务的配置文件
$ sudo systemctl reload apache.service

# 重载所有修改过的配置文件
$ sudo systemctl daemon-reload

# 显示某个 Unit 的所有底层参数
$ systemctl show httpd.service

# 显示某个 Unit 的指定属性的值
$ systemctl show -p CPUShares httpd.service

# 设置某个 Unit 的指定属性
$ sudo systemctl set-property httpd.service CPUShares=500
~~~

# systemd 与 service 命令迁移
| Sysvinit 命令               | Systemd 命令                                                                                                      | 备注                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| service frobozz start       | systemctl start frobozz.service                                                                                   | 用来启动一个服务 (并不会重启现有的)                |
| service frobozz stop        | systemctl stop frobozz.service                                                                                    | 用来停止一个服务 (并不会重启现有的)。              |
| service frobozz restart     | systemctl restart frobozz.service                                                                                 | 用来停止并启动一个服务。                           |
| service frobozz reload      | systemctl reload frobozz.service                                                                                  | 当支持时，重新装载配置文件而不中断等待操作。       |
| service frobozz condrestart | systemctl condrestart frobozz.service                                                                             | 如果服务正在运行那么重启它。                       |
| service frobozz status      | systemctl status frobozz.service                                                                                  | 汇报服务是否正在运行。                             |
| ls /etc/rc.d/init.d/        | systemctl list-unit-files --type=service (推荐) <br>ls /lib/systemd/system/\*.service /etc/systemd/system/\*.service | 用来列出可以启动或停止的服务列表。                 |
| chkconfig frobozz on        | systemctl enable frobozz.service                                                                                  | 在下次启动时或满足其他触发条件时设置服务为启用     |
| chkconfig frobozz off       | systemctl disable frobozz.service                                                                                 | 在下次启动时或满足其他触发条件时设置服务为禁用     |
| chkconfig frobozz           | systemctl is-enabled frobozz.service                                                                              | 用来检查一个服务在当前环境下被配置为启用还是禁用。 |
| chkconfig --list            | systemctl list-unit-files --type=service (推荐) <br>ls /etc/systemd/system/\*.wants/ | 输出在各个运行级别下服务的启用和禁用情况 |
| chkconfig frobozz --list | ls /etc/systemd/system/\*.wants/frobozz.service | 用来列出该服务在哪些运行级别下启用和禁用。 |
| chkconfig frobozz --add | systemctl daemon-reload | 当您创建新服务文件或者变更设置时使用。 |
* 注意以上列出的所有 /sbin/service 和 /sbin/chkconfig 在 systemd 环境下依然可以工作，并且在必要的情况下将会被翻译成原生的等效命令。唯一的例外是 chkconfig --list

| Sysvinit 运行级别 | Systemd 目标 | 备注 |
| --- | --- | --- |
| 0 | runlevel0.target, poweroff.target | 关闭系统。 |
| 1, s, single | runlevel1.target, rescue.target | 单用户模式。 |
| 2, 4 | runlevel2.target, runlevel4.target, multi-user.target | 用户定义/域特定运行级别。默认等同于 3。 |
| 3 | runlevel3.target, multi-user.target | 多用户，非图形化。用户可以通过多个控制台或网络登录。 |
| 5 | runlevel5.target, graphical.target | 多用户，图形化。通常为所有运行级别 3 的服务外加图形化登录。 |
| 6 | runlevel6.target, reboot.target | 重启 |
| emergency | emergency.target | 紧急 Shell |
改变运行级别：

| Sysvinit 命令 | Systemd 命令 | 备注 |
| --- | --- | --- |
| telinit 3 | systemctl isolate multi-user.target (OR systemctl isolate runlevel3.target OR telinit 3) | 改变至多用户运行级别。 |
| sed s/^id:.\*:initdefault:/id:3:initdefault:/ | ln -sf /lib/systemd/system/multi-user.target /etc/systemd/system/default.target | 设置在下一次启动时使用多用户运行级别。 |
* https://fedoraproject.org/wiki/SysVinit_to_Systemd_Cheatsheet/zh

---
## Link
- [Understanding and administering systemd :: Fedora Docs](https://docs.fedoraproject.org/en-US/quick-docs/understanding-and-administering-systemd/index.html)