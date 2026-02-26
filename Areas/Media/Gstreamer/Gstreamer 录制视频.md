---
tags:
  - GStreamer
---
## 录制视频
```shell
gst-launch-1.0 -e v4l2src device=/dev/video11 ! 'video/x-raw,width=1920,height=1080,framerate=60/1' ! tee name=t t. ! queue ! videoscale ! 'video/x-raw,width=1920,height=1080' ! waylandsink t. ! queue ! videoconvert ! mpph264enc ! h264parse ! mp4mux ! filesink location=input.mp4
```