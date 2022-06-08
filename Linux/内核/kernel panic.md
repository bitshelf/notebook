---
tags: Kernel
---

# Linux kernel panic
#Rockchip 
- gdb 调试工具位置：`./prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-rockchip1031-linux-gnu-gdb`（RK3588 linux 为例）
- 内核函数与地址映射表： `kernel/System.map`
- 调试内核镜像：`kernel/vmlinux`

### 使用方法：
1. 使用 GDB 打开内核镜像
```shell
./prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-rockchip1031-linux-gnu-gdb kernel/vmlinux
```

2. 根据查询询 kernel/System.mapp 的内核地址查询对应应
```shell
b * 0xAddress
```

