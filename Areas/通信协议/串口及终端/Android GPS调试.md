---
tags:
  - GPS
  - Android
---
## Android12  GPS 移植
- 中科微 ATGM 336H
- RK 3588 s Android 12

## 检查主控与 GPS 通信
```shell
cat /dev/ttyS4
```

### 添加服务
```Makefile
# device/rockchip/rk3588/rk3588s_s/rk3588s_s.mk
PRODUCT_PACKAGES += \
    android.hardware.gnss@2.1-impl \
    android.hardware.gnss@2.1-service \

# device/rockchip/rk3588/BoardConfig.mk
BOARD_HAS_GPS := true
```

### 添加配置文件
```Makefile
# device/rockchip/rk3588/device.mk
# GPS
PRODUCT_COPY_FILES += device/common/gps/gps_cfg.inf:vendor/etc/gps_cfg.inf
```

### 打开串口
```c
// 使能串口
&uart4 {
        status = "okay";
        pinctrl-names = "default";
        pinctrl-0 = <&uart4m2_xfer>;
};

// leds 节点下使能供电
gps_enable {
        gpios = <&pca9539 4 GPIO_ACTIVE_HIGH>;
       default-state="on";
}
```

![](assets/gps_test.apk)

## Link 
- HAL 驱动文件下载：[GitHub - zxcwhale/android9\_gnss\_hal\_driver](https://github.com/zxcwhale/android9_gnss_hal_driver)