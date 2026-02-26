---
tags:
  - Android/Surface
---
## Android 图形
无论开发者使用什么渲染 API，一切内容都会渲染到 surface 上。Surface 表示缓冲区队列中的生产方，而缓冲区队列通常会被 SurfaceFlinger 消耗。在 Android 平台上创建的每个窗口都由 Surface 提供支持。所有被渲染的可见 Surface 都被 SurfaceFlinger 合成到屏幕


### 硬件混合渲染器
SurfaceFlinger 只是充当另一个 OpenGL ES 客户端。因此，在 SurfaceFlinger 将一个或两个缓冲区合成到第三个缓冲区中的过程中，它会使用 OpenGL ES。这会让合成的功耗比通过 GPU 执行所有计算时更低。

### Link
- [图形  \|  Android Open Source Project](https://source.android.google.cn/docs/core/graphics?hl=zh-cn)