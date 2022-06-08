---
tags: Ubuntu
---

# 查看当前连接屏幕信息
```shell
xrandr
```
1. 复制屏幕
	```shell
	xrandr --output HDMI-1-1 --same-as eDP-1-1 --auto
	```
2. 只显示副屏
	```shell
		xrandr --output HDMI-1-1 --auto --output eDP-1-1 --off
	```
3. 设置主副屏
	```
	xrandr --output HDMI-1-1 --primary
	```
	