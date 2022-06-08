---
tags:
  - QT
---
## QT 环境说明
```shell
export QT_LOGGING_RULES=qt.qpa.input=true # 打印触屏信息
export QT_QPA_EVDEV_TOUCHSCREEN_PARAMETERS=/dev/input/event0 # 指定输入设备的名称
export QT_QPA_EVDEV_MOUSE_PARAMETERS=/dev/input/event0 # 将触摸屏的点击事件配置成Qt的鼠标点击事件
export QT_QPA_FB_HIDECURSOR=1 # 为1则隐藏鼠标光标，为0则显示鼠标光标
```

## tslib 配置
```shell
export TSLIB_ROOT=/home/root/ui/tslib                                          
export TSLIB_TSDEVICE=/dev/input/event0 
export TSLIB_CALIBFILE=/etc/pointercal   
export TSLIB_CONFFILE=$TSLIB_ROOT/etc/ts.conf    
export TSLIB_PLUGINDIR=$TSLIB_ROOT/lib/ts  
export TSLIB_FBDEVICE=/dev/fb0   
export TSLIB_CONSOLEDEVICE=none  
export LD_LIBRARY_PATH=$TSLIB_ROOT/lib:$LD_LIBRARY_PATH
```