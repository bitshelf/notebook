---
tags: Amlogic HDMI
---
## RK3588 Linux Gstreamer 预览
```shell
#!/bin/bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/gstreamer-1.0
gst-launch-1.0 v4l2src device=/dev/video0  !  video/x-raw,width=1920,height=1080,framerate=25/1  ! videoconvert !  autovideosink
MEDIA_NUM=$(ls /dev/media* | wc -l)

COMPATIBLE=$(cat /proc/device-tree/compatible)
if [[ $COMPATIBLE =~ "rk3588" ]]; then
  if [[ $MEDIA_NUM == 2 ]];then
  gst-launch-1.0 v4l2src device=/dev/video20  !  video/x-raw,width=1920,height=1080,framerate=25/1  ! videoconvert !  autovideosink
  elif [[ $MEDIA_NUM == 4 ]];then
  gst-launch-1.0 v4l2src device=/dev/video40  !  video/x-raw,width=1920,height=1080,framerate=25/1  ! videoconvert !  autovideosink
  elif [[ $MEDIA_NUM == 6 ]];then
  gst-launch-1.0 v4l2src device=/dev/video60  !  video/x-raw,width=1920,height=1080,framerate=25/1  ! videoconvert !  autovideosink
  fi
else
gst-launch-1.0 v4l2src device=/dev/video0  !  video/x-raw,width=1920,height=1080,framerate=25/1  ! videoconvert !  autovideosink
fi
COMPATIBLE=${COMPATIBLE#rockchip,}
```
## A311d2 Android HDMIin 测试
* 打开测试 HDMI in 选项
~~~shell
am start -n com.android.tv.settings/com.android.tv.settings.TvSourceActivity
~~~
