---
tags:
  - Rockchip/AMP
---
## 系统架构
在瑞芯微多核异构系统中，将 AP+AP 系统架构分为
1. Linux+RTOS/Bare-metal 
2. RTOS+Bare-metal

在 Linux+RTOS/Bare-metal 系统架构中：运行 Linux 的处理器核心作为主核（MasterCore），运行 RTOS/Bare-metal 的处理器核心作为从核（RemoteCore）。
![](assets/Pasted%20image%2020250303104452.png)

在 RTOS+Bare-metal 系统架中：第一个启动的处理器核心作为主核（MasterCore），其它处理器核心作为从核（RemoteCore）。
![](assets/Pasted%20image%2020250303104537.png)