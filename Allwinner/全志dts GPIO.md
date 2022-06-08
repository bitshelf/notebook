---
tags:
  - Allwinneer/dts
---
# dts 参数释义
~~~dts
can_int_gpios = <&pio PC 7 6 0xffffffff 0xffffffff 0>;
~~~
* **功能分配** 0in，1out，2……other
* **内部电阻状态** 0 禁用，1 上拉，2 下拉
* **驱动能力**：0，1，2，3，共 4 级
* **输出电平状态**：1 高，0 低，只有输出时生效

![GPIO 设备树信息](全志pinctrl系统.md#GPIO%20设备树信息)