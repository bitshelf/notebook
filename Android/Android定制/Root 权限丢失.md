---
tags: Android
---

# Android 编译OTA root 权限丢失
## 系统 `/system/bin/install-recovery.sh` 内容
```shell
if ! applypatch -c %(recovery_type)s:%(recovery_device)s:%(recovery_size)d:%(recovery_sha1)s; then
  applypatch %(bonus_args)s %(boot_type)s:%(boot_device)s:%(boot_size)d:%(boot_sha1)s %(recovery_type)s:%(recovery_device)s %(recovery_sha1)s %(recovery_size)d %(boot_sha1)s:/system/recovery-from-boot.p && log -t recovery "Installing new recovery image: succeeded" || log -t recovery "Installing new recovery image: failed"
else
  log -t recovery "Recovery image already installed"
  ```

## 解决办法
修改编译脚本：`build/make/tools/releasetools/common.py`
注释以下语句：
```python
  #sh_location = "bin/install-recovery.sh"

  #print("putting script in", sh_location)

  #output_sink(sh_location, sh)
```