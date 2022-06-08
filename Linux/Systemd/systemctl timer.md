---
tags: Systemd
---

# journalctl
1. 配置文件：`/etc/systemd/journald.conf`
2. 查看启动日志：`journalctl -b`
3. 打印特定等级错误日志：`journalctl -p err..alert`

# timer
* 通过日历事件激活定时器
```service
[Timer]
OnCalendar = Fri 2022-11-22 11:23:23
```
![[assets/systemctl timer单元 .excalidraw]]
1. 查看当前系统的定时器：`systemctl list-timers`

# systemctl 其他命令
1. 关闭系统并下电：`systemctl poweroff`
2. 关闭系统但不下电：`systemctl halt`
3. 重启系统：`systemctl reboot`
4. 系统待机：`systemctl suspend`
5. 系统休眠：`systemctl hibernate`
6. 系统待机并处于休眠状态：`systemctl hybrid-sleep`