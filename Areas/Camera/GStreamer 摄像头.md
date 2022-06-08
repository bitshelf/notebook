---
tags: Linux
---

# GStreamer
```shell
gst-launch-1.0 v4l2src device=/dev/video0 ! 'framerate=60/1' autovideoconvert ! xvimagesink
gst-launch-1.0 v4l2src device=/dev/video1 ! autovideoconvert ! xvimagesink
gst-launch-1.0 v4l2src device=/dev/video2 ! autovideoconvert ! xvimagesink
gst-launch-1.0 v4l2src device=/dev/video3 ! autovideoconvert ! xvimagesink

gst-launch-1.0 v4l2src device=/dev/video0 ! 'video/x-raw, framerate=30/1, format=UYVY'   ! autovideoconvert ! xvimagesink

gst-launch-1.0 v4l2src device=/dev/video1 ! 'video/x-raw, framerate=30/1, format=NV16'  ! autovideoconvert ! xvimagesink
```