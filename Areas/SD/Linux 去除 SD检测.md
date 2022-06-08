---
tags: SD 
---

## 去除 SD 检测
```c
&sdmmc0 {
       non-removable;
       pinctrl-0 = <&sdmmc0_bus4 &sdmmc0_clk &sdmmc0_cmd>;
};
```