---
tags:
  - CVE/yocto
---
## yocto CVE 检查
```conf:build/conf/local.conf
INHERIT += "cve-check"
```
- bitbake 编译镜像以后，未打补丁的 CVE 会在日志中以 **WARNING** 打印出来
- 每个 recipe 会单独生成 `cve.log`

## 可选择的安全工具
-  可选的 Layers: `meta-security`，`meta-selinux`，`meta-virtualization`