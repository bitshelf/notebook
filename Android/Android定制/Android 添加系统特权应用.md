---
tags: Android 
---

```shell
adb root
adb remount     # if this is first time, "adb reboot" to disable verity first
adb push my-app.apk /system/priv-app
adb reboot      # to complete the app installation
```

- 为系统应用程序分配 PivilegedOrSystem 级别的权限
## 在系统 XML 文件中明确地将这些权限列入白名单
- `/etc/permissions/priv-app/privapp-permissions-demoapp.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
This XML file declares which signature|privileged permissions should be granted to privileged
applications that come with the platform
-->
<permissions>
    <privapp-permissions package="com.goyal.demoapp">
        <permission name="android.permission.READ_PRIVILEGED_PHONE_STATE"/>
    </privapp-permissions>
</permissions>
```

---
## Link 
- [How to Add a System-Privileged App](https://goyaljai.medium.com/build-aosp-co-180bb3995dbc)