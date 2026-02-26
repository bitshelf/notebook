---
tags: Android bluetooth 
---

## 蓝牙串口指定
### realtek
```:hardware/realtek/rtkbt/vendor/etc/bluetooth/rtkbt.conf
# hardware/realtek/rtkbt/vendor/etc/bluetooth/rtkbt.conf
BtDeviceNode=?/dev/ttyS1:H5
```

### Azurewave 海华
```Makefile:device/rockchip/rk356x/rk3568_r/bt_vendor.conf
UartPort = /dev/ttyS8
```

