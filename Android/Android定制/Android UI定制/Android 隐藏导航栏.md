---
tags:
  - AOSP
---

## Android 隐藏导航栏
- 1920 x 1080 的机器，dpi 为 320 时，使用的是 navigationBar，dpi 为 160 时，使用的是 Launcher3 里的 taskBar
```diff
打上下面补丁恢复使用navigationBar
diff --git a/packages/SystemUI/res/values-sw900dp/config.xml b/packages/SystemUI/res/values-sw900dp/config.xml
index 221b0139e713..f957d6e68de4
--- a/packages/SystemUI/res/values-sw900dp/config.xml
+++ b/packages/SystemUI/res/values-sw900dp/config.xml
@@ -19,6 +19,6 @@
 <resources>

     <!-- Nav bar button default ordering/layout -->
-    <string name="config_navBarLayout" translatable="false">back,home,left;space;right,recent</string>
+    <string name="config_navBarLayout" translatable="false">left;volume_sub,back,home,recent,volume_add,screenshot;right</string>  //调整导航栏按钮布局

 </resources>
diff --git a/packages/SystemUI/src/com/android/systemui/navigationbar/NavigationBarController.java b/packages/SystemUI/src/com/android/systemui/navigationbar/NavigationBarController.java
index a984974c6bba..2ebe5a244c1f
--- a/packages/SystemUI/src/com/android/systemui/navigationbar/NavigationBarController.java
+++ b/packages/SystemUI/src/com/android/systemui/navigationbar/NavigationBarController.java
@@ -211,14 +211,14 @@ public class NavigationBarController implements

     /** @return {@code true} if taskbar is enabled, false otherwise */
     private boolean initializeTaskbarIfNecessary() {
-        if (mIsTablet) {
+        if (false) {
             // Remove navigation bar when taskbar is showing
             removeNavigationBar(mContext.getDisplayId());
             mTaskbarDelegate.init(mContext.getDisplayId());
         } else {
             mTaskbarDelegate.destroy();
         }
-        return mIsTablet;
+        return false;
     }

     @Override
@@ -295,7 +295,7 @@ public class NavigationBarController implements

         // We may show TaskBar on the default display for large screen device. Don't need to create
         // navigation bar for this case.
-        if (mIsTablet && isOnDefaultDisplay) {
+        if (false) {
             return;
         }

diff --git a/src/com/android/launcher3/DeviceProfile.java b/src/com/android/launcher3/DeviceProfile.java
index d2b9dfe0e5..d9d4ff8558
--- a/src/com/android/launcher3/DeviceProfile.java
+++ b/src/com/android/launcher3/DeviceProfile.java
@@ -241,7 +241,7 @@ public class DeviceProfile {
         availableHeightPx = windowBounds.availableSize.y;

         mInfo = info;
-        isTablet = info.isTablet(windowBounds);
+        isTablet = false;
         isPhone = !isTablet;
         isTwoPanels = isTablet && useTwoPanels;
```