---
tags: DRM
---

# GEM 
| 元素      | 作用                                                                                  |
| --------- | ------------------------------------------------------------------------------------- |
| **DUMB**  | 只支持连续物理内存，基于kernel中通用CMA API实现，多用于小分辨率简单场景               |
| **PRIME** | 连续、非连续物理内存都支持，基于DMA-BUF机制，可以实现buffer共享，多用于大内存复杂场景 |
| **fence** | buffer 同步机制，基于内核 dma_fence 机制实现，用于防止显示内容出现异步问题   

1. GEM（Graphics Execution Manager）即是 linux DRM 中用于完成 memory 管理的内核基础设施（不止这一种）
2. GEM 提供了一组标准的内存相关的操作给 userspace，以及一组辅助函数给 kernel drivers，kernel drivers 还需要实现一些硬件相关的私有操作函数
3. 嵌入式平台上 GPU 和 CPU 往往共享主存 DDR

## userspace
* 在 userspace 需要创建一个新的 GEM 对象时，会通过调用 driver 私有的 ioctl 接口获取
* 当在 userspace 需要访问 GEM buffer 内存时，通常通过 mmap () 系统调用来映射 GEM 对象所包含的物理地址
