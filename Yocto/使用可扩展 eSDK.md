---
tags:
  - yocto/eSDK
---
## 配置 eSDK 环境
```shell
bitbake meta-ide-support
bitbake -c populate_sysroot gtk+3
# 其他任何需要的目标或者本地选项，这是应用程序开发者所需要的
bitbake build-sysroots -c build_native_sysroot && bitbake build-sysroots -c build_target_sysroot
```