---
tags: udev 
---

### 查看 Udev 相关信息 
```shell
# 打印出/dev/mmcblk0p1 相关的匹配属性，可以用于udev规则文件
udevadm info -a -n /dev/mmcblk0p1 
```

### 重新加载规则
```shell
udevadm control --reload-rules
```

### 测试事件规则
```shell
# 测试/dev/mmcblk*p* 事件，会把加载的规则文件例举出来
udevadm test /dev/mmcblk0p1   
```

### 监控 udev 事件
```shell
udevadm monitor
```

````ad-example
### sd卡自动挂载对应目录（/mnt/sd) 规则文件
```shell
$  cat /lib/udev/rules.d/99-sdcard.rules
ACTION=="add", KERNEL=="mmcblk[0-9]p[0-9]",RUN+="/etc/mount-sd.sh %k"
ACTION=="remove", KERNEL=="mmcblk[0-9]p[0-9]",RUN+="/etc/umount-sd.sh"
```

### 执行脚本
```
$ cat /etc/mount-sd.sh
#!/bin/sh
echo -e "\e[32mrpdzkj___<======\e[0m" >> /dev/console
/bin/mount -t vfat /dev/$1 /mnt/sd

$ cat /etc/umount-sd.sh
#!/bin/bash
echo "umount mmc!" >> /dev/console
umount /mnt/sd
```
---
- 脚本要有执行权限
- 规则修改后需要重新载入
- 当sd卡拔出，但目录没有卸载时，有报错
```
[ 1376.401562] FAT-fs (mmcblk0p1): FAT read failed (blocknr 32)
[ 1376.412410] FAT-fs (mmcblk0p1): Directory bread(block 29838) failed
[ 1376.418831] FAT-fs (mmcblk0p1): Directory bread(block 29839) failed
[ 1376.425446] FAT-fs (mmcblk0p1): Directory bread(block 29840) failed
```
````

