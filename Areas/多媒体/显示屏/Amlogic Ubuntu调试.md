# nano-box-A311D 
在 dts 中需要把 fb 的默认大小调整为和当前屏幕的一致
```
/* This must be configured for ubuntu systems. */

&meson_fb {

 status = "okay";

 display_mode_default = "panel"; //for lcd

 display_size_default = <1024 600 1024 600 32>; //32 表示深度

};
```

* display_mode_default 这个参数是对于 LCD显示而言，需要配置成panel，如果是HDMI，则可以配置为1080p60hz，
* display_size_default 配置默认的fb大小，针对屏幕显示的话，这个配置是必须的，否则在系统启动后会显示花屏。

## 文件系统配置
⚠️ 不同的LCD有可能还需要不同的顺序
```shell
lcd_width=`cat /sys/class/display/vinfo | grep width -w | awk '{print $2}'`

lcd_height=`cat /sys/class/display/vinfo | grep height -w | awk '{print $2}'`

if [ $lcd_width -lt $lcd_height ];then

 echo 0 0 $lcd_width $lcd_height > /sys/class/graphics/fb0/free_scale_axis

 echo panel > /sys/class/display/mode

 echo 0 > /sys/class/ppmgr/ppscaler

 echo 0 > /sys/class/graphics/fb0/free_scale

 echo 1 > /sys/class/graphics/fb0/freescale_mode

 fbset -fb /dev/fb0 -g $lcd_width $lcd_height $lcd_width $lcd_height 32

 echo 0 > /sys/class/graphics/fb0/free_scale

 [[ -n `cat /proc/device-tree/compatible | grep s905` ]] && echo 0x10001 > /sys/class/graphics/fb0/free_scale

else

 fbset -fb /dev/fb0 -g $lcd_width $lcd_height $lcd_width $lcd_height 32

 echo 0 > /sys/class/graphics/fb0/free_scale

fi

echo 1 > /sys/class/lcd/enable
```


## buildroot 文件系统配置

`/etc/init.d/S01syslogd` 文件中主要配置分辨率，获取vinfo的配置，写入到 /etc/directfbrc 文件中
~~~shell
HDMI_STAT=$(cat /sys/class/amhdmitx/amhdmitx0/hpd_state)
MIPI_SIZE=$(cat /sys/firmware/devicetree/base/lcd/lcd_1/lcd_size)
LCD_WIDTH=`cat /sys/class/display/vinfo | grep width -w | awk '{print $2}'`
LCD_HEIGHT=`cat /sys/class/display/vinfo | grep height -w | awk '{print $2}'`

if [ $HDMI_STAT -eq 0 ];then
	 echo "lcd mode"
	 #cp /etc/profile.d/directfbrc-$MIPI_SIZE /etc/directfbrc
	 RESOLUTION="${LCD_WIDTH}x${LCD_HEIGHT}"
	 sed -i -e "4s/.*$/mode=$RESOLUTION/" /etc/directfbrc
	 echo 0 > sys/class/lcd/enable
else
	 echo "hdmi mode"
	 #cp /etc/profile.d/directfbrc-hdmi /etc/directfbrc
	 sed -i -e "4s/.*$/mode=1920x1080/" /etc/directfbrc

fi
~~~





