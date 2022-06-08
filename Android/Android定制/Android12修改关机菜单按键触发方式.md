---
tags: Android 
---

## Android12修改关机菜单按键触发方式
- Android12 默认的关机菜单触发方式是同时按 `电源键` 和 `音量+`
- `frameworks/base/core/res/res/values/config.xml` 中可以配置关机菜单的按键触发方式
- 可以通过 overlay 的方式替换 framework 下面的 config 相关配置
- 改完重新编译android即可，烧写的时候需要烧`misc.img`做一下数据恢复才能生效
### 修改方法
```diff
device/rockchip/rk3588
--- a/overlay/frameworks/base/core/res/res/values/config.xml
+++ b/overlay/frameworks/base/core/res/res/values/config.xml
@@ -152,5 +152,22 @@
          2: gestures only for back, home and overview -->
     <integer name="config_navBarInteractionMode">0</integer>
     <bool name="config_swipe_up_gesture_setting_available">true</bool>
+
+    <!-- Control the behavior when the user long presses the power button.
+                    0 - Nothing
+            1 - Global actions menu
+            2 - Power off (with confirmation)
+            3 - Power off (without confirmation)
+            4 - Go to voice assist
+            5 - Go to assistant (Settings.Secure.ASSISTANT)
+    -->
+    <integer name="config_longPressOnPowerBehavior">1</integer>
+
+    <!-- Control the behavior when the user presses the power and volume up buttons together.
+           0 - Nothing
+            1 - Mute toggle
+            2 - Global actions menu
+    -->
+    <integer name="config_keyChordPowerVolumeUp">1</integer>
 </resources>
```

---
## Link 
- [Android12修改关机菜单按键触发方式\_android 关机菜单\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/124698057)
- [RK3568 Android12 长按power键功能设置\_android 11 power on 进入休眠-CSDN博客](https://blog.csdn.net/terry_xiwang/article/details/122721784)