---
tags:
  - AOSP/NTP
---
## Android14 NTP 修改
```diff
diff --git a/overlay/frameworks/base/core/res/res/values/config.xml b/overlay/frameworks/base/core/res/res/values/config.xml
index cca5569..0de95d5 100755
--- a/overlay/frameworks/base/core/res/res/values/config.xml
+++ b/overlay/frameworks/base/core/res/res/values/config.xml
@@ -61,7 +61,15 @@
     <bool translatable="false" name="config_wifi_enable_wifi_firmware_debugging">false</bool>
     <!-- Integer size limit, in KB, for a single WifiLogger ringbuffer, in default logging mode -->
     <integer translatable="false" name="config_wifi_logger_ring_buffer_verbose_size_limit_kb">64</integer>
-    <string translatable="false" name="config_ntpServer">asia.pool.ntp.org</string>
+    <!-- <string translatable="false" name="config_ntpServer">asia.pool.ntp.org</string> -->
+    <string-array translatable="false" name="config_ntpServers">
+        <item>ntp://ntp1.aliyun.com</item>
+        <item>ntp://ntp.tuna.tsinghua.edu.cn</item>
+        <item>ntp://asia.pool.ntp.org</item>
+    </string-array>
+
+    <!-- SNTP client config: Timeout to wait for an NTP server response in milliseconds. -->
+    <integer name="config_ntpTimeout">20000</integer>

     <!--  Maximum number of supported users -->
     <integer name="config_multiuserMaximumUsers">3</integer>
--
2.50.1
```