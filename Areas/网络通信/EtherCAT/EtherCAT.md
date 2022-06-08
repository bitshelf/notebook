---
tags:
  - EtherCAT
---
## EtherCAT 
- EtherCAT 是以太网现场总线

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