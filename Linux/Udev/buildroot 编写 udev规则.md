---
tags:
  - udev
---
## 获取设备节点信息
```shell
udevadm info --attribute-walk --name=/dev/ttyACM10
```
获取 usb 插拔信息
```shell
udevadm monitor --udev
```
## 编写规则
- 不能混合匹配多个祖先设备属性

## Link
- [编写 udev 规则](http://blog.levi-g.info/writing-udev-rules.html)
- [SLES 12 SP5 | 管理指南 | 使用 udev 进行动态内核设备管理](https://documentation.suse.com/zh-cn/sles/12-SP5/html/SLES-all/cha-udev.html