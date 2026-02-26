---
tags: buildroot
---

# Buildroot 更改显示时区
## /etc/localtime 
1. `/etc/localtime` 是用来描述 **系统时间**
2. 查看当前时区：`date`
3. `ln -s /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime`

## /etc/timezone
1. `/etc/timezone` 是用来描述本机所属 **时区** 的
2. 有些程序是通过该时区，自行换算时间的，如：JAVA，也就是说 `/etc/timezone` 时区不正确，获取的时间可能不正确
3. 修改时区: `echo 'Asia/Shanghai' >/etc/timezone`
4. 查看时区：`cat /etc/timezone`
