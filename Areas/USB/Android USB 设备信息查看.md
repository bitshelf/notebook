---
tags: USB
---

# Android USB 设备信息查看
## lsusb
```shell
lsusb
```

## sys
1. 每个 USB 设备及其配置描述符: `cat /sys/kernel/debug/usb/devices`
2. 查看输入设备信息：`cat /proc/bus/input/devices`
3. 查看对应 USB 设备的详细信息，例如 2-1.1:1.0 命名规则是：roothub-port:configuration.interface.）
```shell
cat sys/bus/usb/devices/2-1.1/
```

4. 查看 USB 端口信息
```shell
ls /sys/bus/usb/drivers/usb/
```

5. 查看 USB 接口协议类型
~~~shell
cat sys/bus/usb/devices/5-0\:1.0/uevent
~~~
