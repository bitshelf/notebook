---
tags:
  - Ubuntu
---
## Ubuntu 串口开机后自动登录
```shell
cd rootfs/etc/systemd/system/getty.target.wants
sudo ln -s /lib/systemd/system/getty@.service ./
sudo cp getty@.service rootfs/usr/lib/systemd/system/
sudo cp serial-getty@.service rootfs/usr/lib/systemd/system/
```

在 `getty@.service` 修改
```bash
ExecStart=-/sbin/agetty -o '-p -- \\u' --noclear %I $TERM
```

## Link
- [开发板linux终端设置 / linux console configuration - develop.phytec.cn - PHYTEC Wiki - develop.phytec.cn - PHYTEC Wiki](https://wiki.phytec.com/pages/viewpage.action?pageId=125010774)