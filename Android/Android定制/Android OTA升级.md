---
tags: Android Rockchip
---

# Android12 OTA 差分升级

- 如果之前有 make otapackage 过，则需要先删除 `out/target/product/rkxxx/obj/PACKAGING/` 目录再编译
## 编译生成差分 OTA 步骤
### 旧固件 OTA 包生成
```shell
make installclean && make && make dist && ./mkimage.sh ota
mv  out/target/product/rk3588_s/obj/PACKAGING/target_files_intermediates/rk3588_s-target_files-eng.loh.zip rockdev/rk3588_s-target_files-eng.old.zip
```

### 新固件 OTA 包生成
```shell
make installclean && make && make dist && ./mkimage.sh ota
mv  out/target/product/rk3588_s/obj/PACKAGING/target_files_intermediates/rk3588_s-target_files-eng.loh.zip rockdev/rk3588_s-target_files-eng.new.zip
```

### 生产差分 OTA 包
```shell
./build/tools/releasetools/ota_from_target_files \
-v -i rockdev/rk3588_s-target_files-eng.old.zip \
-p out/host/linux-x86/ \
-k build/target/product/security/testkey 
rockdev/rk3588_s-target_files-eng.new.zip 
rockdev/update.zip
```
- ? 需要在 `source build/envsetup.sh; lunch` 之后生成差分包
- ? RK3588 Android12 使用 Python2

# Android10 生成差分 OTA 升级包
#### rockhip Android < 11
```shell
make installclean && make –j16 && make otapackage –j16 && ./mkimage.sh ota
```

## 参考
- <RKDocs/android/Rockchip_User_Guide_Recovery_CN&EN.pdf>