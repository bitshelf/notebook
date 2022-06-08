---
tags: Rockchip 
---

## RK 3568 实现多个板子一套固件方案

## 硬件必须支持 HWID，（ADC 或者 GPIO）

具体说明可以参考文档 RKDocs/common/ u-boot /Rockchip\_Developer\_Guide\_UBoot\_Nextdev\_CN. pdf 的”HW-ID DTB“章节

## 软件修改

### kernel：

修改打包脚本添加各个板子的 dtb 文件

```
--- a/scripts/mkmultidtb.py
+++ b/scripts/mkmultidtb.py
@@ -26,6 +26,9 @@ DTBS['RK3308-EVB'] = OrderedDict([('rk3308-evb-dmic-i2s-v10', '#_saradc_ch3=288'
                                  ('rk3308-evb-dmic-pdm-v10', '#_saradc_ch3=1024'),
                                  ('rk3308-evb-amic-v10', '#_saradc_ch3=407')])
 
+DTBS['RK3568-EVB'] = OrderedDict([('rk3568-evb2-lp4x-v10', '#_saradc_ch1=852'),
+                               ('rk3568-evb1-ddr4-v10', '#_saradc_ch1=1023')])
+
 def main():
     if (len(sys.argv) < 2) or (sys.argv[1] == '-h'):
```

### [uboot](https://so.csdn.net/so/search?q=uboot&spm=1001.2101.3001.7020) 打开 HWID\_DTB 宏

```
--- a/configs/rk3568_defconfig
+++ b/configs/rk3568_defconfig
@@ -217,3 +217,4 @@ CONFIG_RK_AVB_LIBAVB_USER=y
 CONFIG_OPTEE_CLIENT=y
 CONFIG_OPTEE_V2=y
 CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y
+CONFIG_ROCKCHIP_HWID_DTB=y
```

### android 修改编译脚本 build. sh

编译 kernel 的时候需要把所有的 dtb 都编译出来，且去掉 uboot 的 charge 图片的打包。

```
@sys2_206:~/4_Android12_29_sdk/device/rockchip/common$
diff --git a/build/rockchip/build.sh b/build/rockchip/build.sh
index 34d80826..24cb669a 100755
--- a/build/rockchip/build.sh
+++ b/build/rockchip/build.sh
@@ -14,6 +14,7 @@ usage()
     echo "       -d = huild kernel dts name    "
     echo "       -V = build version    "
     echo "       -J = build jobs    "
+    echo "       -m = build multi dtb    "
     exit 1
 }
 
@@ -30,9 +31,27 @@ BUILD_VARIANT=`get_build_var TARGET_BUILD_VARIANT`
 KERNEL_DTS=""
 BUILD_VERSION=""
 BUILD_JOBS=16
+BUILD_MULTIDTB=false
 
+RK3588_DTS=(
+"rk3588-evb1-lp4-v10"
+"rk3588-evb2-lp4-v10"
+"rk3588-evb3-lp5-v10"
+"rk3588-evb4-lp4-v10"
+"rk3588-evb5-lp4-v10"
+"rk3588-evb6-lp4-v10"
+"rk3588s-evb1-lp4x-v10"
+)
+K3588S_DTS=(
+"rk3588s-evb1-lp4x-v10"
+"rk3588s-evb2-lp5-v10"
+"rk3588s-evb3-lp4x-v10"
+"rk3588s-evb4-lp4x-v10"
+)
+
+dts_name=RK3588_DTS
 # check pass argument
-while getopts "UCKABpouv:d:V:J:" arg
+while getopts "UCKABpoumv:d:V:J:" arg
 do
     case $arg in
         U)
@@ -80,6 +99,9 @@ do
         J)
             BUILD_JOBS=$OPTARG
             ;;
+        m)
+            BUILD_MULTIDTB=true
+            ;;
         ?)
             usage ;;
     esac
@@ -127,6 +149,29 @@ STUB_PATH="$(echo $STUB_PATH | tr '[:lower:]' '[:upper:]')"
 export STUB_PATH=$PROJECT_TOP/$STUB_PATH
 export STUB_PATCH_PATH=$STUB_PATH/PATCHES
 
+function build_multidtb()
+{
+       if [ "$TARGET_PRODUCT" = "rk3588_s" ];then
+               for (( i = 0 ; i < ${#RK3588_DTS[@]} ; i++ ))
+               do
+                       echo "make ${RK3588_DTS[$i]} ....."
+                       make $ADDON_ARGS ARCH=$KERNEL_ARCH ${RK3588_DTS[$i]}.img -j$BUILD_JOBS
+               done
+               ./scripts/mkmultidtb.py RK3588-EVB
+
+       elif [ "$TARGET_PRODUCT" = "rk3588s_s" ];then
+               for (( i = 0 ; i < ${#RK3588S_DTS[@]} ; i++ ))
+               do
+                       echo "make ${RK3588S_DTS[$i]} ....."
+                       make $ADDON_ARGS ARCH=$KERNEL_ARCH ${RK3588S_DTS[$i]}.img -j$BUILD_JOBS
+               done
+               ./scripts/mkmultidtb.py RK3588S-EVB
+       fi
+
+       echo "build dtb succes................."
+}
+
+
 # build uboot
 if [ "$BUILD_UBOOT" = true ] ; then
 echo "start build uboot"
@@ -149,7 +194,11 @@ fi
 # build kernel
 if [ "$BUILD_KERNEL" = true ] ; then
 echo "Start build kernel"
-cd $LOCAL_KERNEL_PATH && make clean && make $ADDON_ARGS ARCH=$KERNEL_ARCH $KERNEL_DEFCONFIG && make $ADDON_ARGS ARCH=$KERNEL_ARCH $KERNEL_DTS.img -j$BUILD_JOBS && cd -
+if [ "$BUILD_MULTIDTB" = true ] ; then
+       cd $LOCAL_KERNEL_PATH && make clean && make $ADDON_ARGS ARCH=$KERNEL_ARCH $KERNEL_DEFCONFIG && build_multidtb && cd -
+else 
+       cd $LOCAL_KERNEL_PATH && make clean && make $ADDON_ARGS ARCH=$KERNEL_ARCH $KERNEL_DEFCONFIG && make $ADDON_ARGS ARCH=$KERNEL_ARCH $KERNEL_DTS.img -j$BUILD_JOBS && cd -
+fi
 if [ $? -eq 0 ]; then
     echo "Build kernel ok!"
 else
@@ -165,8 +214,10 @@ fi
 cp -rf $KERNEL_DEBUG $OUT/kernel
 fi
 
+if [ "$BUILD_MULTIDTB" = false ] ; then
 echo "package resoure.img with charger images"
 cd u-boot && ./scripts/pack_resource.sh ../$LOCAL_KERNEL_PATH/resource.img && cp resource.img ../$LOCAL_KERNEL_PATH/resource.img && cd -
+fi
 
 # build android
 if [ "$BUILD_ANDROID" = true ] ; then
```

注意 build. sh 源文件在 `device/rockchip/common/build/rockchip/build.sh`，修改完需要手动拷贝到 SDK 根目录下：

```
cp build/rockchip/build.sh ../../../build.sh -rf
```

## Link
- [RK平台实现一套固件支持多个板型方案\_mkmultidtb.py\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/123098921)