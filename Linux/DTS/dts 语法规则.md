---
tags: DTS
---

# DTS 语法规则
```c
/dts-v1/; 
[memory reservations]

/ {
	[property definitions] 
	[child nodes]
};
```

-  `/dts-v1/` ： dts 版本为 version 1 DTS
- 没有此标记的 `dts` 文件将被 `dtc` 视为处于过时的版本 version 0
- 除了其他小的但不兼容的更改之外，它使用不同的整数格式
- **参考** [6. Devicetree Source (DTS) Format (version 1) — Devicetree Specification v0.3-dirty documentation](https://devicetree-specification.readthedocs.io/en/v0.3/source-language.html)