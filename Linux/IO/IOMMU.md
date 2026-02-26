---
tags:
  - IOMMU
---
## IOMMU
在计算机领域，输入输出内存管理单元（英语：input–output memory management unit，缩写IOMMU）是一种内存管理单元（MMU），它将具有直接存储器访问能力（可以DMA）的I/O总线连接至主内存。如传统的MMU（将CPU可见的虚拟地址转换为物理地址）一样，IOMMU将设备可见的虚拟地址（在此上下文中也称设备地址或I/O地址）映射到物理地址。部分单元还提供内存保护功能，防止故障或恶意的设备
![](assets/Pasted%20image%2020260203140227.png)

## MMIO
地址总线可以访问 DDR 和外设，那么等同于 DDR 可以映射到系统物理空间，形成**物理内存 (Physical Memory)**. 同理地址总线也可以访问外设，这里的外设包括访问外设内部的寄存器、内部存储空间等，那么等同于外设的寄存器、内部存储空间也映射到系统物理地址空间，形成**MMIO (Memory Mapping I/O)**. 通过这样的抽象


## Link
- [输入输出内存管理单元](https://zh.wikipedia.org/wiki/%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%8D%95%E5%85%83)
- [探秘IOMMU：从概念到原理的深度解析](https://zhuanlan.zhihu.com/p/18100038357)