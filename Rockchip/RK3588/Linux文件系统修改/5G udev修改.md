---
tags: Linux
---

# 5G 添加 udev
```shell
KERNEL=="ttyUSB2",SUBSYSTEM=="tty",ACTION=="add",RUN+="/etc/pcie_modem.sh"
```
![](assets/99-rpdzkj-5G-service.rules)