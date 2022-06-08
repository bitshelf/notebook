---
tags: USB
---

# USB 控制器接口

> [!info] USB 标准实现
> OHCI、UHCI 都是 USB1.1 的接口标准，而 EHCI 是对应 USB2.0 的接口标准，最新的 xHCI 是 USB3.0 的接口标准

### OHCI（Open Host Controller Interface）

**仅支持 USB1.1 的标准**，但它不仅仅是针对 USB，还支持其他的一些接口，比如它还支持 Apple 的火线（Firewire，IEEE 1394）接口。与 UHCI 相比，OHCI 的硬件复杂，硬件做的事情更多，所以实现对应的软件驱动的任务，就相对较简单。主要用于非 x86 的 USB，如扩展卡、嵌入式开发板的 USB 主控。

### UHCI（Universal Host Controller Interface）
Intel 主导的对 USB1.0、1.1 的接口标准，与 OHCI 不兼容。UHCI 的软件驱动的任务重，需要做得比较复杂，但可以使用较便宜、较简单的硬件的 USB 控制器。Intel 和 VIA 使用 UHCI，而其余的硬件提供商使用 OHCI

### EHCI（Enhanced Host Controller Interface）
* 是 Intel 主导的 USB2.0 的接口标准
* EHCI 仅提供 USB2.0 的高速功能，而依靠 UHCI 或 OHCI 来提供对全速（full-speed）或低速（low-speed）设备的支持

### XHCI（Extensible Host Controller Interface）

- **是最新的 USB3.0 的接口标准**，它在速度、节能、虚拟化等方面有了较大的提高
- 可以与 USB 1. x、2.0 和 3. x 兼容设备接口相连
xHCI支持所有种类速度的USB设备（USB 3.0 SuperSpeed, USB 2.0 Low-, Full-, and High-speed, USB 1.1 Low- and Full-speed）。xHCI的目的是为了替换前面3种（UHCI/OHCI/EHCI）。

### DWC3（DRD ）
* DRD：两用设备 (Dual-role-devices)，即可当 host，也可当 device
* DWC3：是指主机控制器和设备控制器的实现版本
* PHY：物理层，负责最底层的信号转换，将并行信号转换为串行信号，发给外部；有两种接口，一种是 ULPI，一种是 UTMI

is a SuperSpeed (SS) USB 3.0 Dual-Role-Device (DRD) from Synopsys.  
特性：  
The SuperSpeed USB controller features:  
Dual-role device (DRD) capability:  
Same programming model for SuperSpeed (SS), High-Speed (HS), Full-Speed (FS), and Low-Speed (LS)  
Internal DMA controller  
LPM protocol in USB 2.0 and U0, U1, U2, and U3 states for USB 3.0

### USB HOST、USB HSIC、USB OTG

**USB2.0 HOST（EHCI&OHCI）**：只能做主机（接电脑无法识别，因为电脑也是 HOST）。  
**USB HSIC（EHCI）**：输出的不是普通的USB信号，而是XhsicSTROBE1，和XhsicDATA1的信号，必须接USB信号转换出来。  
**USB2.0/3.0 OTG（DWC3/XHCI）**：既能做主机也能做从机，因为有USB的ID脚，可以识别是主机从机