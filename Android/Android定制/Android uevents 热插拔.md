---
tags: Android 
---
## Uevnet
- 与 init 进程使用相同的解析器
- 默认使用 `0600` 模式和 `root` 用户/组
- 用来自当前加载的 SEPolicy 的 SELabel 创建节点
- 块设备创建为 `/dev/block/<basename uevent DEVPATH>`
- 如果为 uevent 指定了 `DEVNAME` ，则 USB 设备创建为 `/dev/<uevent DEVNAME>` ，否则创建为 `/dev/bus/usb/<bus_id>/<device_id>`

## Link
- [Android Uevent](https://android.googlesource.com/platform/system/core/+/master/init/README.ueventd.md)