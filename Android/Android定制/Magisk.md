---
tags: Android
---

# Magisk
magisk 的核心原理就是修改和替换了负责安卓系统启动的 boot. img 中的 Ramdisk 部分，该映像包括了一系列初始化 init 进程和启动时使用的 rc 文件。

### 关闭动态验证
```shell
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
```

#### 还原
```shell
fastboot flash vbmeta vbmeta.img
```