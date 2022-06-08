---
tags: Rockchip/Kernel 
---

## 内核编译
- 因为 kernel 编译完后需要通过 android 去打包成 boot. img，所以这里需要加上 A 参数，即编译 kernel 的时需要一起编译 Android 才能打包 boot. img
- 单独编译 kernel 需要同时编译 Android
### 单独编译 kernel 生成 boot. img 的原理
- 在 kernel-5.10 目录下将编译生成的 kernel. img 和 resource. img 替换到旧的 boot. img 中

> [!info]+ RK3588 单独编译内核
> 编译时替换对应的 boot. img 及 dts：
其中 `BOOT_IMG=../rockdev/Image-rk 3588_s/boot. img` 这里指定的是旧的 boot. img 的路径
