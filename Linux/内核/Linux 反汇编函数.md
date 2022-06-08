---
tags:
  - Linux/反汇编
---
## 反汇编内核函数
```shell
out/toolchain/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-none-linux-gnu-objdump --visualize-jumps --disassemble=sunxi_gmac_probe out/t527/kernel/build/vmlinux
```