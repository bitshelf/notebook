---
tags: bluetooth
---

## 蓝牙初始化
```shell
brcm_patchram_plus1 --bd_addr_rand --enable_hci --no2bytes --use_baudrate_for_download  --tosleep  200000 --baudrate 1500000 --patchram /system/etc/firmware/ /dev/ttyS9 & hciconfig hci0 up
```

