---
tags: Android 
---
```shell
audit2allow -i avc.txt > avc.te
external/selinux/python/audit2allow/audit2allow -p avcc.txt
```

> [!error]
> ValueError: You must specify the -p option with the path to the policy file.

```diff
diff --git a/python/audit2allow/audit2allow b/python/audit2allow/audit2allow
index eafeea88..6e9315aa 100755
--- a/python/audit2allow/audit2allow
+++ b/python/audit2allow/audit2allow
@@ -359,10 +359,10 @@ class AuditToPolicy:
     def main(self):
         try:
             self.__parse_options()
-            if self.__options.policy:
-                audit2why.init(self.__options.policy)
-            else:
-                audit2why.init()
+        #    if self.__options.policy:
+        #        audit2why.init(self.__options.policy)
+        #    else:
+        #        audit2why.init()

             self.__read_input()
             self.__process_input()
```

