## MIPI D-PHY 协议定义了两种传输模式：
* 高速模式（High Speed，HS）
	* 差分信号传输，信号电平在100mV~300mV（200mV的压摆）
	* 信号传输速度可达80Mbps~1Gbps（v1.0）或80Mbps~1.5Gbps（v1.1），采用源同步的传输方式，由主机（Master）设备向从机（Slave）设备提供DDR时钟。
* 低功耗模式（Low Power，LP）
	* 单端信号传输，信号电平在0~1.2V（1.2V压摆）
	* 在HS模式下的传输通道的差分线，此时是两根独立的信号线 
## LP 模式则同时包含
* 控制模式（Control Mode）
* 低功耗数据传输模式（LPDT）
* 极低功耗模式（ULPS））
两种模式使用不同的传输电平和传输机制
无论是HS模式还是LP模式，都采用LSB fisrt，MSB last的传输方式
## PHY Layer 物理层
* D-PHY协议最多支持5个Lane（通道）（一个时钟Lane，4个数据Lane）
* 最少需要两个Lane（一个时钟Lane，一个数据Lane）
* 一个通用的Lane中包含LP-TX、LP-RX、HS-TX、HS-RX和LP-CD模块，所有收发模块均共用同一个差分线Dp，Dn（在LP模式下，为两根单独的信号线）。整个Lane通过PPI接口（PHY Protocol Interface）与系统的其他部分连接
![[images/PHY Layer物理层.png]]

