---
tags:
  - EtherCAT
---
## EtherCAT 
- EtherCAT 是以太网现场总线
- EetherCAT 基于 100 BASE-TX 全双工
- 节点最长距离 100m
- 单网段最多连接 65536 设备
- EtherCAT 从站自动端口检测功能，最好一个节点闭合端口讲帧返回主站，无需额外交换机
- 实时读写数据
- 常见开源主站：SOEM，开源从站：SOES，SSC

## 传统以太网存在的问题
### 带宽利用率低，性能不佳
1. 最小以太网帧长度，84 字节
> [!example] 
> 4 字节的过程数据（32 I/O）: 
> $\frac{4}{84} = 4.76\%$ 的应用帧利用率

![](assets/Pasted%20image%2020250325085338.png)

### 协议栈大小和延时
![](assets/Pasted%20image%2020250325085913.png)

### 交换机延时
![](assets/Pasted%20image%2020250325085947.png)

### EtherCAT 状态机
![](assets/Pasted%20image%2020251028085039.png)

### 支持多种协议
![](assets/Pasted%20image%2020251028085128.png)