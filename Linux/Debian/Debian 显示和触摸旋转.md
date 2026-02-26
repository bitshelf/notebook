---
tags:
  - Debian
---
## 触摸旋转
- `/etc/X11/xorg.conf.d/05-touchscreen.conf`
```conf:/etc/X11/xorg.conf.d/05-touchscreen.conf
Section "InputClass"
        Identifier "ff_touchscreen"
        MatchIsTouchscreen "on"
        Driver "libinput"
        Option "CalibrationMatrix" "0 1 0 -1 0 1 0 0 1"

EndSection
```

## 显示旋转
- `/etc/X11/xorg.conf.d/90-rotate.conf`
```conf:/etc/X11/xorg.conf.d/90-rotate.conf
Section "Monitor"
        Identifier "DSI-1"
        Option "Rotate" "right"
EndSection
```
- 原有文件：`/etc/X11/xorg.conf.d/20-modesetting.conf`