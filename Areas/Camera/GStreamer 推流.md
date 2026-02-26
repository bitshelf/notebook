---
tags:
  - GStreamer
---
## GStreamer 推流
```shell
gst-launch-1.0 v4l2src device=/dev/video11 !  'video/x-raw,format=NV12,width=1600,height=640,framerate=30/1' !  mpph264enc header-mode=each-idr gop=1 max-pending=1 !  h264parse config-interval=-1 !  mpegtsmux pat-interval=500 pmt-interval=500 !  tcpserversink host=0.0.0.0 port=5000 sync=false sync-method=latest-keyframe  > /tmp/gst-sender.log 2>&1 &
```

## Windows 拉流
```powershell
ffplay -fflags nobuffer -flags low_delay -framedrop tcp://192.168.1.181:5000
```