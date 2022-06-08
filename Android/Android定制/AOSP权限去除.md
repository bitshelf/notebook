---
tags: Android 
---

## AOSP Frarmwork 修改权限
```java:frameworks\base\services\core\java\com\android\server\pm\permission\DefaultPermissionGrantPolicy.java
//frameworks\base\services\core\java\com\android\server\pm\permission\DefaultPermissionGrantPolicy.java
private void grantDefaultSystemHandlerPermissions(PackageManagerWrapper pm, int userId) 
{
...
//by Lyle,220921
String bbys_term="com.termux";
grantPermissionsToPackage(pm, bbys_term, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, STORAGE_PERMISSIONS);
String bbys_box="cn.bbys.box";
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, ALWAYS_LOCATION_PERMISSIONS);
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, PHONE_PERMISSIONS); 
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, CONTACTS_PERMISSIONS); 
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, MICROPHONE_PERMISSIONS); 
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, CAMERA_PERMISSIONS); 
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, SENSORS_PERMISSIONS); 
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, SMS_PERMISSIONS);
grantPermissionsToPackage(pm, bbys_box, userId, false /* ignoreSystemPackage */,
true /*whitelistRestrictedPermissions*/, STORAGE_PERMISSIONS);
//end
}
```