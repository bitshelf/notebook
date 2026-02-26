---
tags:
  - buildroot/OTA
---
## 修改 buildroot recovery 配置
```shell
cd buildroot
source envsetup.sh
make menuconfig
update-defconfig
```
### 添加一下配置到 buildroot recovery
```diff
diff --git a/configs/rockchip_rk3568_recovery_defconfig b/configs/rockchip_rk3568_recovery_defconfig
index 8b143c5f..06c045f9 100644
--- a/configs/rockchip_rk3568_recovery_defconfig
+++ b/configs/rockchip_rk3568_recovery_defconfig
@@ -1,3 +1,10 @@
 #include "base/base.config"
 #include "base/recovery.config"
 #include "chips/rk3566_rk3568_aarch64.config"
+BR2_PACKAGE_HOST_LINUX_HEADERS_CUSTOM_5_10=y
+BR2_PACKAGE_LIBDRM=y
+BR2_PACKAGE_LIBPNG=y
+BR2_PACKAGE_RECOVERY_NO_UI=y
+BR2_PACKAGE_RECOVERY_RECOVERYBIN=y
+BR2_PACKAGE_RECOVERY_USE_UPDATEENGINE=y
+# BR2_PACKAGE_RKSCRIPT_MOUNTALL is not set
```

## 修改 buildroot 配置
```shell
./build.sh bconfig
```

添加以下配置
```diff
+BR2_PACKAGE_RECOVERY=y
+BR2_PACKAGE_RECOVERY_NO_UI=y
+BR2_PACKAGE_RECOVERY_USE_UPDATEENGINE=y
```

## 编译
```shell
cd buildroot
source envsetup.sh # 选择某⼀个平台的rootfs配置
make recovery-dirclean
source envsetup.sh # 选择某⼀平台的 recovery 配置
make recovery-dirclean
./build.sh
```

## 升级
```shell
# 拷贝 rockdev/update.img 到开发板 /udisk/ 目录下，拷贝其他目录可能会出问题，因为 recovery 可能挂载出问题
updateEngine --image_url=/udisk/update.img --misc=update --reboot
```
