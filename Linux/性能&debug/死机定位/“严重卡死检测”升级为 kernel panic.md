---
tags:
  - lockup
---
## “严重卡死检测”升级为 **kernel panic**
在 dts bootargs 添加 
```
hung_task_panic=1 softlockup_panic=1
```