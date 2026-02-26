---
tags: HDMI_in
---

## HDMI_in 显示黑屏
日志输出
```txt
[   94.311352][  T370] dwhdmi-rockchip fdea0000.hdmi: use tmds mode
[   94.367961][  T370] rockchip-vop2 fdd90000.vop: [drm:vop2_crtc_atomic_disable] Crtc atomic disable vp1
[   94.373700][  T370] rockchip-vop2 fdd90000.vop: [drm:vop2_crtc_atomic_enable] Update mode to 1920x1080p60, type: 11(if:1000) for vp1 dclk: 148500000
[   94.373760][  T370] rockchip-vop2 fdd90000.vop: [drm:vop2_crtc_atomic_enable] dclk_out1 div: 0 dclk_core1 div: 2
[   94.373773][  T370] rockchip-vop2 fdd90000.vop: [drm:vop2_crtc_atomic_enable] set dclk_vop1 to 148500000, get 148500000
[   94.373808][  T370] rockchip-hdptx-phy-hdmi fed70000.hdmiphy: hdptx_ropll_cmn_config bus_width:16a8c8 rate:1485000
[   94.374083][  T370] rockchip-hdptx-phy-hdmi fed70000.hdmiphy: hdptx phy pll locked!
[   94.374089][  T370] dwhdmi-rockchip fdea0000.hdmi: final tmdsclk = 148500000
[   94.374117][  T370] dwhdmi-rockchip fdea0000.hdmi: don't use dsc mode
[   94.374123][  T370] dwhdmi-rockchip fdea0000.hdmi: dw hdmi qp use tmds mode
[   94.374131][  T370] rockchip-hdptx-phy-hdmi fed70000.hdmiphy: bus_width:0x16a8c8,bit_rate:1485000
[   94.374325][  T370] rockchip-hdptx-phy-hdmi fed70000.hdmiphy: hdptx phy lane locked!
[   94.376916][  T179] binder: release 2160:2160 transaction 48972 in, still active
[   94.376929][  T179] binder: send failed reply for transaction 48972 to 2079:2163
[   94.464905][  T214] fdee0000.hdmirx-controller: hdmirx_wait_lock_and_get_timing signal not lock, tmds_clk_ratio:0
[   94.464922][  T214] fdee0000.hdmirx-controller: hdmirx_wait_lock_and_get_timing mu_st:0x0, scdc_st:0x0, dma_st10:0x10
[   94.464952][  T214] rk_hdmirx fdee0000.hdmirx-controller: hdmirx_cancel_cpu_limit_freq freq qos nod add
[   94.483117][  T370] rockchip-vop2 fdd90000.vop: [drm:vop2_setup_layer_mixer_for_vp] *ERROR* wait layer cfg done timeout: 0x75643120--0x75641320
[   94.655558][  T312] binder_alloc: 2079: binder_alloc_buf, no vma
[   94.655575][  T312] binder: 312:312 transaction failed 29189/-3, size 100-0 line 2929
[   94.674209][  T214] rk_hdmirx fdee0000.hdmirx-controller: hdmirx_set_cpu_limit_freq: cpu4 policy NULL
[   94.717518][  T214] rk_hdmirx fdee0000.hdmirx-controller: hdmirx_audio_interrupts_setup: 1
```

- 解决办法：换一根信号质量好的 HDMI 线

## link 
- [RK3588 HDMIRX 调试笔记\_IMGDX的博客-CSDN博客](https://blog.csdn.net/IMGDX/article/details/130891467)