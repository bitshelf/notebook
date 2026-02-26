---
tags:
  - OTG
---
# USB OTG的工作原理
#OTG 
1. 提供有限的主机能力和一个MiniAB插座、支持主机流通协议(Host Negotiatio n Protocol, HNP),并和外设式OTG设备一样支持事务请求协议(Session Request Protocol, SRP)
2.  当作为主机工作时,两用OTG设备可在总线上提供8 mA的电流,而以往标准主机则需要 提供100～500 mA的电流
# RS-332C 
#通信
```ad-summary
title: 为连接DTE（数据终端设备）与DCE（数据通信设备）而制定
RS-232C标准接口有25条线  
* 4条数据线、
* 11条控制线
* 3条定时线
* 7条备用和未定义线

常用的只有9根
* RTS/CTS（请求发送/清除发送流控制）
* RxD/TxD（数据收发）
* DSR/DTR（数据终端就绪/数据设置就绪流控制）
* DCD（数据载波检测，也称RLSD，即接收线信号检出）
* Ringing-RI（振铃指示）
* SG（信号地）信号

RTS/CTS、RxD/TxD、DSR/DTR等信号的定义如下:
* RTS：用来表示DTE请求DCE发送数据，当终端要发送数据时，使该信号有效
* CTS：用来表示DCE准备好接收DTE发来的数据，是对RTS的响应信号
* RxD：DTE通过RxD接收从DCE发来的串行数据
* TxD：DTE通过TxD将串行数据发送到DCE
* DSR：有效（ON状态）表明DCE可以使用
* DTR：有效（ON状态）表明DTE可以使用
* DCD：当本地DCE设备收到对方DCE设备送来的载波信号时，使DCD有效，通知DTE准备接收，并且由DCE将接收到的载波信号解调为数字信号，经RxD线送给DTE
* Ringing-RI：当调制解调器收到交换台送来的振铃呼叫信号时，使该信号有效（ON状态），通知终端，已被呼叫

最简单的RS-232C串口只需要连接**RxD、TxD、SG**这3个信号，并使用XON/XOFF软件流控 