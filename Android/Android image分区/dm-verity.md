---
tags: Android
---

# dm-verity
- dm-verity 是内核子系统的 Device Mapper 中的一个子模块
- Device Mapper 为 Linux 内核提供了一个从逻辑设备到物理设备的映射框架，通过它，用户可以定制资源的管理策略
- Device Mapper 有三个重要的概念：映射设备（Mapped Device）、映射表、目标设备（Target Device）；映射设备是一个逻辑块设备，用户可以像使用其他块设备那样使用映射设备。映射设备通过映射表描述的映射关系和目标设备建立映射。对映射设备的读写操作最终要映射成对目标设备的操作。而目标设备本身不一定是一个实际的物理设备，它可以是另一个映射设备，如此反复循环，理论上可以无限迭代下去。映射关系本质上就是表明映射设备中的地址对应到哪个目标设备的哪个地址


---
# Link
- [Android Verified Boot 2.0 AVB详解（基于Android P）](https://www.cnblogs.com/schips/p/what_is_android_verified_boot.html)