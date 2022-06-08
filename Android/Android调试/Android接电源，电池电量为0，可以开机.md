---
tags: Android 
---

## Android Frameworks 修改
```diff
--- a/frameworks/base/services/core/java/com/android/server/BatteryService.java
+++ b/frameworks/base/services/core/java/com/android/server/BatteryService.java
@@ -362,6 +362,11 @@ public final class BatteryService extends SystemService {
     }

     private boolean shouldShutdownLocked() {
+       if (mHealthInfo.chargerAcOnline) {
+                Slog.w(TAG,"charger AC Online");
+                return false;
+        }
+
         if (mHealthInfo2p1.batteryCapacityLevel != BatteryCapacityLevel.UNSUPPORTED) {
             if (mHealthInfo2p1.batteryCapacityLevel == BatteryCapacityLevel.CRITICAL) {
                 Slog.w(TAG, "batteryCapacityLevel is CRITICAL need Shutdown");
```

## 驱动修改
```diff
--- a/kernel/drivers/power/supply/rk817_battery.c
+++ b/kernel/drivers/power/supply/rk817_battery.c
@@ -2893,6 +2893,8 @@ static void rk817_battery_work(struct work_struct *work)
                             bat_delay_work.work);

        rk817_bat_update_info(battery);
+    if ( battery->ac_in == 1 && battery->dsoc == 0 )
+        battery->dsoc = 1000;
        rk817_bat_lowpwr_check(battery);
        rk817_bat_display_smooth(battery);
        rk817_bat_power_supply_changed(battery);
```