---
tags:
  - Android/SElinux
---
## 编译
- `make selinux_policy`
- 验证
```shell
adb push ./out/target/product/XXX/system/etc/selinux/*  /system/etc/selinux/
adb push ./out/target/product/XXX/vendor/etc/selinux/*  /vendor/etc/selinux/

adb push ./out/target/product/XXX/system/system_ext/etc/selinux/*  /system/system_ext/etc/selinux/

adb push ./out/target/product/XXX/system/product/etc/selinux/*  /system/product/etc/selinux/
adb push ./out/target/product/XXX/root/sepolicy  /
```

- 根据 SElinux 报错生成 SElinux 规则
```shell
audit2allow -i input-1.txt 
```