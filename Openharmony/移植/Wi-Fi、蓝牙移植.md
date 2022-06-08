---
tags:
  - OpenHarmony
---
## Wi-Fi 移植
```diff
diff --git a/rk3568/hardware/wifi/BUILD.gn b/rk3568/hardware/wifi/BUILD.gn
index 13346d1..d2beac8 100644
--- a/rk3568/hardware/wifi/BUILD.gn
+++ b/rk3568/hardware/wifi/BUILD.gn
@@ -23,24 +23,24 @@ ohos_prebuilt_etc("clm_bcm43752a2_ag.blob") {
   install_enable = true
 }
 
-ohos_prebuilt_etc("fw_bcm43752a2_ag_apsta.bin") {
-  source = "$AP6XXX_ETC_DIR/fw_bcm43752a2_ag_apsta.bin"
+ohos_prebuilt_etc("fw_bcm43456c5_ag_mfg.bin") {
+  source = "$AP6XXX_ETC_DIR/fw_bcm43456c5_ag_mfg.bin"
   install_images = [ chipset_base_dir ]
   relative_install_dir = "firmware"
   part_name = "rockchip_products"
   install_enable = true
 }
 
-ohos_prebuilt_etc("fw_bcm43752a2_ag.bin") {
-  source = "$AP6XXX_ETC_DIR/fw_bcm43752a2_ag.bin"
+ohos_prebuilt_etc("fw_bcm43456c5_ag.bin") {
+  source = "$AP6XXX_ETC_DIR/fw_bcm43456c5_ag.bin"
   install_images = [ chipset_base_dir ]
   relative_install_dir = "firmware"
   part_name = "rockchip_products"
   install_enable = true
 }
 
-ohos_prebuilt_etc("nvram_ap6275s.txt") {
-  source = "$AP6XXX_ETC_DIR/nvram_ap6275s.txt"
+ohos_prebuilt_etc("nvram_ap6256.txt") {
+  source = "$AP6XXX_ETC_DIR/nvram_ap6256.txt"
   install_images = [ chipset_base_dir ]
   relative_install_dir = "firmware"
   part_name = "rockchip_products"
@@ -57,9 +57,9 @@ ohos_prebuilt_etc("resolv.conf") {
 group("ap6xxx") {
   deps = [
     ":clm_bcm43752a2_ag.blob",
-    ":fw_bcm43752a2_ag.bin",
-    ":fw_bcm43752a2_ag_apsta.bin",
-    ":nvram_ap6275s.txt",
+    ":fw_bcm43456c5_ag.bin",
+    ":fw_bcm43456c5_ag_mfg.bin",
+    ":nvram_ap6256.txt",
     ":resolv.conf",
   ]
 }
```
- [\[OpenHarmony RK3568\]（四）WIFI芯片适配\_rk安卓wifi框架-CSDN博客](https://blog.csdn.net/qq_46391974/article/details/126804273?spm=1001.2014.3001.5502)

## Bluetooth 移植
```diff
diff --git a/rk3568/bluetooth/BUILD.gn b/rk3568/bluetooth/BUILD.gn
index 66e9839..b28e3f2 100755
--- a/rk3568/bluetooth/BUILD.gn
+++ b/rk3568/bluetooth/BUILD.gn
@@ -17,8 +17,8 @@ config("bt_warnings") {
   ]
 }
 
-ohos_prebuilt_etc("BCM4362A2.hcd") {
-  source = "//vendor/${product_company}/${product_name}/bluetooth/BCM4362A2.hcd"
+ohos_prebuilt_etc("BCM4345C5.hcd") {
+  source = "//vendor/${product_company}/${product_name}/bluetooth/BCM4345C5.hcd"
   install_images = [ chipset_base_dir ]
   relative_install_dir = "firmware"
   part_name = "rockchip_products"
diff --git a/rk3568/bluetooth/src/hardware.c b/rk3568/bluetooth/src/hardware.c
index bc0af96..6e0a219 100644
--- a/rk3568/bluetooth/src/hardware.c
+++ b/rk3568/bluetooth/src/hardware.c
@@ -678,7 +678,7 @@ void hw_config_cback(void *p_mem)
 #endif
             {
                 // /vendor/etc/firmware
-                p_name = FW_PATCHFILE_LOCATION "BCM4362A2.hcd";
+                p_name = FW_PATCHFILE_LOCATION "BCM4345C5.hcd";
                 if ((hw_cfg_cb.fw_fd = open(p_name, O_RDONLY)) == -1) {
                     HILOGE("vendor lib preload failed to open [%s]", p_name);
                 } else {
```
- [\[OpenHarmony RK3568\] (三)蓝牙芯片适配\_openharmony适配bt-CSDN博客](https://blog.csdn.net/qq_46391974/article/details/126666860)