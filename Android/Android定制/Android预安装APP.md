---
tags: Android
---

# Android 预安装 APP
1. 获取目标对应文件夹：
```shell
get_build_var TARGET_DEVICE_DIR
```
2. 在目标文件建立对应文件夹：
	1. preinstall (安装不可卸载应用)
	2. preinstall_del_forever (安装可永久卸载应用)
	3. preinstall_del (安装卸载后恢复出厂设置后自动恢复的应用)
3. 编译成功后：在$OUT/oem 目录下，生成对应文件夹
	1. bundled_persist-app
	2. bundled_uninstall_gone-app
	3. bundled_uninstall_back-app

> [!attention]
> 注意：不支持带systemuid应用的预制，请使用android原生方式编写mk文件。可参考vendor/rockchip/common/apps/RkDeviceTest/的集成方式
