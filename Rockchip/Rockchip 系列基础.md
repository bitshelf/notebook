---
tags: Rockchip
---

# Rockchip 基础
## U-boot
### 一级 loader 模式
U-BOOT 作为一级 Loader 模式，那么仅支持 EMMC 存储设备，编译完成后生成的镜像：
```
rk3399pro_loader_v1.15.115.bin #V1.15.115 是发布的版本号
```

###   二级 Loader  模式
U-Boot 作为二级 Loader 模式，那么固件支持所有的存储设备，该模式下，需要 MiniLoader 支持，通过宏 CONFIG_MERGER_MINILOADER 进行配置生成。同时引入 Arm TrustedFirmware 后会生成 trust image，这个通过宏 CONFIG_MERGER_TRUSTIMAGE 进行配置生成。

---
# Link
![](assets/Rockchip_RK3399Pro_Developer_Guide_Android8.1_Software_CN.pdf)