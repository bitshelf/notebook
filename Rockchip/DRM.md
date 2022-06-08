---
tags: Rockchip DRM
---

# rockchip DRM
* Planes：图层，例如在 rockchip 平台里对应 SOC 内部 VOP 模块的 win 图层
* CRTC：显示控制器，例如在 rockchip 平台里对应 SOC 内部的 VOP 模块
> [!info] 双屏异显
> * 只有支持两个 VOP 的芯片，才能支持双屏异显
> * 在进行显示路由配置时，应该选择哪个 VOP 作为输入的依据主要是 VOP 支持的最大分辨率。

# modetest

> [!example] modetest 在屏上显示测试画面
> `modetest -M rockchip -s 81@65:1920x1080`
* `-M` ：用于指定访问哪个 DRM 设备
* `-s <connector_id>[,<connector_id>][@<crtc_id>]:[#<mode index>]<mode>[-<vrefresh>][@<format>]` ：用于在指定的 pipeline 上以某个 mode 显示某个 pattern 的画面
# 异常
1. 如果 drm 驱动一直 bind 失败，返回 `-517（-EPROBE_DEFER）`，往往是由于 panel 驱动 probe 失败引起的，这个时候就需要检查 panel 相关的配置，比如 reset/enable 是否与其他模块配置冲突