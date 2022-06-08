---
tags: USB
---

# 将开发板作为存储设备
## 添加以下内核配置
```config
CONFIG_USB_MUSB_HDRC=y
CONFIG_USB_MUSB_DUAL_ROLE=y
CONFIG_USB_DUMMY_HCD=y
CONFIG_USB_MASS_STORAGE=m
CONFIG_USB_GADGET=y
```

```
Device Drivers  --->
	USB support  --->
		USB Gadget Support  --->
			<M>     Mass Storage Gadget
```

在 dts 中将设定：`dr_mode = "otg"`
```
Device Drivers  --->
	USB support  --->
		Inventra Highspeed Dual Role Controller  --->
			MUSB Mode Selection  --->
				<X>	Dual Role Mode
```

## 在开发板创建共享磁盘
#### 创建共享磁盘：
```shell
dd if=/dev/zero of=/mass_storage bs=1M seek=1024 count=0
```

#### 创建分区
```
cat <<EOT | sfdisk -L -uS /mass_storage 
,,c
EOT
```

#### 查看分区： 
```shell
fdisk -lu /mass_storage
```

#### 设置 loop device
```shell
losetup -o512 /dev/loop0 /mass_storage
```

### 格式化共享磁盘 
```shell
apt-get install dosfstools
mkdosfs /dev/loop0
```

#### 挂载设备
```shell
mount -t vfat /dev/loop0 /mnt/
mount | grep mnt # 查看挂载设备
```

#### 导出挂载设备，让 PC 机可以识别到
```shell
modprobe g_mass_storage file=/mass_storage
```

# Link
- [USB Gadget/Mass storage - linux-sunxi.org](https://linux-sunxi.org/USB_Gadget/Mass_storage)
- [开发板usb otg使用 / USB OTG Using on Board - develop.phytec.cn - PHYTEC Wiki](https://wiki.phytec.com/pages/viewpage.action?pageId=175113924)