---
tags:
  - RK3568/AMP
---
## 配置
### Linux kernel 配置
#### 内存资源
1. Linux kernel 运行内存配置
2. Linux 共享内核配置
#### Linux kernel 外设资源
1. 中断配置
2. 引脚配置
3. 时钟配置
## 启动流程
使用 Kernel+3\*HAL 的启动方案时默认 Linux 运行在 CPU 0 上。启动时，Bootloader 运行在 **CPU0** 上，先加载到 U-Boot。 U-Boot  中，读取 `amp.img` 固件，按 `loadables="amp1", "amp2", "amp3";` 顺序，加载 Bare-metal 固件，并启动响应 CPU1、CPU2、CPU3 核心。U-Boot 继续运行在 CPU0 中，继续加载启动 Linux Kernel。流程框图如下:
![](assets/Pasted%20image%2020250303113140.png)
## 编译
RT­Thread 编译工具选用的是 RT­Thread 官方推荐的 `SCons + GCC`，SCons 是一套由 Python 语言编写的开源构建系统
## 烧录


