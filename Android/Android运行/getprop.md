---
tags: Android/command
---

# getprop

> [!info] getprop 
> getprop 获取 Android 设备信息

1. 获取 WiFi 的 MAC 地址
~~~shell
cat /sys/class/net/wlan0/address
~~~

2. 获取 Android 手机型号
~~~shell
getprop ro.product.model
~~~

3. 获取设备生产厂商
~~~shell
getprop ro.product.manufacturer
~~~

4. 获取设备序列号
~~~shell
 getprop ro.serialno
~~~
