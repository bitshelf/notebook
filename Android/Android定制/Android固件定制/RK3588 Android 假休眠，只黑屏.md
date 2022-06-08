---
tags:
  - Android
---
## 代码修改
```diff
commit 47d0ce43afc25eb53ae0855466e0c22cf293a375
Author: JZ Loh <luojianzhi@industio.com>
Date:   2023-12-19

    modify shortPressOnPowerBehavior only disable screen

diff --git a/device/rockchip/common/init.connectivity.rc b/device/rockchip/common/init.connectivity.rc
index 8b60ec4202..2473656d61 100755
--- a/device/rockchip/common/init.connectivity.rc
+++ b/device/rockchip/common/init.connectivity.rc
@@ -26,6 +26,7 @@ on zygote-start
     chmod 0660 /dev/ttyS9
     chmod 0660 /dev/vflash
     chmod 0664 /dev/vendor_storage
+	chmod 0664 /sys/class/backlight/backlight/bl_power
     chown bluetooth net_bt /dev/vflash
     chown bluetooth net_bt /dev/vendor_storage
     chown bluetooth net_bt /dev/ttyS0
@@ -33,6 +34,7 @@ on zygote-start
     chown system system /dev/ttyS4
     chown system system /dev/ttyS6
     chown system system /dev/ttyS7
+	chown system system /sys/class/backlight/backlight/bl_power
     chown bluetooth net_bt /dev/ttyS8
     chown bluetooth net_bt /dev/ttyS9
     chown bluetooth net_bt /sys/class/rfkill/rfkill0/type
diff --git a/frameworks/base/core/res/res/values/config.xml b/frameworks/base/core/res/res/values/config.xml
index 970e63b11f..24a75d3c14 100644
--- a/frameworks/base/core/res/res/values/config.xml
+++ b/frameworks/base/core/res/res/values/config.xml
@@ -1029,7 +1029,7 @@
             4 - Go to home
             5 - Dismiss IME if shown. Otherwise go to home
     -->
-    <integer name="config_shortPressOnPowerBehavior">1</integer>
+    <integer name="config_shortPressOnPowerBehavior">2</integer>
 
     <!-- Control the behavior when the user double presses the power button.
             0 - Nothing
diff --git a/frameworks/base/services/core/java/com/android/server/policy/PhoneWindowManager.java b/frameworks/base/services/core/java/com/android/server/policy/PhoneWindowManager.java
index 48e347d446..fc1eb5d34a 100644
--- a/frameworks/base/services/core/java/com/android/server/policy/PhoneWindowManager.java
+++ b/frameworks/base/services/core/java/com/android/server/policy/PhoneWindowManager.java
@@ -233,6 +233,13 @@ import java.io.PrintWriter;
 import java.util.ArrayList;
 import java.util.HashSet;
 
+import java.io.BufferedReader;
+import java.io.InputStreamReader;
+import java.io.FileInputStream;
+import java.text.SimpleDateFormat;
+import java.util.Calendar;
+import java.io.FileWriter;
+
 /**
  * WindowManagerPolicy implementation for the Android phone UI.  This
  * introduces a new method suffix, Lp, for an internal lock of the
@@ -308,6 +315,8 @@ public class PhoneWindowManager implements WindowManagerPolicy {
     static final int SHORT_PRESS_SLEEP_GO_TO_SLEEP_AND_GO_HOME = 1;
 
     static final int PENDING_KEY_NULL = -1;
+    static private int status = 0;
+    static private int value = 0;
 
     static public final String SYSTEM_DIALOG_REASON_KEY = "reason";
     static public final String SYSTEM_DIALOG_REASON_GLOBAL_ACTIONS = "globalactions";
@@ -1075,7 +1084,43 @@ public class PhoneWindowManager implements WindowManagerPolicy {
 
     private void sleepDefaultDisplay(long eventTime, int reason, int flags) {
         mRequestedOrSleepingDefaultDisplay = true;
-        mPowerManager.goToSleep(eventTime, reason, flags);
+        //mPowerManager.goToSleep(eventTime, reason, flags);
+        setBacklightOnOff(reason);
+    }
+
+    private static void setBacklightOnOff(int reason) {
+
+        final String path = "/sys/class/backlight/backlight/bl_power";
+        Log.i(TAG, "ido debug" + reason);
+
+        if ( reason == 4 && status == 0 ){
+          value = 4;
+          status = 1;
+        } else {
+          value = 0;
+          status = 0;
+        }
+
+        if (new File(path).exists()) {
+            FileWriter writer = null;
+            try {
+                writer = new FileWriter(path);
+                writer.write(""+value);
+                writer.flush();
+            } catch (IOException ex) {
+                Log.d(TAG, "" + ex);
+
+            } catch (NumberFormatException ex) {
+                Log.d(TAG, "" + ex);
+            } finally {
+                if (writer != null) {
+                    try {
+                        writer.close();
+                    } catch (IOException ex) {
+                    }
+                }
+            }
+        }
     }
 
     //add by wengtao for Power Key Definition

```

### 修改说明
1. 修改背光控制节点权限：`device/rockchip/common/init.connectivity.rc`
2. 修改 power 键为休眠不冻结：`frameworks/base/core/res/res/values/config.xml`
3. 替换休眠函数：
```diff
-        mPowerManager.goToSleep(eventTime, reason, flags);
+        //mPowerManager.goToSleep(eventTime, reason, flags);
+        setBacklightOnOff(reason);
```

```java
// 按下 power 键时，做状态反转，幻数 4 可以用枚举替代，目前没实现
if ( reason == 4 && status == 0 ){
    value = 4;
    status = 1;
} else {
    value = 0;
    status = 0;
}
```
- 黑屏：给节点 `/sys/class/backlight/backlight/bl_power` 写入 `4`
- 亮屏：给节点`/sys/class/backlight/backlight/bl_power`写入 `0`
**缺陷：只能操作 MIPI 屏**

## 其他待尝试方式
1. 命令行输入 `input keyevent SLEEP` 黑屏，视频播放不停止
2. 输入 `input keyevent WAKEU` 亮屏
- 可以操作HDMI 屏，但在文件`frameworks/base/services/core/java/com/android/server/policy/PhoneWindowManager.java`调用命令行执行没做出来