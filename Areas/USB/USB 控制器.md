---
tags:
  - USB
---
## USB host 与 CPU 的关系
![](assets/USB%20控制器到CPU.png)
![](assets/USB%20控制器与CPU交换.png)
### 工作流程
- **发送数据**：CPU 通过 cpu 模式/DMA 模式搬运数据到 USB 控制器的端点 FIFO, 然后通过 UTMI 接口经过 usb phy 通过 usb 发到 host 端
- **接口数据**：host 到来的数据，经过 usb phy 经 utmi 接口转换，到 usb 控制器的端点 FIFO，然后通过 cpu 或者 dma 模式搬运到 DDR

## usb phy
- phy，从字面意思就是物理接口，完成物理信号的转换
	- usb FS/HS 或者 LS 模式选择
	- usb 数据 NRZI 编码和 Bit Stuffer
	- 将 otg 并行数据转为差分串行 D-/D+ 数据
	- 速度枚举，J/K 信号产生

> [!summary] 
> - usb phy 将 usb 控制器的数据，按字 usb 标准协议编码，然后转成串行差分数据，并通过 D+/D- 发送出去。
> - 对于从 host 产生的数据，经过 usb phy 解码，然后到 usb 控制器，最后到我们 ddr 可以访问的应用数据

