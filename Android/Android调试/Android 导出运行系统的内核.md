---
tags:
  - Android
---
```shell
dd  if=/dev/block/by-name/boot_a of=/sdcard/boot.img
adb pull /sdcard/boot.img
```