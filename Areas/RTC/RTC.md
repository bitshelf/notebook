---
tags: RTC command 
---

# hwclock
* 将系统时钟拷贝到硬件时钟：`hwclock -w` / `hwclock -systohc`
* 将硬件时钟拷贝到系统时钟：`hwclock -s` / `hwclock -hctosys`
* 使用指定 RTC 设备：`hwclock -f FILE`
* 设置系统时钟：`date -s "2013-11-19 15:11:40"`
> [!attention] 
> Setting the system time using the date command does not automatically synchronize the RTCs. Use the hwclock command after entering the date command to synchronize an RTC with the updated system time

# RTC
* 查看 RTC 设备名字 `cat /sys/class/rtc/rtc0/name`
# RTC 节点查看
* ubuntu：`ls /dev/rtc*`
* 启动日志查看：`dmesg|grep 8563`（8563 IC）
---
# timedatectl
1. 显示当前时间：`timedatectl`
2. `timedatectl status` 如果 RTC 时间是无效值，会得到一个报错
3. 未联网时钟设置：
	1. `timedatectl set-ntp false`
	2. `timedatectl set-time "2015-01-31 11:13:54"`
4. 设置硬件时钟同步到本地时间：`timedatectl set-local-rtc 1`
5. 设置硬件时钟同步到 UTC 时间：`timedatectl set-local-rtc 0`
6. 查看时区：`timedatectl list-timezones | grep Asia/Shanghai`
7. 设置时区：`timedatectl set-timezone Asia/Shanghai`
8. 查看系统时区：`cat /etc/timezone`
9. 查看系统时钟：`ls -l /etc/localtime`
10. 同步到 NIST Atomic Clock：`timedatectl set-ntp yes` / `timedatectl set-ntp no` (NTP stands for Network Time Protocol)
11. ubuntu 时钟配置文件：`/etc/systemd/timesyncd.conf `
---
# 参考链接
* < https://developer.toradex.com/knowledge-base/how-to-use-the-real-time-clock-in-linux>

<iframe 
    height = 400
    width = 100%
    src="https://developer.toradex.com/knowledge-base/how-to-use-the-real-time-clock-in-linux">
</iframe>