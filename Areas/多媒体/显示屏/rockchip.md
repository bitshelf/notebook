```
+----------+-------------------------------------+----------+-------+
  |          |        ↑                            |          |       |
  |          |        |vback_porch                 |          |       |
  |          |        ↓                            |          |       |
  +----------#######################################----------+-------+
  |          #        ↑                            #          |       |
  |          #        |                            #          |       |
  |  hback   #        |                            #  hfront  | hsync |
  |   porch  #        |       hactive              #  porch   |  len  |
  |<-------->#<-------+--------------------------->#<-------->|<----->|
  |          #        |                            #          |       |
  |          #        |vactive                     #          |       |
  |          #        |                            #          |       |
  |          #        ↓                            #          |       |
  +----------#######################################----------+-------+
  |          |        ↑                            |          |       |
  |          |        |vfront_porch                |          |       |
  |          |        ↓                            |          |       |
  +----------+-------------------------------------+----------+-------+
  |          |        ↑                            |          |       |
  |          |        |vsync_len                   |          |       |
  |          |        ↓                            |          |       |
  +----------+-------------------------------------+----------+-------+
  ```
  ### **timing 子节点属性值配置**
  ```
- hactive, vactive: 显示器的分辨率；
 - hfront-porch, hback-porch, hsync-len: 配置水平display-timing参数，以像素为单位；
   vfront-porch, vback-porch, vsync-len: 配置垂直display-timing参数，以像素为单位；
 - clock-frequency: 配置显示时钟，以HZ为单位；
 - hsync-active: 配置 hsync 脉冲有效极性，low/high/ignored
 - vsync-active: 配置 vsync 脉冲有效极性，low/high/ignored
 - de-active: 配置 data-enable 脉冲有效极性 low/high/ignored
 - pixelclk-active: with
			- active high = drive pixel data on rising edge/
					sample data on falling edge
			- active low  = drive pixel data on falling edge/
					sample data on rising edge
			- ignored     = ignored
 - interlaced (bool): boolean to enable interlaced mode
 - doublescan (bool): boolean to enable doublescan mode
 - doubleclk (bool): boolean to enable doubleclock mode

All the optional properties that are not bool follow the following logic:
    <1>: high active
    <0>: low active
    omitted: not used on hardware
```

``` ad-info
title:VOP
VOP (Visual Output Processor) 是一个显示控制器， 作用用于将一块图像数据从视频内存传输到外部LCD显示接口
```
