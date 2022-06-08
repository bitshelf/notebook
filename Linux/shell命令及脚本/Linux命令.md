---
tags: Linux/command
---

## 截图
需要超高清分辨率的屏幕截图，在 Linux 上只要输入: 
```shell
$ xrandr --output DP-2.8 -s 3440x2880 --panning 3440x2880 
```
之后用 Chrome 把图片放大一倍，并用 Ksnapshot 获得所需图片

## 按文件名长度排序
```
ls -S | awk '{print length, $0}' | sort -n | cut -d " " -f2
```
