---
tags: Rockchip DRM 
---

# Rockchip DRM
- DRM 的设备节点为"/dev/dri/cardX，默认使用的是 `/dev/dri/card0`

|模块|作用|
|:---:| ------------------------------------------------------------------------- |
| CRTC     | 显示控制器，在rockchip 平台是SOC 内部VOP(部分文档也称为LCDC)模块的抽象    |
| Plane    | 图层，在rockchip 平台是SOC 内部VOP(LCDC)模块win 图层的抽象                |
| Encoder  | 输出转换器，指RGB、LVDS、DSI、eDP、HDMI、CVBS、VGA 等显示接口             |
|Connect| 连接器，指encoder 和panel 之间交互的接口部分                              |
| Bridge   | 桥接设备，一般用于注册encoder 后面另外再接的转换芯片，如DSI2HDMI 转换芯片 |
|Panel|泛指屏，各种 LCD、HDMI 等显示设备的抽象|
|GEM|buffer 管理和分配，类似android 下的ion|


## 查看设备连接
1. 获取 DRM Encoder Connector CRTC plane 信息：`modetest -M rockchip`

```shell
rk3399pro:/ $ modetest -M rockchip                                             
Encoders:
id	crtc	type	possible crtcs	possible clones	
90	64	DSI	0x00000001	0x00000000
92	83	TMDS	0x00000002	0x00000000

Connectors:
id	encoder	status		name		size (mm)	modes	encoders
91	90	connected	DSI-1          	68x121		1	90
  modes:
	name refresh (Hz) hdisp hss hse htot vdisp vss vse vtot)
  800x1280 61 800 818 836 854 1280 1304 1308 1316 68000 flags: nhsync, nvsync; type: preferred
  props:
	1 EDID:
		flags: immutable blob
		blobs:

		value:
	2 DPMS:
		flags: enum
		enums: On=0 Standby=1 Suspend=2 Off=3
		value: 0
	19 CRTC_ID:
		flags: object
		value: 64
	49 brightness:
		flags: range
		values: 0 100
		value: 50
	50 contrast:
		flags: range
		values: 0 100
		value: 50
	53 saturation:
		flags: range
		values: 0 100
		value: 50
	54 hue:
		flags: range
		values: 0 100
		value: 50
93	92	connected	HDMI-A-1       	0x0		37	92
  modes:
	name refresh (Hz) hdisp hss hse htot vdisp vss vse vtot)
  1920x1080 60 1920 2008 2052 2200 1080 1084 1089 1125 148500 flags: phsync, nvsync; type: preferred, driver
  1920x1200 60 1920 1968 2000 2080 1200 1203 1209 1235 154000 flags: phsync, pvsync; type: driver
  1920x1080 60 1920 2008 2052 2200 1080 1084 1089 1125 148500 flags: phsync, pvsync; type: driver
  1920x1080 60 1920 2008 2052 2200 1080 1084 1089 1125 148352 flags: phsync, pvsync; type: driver
  1920x1080i 60 1920 2008 2052 2200 1080 1084 1094 1125 74250 flags: phsync, pvsync, interlace; type: driver
  1920x1080i 60 1920 2008 2052 2200 1080 1084 1094 1125 74176 flags: phsync, pvsync, interlace; type: driver
  1920x1080 50 1920 2448 2492 2640 1080 1084 1089 1125 148500 flags: phsync, pvsync; type: driver
  1920x1080i 50 1920 2448 2492 2640 1080 1084 1094 1125 74250 flags: phsync, pvsync, interlace; type: driver
  1680x1050 60 1680 1728 1760 1840 1050 1053 1059 1080 119000 flags: phsync, nvsync; type: driver
  1600x900 60 1600 1624 1704 1800 900 901 904 1000 108000 flags: phsync, pvsync; type: driver
  1280x1024 75 1280 1296 1440 1688 1024 1025 1028 1066 135000 flags: phsync, pvsync; type: driver
  1280x1024 60 1280 1328 1440 1688 1024 1025 1028 1066 108000 flags: phsync, pvsync; type: driver
  1440x900 60 1440 1488 1520 1600 900 903 909 926 88750 flags: phsync, nvsync; type: driver
  1280x960 75 1280 1368 1504 1728 960 961 964 1002 129936 flags: nhsync, pvsync; type: 
  1366x768 60 1366 1436 1579 1792 768 771 774 798 85500 flags: nhsync, pvsync; type: driver
  1280x800 60 1280 1328 1360 1440 800 803 809 823 71000 flags: phsync, nvsync; type: driver
  1152x864 60 1152 1216 1336 1520 864 865 868 895 81579 flags: nhsync, pvsync; type: 
  1280x720 60 1280 1390 1430 1650 720 725 730 750 74250 flags: phsync, pvsync; type: driver
  1280x720 60 1280 1390 1430 1650 720 725 730 750 74176 flags: phsync, pvsync; type: driver
  1280x720 50 1280 1720 1760 1980 720 725 730 750 74250 flags: phsync, pvsync; type: driver
  1024x768 75 1024 1040 1136 1312 768 769 772 800 78750 flags: phsync, pvsync; type: driver
  1024x768 70 1024 1048 1184 1328 768 771 777 806 75000 flags: nhsync, nvsync; type: driver
  1024x768 60 1024 1048 1184 1344 768 771 777 806 65000 flags: nhsync, nvsync; type: driver
  800x600 75 800 816 896 1056 600 601 604 625 49500 flags: phsync, pvsync; type: driver
  800x600 72 800 856 976 1040 600 637 643 666 50000 flags: phsync, pvsync; type: driver
  800x600 60 800 840 968 1056 600 601 605 628 40000 flags: phsync, pvsync; type: driver
  800x600 56 800 824 896 1024 600 601 603 625 36000 flags: phsync, pvsync; type: driver
  720x576 50 720 732 796 864 576 581 586 625 27000 flags: nhsync, nvsync; type: driver
  720x480 60 720 736 798 858 480 489 495 525 27027 flags: nhsync, nvsync; type: driver
  720x480 60 720 736 798 858 480 489 495 525 27000 flags: phsync, pvsync; type: driver
  720x480 60 720 736 798 858 480 489 495 525 27000 flags: nhsync, nvsync; type: driver
  640x480 75 640 656 720 840 480 481 484 500 31500 flags: nhsync, nvsync; type: driver
  640x480 73 640 664 704 832 480 489 492 520 31500 flags: nhsync, nvsync; type: driver
  640x480 67 640 704 768 864 480 483 486 525 30240 flags: nhsync, nvsync; type: driver
  640x480 60 640 656 752 800 480 490 492 525 25200 flags: nhsync, nvsync; type: driver
  640x480 60 640 656 752 800 480 490 492 525 25175 flags: nhsync, nvsync; type: driver
  720x400 70 720 738 846 900 400 412 414 449 28320 flags: nhsync, pvsync; type: driver
  props:
	1 EDID:
		flags: immutable blob
		blobs:

		value:
			00ffffffffffff004de7002201010101
			081e010380000078ea2d36a75438ae26
			0d4f54bfcf0081c0b30095008180a9c0
			81007140814f023a801871382d40582c
			4500db0b1100001a662156aa51001e30
			468f330070cf1000001c000000fd0030
			4c0f9613000a202020202020000000fc
			0048444d490a20202020202020200182
			020328f148901f051404130312230907
			078301000067030c001000382de60607
			01604800e305e301283c80a070b02340
			3020360000000000001e8c0ad08a20e0
			2d10103e96000f282100001e011d0072
			51d01e206e2855000f282100001e8c0a
			d08a20e02d10103e96000f282100001e
			0000000000000000000000000000008c
	2 DPMS:
		flags: enum
		enums: On=0 Standby=1 Suspend=2 Off=3
		value: 0
	19 CRTC_ID:
		flags: object
		value: 83
	94 hdmi_output_depth:
		flags: enum
		enums: Automatic=0 24bit=8 30bit=10
		value: 8
	95 hdmi_output_format:
		flags: enum
		enums: output_rgb=0 output_ycbcr444=1 output_ycbcr422=2 output_ycbcr420=3 output_ycbcr_high_subsampling=4 output_ycbcr_low_subsampling=5 invalid_output=6
		value: 4
	96 hdmi_output_colorimetry:
		flags: enum
		enums: None=0 ITU_2020=9
		value: 0
	97 hdmi_color_depth_capacity:
		flags: range
		values: 0 255
		value: 7
	98 hdmi_output_mode_capacity:
		flags: range
		values: 0 15
		value: 7
	99 hdmi_quant_range:
		flags: enum
		enums: default=0 limit=1 full=2
		value: 0
	5 HDR_SOURCE_METADATA:
		flags: blob
		blobs:

		value:
	6 HDR_PANEL_METADATA:
		flags: immutable blob
		blobs:

		value:
			07000100000000000000000000000000
			0000000000000000480060000000
	49 brightness:
		flags: range
		values: 0 100
		value: 50
	50 contrast:
		flags: range
		values: 0 100
		value: 50
	53 saturation:
		flags: range
		values: 0 100
		value: 50
	54 hue:
		flags: range
		values: 0 100
		value: 50

CRTCs:
id	fb	pos	size
64	152	(480,0)	(800x1280)
  800x1280 61 800 818 836 854 1280 1304 1308 1316 68000 flags: nhsync, nvsync; type: preferred
  props:
	20 ACTIVE:
		flags: range
		values: 0 1
		value: 1
	21 MODE_ID:
		flags: blob
		blobs:

		value:
			a0090100200332034403560300000005
			18051c05240500003d0000000a000000
			08000000383030783132383000000000
			00000000000000000000000000000000
			00000000
	44 left margin:
		flags: range
		values: 0 100
		value: 100
	45 right margin:
		flags: range
		values: 0 100
		value: 100
	46 top margin:
		flags: range
		values: 0 100
		value: 100
	47 bottom margin:
		flags: range
		values: 0 100
		value: 100
	29 CABC_LUT:
		flags: blob
		blobs:

		value:
	28 CABC_MODE:
		flags: enum
		enums: Disable=0 Normal=1 LowPower=2 Userspace=3
		value: 0
	30 CABC_STAGE_UP:
		flags: range
		values: 0 512
		value: 0
	31 CABC_STAGE_DOWN:
		flags: range
		values: 0 255
		value: 0
	32 CABC_GLOBAL_DN:
		flags: range
		values: 0 255
		value: 0
	33 CABC_CALC_PIXEL_NUM:
		flags: range
		values: 0 1000
		value: 0
	28 CABC_MODE:
		flags: enum
		enums: Disable=0 Normal=1 LowPower=2 Userspace=3
		value: 0
	38 ALPHA_SCALE:
		flags: range
		values: 0 1
		value: 1
	57 FEATURE:
		flags: immutable bitmask
		values: afbdc=0x1
		value: 1
83	156	(0,0)	(1920x1080)
  1920x1080 60 1920 2008 2052 2200 1080 1084 1089 1125 148500 flags: phsync, nvsync; type: preferred, driver
  props:
	20 ACTIVE:
		flags: range
		values: 0 1
		value: 1
	21 MODE_ID:
		flags: blob
		blobs:

		value:
			144402008007d8070408980800003804
			3c044104650400003c00000009000000
			48000000313932307831303830000000
			00000000000000000000000000000000
			00000000
	44 left margin:
		flags: range
		values: 0 100
		value: 100
	45 right margin:
		flags: range
		values: 0 100
		value: 100
	46 top margin:
		flags: range
		values: 0 100
		value: 100
	47 bottom margin:
		flags: range
		values: 0 100
		value: 100
	29 CABC_LUT:
		flags: blob
		blobs:

		value:
	28 CABC_MODE:
		flags: enum
		enums: Disable=0 Normal=1 LowPower=2 Userspace=3
		value: 0
	30 CABC_STAGE_UP:
		flags: range
		values: 0 512
		value: 0
	31 CABC_STAGE_DOWN:
		flags: range
		values: 0 255
		value: 0
	32 CABC_GLOBAL_DN:
		flags: range
		values: 0 255
		value: 0
	33 CABC_CALC_PIXEL_NUM:
		flags: range
		values: 0 1000
		value: 0
	28 CABC_MODE:
		flags: enum
		enums: Disable=0 Normal=1 LowPower=2 Userspace=3
		value: 0
	38 ALPHA_SCALE:
		flags: range
		values: 0 1
		value: 1
	79 FEATURE:
		flags: immutable bitmask
		values: afbdc=0x1
		value: 0

Planes:
id	crtc	fb	CRTC x,y	x,y	gamma size	possible crtcs
58	64	152	0,0		0,0	0       	0x00000001
  formats: XR24 AR24 XB24 AB24 RG24 BG24 RG16 BG16 NV12 NV16 NV24 NA12 NA16 NA24
  props:
	7 type:
		flags: immutable enum
		enums: Overlay=0 Primary=1 Cursor=2
		value: 1
	18 FB_ID:
		flags: object
		value: 152
	19 CRTC_ID:
		flags: object
		value: 64
	14 CRTC_X:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	15 CRTC_Y:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	16 CRTC_W:
		flags: range
		values: 0 2147483647
		value: 800
	17 CRTC_H:
		flags: range
		values: 0 2147483647
		value: 1280
	10 SRC_X:
		flags: range
		values: 0 4294967295
		value: 31457280
	11 SRC_Y:
		flags: range
		values: 0 4294967295
		value: 0
	12 SRC_W:
		flags: range
		values: 0 4294967295
		value: 52428800
	13 SRC_H:
		flags: range
		values: 0 4294967295
		value: 83886080
	8 SHARE_ID:
		flags: immutable range
		values: 0 4294967295
		value: 58
	55 ZPOS:
		flags: range
		values: 0 3
		value: 0
	60 rotation:
		flags: bitmask
		values: rotate-0=0x1 reflect-x=0x10 reflect-y=0x20
		value: 0
	56 FEATURE:
		flags: immutable bitmask
		values: scale=0x1 alpha=0x2 hdr2sdr=0x4 sdr2hdr=0x8 afbdc=0x10 pdaf_pos=0x20
		value: 19
	34 EOTF:
		flags: range
		values: 0 5
		value: 0
	35 COLOR_SPACE:
		flags: range
		values: 0 12
		value: 0
	36 GLOBAL_ALPHA:
		flags: range
		values: 0 255
		value: 255
	37 BLEND_MODE:
		flags: range
		values: 0 1
		value: 0
61	0	0	0,0		0,0	0       	0x00000001
  formats: XR24 AR24 XB24 AB24 RG24 BG24 RG16 BG16
  props:
	7 type:
		flags: immutable enum
		enums: Overlay=0 Primary=1 Cursor=2
		value: 2
	18 FB_ID:
		flags: object
		value: 0
	19 CRTC_ID:
		flags: object
		value: 0
	14 CRTC_X:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	15 CRTC_Y:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	16 CRTC_W:
		flags: range
		values: 0 2147483647
		value: 0
	17 CRTC_H:
		flags: range
		values: 0 2147483647
		value: 0
	10 SRC_X:
		flags: range
		values: 0 4294967295
		value: 0
	11 SRC_Y:
		flags: range
		values: 0 4294967295
		value: 0
	12 SRC_W:
		flags: range
		values: 0 4294967295
		value: 0
	13 SRC_H:
		flags: range
		values: 0 4294967295
		value: 0
	8 SHARE_ID:
		flags: immutable range
		values: 0 4294967295
		value: 61
	55 ZPOS:
		flags: range
		values: 0 3
		value: 3
	63 rotation:
		flags: bitmask
		values: rotate-0=0x1 reflect-y=0x20
		value: 1
	56 FEATURE:
		flags: immutable bitmask
		values: scale=0x1 alpha=0x2 hdr2sdr=0x4 sdr2hdr=0x8 afbdc=0x10 pdaf_pos=0x20
		value: 18
	34 EOTF:
		flags: range
		values: 0 5
		value: 0
	35 COLOR_SPACE:
		flags: range
		values: 0 12
		value: 0
	36 GLOBAL_ALPHA:
		flags: range
		values: 0 255
		value: 255
	37 BLEND_MODE:
		flags: range
		values: 0 1
		value: 0
65	64	153	0,0		0,0	0       	0x00000001
  formats: XR24 AR24 XB24 AB24 RG24 BG24 RG16 BG16 NV12 NV16 NV24 NA12 NA16 NA24
  props:
	7 type:
		flags: immutable enum
		enums: Overlay=0 Primary=1 Cursor=2
		value: 0
	18 FB_ID:
		flags: object
		value: 153
	19 CRTC_ID:
		flags: object
		value: 64
	14 CRTC_X:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	15 CRTC_Y:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	16 CRTC_W:
		flags: range
		values: 0 2147483647
		value: 800
	17 CRTC_H:
		flags: range
		values: 0 2147483647
		value: 1280
	10 SRC_X:
		flags: range
		values: 0 4294967295
		value: 0
	11 SRC_Y:
		flags: range
		values: 0 4294967295
		value: 0
	12 SRC_W:
		flags: range
		values: 0 4294967295
		value: 52428800
	13 SRC_H:
		flags: range
		values: 0 4294967295
		value: 83886080
	8 SHARE_ID:
		flags: immutable range
		values: 0 4294967295
		value: 65
	55 ZPOS:
		flags: range
		values: 0 3
		value: 1
	67 rotation:
		flags: bitmask
		values: rotate-0=0x1 reflect-x=0x10 reflect-y=0x20
		value: 0
	56 FEATURE:
		flags: immutable bitmask
		values: scale=0x1 alpha=0x2 hdr2sdr=0x4 sdr2hdr=0x8 afbdc=0x10 pdaf_pos=0x20
		value: 19
	34 EOTF:
		flags: range
		values: 0 5
		value: 0
	35 COLOR_SPACE:
		flags: range
		values: 0 12
		value: 0
	36 GLOBAL_ALPHA:
		flags: range
		values: 0 255
		value: 255
	37 BLEND_MODE:
		flags: range
		values: 0 1
		value: 1
68	64	154	0,0		0,0	0       	0x00000001
  formats: XR24 AR24 XB24 AB24 RG24 BG24 RG16 BG16
  props:
	7 type:
		flags: immutable enum
		enums: Overlay=0 Primary=1 Cursor=2
		value: 0
	18 FB_ID:
		flags: object
		value: 154
	19 CRTC_ID:
		flags: object
		value: 64
	14 CRTC_X:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	15 CRTC_Y:
		flags: signed range
		values: -2147483648 2147483647
		value: 1256
	16 CRTC_W:
		flags: range
		values: 0 2147483647
		value: 800
	17 CRTC_H:
		flags: range
		values: 0 2147483647
		value: 24
	10 SRC_X:
		flags: range
		values: 0 4294967295
		value: 0
	11 SRC_Y:
		flags: range
		values: 0 4294967295
		value: 0
	12 SRC_W:
		flags: range
		values: 0 4294967295
		value: 52428800
	13 SRC_H:
		flags: range
		values: 0 4294967295
		value: 1572864
	8 SHARE_ID:
		flags: immutable range
		values: 0 4294967295
		value: 68
	55 ZPOS:
		flags: range
		values: 0 3
		value: 2
	70 rotation:
		flags: bitmask
		values: rotate-0=0x1 reflect-y=0x20
		value: 0
	56 FEATURE:
		flags: immutable bitmask
		values: scale=0x1 alpha=0x2 hdr2sdr=0x4 sdr2hdr=0x8 afbdc=0x10 pdaf_pos=0x20
		value: 18
	34 EOTF:
		flags: range
		values: 0 5
		value: 0
	35 COLOR_SPACE:
		flags: range
		values: 0 12
		value: 0
	36 GLOBAL_ALPHA:
		flags: range
		values: 0 255
		value: 255
	37 BLEND_MODE:
		flags: range
		values: 0 1
		value: 1
80	83	156	0,0		0,0	0       	0x00000002
  formats: XR24 AR24 XB24 AB24 RG24 BG24 RG16 BG16
  props:
	7 type:
		flags: immutable enum
		enums: Overlay=0 Primary=1 Cursor=2
		value: 1
	18 FB_ID:
		flags: object
		value: 156
	19 CRTC_ID:
		flags: object
		value: 83
	14 CRTC_X:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	15 CRTC_Y:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	16 CRTC_W:
		flags: range
		values: 0 2147483647
		value: 1920
	17 CRTC_H:
		flags: range
		values: 0 2147483647
		value: 1080
	10 SRC_X:
		flags: range
		values: 0 4294967295
		value: 0
	11 SRC_Y:
		flags: range
		values: 0 4294967295
		value: 0
	12 SRC_W:
		flags: range
		values: 0 4294967295
		value: 125829120
	13 SRC_H:
		flags: range
		values: 0 4294967295
		value: 70778880
	8 SHARE_ID:
		flags: immutable range
		values: 0 4294967295
		value: 80
	77 ZPOS:
		flags: range
		values: 0 3
		value: 0
	82 rotation:
		flags: bitmask
		values: rotate-0=0x1 reflect-y=0x20
		value: 0
	78 FEATURE:
		flags: immutable bitmask
		values: scale=0x1 alpha=0x2 hdr2sdr=0x4 sdr2hdr=0x8 afbdc=0x10 pdaf_pos=0x20
		value: 18
	34 EOTF:
		flags: range
		values: 0 5
		value: 0
	35 COLOR_SPACE:
		flags: range
		values: 0 12
		value: 0
	36 GLOBAL_ALPHA:
		flags: range
		values: 0 255
		value: 255
	37 BLEND_MODE:
		flags: range
		values: 0 1
		value: 1
84	0	0	0,0		0,0	0       	0x00000002
  formats: XR24 AR24 XB24 AB24 RG24 BG24 RG16 BG16 NV12 NV16 NV24 NA12 NA16 NA24
  props:
	7 type:
		flags: immutable enum
		enums: Overlay=0 Primary=1 Cursor=2
		value: 0
	18 FB_ID:
		flags: object
		value: 0
	19 CRTC_ID:
		flags: object
		value: 0
	14 CRTC_X:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	15 CRTC_Y:
		flags: signed range
		values: -2147483648 2147483647
		value: 0
	16 CRTC_W:
		flags: range
		values: 0 2147483647
		value: 0
	17 CRTC_H:
		flags: range
		values: 0 2147483647
		value: 0
	10 SRC_X:
		flags: range
		values: 0 4294967295
		value: 0
	11 SRC_Y:
		flags: range
		values: 0 4294967295
		value: 0
	12 SRC_W:
		flags: range
		values: 0 4294967295
		value: 0
	13 SRC_H:
		flags: range
		values: 0 4294967295
		value: 0
	8 SHARE_ID:
		flags: immutable range
		values: 0 4294967295
		value: 84
	77 ZPOS:
		flags: range
		values: 0 3
		value: 1
	86 rotation:
		flags: bitmask
		values: rotate-0=0x1 reflect-x=0x10 reflect-y=0x20
		value: 1
	78 FEATURE:
		flags: immutable bitmask
		values: scale=0x1 alpha=0x2 hdr2sdr=0x4 sdr2hdr=0x8 afbdc=0x10 pdaf_pos=0x20
		value: 19
	34 EOTF:
		flags: range
		values: 0 5
		value: 0
	35 COLOR_SPACE:
		flags: range
		values: 0 12
		value: 0
	36 GLOBAL_ALPHA:
		flags: range
		values: 0 255
		value: 255
	37 BLEND_MODE:
		flags: range
		values: 0 1
		value: 0

Frame buffers:
id	size	pitch
```