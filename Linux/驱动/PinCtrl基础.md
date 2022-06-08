---
tags: Linux
---

# pinctrl 功能
* 枚举并且命名 pin 控制器可控制的所有引脚
* 提供引脚的复用能力
* 提供配置引脚的能力，如驱动能力、上拉下拉、数据属性等
* 与 gpio 子系统的交互
* 实现 pin 中断

# pinctrl 的一些概念
## pin controller、client device
* pin controller: 可以用它来复用引脚、配置引脚
* client device: 声明自己要使用哪些引脚的哪些功能，怎么配置它们

> [!info] pin controller 和 GPIO Controller
> pin controller 和 GPIO Controller 不是一回事，前者控制的引脚可用于 GPIO 功能、I2C 功能；后者只是把引脚配置为输入、输出等简单的功能

# Linux Pinctrl 子系统提供的功能
* 管理系统中所有的可以控制的pin，在系统初始化的时候，枚举所有可以控制的pin，并标识这些pin
* 管理这些pin的复用（Multiplexing）。对于SOC而言，其引脚除了配置成普通的GPIO之外，若干个引脚还可以组成一个pin group，行程特定的功能。pin control subsystem要管理所有的pin group
* 配置这些 pin 的特性。例如使能或关闭引脚上的 pull-up、pull-down 电阻，配置引脚的 driver strength

