---
tags: Android  Kernel 
---

## RK3588 Android12 内核编译
- kernel 编译完后需要通过 android 去打包成 boot. img
- 需要过 GMS 认证的 google 有要求要用 clang 编译内核
### 导 Clang 环境
```shell
cd kernel-5.10
export PATH=../prebuilts/clang/host/linux-x86/clang-r416183b/bin:$PATH
alias msk='make CROSS_COMPILE=aarch64-linux-gnu- LLVM=1 LLVM_IAS=1'
```

### 编译 boot. img
```shell
msk ARCH=arm64 rockchip_defconfig android-11.config pcie_wifi.config && msk ARCH=arm64 BOOT_IMG=../rockdev/Image-rk3588_s/boot.img rk3588-evb1-lp4-v10.img
```

---
## Link 
- [Rockchip RK3588 Android SDK编译方法\_安卓sdk编译\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/124714518)