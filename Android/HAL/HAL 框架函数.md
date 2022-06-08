---
tags: Android
---

## HAL 框架函数
```c
hw_get_module(const char *id, const struct hw_module_t **module);
```

```ad-info
根据模块ID（module_id） 去查找注册在当前系统中与id对应的硬件对象，然后载入（load）与其对应的HAL层驱动模块的*so文件
```
