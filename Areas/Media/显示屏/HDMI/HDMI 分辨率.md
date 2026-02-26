---
tags:
  - HDMI
---
## 查看当前 HDMI 支持分辨率
```shell
cat /sys/devices/platform/display-subsystem/drm/card0/card0-HDMI-A-1/modes
```

## EDID 配置文件
- `u-boot/common/edid.c`
- `kernel/drivers/gpu/drm/drm_edid.c`
- `device/rockchip/common/resolution_white.xml`

## Link
- [EDID - 砚车干 - 博客园](https://www.cnblogs.com/huang-y-x/p/13522519.html)