---
tags: GPIO
---

# GPIO

## 配置 GPIO 方向
- 如果是输出，可以配置 high level 或者 low level
- 如果是输入，可以获取 GPIO 引脚上的电平状态

## GPIO 硬件差异
* 并不是所有平台都可以从输出引脚中读取数据，对于不能读取的引脚应总返回零
* 某些 GPIO 控制器必须通过基于总线(如 I2C 或 SPI)的消息访问。读或写这些
- GPIO 值的命令需要等待其信息排到队首才发送命令，再获得其反馈。期间需要休眠，这不能在 IRQ 例程 (中断上下文) 中执行
* 并非所有的 IO port 都支持中断功能


## Link
- [linux内核中的GPIO系统之（2）：pin control subsystem](http://www.wowotech.net/gpio_subsystem/pin-control-subsystem.html)