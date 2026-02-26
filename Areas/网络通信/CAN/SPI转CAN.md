---
tags: [CAN, Network,SPI]
---

* 源码所在路径：`drivers/net/can/spi/mcp251x.c`

# 通信方式
* **SDO/MOSI**：Serial Data Output/Master Out Slave In, 在 Master 上面也被称为 Tx-Channel, 作为数据的出口, 主要用于 SPI 设备发送数据
* **SDI/MISO**：Serial Data Input/Master In Slave Out, 在 Master 上面也被称为 Rx-Channel, 作为数据的入口, 主要用于 SPI 设备接收数据
## 数据交换
* SPI 只有主模式和从模式之分，没有读和写的说法，因为实质上每次 SPI 是主从设备在交换数据。也就是说，你发一个数据必然会收到一个数据；你要收一个数据必须也要先发一个数据
* 