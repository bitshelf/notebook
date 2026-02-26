---
tags:
  - Wi-Fi
---
# AP 与 STA 共存
```Makefile title:device/rockchip/common/wifi_bt_common.mk
WIFI_HIDL_FEATURE_DUAL_INTERFACE := true
PRODUCT_PROPERTY_OVERRIDES += \  
	wifi.interface=wlan0 \  
	ro.vendor.wifi.sap.interface=wlan1
```

- wifi 驱动 Makefile 打开 `WL_STATIC_IF`这个配置
```diff
diff --git a/bcmdhd/Makefile b/bcmdhd/Makefile
index e9317ea..caeaa54 100755
--- a/bcmdhd/Makefile
+++ b/bcmdhd/Makefile
@@ -136,7 +136,7 @@ ifneq ($(CONFIG_CFG80211),)
 #	DHDCFLAGS += -DWL_SKIP_CONNECT_HINTS
 #	DHDCFLAGS += -DWL_CFGVENDOR_SEND_HANG_EVENT
 	DHDCFLAGS += -DGTK_OFFLOAD_SUPPORT
-#	DHDCFLAGS += -DWL_STATIC_IF #-DDHD_MAX_STATIC_IFS=2
+	DHDCFLAGS += -DWL_STATIC_IF #-DDHD_MAX_STATIC_IFS=2
 #	DHDCFLAGS += -DWL_STATIC_IFNAME_PREFIX=\"sap%d\"
 	DHDCFLAGS += -DWL_CLIENT_SAE
 	DHDCFLAGS += -DCONNECT_INFO_WAR -DWL_ROAM_WAR
```

## FAQ
如果没生效，现确认 `wifi_bt_common.mk` 是否被 include 了