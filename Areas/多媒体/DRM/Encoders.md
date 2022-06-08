---
tags: DRM 
---

# Encoders
* Encoder 就是指具体接口驱动 eDP / HDMI
* Encoder 的常用行为如下：
	* DPMS (Display Power Manage System) 电源状态管理 (encoder_funcs->dpms)
	* 将 VOP 输出的 lcdc Timing 打包转化为对应接口时序 HDMI TMDS /(encoder_funcs->mode_set)
* Take the raw data from the CRTC and convert it to a particular format
* mode 是一组信号时序，用以驱动显示器正确显示一帧图像


> [!info] 同步信号
> 由于硬件实现需要，需要额外的步骤对信号进行同步
> * 帧与帧之间被称为 vertical，即竖直的
> * 而行与行之间被称为 horizontal，即水平的
