---
tags:
  - USB
---
## USB  2.0 OTG 硬件电路
- **OTG_DP/OTG_DM**: USB 差分信号 D+/D-，需要在每根信号线上串联 2.2Ω 的电阻
- **USB_DET**: 输入信号，当 OTG 作为 Peripheral mode 时，用于检测 USB 是否连接到 Host（如:  PC Host）或者 USB 充电器。默认为低电平 0 V。当连接到 Host 或者 USB 充电器时，为高电平 3.0 ～ 3.2 V
- **USB_ID**: 输入信号，用于判断切换为 Host mode 或者 Peripheral mode。**默认为高电平  1.8 V（芯片内部拉高）**，OTG 作为 Peripheral mode。当插入 OTG-Host 线缆时，USB_ID 会被拉低到地，USB 控制器会根据 USB_ID 电平变化，自动将 OTG 切换为 Host mode
- **USB_RBIAS**: USB 2.0 PHY 的外部基准电阻。该电阻的阻值会影响 USB 信号的幅值
- **VCC5V0_OTG**: 当 OTG 工作于 Peripheral mode 时，VCC5V0_OTG 是 USB_DET 的输入源信号。  当 OTG 工作于 Host mode 时，VCC5V0_OTG 输出 VBUS 5V 给 USB 外设