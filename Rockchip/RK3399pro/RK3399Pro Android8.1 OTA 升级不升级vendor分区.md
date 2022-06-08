---
tags: Rockchip
---

# OTA 升级不升级 vendor
1. 禁用 ninja 系统的自动编译
2. 将 vendor OTA 编译代码注释

![](../assets/ota_upgrade_no_vendor.txt)

```Git
diff --git a/build/kati/regen.cc b/build/kati/regen.cc
index 5b42d8fcd3..6e755df157 100644
--- a/build/kati/regen.cc
+++ b/build/kati/regen.cc
@@ -37,7 +37,7 @@ namespace {
 
 #define RETURN_TRUE do {                        \
       if (g_flags.dump_kati_stamp)              \
-        needs_regen_ = true;                    \
+	return true; \
       else                                      \
         return true;                            \
     } while (0)
diff --git a/build/make/core/Makefile b/build/make/core/Makefile
index a185fbb8a0..839fc585de 100644
--- a/build/make/core/Makefile
+++ b/build/make/core/Makefile
@@ -1847,36 +1847,36 @@ $(INSTALLED_FILES_FILE_VENDOR) : $(INTERNAL_VENDORIMAGE_FILES) $(FILESLIST)
 	$(hide) $(FILESLIST) $(TARGET_OUT_VENDOR) > $(@:.txt=.json)
 	$(hide) build/tools/fileslist_util.py -c $(@:.txt=.json) > $@
 
-vendorimage_intermediates := \
-    $(call intermediates-dir-for,PACKAGING,vendor)
-BUILT_VENDORIMAGE_TARGET := $(PRODUCT_OUT)/vendor.img
-define build-vendorimage-target
-  $(call pretty,"Target vendor fs image: $(INSTALLED_VENDORIMAGE_TARGET)")
-  @mkdir -p $(TARGET_OUT_VENDOR)
-  @mkdir -p $(vendorimage_intermediates) && rm -rf $(vendorimage_intermediates)/vendor_image_info.txt
-  $(call generate-userimage-prop-dictionary, $(vendorimage_intermediates)/vendor_image_info.txt, skip_fsck=true)
-  $(if $(BOARD_VENDOR_KERNEL_MODULES), \
-    $(call build-image-kernel-modules,$(BOARD_VENDOR_KERNEL_MODULES),$(TARGET_OUT_VENDOR),vendor/,$(call intermediates-dir-for,PACKAGING,depmod_vendor)))
-  $(hide) PATH=$(foreach p,$(INTERNAL_USERIMAGES_BINARY_PATHS),$(p):)$$PATH \
-      ./build/tools/releasetools/build_image.py \
-      $(TARGET_OUT_VENDOR) $(vendorimage_intermediates)/vendor_image_info.txt $(INSTALLED_VENDORIMAGE_TARGET) $(TARGET_OUT)
-  $(hide) $(call assert-max-image-size,$(INSTALLED_VENDORIMAGE_TARGET),$(BOARD_VENDORIMAGE_PARTITION_SIZE))
-endef
+#vendorimage_intermediates := \
+#    $(call intermediates-dir-for,PACKAGING,vendor)
+#BUILT_VENDORIMAGE_TARGET := $(PRODUCT_OUT)/vendor.img
+#define build-vendorimage-target
+#  $(call pretty,"Target vendor fs image: $(INSTALLED_VENDORIMAGE_TARGET)")
+#  @mkdir -p $(TARGET_OUT_VENDOR)
+#  @mkdir -p $(vendorimage_intermediates) && rm -rf $(vendorimage_intermediates)/vendor_image_info.txt
+#  $(call generate-userimage-prop-dictionary, $(vendorimage_intermediates)/vendor_image_info.txt, skip_fsck=true)
+#  $(if $(BOARD_VENDOR_KERNEL_MODULES), \
+#    $(call build-image-kernel-modules,$(BOARD_VENDOR_KERNEL_MODULES),$(TARGET_OUT_VENDOR),vendor/,$(call intermediates-dir-for,PACKAGING,depmod_vendor)))
+#  $(hide) PATH=$(foreach p,$(INTERNAL_USERIMAGES_BINARY_PATHS),$(p):)$$PATH \
+#      ./build/tools/releasetools/build_image.py \
+#      $(TARGET_OUT_VENDOR) $(vendorimage_intermediates)/vendor_image_info.txt $(INSTALLED_VENDORIMAGE_TARGET) $(TARGET_OUT)
+#  $(hide) $(call assert-max-image-size,$(INSTALLED_VENDORIMAGE_TARGET),$(BOARD_VENDORIMAGE_PARTITION_SIZE))
+#endef
 
 # We just build this directly to the install location.
-INSTALLED_VENDORIMAGE_TARGET := $(BUILT_VENDORIMAGE_TARGET)
-$(INSTALLED_VENDORIMAGE_TARGET): $(INTERNAL_USERIMAGES_DEPS) $(INTERNAL_VENDORIMAGE_FILES) $(INSTALLED_FILES_FILE_VENDOR) $(BUILD_IMAGE_SRCS) $(DEPMOD) $(BOARD_VENDOR_KERNEL_MODULES)
-	$(build-vendorimage-target)
-
-.PHONY: vendorimage-nodeps vnod
-vendorimage-nodeps vnod: | $(INTERNAL_USERIMAGES_DEPS) $(DEPMOD)
-	$(build-vendorimage-target)
+#INSTALLED_VENDORIMAGE_TARGET := $(BUILT_VENDORIMAGE_TARGET)
+#$(INSTALLED_VENDORIMAGE_TARGET): $(INTERNAL_USERIMAGES_DEPS) $(INTERNAL_VENDORIMAGE_FILES) $(INSTALLED_FILES_FILE_VENDOR) $(BUILD_IMAGE_SRCS) $(DEPMOD) $(BOARD_VENDOR_KERNEL_MODULES)
+	#$(build-vendorimage-target)
 
-sync: $(INTERNAL_VENDORIMAGE_FILES)
+#.PHONY: vendorimage-nodeps vnod
+#vendorimage-nodeps vnod: | $(INTERNAL_USERIMAGES_DEPS) $(DEPMOD)
+#	$(build-vendorimage-target)
 
-else ifdef BOARD_PREBUILT_VENDORIMAGE
-INSTALLED_VENDORIMAGE_TARGET := $(PRODUCT_OUT)/vendor.img
-$(eval $(call copy-one-file,$(BOARD_PREBUILT_VENDORIMAGE),$(INSTALLED_VENDORIMAGE_TARGET)))
+#sync: $(INTERNAL_VENDORIMAGE_FILES)
+#
+#else ifdef BOARD_PREBUILT_VENDORIMAGE
+#INSTALLED_VENDORIMAGE_TARGET := $(PRODUCT_OUT)/vendor.img
+#$(eval $(call copy-one-file,$(BOARD_PREBUILT_VENDORIMAGE),$(INSTALLED_VENDORIMAGE_TARGET)))
 endif
 
 # -----------------------------------------------------------------
@@ -2299,6 +2299,10 @@ endef
 
 BUILT_OTA_OEMIMAGE_TARGET := $(PRODUCT_OUT)/oem/
 # Depending on the various images guarantees that the underlying
+		#$(PRODUCTS.$(INTERNAL_PRODUCT).PRODUCT_VENDOR_BASE_FS_PATH) \
+		#$(INSTALLED_VENDOR_MANIFEST) \
+		#$(INSTALLED_VENDOR_MATRIX) \
+		#$(INSTALLED_VENDORIMAGE_TARGET) \
 # directories are up-to-date.
 $(BUILT_TARGET_FILES_PACKAGE): \
 		$(INSTALLED_BOOTIMAGE_TARGET) \
@@ -2308,7 +2312,6 @@ $(BUILT_TARGET_FILES_PACKAGE): \
 		$(FULL_SYSTEMIMAGE_DEPS) \
 		$(INSTALLED_USERDATAIMAGE_TARGET) \
 		$(INSTALLED_CACHEIMAGE_TARGET) \
-		$(INSTALLED_VENDORIMAGE_TARGET) \
 		$(INSTALLED_VBMETAIMAGE_TARGET) \
 		$(INSTALLED_DTBOIMAGE_TARGET) \
 		$(BUILT_OTA_OEMIMAGE_TARGET) \
@@ -2317,7 +2320,6 @@ $(BUILT_TARGET_FILES_PACKAGE): \
 		$(INSTALLED_KERNEL_TARGET) \
 		$(INSTALLED_2NDBOOTLOADER_TARGET) \
 		$(PRODUCTS.$(INTERNAL_PRODUCT).PRODUCT_SYSTEM_BASE_FS_PATH) \
-		$(PRODUCTS.$(INTERNAL_PRODUCT).PRODUCT_VENDOR_BASE_FS_PATH) \
 		$(SELINUX_FC) \
 		$(APKCERTS_FILE) \
 		$(SOONG_ZIP) \
@@ -2325,8 +2327,6 @@ $(BUILT_TARGET_FILES_PACKAGE): \
 		$(HOST_OUT_EXECUTABLES)/imgdiff \
 		$(HOST_OUT_EXECUTABLES)/bsdiff \
 		$(BUILD_IMAGE_SRCS) \
-		$(INSTALLED_VENDOR_MANIFEST) \
-		$(INSTALLED_VENDOR_MATRIX) \
 		| $(ACP)
 	@echo "Package target files: $@"
 	$(call create-system-vendor-symlink)
@@ -2398,11 +2398,11 @@ endif # BOARD_USES_RECOVERY_AS_BOOT
 	@# Contents of the data image
 	$(hide) $(call package_files-copy-root, \
 		$(TARGET_OUT_DATA),$(zip_root)/DATA)
-ifdef BOARD_VENDORIMAGE_FILE_SYSTEM_TYPE
-	@# Contents of the vendor image
-	$(hide) $(call package_files-copy-root, \
-		$(TARGET_OUT_VENDOR),$(zip_root)/VENDOR)
-endif
+#ifdef BOARD_VENDORIMAGE_FILE_SYSTEM_TYPE
+#	@# Contents of the vendor image
+#	$(hide) $(call package_files-copy-root, \
+#		$(TARGET_OUT_VENDOR),$(zip_root)/VENDOR)
+#endif
 ifdef INSTALLED_SYSTEMOTHERIMAGE_TARGET
 	@# Contents of the system_other image
 	$(hide) $(call package_files-copy-root, \
@@ -2595,10 +2595,10 @@ ifeq (true,$(BOARD_BUILD_DISABLED_VBMETAIMAGE))
 	$(hide) mkdir -p $(zip_root)/IMAGES
 	$(hide) cp $(INSTALLED_VBMETAIMAGE_TARGET) $(zip_root)/IMAGES/
 endif
-ifdef BOARD_PREBUILT_VENDORIMAGE
-	$(hide) mkdir -p $(zip_root)/IMAGES
-	$(hide) cp $(INSTALLED_VENDORIMAGE_TARGET) $(zip_root)/IMAGES/
-endif
+#ifdef BOARD_PREBUILT_VENDORIMAGE
+#	$(hide) mkdir -p $(zip_root)/IMAGES
+#	$(hide) cp $(INSTALLED_VENDORIMAGE_TARGET) $(zip_root)/IMAGES/
+#endif
 ifdef BOARD_PREBUILT_DTBOIMAGE
 	$(hide) mkdir -p $(zip_root)/PREBUILT_IMAGES
 	$(hide) cp $(INSTALLED_DTBOIMAGE_TARGET) $(zip_root)/PREBUILT_IMAGES/
@@ -2640,12 +2640,12 @@ ifeq ($(PRODUCT_FULL_TREBLE),true)
 	@# Metadata for compatibility verification.
 	$(hide) cp $(BUILT_SYSTEM_MANIFEST) $(zip_root)/META/system_manifest.xml
 	$(hide) cp $(BUILT_SYSTEM_COMPATIBILITY_MATRIX) $(zip_root)/META/system_matrix.xml
-ifdef BUILT_VENDOR_MANIFEST
-	$(hide) cp $(BUILT_VENDOR_MANIFEST) $(zip_root)/META/vendor_manifest.xml
-endif
-ifdef BUILT_VENDOR_MATRIX
-	$(hide) cp $(BUILT_VENDOR_MATRIX) $(zip_root)/META/vendor_matrix.xml
-endif
+#ifdef BUILT_VENDOR_MANIFEST
+#	$(hide) cp $(BUILT_VENDOR_MANIFEST) $(zip_root)/META/vendor_manifest.xml
+#endif
+#ifdef BUILT_VENDOR_MATRIX
+#	$(hide) cp $(BUILT_VENDOR_MATRIX) $(zip_root)/META/vendor_matrix.xml
+#endif
 endif
 
 	$(hide) PATH=$(foreach p,$(INTERNAL_USERIMAGES_BINARY_PATHS),$(p):)$$PATH MKBOOTIMG=$(MKBOOTIMG) \
@@ -2873,7 +2873,7 @@ $(INSTALLED_QEMU_VENDORIMAGE): $(INSTALLED_VENDORIMAGE_TARGET) $(MK_QEMU_IMAGE_S
 	@echo Create vendor-qemu.img
 	(export SGDISK=$(SGDISK_HOST); $(MK_QEMU_IMAGE_SH) ${PRODUCT_OUT}/vendor.img)
 
-vendorimage: $(INSTALLED_QEMU_VENDORIMAGE)
+#vendorimage: $(INSTALLED_QEMU_VENDORIMAGE)
 droidcore: $(INSTALLED_QEMU_VENDORIMAGE)
 endif
 endif
diff --git a/build/make/tools/releasetools/ota_from_target_files.py b/build/make/tools/releasetools/ota_from_target_files.py
index 0cd892af2a..88886aa8fc 100755
--- a/build/make/tools/releasetools/ota_from_target_files.py
+++ b/build/make/tools/releasetools/ota_from_target_files.py
@@ -324,7 +324,7 @@ def GetImage(which, tmpdir):
 
 
 def AddCompatibilityArchive(target_zip, output_zip, system_included=True,
-                            vendor_included=True):
+                            vendor_included=False):
   """Adds compatibility info from target files into the output zip.
 
   Metadata used for on-device compatibility verification is retrieved from
@@ -349,7 +349,8 @@ def AddCompatibilityArchive(target_zip, output_zip, system_included=True,
   vendor_metadata = ("vendor_manifest.xml", "vendor_matrix.xml")
   system_metadata = ("system_manifest.xml", "system_matrix.xml")
   if vendor_included:
-    compatibility_files += vendor_metadata
+      pass
+    #compatibility_files += vendor_metadata
   if system_included:
     compatibility_files += system_metadata
 

```