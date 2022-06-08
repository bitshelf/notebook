---
tags:
  - AOSP/debug
---

## Android13 调试修改
- `frameworks/base/core/java/com/android/internal/os/Zygote.java`
```diff
diff --git a/core/java/com/android/internal/os/Zygote.java b/core/java/com/android/internal/os/Zygote.java

index b1e7d15..deafd19 100644

--- a/core/java/com/android/internal/os/Zygote.java

+++ b/core/java/com/android/internal/os/Zygote.java

@@ -1001,16 +1001,24 @@

     }

     /**

+     * This will enable jdwp by default for all apps. It is OK to cache this property

+     * because we expect to reboot the system whenever this property changes

+     */

+    private static final boolean ENABLE_JDWP = SystemProperties.get(

+                          "persist.debug.dalvik.vm.jdwp.enabled").equals("1");

+

+    /**

      * Applies debugger system properties to the zygote arguments.

      *

-     * If "ro.debuggable" is "1", all apps are debuggable. Otherwise,

-     * the debugger state is specified via the "--enable-jdwp" flag

-     * in the spawn request.

+     * For eng builds all apps are debuggable. On userdebug and user builds

+     * if persist.debuggable.dalvik.vm.jdwp.enabled is 1 all apps are

+     * debuggable. Otherwise, the debugger state is specified via the

+     * "--enable-jdwp" flag in the spawn request.

      *

      * @param args non-null; zygote spawner args

      */

     static void applyDebuggerSystemProperty(ZygoteArguments args) {

-        if (RoSystemProperties.DEBUGGABLE) {

+        if (Build.IS_ENG || ENABLE_JDWP) {

             args.mRuntimeFlags |= Zygote.DEBUG_ENABLE_JDWP;

         }

     }
```

## link 
- [使用 ASfP 搭建 Android Framwork 开发调试阅读环境 - 掘金](https://juejin.cn/post/7316927971095576630)