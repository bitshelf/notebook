---
tags:
  - Linux/RT-Preempt
---
## 必要配置
1. 更改抢占模型为
2. 支持 tickless 和高精度 timer
```
CONFIG_PREEMPT_RT=y
CONFIG_HIGH_RES_TIMERS=y # 高精度 timer
CONFIG_NO_HZ_FULL=y # Tickless System (Dynamic Ticks)
```