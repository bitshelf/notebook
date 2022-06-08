---
tags: Camera
---

# DVP 摄像头
## 基础
- DVP 是并口传输，速度较慢，传输的带宽低，使用需要 PCLK\sensor 输出时钟、MCLK（XCLK）\外部时钟输入、VSYNC\场同步、HSYNC\行同步、D\[0：11]\并口数据——可以是 8/10/12bit 数据位数大小。DVP 摄像头电源和 MIPI 一样。这里再补充各信号脚定义：

- PCLK：像素点同步时钟信号，每个 PCLK 对应一个像素点，可以为 48MHz；对于时钟信号，一般做包地处理，减少对其他信号的干扰，还需要在源端加电阻和电容，减少过冲和振铃，从而减少对其他信号的干扰。

- MCLK（XCLK）：外部时钟输入，可由主控或晶振提供，由 sensor 规格书确定，可以为 24MHZ；

- VSYNC：帧同步信号，一帧一个信号，频率为几十 Hz（30Hz）

- HSYNC：行同步信号（频率为几十 KHz）

> [!example]
> 例如：分别率 320×240 的屏，每一行需要输入 320 个脉冲来依次移位、锁存这一行的数据，然后来个 HSYNC 脉冲换一行；这样依次输入 240 行之后换行同时来个 VSYNC 脉冲把行计数器清零，又重新从第一行开始刷新显示


## 调试
- 设置摄像头相关的引脚和时钟，即可完成配置过程
- 摄像头接口原理图可知，需要配置的引脚有：VCC28_DVP、VCC18_DVP、VCCIO_YUV、PWDN (FLASH0_CLE)、RESET 和 XCLK1

#### Link
- [2. DVP 使用 — Firefly Wiki](https://wiki.t-firefly.com/zh_CN/Firefly-RK3288/driver_dvp.html)