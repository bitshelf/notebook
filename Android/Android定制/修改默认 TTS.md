---
tags: Android
---
## 修改默认 TTS
```diff
diff --git a/frameworks/base/core/java/android/speech/tts/TextToSpeech.java b/frameworks/base/core/java/android/speech/tts/TextToSpeech.java
index 2b8649f414..7149cfd481 100644
--- a/frameworks/base/core/java/android/speech/tts/TextToSpeech.java
+++ b/frameworks/base/core/java/android/speech/tts/TextToSpeech.java
@@ -309,7 +309,7 @@ public class TextToSpeech {
          *         alone be the default.
          */
         @Deprecated
-        public static final String DEFAULT_ENGINE = "com.svox.pico";
+        public static final String DEFAULT_ENGINE = "com.google.android.tts";
 
         /**
          * Default audio stream used when playing synthesized speech.
diff --git a/frameworks/base/packages/SettingsProvider/res/values/defaults.xml b/frameworks/base/packages/SettingsProvider/res/values/defaults.xml
index 4f4d396c6e..0f13944ed5 100644
--- a/frameworks/base/packages/SettingsProvider/res/values/defaults.xml
+++ b/frameworks/base/packages/SettingsProvider/res/values/defaults.xml
@@ -26,6 +26,7 @@
     <string name="def_airplane_mode_radios" translatable="false">cell,bluetooth,wifi,nfc,wimax</string>
     <string name="airplane_mode_toggleable_radios" translatable="false">bluetooth,wifi,nfc</string>
     <string name="def_bluetooth_disabled_profiles" translatable="false">0</string>
+    <string name="def_speech_tts" translatable="false">com.google.android.tts</string>
     <bool name="def_auto_time">true</bool>
     <bool name="def_auto_time_zone">true</bool>
     <bool name="def_accelerometer_rotation">false</bool>
diff --git a/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java b/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java
index 8c625fb9ea..37211df1dd 100644
--- a/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java
+++ b/frameworks/base/packages/SettingsProvider/src/com/android/providers/settings/DatabaseHelper.java
@@ -2320,6 +2320,10 @@ class DatabaseHelper extends SQLiteOpenHelper {
             stmt = db.compileStatement("INSERT OR IGNORE INTO secure(name,value)"
                     + " VALUES(?,?);");
 
+
+                    loadStringSetting(stmt, Settings.Secure.TTS_DEFAULT_SYNTH,
+                              R.string.def_speech_tts);
+
             // Don't do this.  The SystemServer will initialize ADB_ENABLED from a
             // persistent system property instead.
             //loadSetting(stmt, Settings.Secure.ADB_ENABLED, 0);
@@ -2410,6 +2414,9 @@ class DatabaseHelper extends SQLiteOpenHelper {
             loadIntegerSetting(stmt, Settings.Secure.SLEEP_TIMEOUT,
                     R.integer.def_sleep_timeout);
 
+
+                    loadStringSetting(stmt, Settings.Secure.TTS_DEFAULT_SYNTH,
+                              R.string.def_speech_tts);
             /*
              * IMPORTANT: Do not add any more upgrade steps here as the global,
              * secure, and system settings are no longer stored in a database
```

![](assets/googtts.patch)