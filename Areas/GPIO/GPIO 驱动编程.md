---
tags: GPIO
---

## Linux GPIO 驱动编程
- 使用头文件：`<linux/gpio/consumer.h>`
- GPIO 没有默认方向，不设置方向，会导致未定义行为
-  使用  `IS_ERR()` 不会返回 NULL 指针

## Link
- [https://www.kernel.org/doc/Documentation/gpio/consumer.txt](https://www.kernel.org/doc/Documentation/gpio/consumer.txt)