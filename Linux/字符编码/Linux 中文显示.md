---
tags:
  - Linux/中文
---
## 内核配置
```shell
CONFIG_FAT_DEFAULT_IOCHARSET="utf8"
CONFIG_NLS_DEFAULT="utf8"
```

## buildroot 文件系统配置
```shell
BR2_PACKAGE_COREUTILS is not set # 关闭 COREUTILS 的 ls 工具
```

## buildroot inputrc 文件修改
```shell
# buildroot/buildroot-201902/package/readline/inputrc
set input-meta on
set convert-meta off
```

## busybox 配置
```shell
# buildroot/buildroot-201902/package/busybox/busybox.config
CONFIG_UNICODE_SUPPORT=y
CONFIG_LOCALE_SUPPORT=y
CONFIG_UNICODE_USING_LOCALE=y
CONFIG_SUBST_WCHAR=65533
CONFIG_LAST_SUPPORTED_WCHAR=195102
```