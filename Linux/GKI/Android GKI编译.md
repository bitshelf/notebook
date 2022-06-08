---
tags:
  - GKI
---
###  内核目录下 GKI ko 编译
```shell
export PATH=prebuilts/clang/host/linux-x86/clang-r450784d/bin:$PATH
make CROSS_COMPILE=aarch64-linux-gnu- LLVM=1 LLVM_IAS=1 ARCH=arm64 gki_defconfig rockchip_gki.config  && make CROSS_COMPILE=aarch64-linux-gnu- LLVM=1 LLVM_IAS=1 ARCH=arm64 rk3588-evb1-lp4-v10.img -j32
```

### 第三方 ko 编译
```shell
make CROSS_COMPILE=aarch64-linux-gnu- LLVM=1 LLVM_IAS=1  ARCH=arm64 -C ../../kernel-5.10 M=$PWD -j32
```
## link 
- [Rockchip Android13平台提取kernel环境编译KO\_clang编译ko-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/129627787)