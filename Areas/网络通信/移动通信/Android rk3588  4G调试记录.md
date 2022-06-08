---
tags: LTE Rockchip
---

# RK3588 4G 调试
1. 修改 Android 启动 rc 脚本：`device/rockchip/common/rootdir/ueventd.rockchip.rc`
```
/dev/ttyUSB0              0777 radio radio
/dev/ttyUSB1              0777 radio radio
/dev/ttyUSB2              0777 radio radio
/dev/ttyUSB3              0777 radio radio
/dev/ttyUSB4              0777 radio radio
/dev/ttyUSB5              0777 radio radio
/dev/ttyUSB6              0777 radio radio
/dev/ttyUSB7              0777 radio radio
/dev/ttyUSB8              0777 radio radio
/dev/ttyUSB9              0777 radio radio
```
3. 修改内核配置，去除
	1. `CONFIG_USB_NET_QMI_WWAN=y`
	2. `CONFIG_USB_SIERRA_NET=y`
4. call-pppd 文件不是不一定需要
5. apn 配置文件：`device/rockchip/common/5g_modem/apns-conf.xml`
6. 删除编译生成文件，使修改加入到新的生成镜像
~~~shell
 rm out/target/product/rk3588_s/vendor/etc/init/hw/init.*
~~~
