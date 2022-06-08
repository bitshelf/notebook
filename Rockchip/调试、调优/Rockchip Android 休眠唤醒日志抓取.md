---
tags:
  - Rockchip/Android
---
1. 串口工具的时间戳打开
```shell
echo N > /sys/module/printk/parameters/console_suspend
echo 1 > /sys/power/pm_print_times
```
## Link 
- [Rockchip平台休眠唤醒慢问题排查方法\_rockchip的待机唤醒问题定位-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/123216821?spm=1001.2014.3001.5502)