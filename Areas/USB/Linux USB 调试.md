---
tags:
  - Linux/USB
---
## USB  调试
```shell
mkdir -p /d
mkdir -p /t
mount -t debugfs none /d
mount -t tracefs none /t
echo 81920 > /t/buffer_size_kb
echo 1 > /t/events/dwc3/enable
```

复制文件 `trace` 和 `regdump`
```shell
cp /t/trace /root/trace.txt
cat /d/usb/23400000.usb/regdump > /root/regdump.txt
```

## Link
- [Synopsys DesignWare Core SuperSpeed USB 3.0 控制器 — Linux 内核文档](https://docs.linuxkernel.org.cn/driver-api/usb/dwc3.html)