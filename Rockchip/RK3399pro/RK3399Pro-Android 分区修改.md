---
tags: Rockchip
---

# RK3399Pro Android8.1 分区表修改
```Git
--- a/device/rockchip/common/BoardConfig.mk
+++ b/device/rockchip/common/BoardConfig.mk
@@ -80,7 +80,7 @@ else
   BOARD_SYSTEMIMAGE_PARTITION_SIZE ?= 1325400064
   BOARD_CACHEIMAGE_PARTITION_SIZE := 69206016
   BOARD_OEMIMAGE_PARTITION_SIZE ?= 536870912
-  BOARD_VENDORIMAGE_PARTITION_SIZE ?= 536870912
+  BOARD_VENDORIMAGE_PARTITION_SIZE ?= 553648128
```
