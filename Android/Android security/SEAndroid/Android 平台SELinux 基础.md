---
tags: SELinux
---

# Android  SELinux
- [externel/selinux](https://android.googlesource.com/platform/external/selinux/) : 扩展 SELinux，用于命令行工具包
- [external/selinux/libselinux](https://android.googlesource.com/platform/external/selinux/+/master/libselinux/) : Android uses only a subset of the external libselinux  
project along with some Android specific customizations

- 特定设备的 SELInux 权限通过 BOARD_SEPOLICY_DIRS 构建一个策略文件目录列表
- SoC 与 ODM 可以各添加一个目录，一个是针对 SoC 设置，一个是针对特定设备设置
	- `BOARD_SEPOLICY_DIRS += device/$SoC/common/sepolicy`
	- `BOARD_SEPOLICY_DIRS += device/$SoC/$DEVICE/sepolicy`

## file_contexts
### 平台 Plat_file_contexts
- 路径：`/system/etc/selinux/plat_file_contexts`
- 被 init. rc 加载
- Android platform file_context that has no device-specific labels

### 非平台 Noplat_file_contexts
- 源码由 Boardconfnig. mk 中的变量 `BOARD_SEPOLICY_DIRS` 决定包含那些 file_contexts
- 运行 Android file_contexts 文件路径：`/vendor/etc/selinux/nonplat_file_contexts/vendor_file_contexts`

## Property contexts 属性上下文
### 平台 plat_property_contexts
- Android platform property_context that has no device-specific labels
- 由 init 加载
- 运行 Android 中的路径：`/system/etc/selinux/plat_property_contexts`

### nonplat_property_contexts
- 源码由 Boardconfnig. mk 中的变量 `BOARD_SEPOLICY_DIRS` 决定包含属性
- Android 系统路径：`/vendor/etc/selinux/nonplat_property_contexts`
- 由 init 加载

## Service contexts
### plat_service_contexts
- Android platform-specific service_context for the servicemanager. The  
service_context has no device-specific labels
- Android 系统路径：`/system/etc/selinux/plat_service_contexts`

### nonplat_service_contexts




# Link
- [Android安全策略SELinux\_android selinux\_诸神黄昏EX的博客-CSDN博客](https://blog.csdn.net/qq_27672101/article/details/107720990)
- ![](assets/SELinux%20by%20Example%20Using%20Security%20Enhanced%20Linux.pdf)
- [https://source.android.com/docs/security/features/selinux/images/SELinux_Treble.pdf?hl=zh-cn](https://source.android.com/docs/security/features/selinux/images/SELinux_Treble.pdf?hl=zh-cn)
-  [source android  实现 SELinux](https://source.android.com/docs/security/selinux/implement#key_files)
- [Your visual how-to guide for SELinux policy enforcement | Opensource.com](https://opensource.com/business/13/11/selinux-policy-guide)
- [SELinux_Treble](assets/SELinux_Treble.pdf)