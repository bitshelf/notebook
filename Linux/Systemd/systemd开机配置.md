---
tags: Systemd
---

# systemd 开机配置
## 查看系统帮助
1.  `man systemd.unit` （unit 还可以为 service、mount）
2. `man systemd.exec`  进程执行环境

* 配置文件主要放在`/usr/lib/systemd/system`目录，也可能在`/etc/systemd/system`目录
* `/usr/lib/systemd/system/`：是包安装时保存的备份
* `/lib`目录链接到`/usr/lib`目录
* Systemd 优先执行`/etc/systemd/system`目录下的配置文件，如果把修改后的配置文件放在该目录，就可以达到覆盖原始配置的效果
* 查看配置文件：`systemctl cat <service-name>`

> [!example] 服务启动文件示例
> ```config
> # /lib/systemd/system/ssh.service
[Unit]
Description=OpenBSD Secure Shell server
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target auditd.service
ConditionPathExists=!/etc/ssh/sshd_not_to_be_run
>
> [Service]
> EnvironmentFile=-/etc/default/ssh
> ExecStartPre=/usr/sbin/sshd -t
> ExecStart=/usr/sbin/sshd -D $SSHD_OPTS
> ExecReload=/usr/sbin/sshd -t
> ExecReload=/bin/kill -HUP $MAINPID
> KillMode=process
> Restart=on-failure
> RestartPreventExitStatus=255
> Type=notify
> RuntimeDirectory=sshd
> RuntimeDirectoryMode=0755
> SysVStartPriority=99
> TimeoutSec=0  
> StandardOutput=tty  
> RemainAfterExit=yes
> #60 秒的时间尝试在失败时重新启动 10 次
> StartLimitInterval=60
> StartLimitBurst=10 
> 
> 
> [Install]
> WantedBy=multi-user.target
> Alias=sshd.service
>```

