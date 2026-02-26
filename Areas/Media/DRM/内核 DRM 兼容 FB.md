---
tags:
  - DRM
---
## 使能所需的内核配置
```
CONFIG_FB=y
CONFIG_DRM_FBDEV_EMULATION=y
CONFIG_DRM_KMS_HELPER=y
```

## 重置显示
```shell
echo 0 | tee /sys/class/graphics/fb0/blank
```