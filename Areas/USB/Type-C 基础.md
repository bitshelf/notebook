---
tags:
  - USB/Type-C
---

## 名词说明
 - **TCPCI**：USB Type-C 端口控制器接口；定义了用于 USB Type-C 端口的硬件和低级软件分割，提供了处理硬件分割挑战的解决方案
 - **TCPC**：USB Type-C  端口控制器；包含用于 CC 和 PD 消息功能的所需低级硬件
	 - TCPC 可以在 SOC 外部，作为外部芯片
	 - 集成在 PMIC 中，或者作为集成方案使用在 SoC 中
- **TCPM**:  USB Type-C 端口管理器；端口管理器（TCPM）软件可以是操作系统（OS）的一部分，可以是与产品相关的驱动器模块，SOC 中的嵌入软件，或外部微控制器的固件
![](assets/Type-C%20任务划分和功能.png)

## TCPCI 规范
1. TCPC 需要完成的第一部分工作是对 VBUS 和 VCONN 电源进行管控
2. TCPC 需要完成的第二部分任务是对 CC 信号进行处理，其中涉及角色判断、对 CC 线的状态进行监测、根据需要使用 Rp/Rd 等等

## Link 
- [你真的了解TCPC吗 - 与非网](https://www.eefocus.com/article/1419388.html)