---
tags:
  - Ubuntu
  - Camera
---

命令行指定设备节点显示
```shell
mplayer tv:// -tv driver=v4l2:device=/dev/video41:input=0:outfmt=bgr24:width=1920:height=1080:fps=30 -vo x11
```

## 安装
```shell
sudo apt install mplayer 
```