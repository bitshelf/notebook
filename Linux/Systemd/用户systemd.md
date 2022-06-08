---
tags: Systemd
---

# 用户 systemd
## demo
```shell:~/.config/systemd/user/firefox.service
[Unit]
Description=Start Firefox
PartOf=graphical-session.target

[Service]
ExecStart=/usr/bin/firefox
Type=oneshot

[Install]
WantedBy=graphical-session.target
```
- `systemctl --user status *.target` 查看用户 target
- 添加 `graphical-session.target`
```shell:~/.xsessionrc
systemctl --no-block --user start graphical-session.target
```
## 工作原理
- 用户自己运行和管理他们自己的服务
- 从 systemd 226 版本开始，`/etc/pam.d/system-login` 默认配置中的 `pam_systemd` 模块会在用户首次登录的时候, 自动运行一个 `systemd --user` 实例。 只要用户还有会话存在，这个进程就不会退出；用户所有会话退出时，进程将会被销毁。

---
 #### 查看当前用户 systemd 服务
 ```shell
 systemctl status --user
```
#### 用户 systemd 配置文件可能所在目录
- `~/.config/systemd/user/` : 优先级最高
- `/etc/systemd/user/` : 全局共享的用户级 unit\[s\]
- `$XDG_RUNTIME_DIR/systemd/user/`
- `~/.local/share/systemd/user/`
- `/usr/lib/systemd/user`：优先级最低，会被高优先级的同名 unit 覆盖

> [!info] Search Path
> ### System Unit Search Path
>  
> `/etc/systemd/system.control/*`
> `/run/systemd/system.control/*`
> `/run/systemd/transient/*`
> `/run/systemd/generator.early/*`
> `/etc/systemd/system/*`
> `/etc/systemd/system.attached/*`
> `/run/systemd/system/*`
> `/run/systemd/system.attached/*`
> `/run/systemd/generator/*`
> …
> `/usr/lib/systemd/system/*`
> `/run/systemd/generator.late/*`
> 
> ### User Unit Search Path
> 
> `~/.config/systemd/user.control/*`
> `$XDG_RUNTIME_DIR/systemd/user. control/*`
> `$XDG_RUNTIME_DIR/systemd/transient/*`
> `$XDG_RUNTIME_DIR/systemd/generator. early/*`
> `~/.config/systemd/user/*`
> `$XDG_CONFIG_DIRS/systemd/user/*`
> `/etc/systemd/user/*`
> `$XDG_RUNTIME_DIR/systemd/user/*`
> `/run/systemd/user/*`
> `$XDG_RUNTIME_DIR/systemd/generator/*`
> `$XDG_DATA_HOME/systemd/user/*`
> `$XDG_DATA_DIRS/systemd/user/*`
> …
> `/usr/lib/systemd/user/*`
> `$XDG_RUNTIME_DIR/systemd/generator.late/*`


> [!info] XDG_RUNTIME_DIR
> `$XDG_RUNTIME_DIR`是用户特定的不重要的运行时文件和其他文件对象（例如套接字，命名管道…）存储的基本目录。该目录必须由用户拥有，并且他必须是唯一具有读写访问权限的目录。它的Unix访问模式必须是0700

## 创建用户 system 服务
1. 创建文件：`systemctl --user edit --force myapp.service`
2. 手动创建文件目录：`mkdir -p ~/.config/systemd/user/`
3. root 用户不能启动普通用户的服务,用户级 unit 与系统级 unit 相互独立，不能互相关联或依赖
4. 用户级 unit 运行环境用 default. target，系统级通常用 multi-user. target
5. 即使用户不登陆，其定制的服务依然会启动

# Link 
- [systemd/用户 - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/Systemd/%E7%94%A8%E6%88%B7)
- [systemd user services - unixsysadmin.com](https://www.unixsysadmin.com/systemd-user-services/)
- [systemd.unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)
- [Setting DISPLAY in systemd service file - Magenaut](https://magenaut.com/setting-display-in-systemd-service-file/?amp=1)
