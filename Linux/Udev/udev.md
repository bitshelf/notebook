---
tags: Linux
---

# Udev
* 作为守护进程， udev 接收的事件主要由 linux 内核生成，这些事件是外部设备产生的物理事件
* udev 探测外设和热插拔，将设备控制权传递给内核，例如加载内核模块或设备固件
* udev 通过并行加载内核模块提供了潜在的性能优势。并行加载模块也有一个缺点：无法保证每次加载模块的顺序

## udev 规则
udev 规则以管理员身份编写并保存在 `/etc/udev/rules.d/` 目录，其文件名必须以 `.rules` 结尾。各种软件包提供的规则文件位于 `/usr/lib/udev/rules.d/`。如果 `/usr/lib` 和 `/etc` 这两个目录中有同名文件，则 `/etc` 中的文件优先


> [!warning] 
> 要挂载可移动设备，请**不要**通过在 udev 规则中调用 `mount` 命令的方法。对 FUSE 文件系统将会导致 `Transport endpoint not connected` 错误。应代之以 [udisks](https://wiki.archlinux.org/title/Udisks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87) "Udisks (简体中文)") 以正确处理自动挂载。或者把挂载动作放在 udev 规则内部：
>
>将 `/usr/lib/systemd/system/systemd-udevd.service` 复制到 `/etc/systemd/system/systemd-udevd.service`，将 `MountFlags=slave` 替换为 `MountFlags=shared`

## subsystem 属性查询
1. 查询设备节点属性：`udevadm info -q property /dev/ttyUSB2`


## Link 
* [udev - ArchWiki](https://wiki.archlinux.org/title/Udev)
* [freedesktop udev](https://www.freedesktop.org/software/systemd/man/udev.html)
