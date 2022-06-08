---
tags: Android
---

# Android 更改默认输入法
## 获取默认输入法
```shell
$ settings get secure enabled_input_methods
com.android.inputmethod.latin/.LatinIME:com.iflytek.inputmethod/.FlyIME
$ settings get secure default_input_method
com.iflytek.inputmethod/.FlyIME
```

## 修改默认输入法
```Git
--- a/frameworks/base/packages/SettingsProvider/res/values/defaults.xml
+++ b/frameworks/base/packages/SettingsProvider/res/values/defaults.xml
@@ -195,6 +195,10 @@
     <!-- default setting for Settings.Global.DEFAULT_RESTRICT_BACKGROUND_DATA -->
     <bool name="def_restrict_background_data">false</bool>

+    <!-- rpdzkj add for default input methods -->
+    <string name="enabled_input_methods" translatable="false">com.android.inputmethod.latin/.LatinIME:com.sohu.inputmethod.sogou/.SogouIME</string>
+    <string name="def_input_method" translatable="false">com.sohu.inputmethod.sogou/.SogouIME</string>
+
     <!-- Default for Settings.Secure.BACKUP_MANAGER_CONSTANTS -->
     <string name="def_backup_manager_constants"></string>

diff --git a/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java b/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java
index 0a224ea615..8c625fb9ea 100644
--- a/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java
+++ b/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java
@@ -2386,6 +2386,15 @@ class DatabaseHelper extends SQLiteOpenHelper {
             loadStringSetting(stmt, Settings.Secure.IMMERSIVE_MODE_CONFIRMATIONS,
                         R.string.def_immersive_mode_confirmations);

+            //rpdzkj add for default input method
+               loadStringSetting(stmt, Settings.Secure.ENABLED_INPUT_METHODS,
+                       R.string.enabled_input_methods);
+               loadStringSetting(stmt, Settings.Secure.DEFAULT_INPUT_METHOD,
+                       R.string.def_input_method);
+               loadStringSetting(stmt, Settings.Secure.DEFAULT_INPUT_METHOD,
+                        R.string.def_input_method);
+            //end rpdzkj add
+
             loadBooleanSetting(stmt, Settings.Secure.INSTALL_NON_MARKET_APPS,
                     R.bool.def_install_non_market_apps);
```
