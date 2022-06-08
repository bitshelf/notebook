---
tags: Android 
---

## 添加库报错
````ad-error
previously defined at build/make/core/base_rules.mk
````
- 在 `BoardConfig.mk` 中添加 `BUILD_BROKEN_DUP_RULES := true`