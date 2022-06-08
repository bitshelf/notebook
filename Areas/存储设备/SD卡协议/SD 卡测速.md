---
tags: SD
---

## SD 卡测速
- 测试写速度：`time dd if=/dev/zero of=/sdcard/test1.dbf bs=4096k count=2000`
- 度速度测试：`time dd if=/sdcard/test1.dbf of=/dev/null bs=4096k count=2000`
