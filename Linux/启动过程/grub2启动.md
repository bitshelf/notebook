---
tags: Linux Bootloader
---

# GRUB2
* GRUB2 的主要配置文件是：` /boot/grub2/grub.cfg`，内核更新会覆盖此配置文件
* 更改GRUB2配置：`/etc/default/grub`
* 使更改生效：`grub2-mkconfig > /boot/grub2/grub.cfg`
* 启动日志：`/var/log/messages`
* 
