---
tags:
  - Ubuntu/snap
---
## snap 安装软件包报错
```
error: system does not fully support snapd: cannot mount squashfs image using
       "squashfs": mount: /tmp/syscheck-mountpoint-3555311500: mount failed:
       Operation not permitted
```
- 可能是缺少以下内核配置
```config
CONFIG_BLK_DEV_LOOP=y
CONFIG_BLK_DEV_CRYPTOLOOP=y
CONFIG_GREYBUS=y
CONFIG_STAGING=y
CONFIG_GREYBUS_LOOPBACK=y
CONFIG_SQUASHFS_FILE_DIRECT=y
CONFIG_SECURITY=y
CONFIG_SECURITY_APPARMOR=y
CONFIG_LSM="landlock,lockdown,yama,loadpin,safesetid,integrity,bpf"
```


## Ubuntu kernel 配置
```
CONFIG_CGROUP_BPF=y
CONFIG_BPF=y
CONFIG_BPF_SYSCALL=y
```
## Link
- [System does not fully support snapd - snap - snapcraft.io](https://forum.snapcraft.io/t/system-does-not-fully-support-snapd/14767/3)