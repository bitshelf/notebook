---
tags:
  - USB/Camera
---
## Debug 
### 查看 USB 摄像头是否枚举成功
```shell
cat /sys/kernel/debug/usb/devices
```

### 查看 USB 摄像头是否支持 UVC 协议
```shell
# Android 系统 lsusb  不支持
lsusb -d 18ec:3399 -v | grep "14 Video"
```

## Debian 预览多个 USB 摄像头
1. 预览命令
```shell
export DISPLAY=:0.0
gst-launch-1.0 v4l2src device=/dev/video9 ! image/jpeg,width=1920,height=1080 ! mppjpegdec ! autovideoconvert ! autovideosink
```
2. 查看摄像头对应节点
```shell
v4l2-ctl -d /dev/videoN --list-formats-ext # N 对应节点
```
- 输出摄像头格式的节点，则为捕获节点


