---
tags: HDMI
---

# 修改 HDMI 开机默认分辨率
#### RK3288 Android8.1
#### 修改 uboot 
```shell
$ rg -i hdmi_video_default_mode u-boot/
u-boot/drivers/video/rk_hdmi.h
72: * macro HDMI_VIDEO_DEFAULT_MODE
583:#define HDMI_VIDEO_DEFAULT_MODE			HDMI_1920X1080P_60HZ //HDMI_1280X720P_60HZ
```

## 修改内核
```diff
# kernel/drivers/gpu/drm/bridge/synopsys/dw-hdmi.c
- const u8 def_modes_vic[6] = {4, 16, 2, 17, 31, 19};
+ const u8 def_modes_vic[6] = {16, 31, 19, 17, 2, 4};
```

## 修改 u-boot
```diff
# u-boot/drivers/video/drm/dw_hdmi.c
- const u8 def_modes_vic[6] = {4, 16, 2, 17, 31, 19};
+ const u8 def_modes_vic[6] = {16, 31, 19, 17, 2, 4};
```

