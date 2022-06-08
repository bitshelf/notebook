---
tags: Ubuntu
---

# Ubuntu 显示旋转
## 通用旋转
```shell
DISPLAY=:0 xrandr --output HDMI-1 --rotate normal
```
## LXDE
```shell
# /usr/bin/startlxde
/usr/bin/xrandr --output LVDS-1 --rotate left
```
- [LXDE (简体中文) - ArchWiki](https://wiki.archlinux.org/title/LXDE_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
## systemd 服务旋转
1. 查看用户文件位置
```shell
systemctl --user cat  gnome-session
```


---
## Link
- #X11 [多显示器 - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/%E5%A4%9A%E6%98%BE%E7%A4%BA%E5%99%A8)
- [Site Unreachable](https://zh.wikipedia.org/wiki/X%E8%A6%96%E7%AA%97%E7%B3%BB%E7%B5%B1)
---

---
![buildroot 显示旋转](../../../buildroot/buildroot%20显示旋转.md)