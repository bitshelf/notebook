---
tags:Android 
---
- `device/rockchip/rk356x/overlay/frameworks/base/packages/SettingsProvider/res/values/defaults.xml`
```diff
-    <integer name="def_screen_off_timeout">60000</integer>
+    <integer name="def_screen_off_timeout">2147483647</integer>
+       <bool name="def_lockscreen_disabled">true</bool>
```