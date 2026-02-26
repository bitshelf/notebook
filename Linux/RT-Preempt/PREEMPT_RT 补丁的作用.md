---
tags:
  - Linux/RT-Preempt
---
## 补丁主要修改内容
1. spinlock 迁移为可调度的 mutex，同时保留了 `raw_spinlock_t`
2. 实现优先级继承协议
3. 中断线程化
4. 软中断线程化