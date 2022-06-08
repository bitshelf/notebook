---
tags: Android 
---
## 特许权限
### 查找缺少的权限
```shell
ro.control_privapp_permissions=log
```
- 违规行为会记录在日志文件中
```
PackageManager: Privileged permission {PERMISSION_NAME} for package {PACKAGE_NAME} - not in privapp-permissions allowlist
```

### 配置文件目录
- `system/etc/default-permissions/`
- Android 的权限等级分为
	- normal
	- dangerous 
	- signature
	- signatureOrSystem
- 当设置  `ro.control_privapp_permissions=enforce` 时，若特权应用需要的特许权限没有在添加白名单，那么系统会一直卡在开关机动画，无法进入系统
## Link 
- [特许权限许可名单](https://source.android.com/docs/core/config/perms-allowlist?hl=zh-cn)
- [AOSP 权限的默认授予 - 掘金](https://juejin.cn/post/6844904033749041165)
- [Android系统的特许权限白名单\_android 危险权限白名单\_m0\_46211029的博客-CSDN博客](https://blog.csdn.net/m0_46211029/article/details/108790552)
- [Android 特权许可白名单 - 简书](https://www.jianshu.com/p/a0ba43b10b34)