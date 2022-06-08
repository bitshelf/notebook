---
tags: Android 
---

# Android 添加 APP 预安装

---
# FAQ
1. 两份 APP 安装源码
~~~txt
build/make/core/base_rules.mk :335: error: vendor/rockchip/common/apps/DeviceTest: MODULE.TARGET.APPS.DeviceTest already defined by packages/apps/DeviceTest.
~~~~
> [!NOTE] 解决办法
> 删除 `vendor/rockchip/common/apps/DeviceTest/Android.mk` 即可


