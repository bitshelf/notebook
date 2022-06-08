---
tags:
  - Linux/code
---
## Linux 条件语句优化 jump_label
1. 定义默认状态：
```c
// 默认状态为假
DEFINE_STATIC_KEY_FALSE(getpid_key);
```
2. 修改状态为真
```c
static_key_enable(&getpid_key);
```
3. 修改状态为假
```c
static_key_disable(&getpid);
```
