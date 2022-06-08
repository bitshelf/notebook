---
tags: Android 
---

## Android 设置显示版本好修改
```diff:build/make/tools/buildinfo.sh
# build/make/tools/buildinfo.sh
-echo "ro.build.display.id=$BUILD_DISPLAY_ID"
+echo "ro.build.display.id=V1.0.0"
```
## Android 设置显示设备信息修改
```shell
# build\make\tools\buildinfo_common.sh
echo "ro.product.${partition}.device=WMS1018"
echo "ro.product.${partition}.model=WMS1018"
echo "ro.product.${partition}.name=WMS1018"
```