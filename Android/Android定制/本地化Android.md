---
tags: Android
---

# 本地化 Android
#### 获取编译所需的 config 配置文件：
```shell
$ get_build_var PRODUCT_KERNEL_CONFIG
rockchip_defconfig pcie_wifi.config android-11.config

$ fd android-11.config
kernel-5.10/kernel/configs/android-11.config
```
#### 配置编译规则
```Makefile:device/rockchip/rk3588/BoardConfig.mk
# device/rockchip/rk3588/BoardConfig.mk
PRODUCT_KERNEL_CONFIG ?= rockchip_defconfig pcie_wifi.config
```
```Makefile:device/rockchip/common/BoardConfig.mk
# device/rockchip/common/BoardConfig.mk
PRODUCT_KERNEL_CONFIG += android-11.config
```

## 本地化 dts 设备树文件

```Makefile
# device/rockchip/rk3588/BoardConfig-rd-rk3588.mk
# device/rockchip/rk3588/.BoardConfig.mk
# DTS
export TARGET_BUILD_DTB=rd-rk3588
export DTS_DIR=kernel-5.10/arch/arm64/boot/dts/rockchip/${TARGET_BUILD_DTB}.dts
```