* `[Unit]`区块(每个参数后都可以指定一个以空格分隔的列表)
	* `Description`字段给出当前服务的简单描述
	* `Documentation`：文档地址，仅接受类型为：http://、https://、file:、info:、man: 的 URI
	* `After`：表示本 unit 应该在某服务之后启动，选项可参考 [systemd.special 中文手册](https://link.zhihu.com/?target=http%3A//www.jinbuguo.com/systemd/systemd.special.html)
	* `Before`：表示本 unit 应该在某服务之前启动，（`After`和`Before`字段只涉及启动顺序，不涉及依赖关系）
	* 设置依赖关系：用`Wants`（弱依赖关系）字段和`Requires`（强依赖关系）字段
		* `Wants`字段：与 Requires 类似，区别在于如果依赖的 unit 启动失败，不影响本 unit 的继续运行
		- `Requires`：表示本 unit 与其它 unit 之间存在强依赖关系，如果本 unit 被激活，此处列出的 unit 也会被激活，如果其中一个依赖的 unit 无法激活，systemd 都不会启动本 unit
		* `Wants`字段与`Requires`字段只涉及依赖关系，与启动顺序无关，默认情况下是同时启动的
		-   `BindsTo`：与 Requires 类似，当指定的 unit 停止时，也会导致本 unit 停止
		-   `PartOf`：与 Requires 类似，当指定的 unit 停止或重启时，也会导致本 unit 停止或重启
		-   `Conflicts`：如果指定的 unit 正在运行，将导致本 unit 无法运行
		-   `OnFailure`：当本 unit 进入故障状态时，激活指定的 unit

---
* `[Service]`定义如何启动当前服务
	* `EnvironmentFile`字段：指定当前服务的环境参数文件。该文件内部的`key=value`键值对，可以用`$key`的形式，在当前配置文件中获取
	* `ExecStart`字段：定义启动进程时执行的命令
		*  `ExecReload`字段：重启服务时执行的命令
		*  `ExecStop`字段：停止服务时执行的命令
        -   `ExecStartPre`字段：启动服务之前执行的命令
        -   `ExecStartPost`字段：启动服务之后执行的命令
        -   `ExecStopPost`字段：停止服务之后执行的命令
    - `-`：表示"抑制错误"，即发生错误的时候，不影响其他命令的执行
	    - `EnvironmentFile=-/etc/sysconfig/sshd`（注意等号后面的那个连词号），就表示即使`/etc/sysconfig/sshd`文件不存在，也不会抛出错误
	- `Type`定义启动类型
		- simple（默认值）：`ExecStart`字段启动的进程为主进程
		- forking：`ExecStart`字段将以`fork()`方式启动，此时父进程将会退出，子进程将成为主进程
		- oneshot：类似于`simple`，但只执行一次，Systemd 会等它执行完，才启动其他服务
		- dbus：类似于`simple`，但会等待 D-Bus 信号后启动
		- notify：类似于`simple`，启动结束后会发出通知信号，然后 Systemd 再启动其他服务
		- idle：类似于`simple`，但是要等到其他任务都执行完，才会启动该服务。一种使用场合是为让该服务的输出，不与其他服务的输出相混合
	- `KillMode`：定义 Systemd 如何停止 sshd 服务
		- control-group（默认值）：当前控制组里面的所有子进程，都会被杀掉
		- process：只杀主进程
		- mixed：主进程将收到 SIGTERM 信号，子进程收到 SIGKILL 信号
		- none：没有进程会被杀掉，只是执行服务的 stop 命令
	- `Restart`: 定义了服务退出后，Systemd 的重启方式
		- no（默认值）：退出后不会重启
		- on-success：只有正常退出时（退出状态码为0），才会重启
        - on-failure：非正常退出时（退出状态码非 0），包括被信号终止和超时，才会重启
        - on-abnormal：只有被信号终止和超时，才会重启
        - on-abort：只有在收到没有捕捉到的信号终止时，才会重启
        - on-watchdog：超时退出，才会重启
        - always：不管是什么退出原因，总是重启
    - `RestartSec`: Systemd 重启服务之前，需要等待的秒数

---
- `[Install]`：定义如何安装这个配置文件，说明在 systemctl enable 或 systemctl disable 时如何使用
	- `WantedBy`字段：表示该服务所在的 Target，`Target`的含义是服务组，表示一组服务。`WantedBy=multi-user.target`指的是，sshd 所在的 Target 是`multi-user.target`
	- 这个设置非常重要，因为执行`systemctl enable sshd.service`命令时，`sshd.service`的一个符号链接，就会放在`/etc/systemd/system`目录下面的`multi-user.target.wants`子目录之中

> [!example] 查看 NetworkManager 配置文件
> `systemctl status NetworkManager`


# systemd 启动之后服务查看
* `systemctl status <service-name>`
> [!infi] 输出结果含义
> -   `Loaded`行：配置文件的位置，是否设为开机启动
> -   `Active`行：表示正在运行
> -   `Main PID`行：主进程ID
> -   `Status`行：由应用本身（这里是 httpd ）提供的软件当前状态
> -   `CGroup`块：应用的所有子进程
> -   日志块：应用的日志

* `systemctl`查看所有 units
* 查看所有开启启动的程序：
~~~shell
systemctl list-unit-files --state=enabled
~~~
* 查看 multi-user. target 包含的所有服务
~~~shell
systemctl list-dependencies multi-user.target
~~~
* 查看 Target 的配置文件
~~~shell
systemctl cat multi-user.target
~~~
* `Requires`字段：要求`basic.target`一起运行
* `Conflicts`字段：冲突字段。如果`rescue.service`或`rescue.target`正在运行，`multi-user.target`就不能运行，反之亦然
* `After`：表示`multi-user.target`在`basic.target` 、 `rescue.service`、 `rescue.target`之后启动，如果它们有启动的话
* `AllowIsolate`：允许使用`systemctl isolate`命令切换到`multi-user.target`
	
### 修改配置文件后重启
* 重新加载配置文件
~~~shell
sudo systemctl daemon-reload
~~~
* 重启相关服务
~~~shell
sudo systemctl restart foobar
~~~

# Link
* [systemd的unit配置文件详解 - 知乎](https://zhuanlan.zhihu.com/p/472379780)
* <https://www.freedesktop.org/software/systemd/man/bootup.html#System%20Manager%20Bootup>
* <https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html>
* <https://www.freedesktop.org/software/systemd/man/systemd.service.html>

