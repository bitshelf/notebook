---
tags: Linux 
---

## Linux SDK 文档说明
```shell
./
├── Common/ #通用开发指导文档
├── docs_list.txt
├── Linux/ #Linux开发文档
├── Others/ #其他文档
├── RK3588@ ⇒ .Socs/RK3588 # 芯片快速入门文档
├── RK_Linux_SDK_Supported_System_Kernel_Version_and_ISP_Version_List.png
└── Rockchip_Developer_Guide_Linux_Software_CN.pdf*
```

## Linux 应用开发 
```
docs/Linux/Graphics/ApplicationNote/
```

## 图形开发
```
docs/Linux/Graphics/
```
- RK 是运用 DRM 和 DMA-BUF 的 ARM Linux 平台

## 安全机制开发
- Secureboot/TEE/Crypto 安全启动功能旨在保护设备使用正确有效的固件，非签名固件或无效固件将无法启动
```shell
docs/Linux/Security
```

## UEFI
- 目录：`SDK/uefi`
### UEFI 作用
- 硬件初始化，提供硬件的软件抽象
- 操作系统启动、引导、升级
- 多系统支持、系统备份
- UI 界面操作
- 安全性功能实现
- 可实现硬件信息与 OS 系统剥离
- RK 实现方案：base EDKII

## SDK 工具（Windows）
|       工具名称        |               工具用途               |
|:---------------------:|:------------------------------------:|
|       RKDevTool       | 分区升级固件及整个update升级固件工具 |
|      FactoryTool      |             量产升级工具             |
|    SecureBootTool     |             固件签名工具             |
|       efuseTool       |            efuse 烧写工具            |
|  RKDevInfoWriteTool   |               写号工具               |
|      SDDickTool       |          SD 卡镜像制作工具           |
| programmer_image_tool |            烧录器升级工具            |
|    pin_config_tool    |             IO 配置工具              |
|    DriverAssitant     |             驱动安装工具             |
|     RKImageMaker      |   打包工具（打包成 `update.img`）    |
|    SpeakerPCBATool    |          音箱 PCBA 测试工具          |
|   RKDevTool—Release   |             固件烧写工具             |
| ParameterTool                      |             分区表修改工具                         |

## SDK 工具（LInux）
|工具名称|  工具用途    |
|:-----:|:-----:|
|Linux_Pack_Firmware|固件打包工具（打包成`update.img`）|
|Linux_Upgrade_Tool|烧录固件工具|
|Linux——SecureBoot|固件签名工具|
|Linux——TA——Sign_Tool |loader（miniloader/trust/uboot）签名工具|
|Linux——SecurityAVB|boot/revovery签名工具|
|Linux——SecurityDM|rootfs签名工具|
|programmer_image_tool|打包SPI NOR/SPI NAND/SLC NAND/eMMC的烧录器固件|

## Recovery 开发
- Recovery 机制的开发、类似 Android 的 Recovery 功能的开发。主要作用是擦除用户数据和系统升级。
- Linux 中 Recovery 模式是在设备上多一个 Recovery 分区，该分区有 kernel+resource+ramdisk 组成，主要用于升级操作
- U-boot 会根据 misc 分区存放的字段来判断将要引导的系统是 Normal 系统还是 Recovery 系统。由于系统的独立性，所以 Recovery 模式能保证升级的完整性，及升级过程被中断、如异常掉电、升级仍然能继续执行
- 常用调试手段是开启 debug 
	- buildroot/output/rockchip_芯片型号_recovery/target 目录下创建一个隐藏文件 `.rkdebug`,Recovery 模式升级的 log 在调试串口中打印出来
	- 另外一种是通过查看 `userdata/recovery/Log` 文件
