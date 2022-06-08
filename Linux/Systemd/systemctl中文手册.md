---
tags: Systemd
---

# systemd
systemctl — 控制 systemd 系统与服务管理器
```shell
systemctl [OPTIONS...] COMMAND [NAME...]
```

-   `-t`, \--type=
	-   参数必须是一个逗号分隔的单元类型列表 (例如"service,socket")。
    在列出单元时，如果使用了此选项， 那么表示只列出指定类型的单元， 否则将列出所有类型的单元。
    此外，作为特例，使用 `--type=help` 表示在列出所有可用的单元类型之后退出。

-   \--state=
	-   参数必须是一个逗号分隔的单元状态列表 (只有 LOAD, ACTIVE, SUB 三大类)。在列出单元时，如果使用了此选项，那么表示只列出处于指定状态的单元，否则将列出所有状态的单元。例如，使用 `--state=failed` 表示只列出处于失败 (failed) 状态的单元。
    * 此外，作为特例，使用 `--state=help` 表示在列出所有可用的单元状态之后退出。
    
-   `-p`, \--property=
	-   参数必须是一个逗号分隔的属性名称列表 (例如"MainPID,LogLevel")，表示在使用 **show** 命令显示属性时，仅显示参数中列出的属性。如果未指定此选项，那么将显示全部属性。如果多次指定此选项，那么相当于将这些选项的参数用逗号连接起来。
	-   不带参数的 **systemctl show** 命令将会显示管理器 (systemd) 自身的属性 (参见 [systemd-system.conf(5)](http://www.jinbuguo.com/systemd/systemd-system.conf.html#) 手册)。
    
    不同类型的单元拥有不同的属性集， 指定任意一个单元(即使并不存在)，都可以查看此类单元的所有属性。 类似的，即使指定了一个不存在的任务(job)，也能查看任务的所有属性。 每种单元能够拥有的属性集分散在[systemd.unit(5)](http://www.jinbuguo.com/systemd/systemd.unit.html#) 手册 以及此类单元专属的手册中，例如 [systemd.service(5)](http://www.jinbuguo.com/systemd/systemd.service.html#), [systemd.socket(5)](http://www.jinbuguo.com/systemd/systemd.socket.html#) 等等。
    
-   `-a`, \--all
    
-   在列出单元时，表示列出所有已加载的单元(不管它处于何种状态)。 在使用 **show** 命令显示属性时， 表示显示所有属性，而不管这些属性是否已被设置。
    
    如果想要列出所有已安装的单元，请使用 **list-unit-files** 命令。
    
    在使用 **list-dependencies** 命令时， 表示递归的显示所有单元的依赖关系(默认仅显示 target 单元的依赖关系)
    
-   `-r`, \--recursive
    
-   在列出单元时， 同时也以 "`容器名:单元名`" 格式列出本地容器中的单元。
    
-   \--reverse
    
-   在使用 **list-dependencies** 命令时， 仅显示单元之间的反向依赖关系。 也就是仅显示 `WantedBy=`,`RequiredBy=`, `PartOf=`, `BoundBy=` 系列(而不是 `Wants=` 系列)的依赖关系。
    
-   \--after
    
-   在使用 **list-dependencies** 命令时， 仅显示在先后顺序上早于指定单元的那些单元， 也就是递归的列出 `After=` 中的单元。
    
    注意，每个 `After=` 依赖都会自动生成一个对应的 `Before=` 依赖。 单元之间的先后顺序既可以被显式的明确设定， 也可以由其他指令隐式的自动生成(例如 `WantedBy=` 或 `RequiresMountsFor=`)。 无论是隐式自动生成的先后顺序， 还是显式明确设定的先后顺序， 都会被 **list-dependencies** 命令显示出来。
    
    在使用 **list-jobs** 命令时，同时显示正在等待该任务完成的其他任务。 可以与 `--before` 一起使用，同时显示等待该任务完成的其他任务， 以及该任务正在等待的其他任务。
    
-   \--before
    
-   在使用 **list-dependencies** 命令时， 仅显示在先后顺序上晚于指定单元的那些单元， 也就是递归的列出`Before=` 中的单元。
    
    在使用 **list-jobs** 命令时，同时显示该任务正在等待的其他任务。 可以与 `--after` 一起使用，同时显示等待该任务完成的其他任务， 以及该任务正在等待的其他任务。
    
-   `-l`, \--full
    
-   在 **status**, **list-units**, **list-jobs**, **list-timers** 命令的输出中， 显示完整的单元名称、进程树项目、日志输出、单元描述， 也就是不省略或截断它们。
    
    在 **is-enabled** 命令的输出中显示所安装的 target 单元。
    
-   \--value
    
-   在使用 **show** 命令显示属性时， 仅显示属性值，而不显示属性名及等号。
    
-   \--show-types
    
-   在使用 **list-sockets** 命令列出套接字(socket)时，同时显示套接字的类型。
    
-   \--job-mode=
    
-   在向任务队列中添加新任务(job)时，如何处理队列中已有的任务。 可设为 "`fail`", "`replace`", "`replace-irreversibly`", "`isolate`", "`ignore-dependencies`", "`ignore-requirements`", "`flush`" 之一。 仅在使用 **isolate** 命令时，默认值为 "`isolate`" 且不能更改， 对于其他命令，默认值皆为 "`replace`" 。
    
    "`fail`" 表示当新任务与队列中已有的任务冲突时，该命令将失败。 所谓"冲突"的含义是：导致队列中已有的某个启动操作转变为停止操作，或者相反。
    
    "`replace`" 表示将队列中冲突的任务替换为新任务。
    
    "`replace-irreversibly`" 与 "`replace`" 类似， 不同之处在于将新任务同时标记为"不可撤销"， 也就是即使未来与其他新添加的任务发生冲突也不会被撤消。 注意，这个"不可撤销"的任务， 仍然可以使用 **cancel**命令显式的撤消。 应该将此模式应用于所有包含在 `shutdown.target` 中的任务。
    
    "`isolate`" 仅用于启动操作，表示在该单元启动之后，所有其他单元都会被停止。 当使用 **isolate** 命令的时候， 这是默认值，且不能更改。
    
    "`flush`" 表示撤消队列中已有的全部任务，然后加入新任务。
    
    "`ignore-dependencies`" 表示忽略新任务的所有依赖关系(包括先后顺序依赖)， 立即执行请求的操作。 如果成功， 那么所有被依赖的单元及先后顺序都将被忽略。 仅用于调试目的，切勿用于常规目的。
    
    "`ignore-requirements`" 类似于 "`ignore-dependencies`" ， 表示仅忽略必需的依赖(但依然遵守单元之间的先后顺序)。
    
-   \--fail
    
-   这是 `--job-mode=fail` 的快捷方式。
    
    当与 **kill** 命令一起使用时， 表示如果没有任何单元被杀死，那么将会导致报错。
    
-   `-i`, \--ignore-inhibitors
    
-   当关闭或休眠系统时，忽略 inhibitor 锁。 应用程序可以利用 inhibitor 锁防止某些重要操作(例如刻录光盘)被关机或休眠打断。 任何用户都可以获取 inhibitor 锁， 但是只有特权用户可以撤消或者忽略它。 正常情况下， 关机与休眠动作会因为 inhibitor 锁的存在而失败(无论该动作是否由特权用户发起)， 同时所有已激活的 inhibitor 锁也都会被显示出来。 但如果使用了此选项， 那么 inhibitor 锁将被忽略，关机或休眠将会照常执行， 同时也不再显示这些已激活的锁。
    
-   `-q`, \--quiet
    
-   安静模式，也就是禁止输出任何信息到标准输出。 注意：(1)这并不适用于输出信息是唯一结果的命令(例如 **show**)； (2)显示在标准错误上的出错信息永远不会被屏蔽。
    
-   \--no-block
    
-   默认为阻塞模式，也就是任务经过校验、排入任务队列之后， **systemctl** 必须一直等到单元启动/停止完成才算执行结束。 使用此选项之后，将变为无阻塞模式，也就是任务排入队列之后， 即算 **systemctl** 执行结束(不必等待单元启动/停止完成)。 此选项不可与 `--wait` 一起使用。
    
-   \--wait
    
-   一直等待到被启动的单元再次终止为止。 此选项不可与 `--no-block` 一起使用。 注意，如果某个给出的单元一直不终止，那么将会导致无限等待， 特别是那些使用了 "`RemainAfterExit=yes`" 的服务单元。
    
-   \--user
    
-   与当前调用用户的用户服务管理器(systemd 用户实例)通信， 而不是默认的系统服务管理器(systemd 系统实例)。
    
-   \--system
    
-   与系统服务管理器(systemd 系统实例)通信， 这是默认值。
    
-   \--failed
    
-   列出处于失败(failed)状态的单元。等价于 `--state=failed`
    
-   \--no-wall
    
-   在执行 halt, poweroff, reboot 动作前，不发送警告消息。
    
-   \--global
    
-   表示在全局用户单元目录(通常是 `/etc/systemd/user/`)上操作， 从而全局的操作一个用户单元，这会影响到所有未来登入的用户。
    
-   \--no-reload
    
-   与 **enable**, **disable**, **edit** 命令连用， 表示在完成操作之后不重新加载 systemd 守护进程的配置(默认会自动重新加载)， 相当于不自动执行 **daemon-reload** 命令。
    
-   \--no-ask-password
    
-   与 **start** 及其相关命令(reload, restart, try-restart, reload-or-restart, reload-or-try-restart, isolate)连用， 表示不询问密码。 单元在启动时可能要求输入密码(例如用于解密证书或挂载加密文件系统)。 当未使用此选项时， **systemctl** 将会在终端上向用户询问所需的密码。 如果使用了此选项， 那么必须通过其他方法提供密码(例如通过密码代理程序)， 否则单元可能会启动失败。 使用此选项还会导致在验证用户身份时， 不能使用从终端输入密码的方式。
    
-   \--kill-who=
    
-   与 **kill** 命令连用， 表示向哪个进程发送信号(`--signal=`)。 可设为 `main`(仅杀死主进程) 或 `control`(仅杀死控制进程) 或 `all`(杀死全部进程，这是默认值)。 所谓"主进程"是指定义了单元生存期的进程。 所谓"控制进程"是指用于改变单元状态的进程。 例如，所有 `ExecStartPre=`, `ExecStop=`, `ExecReload=` 启动的进程都是控制进程。 注意，对于一个单元来说，同一时刻只能存在一个控制进程， 因为同一时刻只能存在一个状态变化的动作。 对于 `Type=forking` 类型的服务来说， `ExecStart=` 启动的初始进程就是一个控制进程， 而此进程随后派生出来作为守护进程运行的那个进程， 则是该单元的主进程(如果它可以被检测到的话)。 但对于其他类型的服务来说， `ExecStart=` 启动的初始进程反而始终是该服务的主进程。 一个服务单元可以包含以下进程： 零个或一个主进程，零个或一个控制进程， 任意数量(可以是零个)的其他进程。 注意，不是所有类型的单元都含有上述三种进程。 例如，对于 mount 类型的单元来说， 就仅有控制进程(`/usr/bin/mount` 与 `/usr/bin/umount`)， 而没有主进程。 默认值是 `all`
    
-   `-s`, \--signal=
    
-   与 **kill** 命令连用， 表示向目标进程发送哪个信号。 必须是 `SIGTERM`, `SIGINT`, `SIGSTOP` 之类众所周知的信号。 默认值为 `SIGTERM`
    
    。
    
-   `-f`, \--force
    
-   当与 **enable** 命令连用时， 表示覆盖所有现存的同名符号链接。
    
    当与 **edit** 命令连用时， 表示创建所有尚不存在的指定单元。
    
    当与 **halt**, **poweroff**, **reboot**, **kexec** 命令连用时，表示跳过单元的正常停止步骤，强制直接执行关机操作。 如果仅使用此选项一次，那么所有进程都将被强制杀死，并且所有文件系统都将被卸载(或以只读模式重新挂载)。 这可以算是一种野蛮但还算相对比较安全的快速关机或重启的方法。 如果连续两次使用此选项，那么将既不杀死进程，也不卸载文件系统， 而是直接强制关机或重启(但 **kexec** 除外)。 警告：连续两次使用 `--force` 选项将会导致数据丢失、文件系统不一致等不良后果。 注意，如果连续两次使用 `--force` 选项，那么所有操作都将由 **systemctl** 自己直接执行，而不会与 systemd 进程通信。 这意味着，即使 systemd 进程已经崩溃，连续两次使用 `--force` 选项所指定的操作依然能够执行成功。
    
-   \--message=
    
-   当与 **halt**, **poweroff**, **reboot** 命令一起使用时，用于设置一个解释为什么进行该操作的字符串。 此字符串将与默认的关机消息一起记录到日志中。
    
-   \--now
    
-   当与 **enable** 命令连用时， 表示同时还要启动该单元。 当与 **disable** 或 **mask** 命令连用时， 表示同时还要停止该单元。
    
-   \--root=
    
-   与 **enable**/**disable**/**is-enabled** 等相关命令连用，用于设置寻找单元文件时的根目录。 使用此选项之后，**systemctl** 将会直接操作文件系统， 而不是通过与 **systemd** 守护进程通信的方式进行操作。
    
-   \--runtime
    
-   当与 **enable**, **disable**, **edit** 等相关命令连用时， 表示仅作临时变更，从而确保这些变更会在重启后丢失。 这意味着所做的变更将会保存在 `/run` 目录下(立即生效但重启后该目录的内容将全部丢失)， 而不是保存在 `/etc` 目录下。
    
    类似的，当与 **set-property** 命令连用时， 所做的变更亦是临时的， 这些变更在重启后亦会丢失。
    
-   \--preset-mode=
    
-   与 **preset** 或 **preset-all** 命令连用，可设为下列值之一： "`full`"(默认值) 表示完全按照预设规则启用与停用各单元。 "`enable-only`" 表示仅按照预设规则启用各单元。 "`disable-only`" 表示仅按照预设规则停用各单元。
    
-   `-n`, \--lines=
    
-   与 **status** 命令连用， 控制日志的显示行数(从最新的一行开始计算)。 必须设为一个正整数，默认值是"10"。
    
-   `-o`, \--output=
    
-   与 **status** 命令连用， 控制日志的显示格式。 详见 [journalctl(1)](http://www.jinbuguo.com/systemd/journalctl.html#) 手册。默认值为 "`short`"
    
    。
    
-   \--firmware-setup
    
-   与 **reboot** 命令连用， 要求系统主板的UEFI固件重启到安装模式。 仅支持某些以UEFI模式启动的主板。
    
-   \--plain
    
-   与 **list-dependencies**, **list-units**, **list-machines** 命令连用， 将输出从默认的树形变为列表型。
    
-   `-H`, \--host=
    
-   操作指定的远程主机。可以仅指定一个主机名(hostname)， 也可以使用 "`username@hostname`" 格式。 hostname 后面还可以加上容器名(以冒号分隔)， 也就是形如 "`hostname:container`" 的格式， 以表示直接连接到指定主机的指定容器内。 操作将通过SSH协议进行，以确保安全。 可以通过 **machinectl -H _`HOST`_**命令列出远程主机上的所有容器名称。
    
-   `-M`, \--machine=
    
-   在本地容器内执行操作。 必须明确指定容器的名称。
    
-   \--no-pager
    
-   不将程序的输出内容管道(pipe)给分页程序。
    
-   \--no-legend
    
-   不输出列标题， 也就是不在输出列表的头部和尾部显示字段的名称。
    
-   `-h`, \--help
    
-   显示简短的帮助信息并退出。
    
-   \--version
    
-   显示简短的版本信息并退出。
    

## 命令

模式(_PATTERN_)参数的语法与文件名匹配语法类似：用"\*"匹配任意数量的字符，用"?"匹配单个字符，用"\[\]"匹配字符范围。 如果给出了模式(_PATTERN_)参数，那么表示该命令仅作用于单元名称与至少一个模式相匹配的单元。

### 单元命令

-   **list-units \[_`PATTERN`_…\]**
    
-   列出 **systemd** 当前已加载到内存中的单元。 除非明确使用 `--all` 选项列出全部单元， 也就是：直接引用的单元、被依赖关系引用的单元、被应用程序调用的单元、启动失败的单元。 否则默认仅列出：活动的单元、失败的单元、正处于任务队列中的单元。 如果给出了模式(_PATTERN_)参数，那么表示该命令仅作用于单元名称与至少一个模式相匹配的单元。 还可以通过 `--type=` 与 `--state=` 选项过滤要列出的单元。
    
    这是默认命令。
    
-   **list-sockets \[_`PATTERN`_…\]**
    
-   列出当前已加载到内存中的套接字(socket)单元，并按照监听地址排序。 如果给出了模式(_PATTERN_)参数，那么表示该命令仅作用于单元名称与至少一个模式相匹配的单元。 该命令的输出大致像下面这样子：
    
    ```
    LISTEN           UNIT                        ACTIVATES
    /dev/initctl     systemd-initctl.socket      systemd-initctl.service
    …
    [::]:22          sshd.socket                 sshd.service
    kobject-uevent 1 systemd-udevd-kernel.socket systemd-udevd.service
    
    5 sockets listed.
    ```
    
    注意：因为监听地址中有可能包含空格， 所以不适合使用程序分析该命令的输出。
    
    参见 `--show-types`, `--all`, `--state=` 选项。
    
-   **list-timers \[_`PATTERN`_…\]**
    
-   列出当前已加载到内存中的定时器(timer)单元，并按照下次执行的时间点排序。 如果给出了模式(_PATTERN_)参数，那么表示该命令仅作用于单元名称与至少一个模式相匹配的单元。 该命令的输出大致像下面这样子：
    
    ```
    NEXT                         LEFT          LAST                         PASSED     UNIT                         ACTIVATES
    n/a                          n/a           Thu 2017-02-23 13:40:29 EST  3 days ago ureadahead-stop.timer        ureadahead-stop.service
    Sun 2017-02-26 18:55:42 EST  1min 14s left Thu 2017-02-23 13:54:44 EST  3 days ago systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
    Sun 2017-02-26 20:37:16 EST  1h 42min left Sun 2017-02-26 11:56:36 EST  6h ago     apt-daily.timer              apt-daily.service
    Sun 2017-02-26 20:57:49 EST  2h 3min left  Sun 2017-02-26 11:56:36 EST  6h ago     snapd.refresh.timer          snapd.refresh.service
    ```
    
    _NEXT_ 列显示下次执行的时间点
    
    _LEFT_ 列显示距离下次执行还剩多长时间
    
    _LAST_ 列显示上次执行的时间点
    
    _PASSED_ 列显示距离上次执行过去了多长时间
    
    _UNIT_ 列显示定时器单元的名称
    
    _ACTIVATES_ 列显示定时器单元将会启动的服务
    
    参见 `--all` and `--state=` 选项。
    
-   **start _`PATTERN`_…**
    
-   启动(activate)指定的已加载单元(无法启动未加载的单元)。
    
    如果某个单元未被启动，又没有处于失败(failed)状态， 那么通常是因为该单元没有被加载到内存中，所以根本没有被模式匹配到。 此外，对于从模板实例化而来的单元，因为 systemd 会在其尚未启动前忽略它们， 又因为模式(_PATTERN_)参数仅能匹配已加载到内存中的单元的"主名称"(不含单元的"别名")， 所以，在这个命令中使用包含通配符的模式并没有多少实际意义。
    
-   **stop _`PATTERN`_…**
    
-   停止(deactivate)指定的单元
    
-   **reload _`PATTERN`_…**
    
-   要求指定的单元重新加载它们的配置。 注意，这里所说的"配置"是服务进程专属的配置(例如 `httpd.conf` 之类)， 而不是 systemd 的"单元文件"。 如果你想重新加载 systemd 的"单元文件"， 那么应该使用 **daemon-reload** 命令。 以 Apache 为例， 该命令会导致重新加载 `httpd.conf` 文件， 而不是 `apache.service` 文件。
    
    不要将此命令与 **daemon-reload** 命令混淆。
    
-   **restart _`PATTERN`_…**
    
-   重新启动(先停止再启动)指定的单元。 若指定的单元尚未启动，则启动它们。
    
-   **try-restart _`PATTERN`_…**
    
-   重新启动(先停止再启动)指定的已启动单元。 注意，若指定的单元尚未启动，则不做任何操作。
    
-   **reload-or-restart _`PATTERN`_…**
    
-   首先尝试重新加载指定单元的进程专属配置， 对于那些加载失败的单元，再继续尝试重新启动它们。 若指定的单元尚未启动，则启动它们。
    
-   **try-reload-or-restart _`PATTERN`_…**
    
-   首先尝试重新加载指定单元的进程专属配置， 对于那些加载失败的单元，再继续尝试重新启动它们。 注意，若指定的单元尚未启动，则不做任何操作。
    
-   **isolate _`NAME`_**
    
-   启动指定的单元及其依赖的所有单元， 同时停止所有其他 `IgnoreOnIsolate=no` 的单元("no"是默认值，详见[systemd.unit(5)](http://www.jinbuguo.com/systemd/systemd.unit.html#) 手册)。 如果没有给出单元的后缀名， 那么相当于以 "`.target`" 作为后缀名。
    
    这类似于传统上切换SysV运行级的概念。 该命令会立即停止所有在新目标单元中不需要的进程， 这其中可能包括当前正在运行的图形环境以及正在使用的终端。
    
    注意，该命令仅可用于 `AllowIsolate=yes` 的单元。参见 [systemd.unit(5)](http://www.jinbuguo.com/systemd/systemd.unit.html#) 手册。
    
-   **kill _`PATTERN`_…**
    
-   向指定单元的 `--kill-who=` 进程发送 `--signal=` 信号。
    
-   **is-active _`PATTERN`_…**
    
-   检查指定的单元中，是否有处于活动(active)状态的单元。 如果存在至少一个处于活动(active)状态的单元，那么返回"0"值，否则返回非零值。 除非同时使用了 `--quiet` 选项， 否则，此命令还会在标准输出上显示单元的状态。
    
-   **is-failed _`PATTERN`_…**
    
-   检查指定的单元中，是否有处于失败(failed)状态的单元。 如果存在至少一个处于失败(failed)状态的单元，那么返回"0"值，否则返回非零值。 除非同时使用了 `--quiet` 选项， 否则，此命令还会在标准输出上显示单元的状态。
    
-   **status** \[_`PATTERN`_…|_`PID`_…\]
    
-   如果指定了单元，那么显示指定单元的运行时状态信息，以及这些单元最近的日志数据。 如果指定了PID，那么显示指定PID所属单元的运行时状态信息，以及这些单元最近的日志数据。 如果未指定任何单元或PID，那么显示整个系统的状态信息， 此时若与 `--all` 连用， 则同时显示所有已加载单元(可以用 `-t` 限定单元类型)的状态信息。
    
    此命令仅用于输出人类易读的结果，不要将其用于程序分析(应该使用 **show** 命令)。 除非使用了 `--lines`与 `--full` 选项， 否则默认只输出10行日志， 并且超长的部分会被省略号截断。此外， **journalctl --unit=_`NAME`_** 或 **journalctl --user-unit=_`NAME`_** 也会对超长的消息使用类似的省略号截断。
    
    因为 systemd 仅按需加载单元，所以 **status** 命令将会尝试加载单元文件。 因此，该命令不能用于检测某个单元是否已经被载到内存中。 如果该命令执行完之后，指定的单元没有任何理由继续保留在内存中，那么将会被立即从内存中清除出去。
    
    **例 1.  systemctl status 命令的输出样例：**
    
    ```
    $ systemctl status bluetooth
     bluetooth.service - Bluetooth service
       Loaded: loaded (/usr/lib/systemd/system/bluetooth.service; enabled; vendor preset: enabled)
       Active: active (running) since Wed 2017-01-04 13:54:04 EST; 1 weeks 0 days ago
         Docs: man:bluetoothd(8)
     Main PID: 930 (bluetoothd)
       Status: "Running"
        Tasks: 1
       Memory: 648.0K
          CPU: 435ms
       CGroup: /system.slice/bluetooth.service
               └─930 /usr/lib/bluetooth/bluetoothd
    
    Jan 12 10:46:45 example.com bluetoothd[8900]: Not enough free handles to register service
    Jan 12 10:46:45 example.com bluetoothd[8900]: Current Time Service could not be registered
    Jan 12 10:46:45 example.com bluetoothd[8900]: gatt-time-server: Input/output error (5)
    ```
    
    在彩色终端上，前导点("")使用不同的颜色来标记单元的不同状态。 白色表示 "`inactive`" 或 "`deactivating`" 状态； 红色表示 "`failed`" 或 "`error`" 状态； 绿色表示 "`active`" 或 "`reloading`" 或 "`activating`" 状态。
    
    以"Loaded:"开头的行显示了单元的加载状态： "`loaded`" 表示已经被载到内存中； "`error`" 表示加载失败； "`not-found`" 表示未找到单元文件； "`masked`" 表示已被屏蔽。 同时还包含了单元文件的路径、启用状态、预设的启用状态。 要想了解更多单元状态(包括 "`masked`" 的含义)， 可参见对 **is-enabled** 命令的解释。
    
    以"Active:"开头的行显示了单元的启动状态： "`active`" 表示已启动成功； "`inactive`" 表示尚未启动； "`activating`" 表示正在启动中； "`deactivating`" 表示正在停止中； "`failed`" 表示启动失败(崩溃、超时、退出码不为零……)。 对于启动失败的单元，将会在日志中记录下导致启动失败的原因， 以方便事后查找故障原因。
    
-   **show** \[_`PATTERN`_…|_`JOB`_…\]
    
-   以"属性=值"的格式显示指定单元或任务的所有属性。 单元用其名称表示，而任务则用其id表示。 如果没有指定任何单元或任务，那么显示管理器(systemd)自身的属性。 除非使用了 `--all` 选项，否则默认不显示属性值为空的属性。 可以使用 `--property=` 选项限定仅显示特定的属性。 此命令的输出仅适合用于程序分析，而不适合被人类阅读(应该使用 **status** 命令)。
    
    该命令显示的许多属性都直接对应着系统、服务管理器、单元的相应配置。 注意，该命令显示的属性，一般都是比原始配置更加底层与通用的版本， 此外，还包含了运行时的状态信息。 例如，对于服务单元来说，所显示的属性中就包含了运行时才有的 主进程的标识符("`MainPID`")信息； 同时时间属性的值总是以 "`…USec`" 作为时间单位(即使在单元文件中是以 "`…Sec`" 作为单位)， 因为对于系统与服务管理器来说， 毫秒是更加通用的时间单位。
    
-   **cat _`PATTERN`_…**
    
-   显示指定单元的单元文件内容。 在显示每个单元文件的内容之前， 会额外显示一行单元文件的绝对路径。 注意，该命令显示的是当前文件系统上的单元文件的内容。 如果在更改了单元文件的内容之后， 没有使用 **daemon-reload** 命令， 那么该命令所显示的内容 有可能与已经加载到内存中的单元文件的内容不一致。
    
-   **set-property _`NAME`_ _`ASSIGNMENT`_…**
    
-   在运行时修改单元的属性值。 主要用于修改单元的资源控制属性值而无需直接修改单元文件。 并非所有属性都可以在运行时被修改， 但大多数资源控制属性(参见 [systemd.resource-control(5)](http://www.jinbuguo.com/systemd/systemd.resource-control.html#))可以。 所作修改会立即生效，并永久保存在磁盘上，以确保永远有效。 但是如果使用了 `--runtime` 选项， 那么此修改仅临时有效，下次重启此单元后，将会恢复到原有的设置。 设置属性的语法与单元文件中的写法相同。
    
    例如： **systemctl set-property foobar.service CPUShares=777**
    
    注意，此命令可以同时修改多个属性值， 只需依次将各个属性用空格分隔即可。
    
    与单元文件中的规则相同， 设为空表示清空当前已存在的列表。
    
-   **help _`PATTERN`_…|_`PID`_…**
    
-   显示指定单元的手册页(若存在)。 指定PID表示显示该进程所属单元的手册页(若存在)。
    
-   **reset-failed \[_`PATTERN`_…\]**
    
-   重置指定单元的失败(failed)状态。 如果未指定任何单元，则重置所有单元的失败(failed)状态。 当某个单元因为某种原因操作失败(例如退出状态码不为零或进程被强制杀死或启动超时)， 将会自动进入失败(failed)状态， 退出状态码与导致故障的原因 将被记录到日志中以方便日后排查。
    
-   **list-dependencies** \[_`NAME`_\] 
    
-   显示单元的依赖关系。 也就是显示由 `Requires=`, `Requisite=`, `ConsistsOf=`, `Wants=`, `BindsTo=` 所形成的依赖关系。 如果没有明确指定单元的名称， 那么表示显示 `default.target` 的依赖关系树。
    
    默认情况下，仅以递归方式显示 target 单元的依赖关系树，而对于其他类型的单元，仅显示一层依赖关系(不递归)。 但如果使用了 `--all` 选项， 那么将对所有类型的单元都强制递归的显示完整的依赖关系树。
    
    还可以使用 `--reverse`, `--after`, `--before` 选项指定仅显示特定类型的依赖关系。
    

### 单元文件命令

-   **list-unit-files \[_`PATTERN…`_\]**
    
-   列出所有已安装的单元文件及其启用状态(相当于同时使用了 **is-enabled** 命令)。 如果给出了模式(_PATTERN_)参数， 那么表示该命令仅作用于单元文件名称与至少一个模式相匹配的单元(仅匹配文件名，不匹配路径)。
    
-   **enable _`NAME`_…**, **enable _`PATH`_…**
    
-   启用指定的单元或单元实例(多数时候相当于将这些单元设为"开机时自动启动"或"插入某个硬件时自动启动")。 这将会按照单元文件中 "`[Install]`" 小节的指示， 在例如 `/etc/systemd/system/multi-user.target.wants/` 这样的目录中，创建指向单元文件自身的软链接。 创建完软连接之后，systemd 将会自动重新加载自身的配置(相当于执行 **daemon-reload** 命令)，以确保所做的变更立即生效。 注意，除非同时使用了 `--now` 选项(相当于同时执行 **start** 命令)， 否则启用一个单元_并不会_导致该单元被启动。 注意，对于形如 `foo@bar.service` 这样的单元实例， 软链接自身的文件名是实例化之后的单元名称， 但是软连接所指向的目标文件则是该单元的模板文件。
    
    如果此命令的参数是一个有效的单元名称(_NAME_)，那么将自动搜索所有单元目录。 如果此命令的参数是一个单元文件的绝对路径(_PATH_)，那么将直接使用指定的单元文件。 如果参数是一个位于标准单元目录之外的单元文件， 那么将会在标准单元目录中额外创建一个指向此单元文件的软连接， 以确保该单元文件能够被 **start** 之类的命令找到。
    
    除非使用了 `--quiet` 选项， 否则此命令还会显示对文件系统所执行的操作(Created symlink …)。
    
    此命令是维护 `.{wants,requires}/` 目录与单元别名的首选方法。 注意，此命令仅会按照单元文件中 "`[Install]`" 小节预设的名称创建软链接。 另一方面，系统管理员亦可手动创建所需的软链接， 特别是在需要创建不同于默认软链接名称的时候。 不过需要注意的是，系统管理员必须在创建完软连接之后手动执行**daemon-reload** 命令， 以确保所做的变更立即生效。
    
    不要将此命令与 **start** 命令混淆，它们是相互独立的命令： 可以启动一个尚未启用的单元，也可以启用一个尚未启动的单元。 **enable** 命令只是设置了单元的启动钩子(通过创建软链接)， 例如在系统启动时或者某个硬件插入时，自动启动某个单元。 而 **start** 命令则是具体执行单元的启动操作， 例如对于服务单元来说就是启动守护进程，而对于套接字单元来说则是绑定套接字，等等。
    
    若与 `--user` 选项连用，则表示变更仅作用于用户实例，否则默认作用于系统实例(相当于使用 `--system` 选项)。 若与 `--runtime` 选项连用，则表示仅作临时性变更(重启后所有变更都将丢失)，否则默认为永久性变更。 若与 `--global` 选项连用，则表示变更作用于所有用户(在全局用户单元目录上操作)，否则默认仅作用于当前用户(在私有用户单元目录上操作)。 注意，当与 `--global` 选项连用时，systemd 守护进程不会重新加载自身的配置。
    
    不可将此命令应用于已被 **mask** 命令屏蔽的单元，否则将会导致错误。
    
-   **disable _`NAME`_…**
    
-   停用指定的单元或单元实例(多数时候相当于撤销这些单元的"开机时自动启动"以及"插入某个硬件时自动启动")。 这将会从单元目录中删除所有指向单元自身及所有支持单元的软链接。 这相当于撤销 **enable** 或 **link** 命令所做的操作。 注意，此命令会删除_所有_指向单元自身及所有支持单元的软链接， 包括手动创建的软连接以及通过 **enable** 与 **link** 命令创建的软连接。 注意，虽然 **disable** 与 **enable** 是一对相反的命令，但是它们的效果并不一定总是完全对称的。 因为 **disable** 删除的软连接数量有可能比上一次 **enable**命令创建的软连接数量更多。
    
    此命令的参数仅能接受单元的名字，而不能接受单元文件的路径。
    
    除了停用参数中明确指定的单元之外，那些在被停用单元 "`[Install]`" 小节的 `Also=` 选项中列出的所有单元，也同样会被停用。 也就是说，这个停用动作是沿着 `Also=` 选项不断传递的。
    
    删除完软连接之后， systemd 将会自动重新加载自身的配置(相当于执行 **daemon-reload** 命令)，以确保所做的变更立即生效。 注意，除非同时使用了 `--now` 选项(相当于同时执行 **stop** 命令)， 否则停用一个单元_并不会_导致该单元被停止。
    
    除非使用了 `--quiet` 选项， 否则此命令还会显示对文件系统所执行的操作(Removed symlink …)。
    
    有关 `--system`, `--user`, `--runtime`, `--global` 选项的影响，参见上面对 **enable** 命令的解释。
    
-   **reenable _`NAME`_…**
    
-   重新启用指定的单元或单元实例。 这相当于先使用 **disable** 命令之后再使用 **enable** 命令。 通常用于按照单元文件中 "`[Install]`" 小节的指示重置软链接名称。 此命令的参数仅能接受单元的名字，而不能接受单元文件的路径。
    
-   **preset _`NAME`_…**
    
-   按照预设文件(\*.preset)的指示，重置指定单元的启用(enable)/停用(disable)状态。 其效果等价于按照预设规则，对列出的单元依次使用 **disable** 或 **enable** 命令。
    
    可以使用 `--preset-mode=` 选项控制如何参照预设文件： 既启用又停用、仅启用、仅停用
    
    如果指定单元的 "`[Install]`" 小节不包含必要的启用信息， 那么此命令将会悄无声息的忽略该单元。 _NAME_必须是一个真实的单元名称， 别名将会被悄无声息的忽略。
    
    有关预设文件的更多说明，详见 [systemd.preset(5)](http://www.jinbuguo.com/systemd/systemd.preset.html#) 手册与 [Preset](https://www.freedesktop.org/wiki/Software/systemd/Preset) 文档。
    
-   **preset-all**
    
-   按照预设文件(\*.preset)的指示， 重置全部单元的启用(enable)/停用(disable)状态(参见上文)。
    
    可以使用 `--preset-mode=` 选项控制如何参照预设文件： 既启用又停用、仅启用、仅停用
    
-   **is-enabled _`NAME`_…**
    
-   检查是否有至少一个指定的单元或单元实例 已经被启用(使用 **enable** 命令)。 如果有，那么返回"0"，否则返回非零。 除非使用了 `--quiet` 选项， 否则此命令还会显示指定的单元或单元实例的当前启用状态(见下表)。 要想显示已安装的 target 单元，可以使用 `--full` 选项。
    
    **表 1. is-enabled 命令的输出**
    
    | 状态 | 含义 | 返回值 |
    | --- | --- | --- |
    | "`enabled`" | 已经通过 `/etc/systemd/system/` 目录下的 `Alias=` 别名、 `.wants/` 或 `.requires/` 软连接被永久启用 | 0 |
    | "`enabled-runtime`" | 已经通过 `/run/systemd/system/` 目录下的 `Alias=` 别名、 `.wants/` 或 `.requires/` 软连接被临时启用 | 0 |
    | "`linked`" | 虽然单元文件本身不在标准单元目录中，但是指向此单元文件的一个或多个软连接已经存在于 `/etc/systemd/system/` 永久目录中 | \> 0 |
    | "`linked-runtime`" | 虽然单元文件本身不在标准单元目录中，但是指向此单元文件的一个或多个软连接已经存在于 `/run/systemd/system/` 临时目录中 | \> 0 |
    | "`masked`" | 已经被 `/etc/systemd/system/` 目录永久屏蔽(软连接指向 `/dev/null` 文件)，因此 **start**操作会失败 | \> 0 |
    | "`masked-runtime`" | 已经被 `/run/systemd/systemd/` 目录临时屏蔽(软连接指向 `/dev/null` 文件)，因此 **start**操作会失败 | \> 0 |
    | "`static`" | 尚未被启用，并且单元文件的 "`[Install]`" 小节中没有可用于 **enable** 命令的选项 | 0 |
    | "`indirect`" | 尚未被启用，但是单元文件的 "`[Install]`" 小节中 `Also=` 选项的值列表非空(也就是列表中的某些单元可能已被启用)、或者它拥有一个不在 `Also=` 列表中的其他名称的别名软连接。对于模版单元来说，表示已经启用了一个不同于 `DefaultInstance=` 的实例。 | 0 |
    | "`disabled`" | 尚未被启用，但是单元文件的 "`[Install]`" 小节中存在可用于 **enable** 命令的选项 | \> 0 |
    | "`generated`" | 单元文件是被单元生成器动态生成的(参见 [systemd.generator(7)](http://www.jinbuguo.com/systemd/systemd.generator.html#) 手册)。被生成的单元文件可能并未被直接启用，而是被单元生成器隐含的启用了。 | 0 |
    | "`transient`" | 单元文件是被运行时API动态临时生成的。该临时单元可能并未被启用。 | 0 |
    | "`bad`" | 单元文件不正确或者出现其他错误。 **is-enabled** 不会返回此状态，而是会显示一条出错信息。 **list-unit-files** 命令有可能会显示此单元。 | \> 0 |
    
-   **mask _`NAME`_…**
    
-   屏蔽指定的单元或单元实例。 也就是在单元目录中创建指向 `/dev/null` 的同名符号连接，从而在根本上确保无法启动这些单元。 这比 **disable** 命令更彻底，可以通杀一切启动方法(包括手动启动)，所以应该谨慎使用该命令。 若与 `--runtime` 选项连用，则表示仅作临时性屏蔽(重启后屏蔽将失效)，否则默认为永久性屏蔽。 除非使用了 `--now` 选项(相当于同时执行 **stop** 命令)，否则仅屏蔽一个单元并不会导致该单元被停止。 此命令的参数仅能接受单元的名字，而不能接受单元文件的路径。
    
-   **unmask _`NAME`_…**
    
-   解除对指定单元或单元实例的屏蔽，这是 **mask** 命令的反动作。 也就是在单元目录中删除指向 `/dev/null`的同名符号连接。 此命令的参数仅能接受单元的名字，而不能接受单元文件的路径。
    
-   **link _`PATH`_…**
    
-   将不在标准单元目录中的单元文件(通过软链接)连接到标准单元目录中去。 _PATH_ 参数必须是单元文件的绝对路径。该命令的结果可以通过 **disable** 命令撤消。 通过该命令，可以让一个不在标准单元目录中的单元文件，也可以像位于标准单元目录中的常规单元文件一样， 被 **start**, **stop** … 等各种命令操作。
    
-   **revert _`NAME`_…**
    
-   将指定的单元恢复成初始版本。 这将会删除对指定单元的所有修改。 例如，对于 "`foo.service`" 单元来说， 将会删除所有 `foo.service.d/` 目录。 如果指定的单元在 `/usr/lib/` 目录中 还存在单元文件的初始版本，那么还会进一步删除 `/etc/` 与 `/run/` 目录中 所有用来覆盖初始单元文件的软连接与自定义单元文件。 如果指定的单元已经被屏蔽，那么将会被解除屏蔽。
    
    从效果上看，该命令相当于撤销 **edit**, **set-property**, **mask** 命令所做的操作， 并且将指定单元的配置恢复成软件包提供的初始值。
    
-   **add-wants _`TARGET`_ _`NAME`_…**, **add-requires _`TARGET`_ _`NAME`_…**
    
-   将指定的单元或单元实例(_NAME_) 作为 "`Wants=`" 或 "`Requires=`" 依赖， 添加到 _TARGET_ 单元中。
    
    关于 `--system`, `--user`, `--runtime`, `--global` 选项的影响， 参见前文对 **enable** 命令的解释。
    
-   **edit _`NAME`_…**
    
-   调用文本编辑器(参见下面的"环境变量"小节)修改指定的单元或单元实例。
    
    若使用了 `--full` 选项，则表示使用新编辑的单元文件完全取代原始单元文件， 否则默认将新编辑的单元配置片段(位于 `.d/` 目录)附加到原始单元文件的末尾。
    
    如果使用了 `--force` 选项，并且某些指定的单元文件不存在， 那么将会强制打开一个新的空单元文件以供编辑。
    
    注意，在编辑过程中，编辑器实际操作的只是临时文件， 仅在编辑器正常退出时，临时文件的内容才会被实际写入到目标文件中。
    
    注意，如果在编辑器退出时，临时文件的内容为空， 则表示取消编辑动作(而不是写入一个空文件)。
    
    编辑动作完成之后，systemd 将会自动重新加载自身的配置(相当于执行 **daemon-reload** 命令)，以确保所做的变更立即生效。
    
    关于 `--system`, `--user`, `--runtime`, `--global` 选项的影响， 参见前文对 **enable** 命令的解释。
    
    注意：(1)该命令不可用于编辑远程主机上的单元文件。 (2)禁止在编辑 `/etc` 中的原始单元文件时使用 `--runtime` 选项， 因为 `/etc` 中的单元文件优先级高于 `/run` 中的单元文件。
    
-   **get-default**
    
-   显示默认的启动目标。 这将显示 `default.target` 软链接所指向的实际单元文件的名称。
    
-   **set-default _`NAME`_**
    
-   设置默认的启动目标。 这会将 `default.target` 软链接指向 _NAME_ 单元。
    

### 机器命令

-   **list-machines \[_`PATTERN`_…\]**
    
-   列出主机和所有运行中的本地容器，以及它们的状态。 如果给出了模式(_PATTERN_)参数， 那么仅显示容器名称与至少一个模式匹配的本地容器。
    

### 任务(job)命令

-   **list-jobs \[_`PATTERN…`_\]**
    
-   列出正在运行中的任务。 如果给出了模式(_PATTERN_)参数， 那么仅显示单元名称与至少一个模式匹配的任务。
    
    当与 `--after` 或 `--before` 连用时， 输出列表将会包含正在等待哪些任务完成，或哪些任务正在等待此处的任务完成。 详见前文。
    
-   **cancel _`JOB`_…**
    
-   据给定的任务ID撤消任务。 如果没有给出任务ID， 那么表示撤消所有尚未执行的任务。
    

### 环境变量命令

-   **show-environment**
    
-   显示所有 systemd 环境变量及其值。 这些环境变量会被传递给所有由 systemd 派生的进程。 显示格式遵守shell脚本语法，可以直接用于shell脚本中。 如果环境变量的值中不包含任何特殊字符以及空白字符， 那么将直接按照 "`VARIABLE=value`" 格式显示，并且不使用任何转义序列。 如果环境变量的值中包含任何特殊字符或及空白字符， 那么将按照 "`VARIABLE=$'value'`" 格式(以美元符号开头的单引号转义序列)显示。 这种格式可以兼容 [bash(1)](http://linux.die.net/man/1/bash), [zsh(1)](http://linux.die.net/man/1/zsh), [ksh(1)](http://linux.die.net/man/1/ksh), 以及 [busybox(1)](http://linux.die.net/man/1/busybox) 中的 [ash(1)](http://linux.die.net/man/1/ash) ； 但是不兼容 [dash(1)](http://linux.die.net/man/1/dash) 与[fish(1)](http://linux.die.net/man/1/fish)
    
-   **set-environment _`VARIABLE=VALUE`_…**
    
-   设置指定的 systemd 环境变量。
    
-   **unset-environment _`VARIABLE`_…**
    
-   撤消指定的 systemd 环境变量。 如果仅指定了变量名，那么表示无条件的撤消该变量(无论其值是什么)。 如果以 VARIABLE=VALUE 格式同时给出了变量值， 那么表示仅当 VARIABLE 的值恰好等于 VALUE 时， 才撤消 VARIABLE 变量。
    
-   **import-environment** \[_`VARIABLE…`_\] 
    
-   导入指定的客户端环境变量。 如果未指定任何参数， 则表示导入全部客户端环境变量。
    

### systemd 生命周期命令

-   **daemon-reload**
    
-   重新加载 systemd 守护进程的配置。 具体是指：重新运行所有的生成器([systemd.generator(7)](http://www.jinbuguo.com/systemd/systemd.generator.html#))， 重新加载所有单元文件，重建整个依赖关系树。 在重新加载过程中， 所有由 systemd 代为监听的用户套接字都始终保持可访问状态。
    
    不要将此命令与 **reload** 命令混淆。
    
-   **daemon-reexec**
    
-   重新执行 systemd 守护进程。 具体是指：首先序列化 systemd 状态， 接着重新执行 systemd 守护进程并反序列化原有状态。 此命令仅供调试和升级 systemd 使用。 有时候也作为 **daemon-reload** 命令的重量级版本使用。 在重新执行过程中， 所有由 systemd 代为监听的用户套接字都始终保持可访问状态。
    

### 系统命令

-   **is-system-running**
    
-   检查当前系统是否处于正常运行状态(running)，若正常则返回"0"，否则返回大于零的正整数。 所谓正常运行状态是指： 系统完成了全部的启动操作，整个系统已经处于完全可用的状态， 特别是没有处于启动/关闭/维护状态，并且没有任何单元处于失败(failed)状态。 除非使用了 `--quiet` 选项， 否则此命令还会在标准输出上显示系统的当前状态， 如下表所示：
    
    **表 2. is-system-running 命令的输出**
| 状态 | 含义 | 返回值 |
| --- | --- | --- |
| `initializing` | 启动的早期阶段。也就是尚未到达 `basic.target /rescue.target/emergency.target`之前的阶段 | \> 0 |
| `starting` | 启动的晚期阶段。也就是任务队列首次达到空闲之前的阶段，或者已经启动到了某个救援 target 中| \> 0 |
| `running` | 完成了全部的启动操作，整个系统已经处于完全可用的状态，并且没有任何单元处于失败 (failed) 状态| 0 |
| `degraded` | 完成了全部的启动操作，系统已经可用， 但是某些单元处于失败(failed)状态| \> 0 |
| `maintenance` | 启动了 `rescue.target`/`emergency.target` 目标 | \> 0 |
| `stopping` | 系统正处于关闭过程中| \> 0 |
| `offline` | 整个系统已经处于完全可用的状态， 但init进程(PID=1)不是 systemd| \> 0 |
| `unknown` | 由于资源不足或未知原因， 无法检测系统的当前状态| \> 0 |

-   **default**
    
-   进入默认模式。相当于执行 **systemctl isolate default.target** 命令。 此操作默认为阻塞模式，但可以使用 `--no-block` 选项转变为无阻塞模式。
    
-   **rescue**
-   进入救援模式。相当于执行 **systemctl isolate rescue.target** 命令。 此操作默认为阻塞模式，但可以使用 `--no-block` 选项转变为无阻塞模式。
    
-   **emergency**
-   进入紧急维修模式。相当于执行 **systemctl isolate emergency.target** 命令。此操作默认为阻塞模式， 但可以使用 `--no-block` 选项转变为无阻塞模式。
    
-   **halt**
    
-   关闭系统，但不切断电源。差不多相当于执行 **systemctl start halt.target --job-mode=replace-irreversibly --no-block** 命令，并同时向所有用户显示一条警告信息。 这是一个无阻塞命令，也就是将关闭操作排入任务队列之后，不等待其完成就立即返回。 注意，此命令仅关闭操作系统内核，但不切断硬件电源。 若想彻底切断硬件电源，应该使用下面的 **systemctl poweroff** 命令。
    
    若仅使用一次 `--force` 选项， 则跳过单元的正常停止步骤而直接杀死所有进程，强制卸载所有文件系统(或以只读模式重新挂载)，并立即关闭系统。 若使用了两次 `--force` 选项， 则跳过杀死进程和卸载文件系统的步骤，并立即关闭系统，这会导致数据丢失、文件系统不一致等不良后果。 注意，如果连续两次使用 `--force` 选项，那么所有操作都将由 **systemctl** 自己直接执行，而不会与 systemd 进程通信。 这意味着，即使 systemd 进程已经崩溃，连续两次使用 `--force` 选项所指定的操作依然能够执行成功。
    
-   **poweroff**
    
-   关闭系统，同时切断电源。差不多相当于执行 **systemctl start poweroff.target --job-mode=replace-irreversibly --no-block** 命令，并同时向所有用户显示一条警告信息。 这是一个无阻塞命令，也就是将关闭操作排入任务队列之后，不等待其完成就立即返回。
    
    若仅使用一次 `--force` 选项， 则跳过单元的正常停止步骤而直接杀死所有进程，强制卸载所有文件系统(或以只读模式重新挂载)，并立即关闭系统。 若使用了两次 `--force` 选项， 则跳过杀死进程和卸载文件系统的步骤，并立即关闭系统，这会导致数据丢失、文件系统不一致等不良后果。 注意，如果连续两次使用 `--force` 选项， 那么所有操作都将由 **systemctl** 自己直接执行，而不会与 systemd 进程通信。 这意味着，即使 systemd 进程已经崩溃，连续两次使用 `--force` 选项所指定的操作依然能够执行成功。
    
-   **reboot \[_`arg`_\]**
    
-   关闭系统，然后重新启动。差不多相当于执行 **systemctl start reboot.target --job-mode=replace-irreversibly --no-block** 命令，并同时向所有用户显示一条警告信息。 这是一个无阻塞命令，也就是将重启操作排入任务队列之后，不等待其完成就立即返回。
    
    若仅使用一次 `--force` 选项， 则跳过单元的正常停止步骤而直接杀死所有进程，强制卸载所有文件系统(或以只读模式重新挂载)，并立即关闭系统。 若使用了两次 `--force` 选项， 则跳过杀死进程和卸载文件系统的步骤，并立即关闭系统，这会导致数据丢失、文件系统不一致等不良后果。 注意，如果连续两次使用 `--force` 选项， 那么所有操作都将由 **systemctl** 自己直接执行，而不会与 systemd 进程通信。 这意味着，即使 systemd 进程已经崩溃，连续两次使用 `--force` 选项所指定的操作依然能够执行成功。
    
    若给出了可选的 _arg_ 参数，那么将会被作为可选参数传递给 [reboot(2)](http://man7.org/linux/man-pages/man2/reboot.2.html) 系统调用。其取值范围依赖于特定的硬件平台。例如 "`recovery`" 有可能表示触发系统恢复动作，而 "`fota`" 有可能表示 “firmware over the air” 固件更新。
    
-   **kexec**
    
-   关闭系统，并通过内核的 **kexec** 接口重新启动。相当于执行 **systemctl start kexec.target --job-mode=replace-irreversibly --no-block** 命令。 这是一个无阻塞命令，也就是将重启操作排入任务队列之后，不等待其完成就立即返回。
    
    若使用了 `--force` 选项， 则跳过服务的正常关闭步骤而直接杀死所有进程， 强制卸载所有文件系统(或只读挂载)，并立即关闭系统。
    
-   **exit \[_`EXIT_CODE`_\]**
    
-   退出服务管理器。此命令仅可用于 systemd 用户实例(也就是以 `--user` 选项启动的实例)或容器，相当于执行 **poweroff** 命令。 这是一个无阻塞命令，也就是将退出操作排入任务队列之后，不等待其完成就立即返回。
    
    默认退出码为零，但也可以使用 _EXIT\_CODE_ 指定退出码(必须是整数)。
    
-   **switch-root _`ROOT`_ \[_`INIT`_\]**
    
-   将系统的根文件系统切换到 _ROOT_ 目录， 并执行新系统上的 _INIT_ 程序(PID=1)。 此命令仅应该在初始内存盘("initrd")中使用。 如果未指定 _INIT_ 参数或者参数值为空， 那么表示自动在 _ROOT_ 目录下搜索 systemd 二进制程序， 并将其用作 _INIT_ 程序， 同时"initrd"中 systemd 的状态将会传递给新的 systemd 进程， 从而允许在新系统中对原"initrd"中的各种服务状态进行内省。
    
-   **suspend**
    
-   休眠到内存。 相当于启动 `suspend.target` 目标。 这是一个无阻塞命令，也就是将休眠操作排入任务队列之后，不等待其完成就立即返回。
    
-   **hibernate**
    
-   休眠到硬盘。 相当于启动 `hibernate.target` 目标。 这是一个无阻塞命令，也就是将休眠操作排入任务队列之后，不等待其完成就立即返回。
    
-   **hybrid-sleep**
    
-   进入混合休眠模式。也就是同时休眠到内存和硬盘。 相当于启动 `hybrid-sleep.target` 目标。 这是一个无阻塞命令，也就是将休眠操作排入任务队列之后，不等待其完成就立即返回。
    

### 参数语法

单元命令的参数可能是一个单独的单元名称(_NAME_)， 也可能是多个匹配模式(_PATTERN_…)。 对于第一种情况，如果省略单元名称的后缀，那么默认以 "`.service`" 为后缀， 除非那个命令只能用于某种特定类型的单元。例如

```
# systemctl start sshd
```

等价于

```
# systemctl start sshd.service
```

， 而

```
# systemctl isolate default
```

等价于

```
# systemctl isolate default.target
```

，因为 isolate 命令只能用于 .target 单元。 注意，设备文件路径(绝对路径)会自动转化为 device 单元名称，其他路径(绝对路径)会自动转化为 mount 单元名称。 例如，如下命令

```
# systemctl status /dev/sda
# systemctl status /home
```

分别等价于

```
# systemctl status dev-sda.device
# systemctl status home.mount
```

对于第二种情况，可以在模式中使用shell风格的匹配符，对所有已加载到内存中的单元的主名称(primary name)进行匹配。 如果没有使用匹配符并且省略了单元后缀，那么处理方式与第一种情况完全相同。 这就意味着：如果没有使用匹配符，那么该模式就等价于一个单独的单元名称(_NAME_)，只表示一个明确的单元。 如果使用了匹配符，那么该模式就可以匹配任意数量的单元(包括零个)。

模式使用 [fnmatch(3)](http://man7.org/linux/man-pages/man3/fnmatch.3.html) 语法， 也就是可以使用shell风格的 "`*`", "`?`", "`[]`" 匹配符(详见 [glob(7)](http://man7.org/linux/man-pages/man7/glob.7.html))。 模式将基于所有已加载到内存中的单元的主名称(primary name)进行匹配， 如果某个模式未能匹配到任何单元，那么将会被悄无声息的忽略掉。 例如

```
# systemctl stop sshd@*.service
```

命令将会停止所有 `sshd@.service` 的实例单元。 注意，单元的别名(软连接)以及未被加载到内存中的单元，不在匹配范围内(也就是不作为匹配目标)。

对于单元文件命令，_NAME_ 参数必须是单元名称(完整的全称或省略了后缀的简称)或单元文件的绝对路径。 例如：

```
# systemctl enable foo.service
```

或

```
# systemctl link /path/to/foo.service
```

## 退出状态

返回值为 0 表示成功， 非零返回值表示失败代码。

## 环境变量

-   $SYSTEMD\_EDITOR
    
-   编辑单元文件时所使用的编辑器，会覆盖 `$EDITOR` 与 `$VISUAL` 的值。 如果 `$SYSTEMD_EDITOR`, `$EDITOR`,`$VISUAL` 都不存在或无法使用， 那么将会依次尝试使用 [editor(1)](http://linux.die.net/man/1/editor), [nano(1)](http://linux.die.net/man/1/nano), [vim(1)](http://linux.die.net/man/1/vim), [vi(1)](http://linux.die.net/man/1/vi) 编辑器。
    

-   $SYSTEMD\_PAGER
    
-   指定分页程序。仅在未指定 `--no-pager` 选项时有意义。 此变量会覆盖 `$PAGER` 的值。如果 `$SYSTEMD_PAGER`与 `$PAGER` 都未设置， 那么将会依次尝试如下常见的分页程序： [less(1)](http://man7.org/linux/man-pages/man1/less.1.html), [more(1)](http://man7.org/linux/man-pages/man1/more.1.html), 如果最终仍未找到分页程序，那么将不使用分页。 将此变量设为空字符串或 "`cat`" 等价于使用 `--no-pager` 选项。
    
-   $SYSTEMD\_LESS
    
-   用于覆盖默认传递给 **less** 程序的命令行选项("`FRSXMK`")。
    
-   $SYSTEMD\_LESSCHARSET
    
-   用于覆盖默认传递给 **less** 程序的字符集。 (如果终端兼容 UTF-8 ，那么默认值是 "`utf-8`" )
    

## 参见

[systemd(1)](http://www.jinbuguo.com/systemd/systemd.html#), [journalctl(1)](http://www.jinbuguo.com/systemd/journalctl.html#), [loginctl(1)](http://www.jinbuguo.com/systemd/loginctl.html#), [machinectl(1)](http://www.jinbuguo.com/systemd/machinectl.html#), [systemd.unit(5)](http://www.jinbuguo.com/systemd/systemd.unit.html#), [systemd.resource-control(5)](http://www.jinbuguo.com/systemd/systemd.resource-control.html#),[systemd.special(7)](http://www.jinbuguo.com/systemd/systemd.special.html#), [wall(1)](http://man7.org/linux/man-pages/man1/wall.1.html), [systemd.preset(5)](http://www.jinbuguo.com/systemd/systemd.preset.html#), [systemd.generator(7)](http://www.jinbuguo.com/systemd/systemd.generator.html#), [glob(7)](http://man7.org/linux/man-pages/man7/glob.7.html)

译者：**金步国**