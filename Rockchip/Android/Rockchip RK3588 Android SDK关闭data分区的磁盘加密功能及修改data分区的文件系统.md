---
tags:
  - Rockchip/Android
---
## 关掉 userdata 分区的磁盘加密

默认系统是有开启磁盘加密，如果对安全没有特别需求的可以关闭磁盘加密。

-   关闭磁盘加密可以加快开机速度
-   不带电池的设备如果没有安全需求可以关闭磁盘加密，降低异常掉电导致系统异常的概率  
    具体的修改方法是删掉 fstab 里面 userdata 分区的 `fileencryption=aes-256-xts:aes-256-ts:v2+inlinecrypt_optimized,keydirectory=/metadata/vold/metadata_encryption` 属性  
    如下：

```diff
@sys2_206:~/2_Android12_aosp_29/device/rockchip/common$ git diff
diff --git a/scripts/fstab_tools/fstab.in b/scripts/fstab_tools/fstab.in
index 2ec6c265..2bf572bd 100755
--- a/scripts/fstab_tools/fstab.in
+++ b/scripts/fstab_tools/fstab.in
@@ -23,6 +23,6 @@ ${_block_prefix}odm     /odm      ext4 ro,barrier=1 ${_flags},first_stage_mount
 # For sdmmc
 /devices/platform/${_sdmmc_device}/mmc_host*        auto  auto    defaults        voldmanaged=sdcard1:auto
 #  Full disk encryption has less effect on rk3326, so default to enable this.
-/dev/block/by-name/userdata /data f2fs noatime,nosuid,nodev,discard,reserve_root=32768,resgid=1065 latemount,wait,check,fileencryption=aes-256-xts:aes-256-cts:v2+inlinecrypt_optimized,keydirectory=/metadata/vold/metadata_encryption,quota,formattable,reservedsize=128M,checkpoint=fs
+/dev/block/by-name/userdata /data f2fs noatime,nosuid,nodev,discard,reserve_root=32768,resgid=1065 latemount,wait,check,quota,formattable,reservedsize=128M,checkpoint=fs
 # for ext4
 #/dev/block/by-name/userdata    /data      ext4    discard,noatime,nosuid,nodev,noauto_da_alloc,data=ordered,user_xattr,barrier=1,resgid=1065     latemount,wait,formattable,check,fileencryption=software,quota,reservedsize=128M,checkpoint=block
```

### userdata 区文件系统换为 [EXT4](https://so.csdn.net/so/search?q=EXT4&spm=1001.2101.3001.7020)

默认 data 分区的文件系统为 f 2 fs，建议不带电池的产品可以将 data 区的文件系统改为 ext 4，可以减小异常掉电后数据丢失的概率。修改方法如下：

```diff
device/rockchip/common$ git diff
diff --git a/scripts/fstab_tools/fstab.in b/scripts/fstab_tools/fstab.in
index 6e78b00..a658332 100755
--- a/scripts/fstab_tools/fstab.in
+++ b/scripts/fstab_tools/fstab.in
@@ -20,6 +20,6 @@ ${_block_prefix}system_ext /system_ext  ext4 ro,barrier=1 ${_flags},first_stage_
 # For sdmmc
 /devices/platform/${_sdmmc_device}/mmc_host*        auto  auto    defaults        voldmanaged=sdcard1:auto
 #  Full disk encryption has less effect on rk3326, so default to enable this.
-/dev/block/by-name/userdata /data f2fs noatime,nosuid,nodev,discard,reserve_root=32768,resgid=1065 latemount,wait,check,fileencryption=aes-256-xts:aes-256-cts:v2+inlinecrypt_optimized,quota,formattable,reservedsize=128M,checkpoint=fs
+#/dev/block/by-name/userdata /data f2fs noatime,nosuid,nodev,discard,reserve_root=32768,resgid=1065 latemount,wait,check,fileencryption=aes-256-xts:aes-256-cts:v2+inlinecrypt_optimized,quota,formattable,reservedsize=128M,checkpoint=fs
 # for ext4
-#/dev/block/by-name/userdata    /data      ext4    discard,noatime,nosuid,nodev,noauto_da_alloc,data=ordered,user_xattr,barrier=1,resgid=1065     latemount,wait,formattable,check,fileencryption=software,quota,reservedsize=128M,checkpoint=block
+/dev/block/by-name/userdata    /data      ext4    discard,noatime,nosuid,nodev,noauto_da_alloc,data=ordered,user_xattr,barrier=1,resgid=1065     latemount,wait,formattable,check,fileencryption=software,quota,reservedsize=128M,checkpoint=block
```

同时需要修改 [recovery](https://so.csdn.net/so/search?q=recovery&spm=1001.2101.3001.7020) 的 fstab：

```diff
device/rockchip/rk3588$ git diff
diff --git a/rk3588_s/recovery.fstab b/rk3588_s/recovery.fstab
index 7532217..cf789ac 100755
--- a/rk3588_s/recovery.fstab
+++ b/rk3588_s/recovery.fstab
@@ -7,7 +7,7 @@
 /dev/block/by-name/odm                   /odm                 ext4             defaults                  defaults
 /dev/block/by-name/cache                 /cache               ext4             defaults                  defaults
 /dev/block/by-name/metadata              /metadata            ext4             defaults                  defaults
-/dev/block/by-name/userdata              /data                f2fs             defaults                  defaults
+/dev/block/by-name/userdata              /data                ext4             defaults                  defaults
 /dev/block/by-name/cust                  /cust                ext4             defaults                  defaults
 /dev/block/by-name/custom                /custom              ext4             defaults                  defaults
 /dev/block/by-name/radical_update        /radical_update      ext4             defaults                  defaults
```

## Link 
-  [Rockchip RK3588 Android SDK关闭data分区的磁盘加密功能及修改data分区的文件系统\_rockchip data分区-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/124427177)