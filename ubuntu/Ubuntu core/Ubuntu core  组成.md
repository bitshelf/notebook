---
tags:
  - Ubuntu/core
---
## Ubuntu  core 构成
snap 本身完全独立，甚至封装了自己的文件系统，即 snap 包含了应用程序运行所
需而 Ubuntu Core 未提供的一切。

Ubuntu Core 本身是由 snap 构建的；存在一个包括 Linux 内核和特定硬件驱动程序的内核snap、一个描述具体设备型号细节的小工具 snap、一个针对 snapd 守护程序本身的 snap。这协调了snap 的安装和更新程序，以及如何将定义某个 snap 权限的断言转化为本地系统特权

## Link 
![](assets/Over-the-air+software_12.05.20+-cn.pdf)