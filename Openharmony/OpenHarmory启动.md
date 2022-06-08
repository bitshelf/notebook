---
tags: OpenHarmony
---

# OpenHarmony 启动
![|100%](assets/OpenHarmory启动.md)

* 其他分区 fstab
~~~shell
/vendor/etc/fstab.{hardward}
~~~

- 默认启动设备：default_boot_device
~~~shell
soc/10100000.himci.eMMC
~~~

- ramdisk: root
```shell
root=/dev/ram0
root=PARTUUID=614e0000-0000 rootfstype=ext4
```

- 分区表信息：blkdevparts
~~~shell
mmcblk0:1M(boot),15M(kernel),200M(system),200M(vendor),2M(misc),20M(updater),-(userdata)
~~~
