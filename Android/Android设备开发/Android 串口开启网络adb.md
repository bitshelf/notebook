---
tags:
  - Android
---
## Android 开启网络 adb
```shell
setprop persist.internet_adb_enable 1 
# 添加 device/rockchip/rk3588/rk3588_s/rk3588_s.mk
PRODUCT_PROPERTY_OVERRIDES += persist.internet_adb_enable=1
```