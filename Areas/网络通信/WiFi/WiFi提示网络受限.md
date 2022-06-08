---
tags: Wi-Fi Android 
---

## Android 提示网络受限
### 覆盖修改
```diff
--- a/device/rockchip/rk3588/overlay/packages/modules/NetworkStack/res/values/config.xml
+++ b/device/rockchip/rk3588/overlay/packages/modules/NetworkStack/res/values/config.xml
@@ -13,7 +13,8 @@
          config_captive_portal_http_url and *NOT* by changing or overlaying
          this resource. It will break if the enforcement of overlayable starts.
          -->
-    <string name="default_captive_portal_http_url" translatable="false">http://connectivitycheck.gstatic.com/generate_204</string>
+    <!-- <string name="default_captive_portal_http_url" translatable="false">http://connectivitycheck.gstatic.com/generate_204</string> -->
+    <string name="default_captive_portal_http_url" translatable="false">http://connect.rom.miui.com/generate_204</string>
     <!-- HTTPS URL for network validation, to use for confirming internet connectivity. -->
     <!-- default_captive_portal_https_url is not configured as overlayable so
          OEMs that wish to change captive_portal_https_url configuration must
@@ -22,7 +23,8 @@
          this resource. It will break if the enforcement of overlayable starts.
          -->
     <!-- <string name="default_captive_portal_https_url" translatable="false">https://www.google.com/generate_204</string> -->
-    <string name="default_captive_portal_https_url" translatable="false">https://developers.google.cn/generate_204</string>
+    <!-- <string name="default_captive_portal_https_url" translatable="false">https://developers.google.cn/generate_204</string> -->
+    <string name="default_captive_portal_https_url" translatable="false">https://connect.rom.miui/generate_204</string>

     <!-- List of fallback URLs to use for detecting captive portals. -->
     <!-- default_captive_portal_fallback_urls is not configured as overlayable
@@ -32,8 +34,8 @@
          this resource. It will break if the enforcement of overlayable starts.
          -->
     <string-array name="default_captive_portal_fallback_urls" translatable="false">
-        <item>http://www.google.com/gen_204</item>
-        <item>http://play.googleapis.com/generate_204</item>
+        <item>http://connect.rom.miui.com/generate_204</item>
+        <item>http://connect.rom.miui.com/generate_204</item>
     </string-array>
     <!-- Configuration hooks for the above settings.
          Empty by default but may be overridden by RROs. -->
```

### 源位置
```diff:packages/modules/NetworkStack/res/values/config.xml 
packages/modules/NetworkStack/res/values/config.xml 

<!-- HTTP URL for network validation, to use for detecting captive portals. -->
<string name="default_captive_portal_http_url" translatable="false">http://connectivitycheck.gstatic.com/generate_204</string>
<!-- HTTPS URL for network validation, to use for confirming internet connectivity. -->
- <string name="default_captive_portal_https_url" translatable="false">https://www.google.com/generate_204</string>
+ <string name="default_captive_portal_https_url" translatable="false">https://developers.google.cn/generate_204</string>
```

## Link 
- [Android系统连接WIFI显示网络连接受限\_安卓原生网络连接受限\_Just\_Paranoid的博客-CSDN博客](https://blog.csdn.net/weixin_44008788/article/details/115797278)
