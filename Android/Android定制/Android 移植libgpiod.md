---
tags:
  - Android
  - GPIO
---

## Android 移植 libgpiod 库和测试工具
1. 下载源码到 `external` 目录下：
```shell
with_proxy git clone https://kernel.googlesource.com/pub/scm/libs/libgpiod/libgpiod
```
## Link 
- [platform_external_libgpiod](https://github.com/technexion-android/platform_external_libgpiod/tree/tn-android-11.0.0_1.2.0_8m-next)

2. 添加到 `PRODUCT_PACKAGES`
```Makefile
# device/rockchip/rk356x/device.mk
 PRODUCT_PACKAGES += \
    RockchipPinnerService \
       gpioset \
       gpiomon \
       gpioinfo \
       gpioget \
       gpiofind \
       gpiodetect \
       libgpiod
```

- demo: [gpio teset demo](https://github.com/bitshelf/platform_external_libgpiod)
- [android-gpio-example-app(java)](https://github.com/Kynetics/android-gpio-example-app)
- [An Introduction to chardev GPIO and Libgpiod on the Raspberry PI – Beyondlogic](https://www.beyondlogic.org/an-introduction-to-chardev-gpio-and-libgpiod-on-the-raspberry-pi/)