---
tags: Linux/systemd 
---

# systemd 启动目标
1. 查看默认启动目标: `systemctl get-default`
2. 更改默认启动目标：`sudo systemctl set-default multi-user.target`

# 理解 systemd default.target 
由 `/etc/systemd/system/default.target` 链接进行控制

1. 查看默认启动目标：`ls -l /etc/systemd/system/default.target`
~~~shell
systemctl list-units --type target
# list all loaded units in any state #
systemctl list-units --type target --all
~~~

## Sysv runleves vs systemd targets
| Systemd target | Runlevel | Description | Old command | New command |
| --- | --- | --- | --- | --- |
| runlevel0.target, poweroff.target | 0 | Power off the Linux box. | init 0 | systemctl isolate poweroff.target |
| runlevel1.target, rescue.target | 1 | Boot into emergency rescue mode (single user mode). | init 1 | systemctl isolate rescue.target |
| runlevel2.target, multi-user.target | 2 | Text based multi-user system that does not configure network interfaces and does not export networks services. | init 2 | systemctl isolate runlevel2.target |
| runlevel3.target, multi-user.target | 3 | Starts the system normally in multi-user text mode for the Linux server usage. | init 3 | systemctl isolate runlevel3.target |
| runlevel4.target, multi-user.target | 4 | For special purposes text mode. | init 4 | systemctl isolate runlevel4.target |
| runlevel5.target, graphical.target | 5 | Same as runlevel 3 and boot into GUI display manager. | init 5 | systemctl isolate graphical.target |
| runlevel6.target, reboot.target | 6 | Reboot the Linux desktop or laptop. | init 5 | systemctl isolate reboot.target |

## 更改 default .target
~~~Shell
sudo ln -s -f -v \
/lib/systemd/system/graphical.target \
/etc/systemd/system/default.target
~~~

~~~shell
sudo ln -s -f -v \
/lib/systemd/system/multi-user.target \
/etc/systemd/system/default.target
~~~

# How to boot in to rescue mode 
~~~shell
sudo systemctl rescue 
~~~

We can change to a different systemd target unit in the current log in session using the CLI as follows:
~~~shell
sudo systemctl isolate multi-user.target
# OR #
sudo systemctl isolate graphical.target 
~~~

##  `--test` option
~~~shell
systemd --test --system --unit=graphical.target
~~~

# Link & references
* <https://www.cyberciti.biz/faq/switch-boot-target-to-text-gui-in-systemd-linux/>
