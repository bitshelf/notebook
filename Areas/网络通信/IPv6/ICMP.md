---
tags:
  - IPv6/ICMP
---
## ICMP 可以分为两类
1. ICMP 差错信息（ICMP error message）
差错消息的类型（Type）字段的高阶比特均为 0，因而 ICMP 差错消息的类型值为 0 -127
2. ICMP 通知消息（ICMP information message）
差错消息的类型（Type）字段的高阶比特均为 1，因而 ICMP 差错信息的类型为 128-255