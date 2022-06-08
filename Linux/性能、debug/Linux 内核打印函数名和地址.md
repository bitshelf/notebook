---
tags:
  - Linux/debug
---
## example
```c
printk("mdio write func point:%pS\n", bus->write); // 打印函数名
printk("mdio write func point:%px\n", bus->write); // 打印函数地址
```