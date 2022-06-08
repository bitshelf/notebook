---
tags: Ubuntu
---

# 查看显示屏信息
1. 切换到 root 用户
2. 使用 `cat /sys/kernel/debug/dri/0/summary`

# Debian 显示屏旋转
~~~shell
xhost + # 允许所有用户操作xserver
xrandr --output HDMI-1 --rotate left
Sleep 3
xrandr --output HDMI-1 --rotate inverted
Sleeo 3
xrandr --output HDMI-1 --rotate right
~~~


> [!error] 显示 Can't open display
> `export DISPLAY=:0.0`
> The format of the display variable is `[host]:<display>[.screen]`

~~~shell
# vi /home/linaro/.config/lxsession/LXDE/autostart
xrandr -o left

# /usr/share/X11/xorg.conf.d/40-libinput.conf
Option "TransformationMatrix" "0 -1 1 1 0 0 0 0 1"
~~~

# 触摸旋转
在配置文件：`/usr/share/X11/xorg.conf.d/40-libinput.conf` 的最下面的一块 Section "InputClass"中

可以看到是显示 touchscreen 的配置，在 Driver 上面一行添加以下一行
~~~shell
Option "TransformationMatrix" "-1 0 1 0 -1 1 0 0 1"
~~~

具体参数参考以下
1. 左旋 90°
	⎡ 0 -1 1 ⎤
	⎜ 1  0 0 ⎥
	⎣ 0  0 1 ⎦
2. 右旋 90°
	⎡  0 1 0 ⎤
	⎜ -1 0 1 ⎥
	⎣  0 0 1 ⎦
3. 旋转 180°（翻转）
	⎡ -1  0 1 ⎤
	⎜  0 -1 1 ⎥
	⎣  0  0 1 ⎦

# Link
- [Xrandr - Arch Linux 中文维基](https://wiki.archlinuxcn.org/wiki/Xrandr) 