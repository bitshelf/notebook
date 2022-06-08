---
tags: Ubuntu
---

# Ubuntu 设置开启自启动 GUI程序
## 覆盖原有桌面程序
```shell:/usr/bin/startlxde
# /usr/bin/startlxde

exec /usr/bin/lxsession -s LXDE -e LXDE
```
- 将 `/usr/bin/lxsession` 替换需要启动的程序

## 增加启动界面程序
在 `/etc/xdg/autostart/` 增加配置文件

- 脚本启动： `su username -c "DISPLAY=: 0 firefox"`


---
- [ssh - Open a window on a remote X display (why "Cannot open display")? - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/10121/open-a-window-on-a-remote-x-display-why-cannot-open-display/10126#10126)