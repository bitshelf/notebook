---
tags:
  - Android/kernel
---

## bazel 编译 Android kernel 
```shell
# 查找编译单元
tools/bazel query "//common-modules:*"
# 编译 ARM64 GKI 内核
tools/bazel build //common:kernel_aarch64_dist
# 编译 Vendor modules
tools/bazel build //common-modules/virtual-device:virtual_device_x86_64_dist
# 查询 vendor modules
tools/bazel query "//common-modules/virtual-device:*" | grep virtual_device_x86

# 编译生成 compile_commands.json
tools/bazel run //common:kernel_aarch64_compile_commands
```