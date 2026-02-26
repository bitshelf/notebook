---
tags:
  - toybox
---
## 启用 toybox dhcp / dhcp 6 / dhcpc

| 文件 | 改动 |
|---|---|
| `external/toybox/config-device` | `CONFIG_DHCP=y`、`CONFIG_DHCP6=y` |
| `external/toybox/toys/pending/dhcp.c:9` | 新增 `USE_DHCP(OLDTOY(dhcpc, dhcp, TOYFLAG_SBIN\|TOYFLAG_ROOTONLY))` |
| `external/toybox/Android.bp` → `device_srcs` | 增加 `toys/pending/dhcp.c`、`toys/pending/dhcp6.c` |
| `external/toybox/Android.bp` → `toybox_symlinks` | 增加 `dhcp`、`dhcp6`、`dhcpc` |
| `external/toybox/android/device/generated/*.h` | 执行 `./post_update.sh .` 重新生成 |

```diff
diff --git a/Android.bp b/Android.bp
index 812d1cd..1397ac6 100644
--- a/Android.bp
+++ b/Android.bp
@@ -215,6 +215,8 @@ device_srcs = [
     "toys/other/vmstat.c",
     "toys/other/watch.c",
     "toys/pending/brctl.c",
+    "toys/pending/dhcp.c",
+    "toys/pending/dhcp6.c",
     "toys/pending/getfattr.c",
     "toys/pending/lsof.c",
     "toys/pending/modprobe.c",
@@ -272,6 +274,9 @@ toybox_symlinks = [
     "dd",
     "devmem",
     "df",
+    "dhcp",
+    "dhcp6",
+    "dhcpc",
     "diff",
     "dirname",
     "dmesg",
diff --git a/config-device b/config-device
index 694720c..fe4f377 100644
--- a/config-device
+++ b/config-device
@@ -80,9 +80,9 @@ CONFIG_DD=y
 # CONFIG_DEMO_UTF8TOWC is not set
 CONFIG_DEVMEM=y
 CONFIG_DF=y
-# CONFIG_DHCP6 is not set
+CONFIG_DHCP6=y
 # CONFIG_DHCPD is not set
-# CONFIG_DHCP is not set
+CONFIG_DHCP=y
 CONFIG_DIFF=y
 CONFIG_DIRNAME=y
 CONFIG_DMESG=y
diff --git a/toys/pending/dhcp.c b/toys/pending/dhcp.c
index d90f9a2..c28939e 100644
--- a/toys/pending/dhcp.c
+++ b/toys/pending/dhcp.c
@@ -6,6 +6,7 @@
  * See RFC 2132, and 3442 (option 121)
 
 USE_DHCP(NEWTOY(dhcp, "V:H:F:x*r:O*A#<0=20T#<0=3t#<0=3s:p:i:SBRCaovqnbf", TOYFLAG_SBIN|TOYFLAG_ROOTONLY))
+USE_DHCP(OLDTOY(dhcpc, dhcp, TOYFLAG_SBIN|TOYFLAG_ROOTONLY))
 
 config DHCP
   bool "dhcp"
```

编译并验证：

```bash
m toybox toybox_vendor
adb shell 'toybox | tr " " "\n" | grep -x -e dhcp -e dhcp6 -e dhcpc'
```


