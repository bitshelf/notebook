---
tags: Android
---

# Android AVB2.0  配置编译
1. AVB 配置总开关
```Makefile
# Enable AVB 2.0
BOARD_AVB_ENABLE := true
```
开关会决定 android 编译时是否使能 AVB2.0 的功能，主要会影响 andrioid/build/core/Makefile 文件，会影响镜像的编译及签名处理

2. AVB key 配置介绍
```Makefile
BOARD_AVB_ALGORITHM := SHA256_RSA4096
BOARD_AVB_KEY_PATH
```
AVB 使用的 key 的路径和加密算法类型。这个 key 可自己使用 openssl 命令生成即可，唯一需要注意的是使用-f4 4096 参数，算法类型保持不变。为什么要用 4096 而不用 2048？这个长度越长，越难被破解，vbmeta 的 public key 验证时尽量用 4096 这个长度

3. AVB 编译镜像
vbmeta.img里面要保存boot/dtbo/system/vendor等分区的校验信息，所以编译时会依赖于这些镜像的编译。BOARD_AVB_KEY_PATH可自定义，如果没有定义则使用avb默认的test测试密钥