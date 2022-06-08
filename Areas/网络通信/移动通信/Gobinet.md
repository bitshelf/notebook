---
tags: LTE
---

# Gobinet 拨号
* GOBI 高通 Gobi 无线宽带芯片技术，只需一个模块即可支持多种移动宽带网络和众多移动运营商
* 这种技术可以在 FDD 和 TDD 网络下进行 LTE 连接，同时支持 HSPA+和 EV-DO 网络、2G/3G 网络

## QMI-WWAN 协议拨号
* QMI: Qualcom Message Interface
* MSM: Mobile station mode
* AP:  Application Procesor

* LTE 无线电协议对 TCP/IP 和 IPv6 有原生支持，因此没有必要通过无线电接口将 TCP/IP 实际包装成 PPP
> [!info] ppp
> ppp 协议只是在计算机和调制解调器之间使用，使连接看起来更像传统的基于拨号调制解调器的网络连接

### AT command
海斯命令集（Hayes command set），又称 AT 命令集（AT command set），用于代表拨号、挂号以及改变通信参数的动作。大部分的调制解调器都跟随海斯命令集所制定的规则
AT 命令是用来控制调制调解气的。AT 是 Attention 的缩写。这些命令来自于 Hayes 智能调制解调器所使用的 Hayes 命令。Hayes 命令以 AT 开头，表示调制调解器的注意。拨号和无线调制调解器（涉及机器对机器通信的设备）需要 AT 命令来与计算机互动。这些命令包括作为子集的 Hayes 命令集，以及其他扩展的 AT 命令