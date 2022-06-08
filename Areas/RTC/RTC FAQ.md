---
tags: RTC command 
---

# RTC 问题
### hwclock
> [!question] RTC 设备可用，但是 `hwclock -r` 显示 
> ```
> hwclock: select() to /dev/rtc0 to wait for clock tick timed out
>```
> 
> #### root 执行: `hwclock -r` 报错
> ```
> [  400.414808] hym8563_rtc_set_alarm:diff_sec= 1s , use time
hwclock: select() to /dev/rtc0 to wait for clock tick timed out
>```
* **尝试办法**：
	1.  `busybox hwclock`
	2. 试一试 buildroot 系统是否正常

> [!error] busybox hwclock
> ```
> hwclock: can't open '/dev/misc/rtc': No such file or directory
>```
- 切换到 root 下执行
```shell
busybox hwclock
```

