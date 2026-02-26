---
tags: Ubuntu
---

# 1. 使用文件系统导出脚本
1. 网络导出文件系统：[[文件系统导出]]
~~~shell 
ff_export_roots Udisk
~~~
[[assets/ff_export_rootfs.rootfs| 附件/ff_export_root.rootfs]]
# 使用U盘
### 准备
1. 一个16G以上的U盘，格式化为ntfs 
2. 要拷贝文件系统的开发板
3. 调试串口设备，连接板子执行命令用
4. 一台Ubuntu电脑，虚拟机也可以
### 制作文件系统容器
1. 在ubuntu下执行如下命令制作一个img
```shell
	#大小视板子跟文件系统大小而定
	dd if=/dev/zero of=linux-rootfs.img bs=1M count=5000 
    sudo mkfs.ext4 -F -L linuxroot linux-rootfs.img
```
1. 把该linux-rootfs.img拷到u盘
2. U盘下创建两个文件夹
```shell
	mkdir rootfs ubuntu 
```
### 开始拷贝
1. 启动板子，插上u盘，可能u盘要手动挂载，可以挂载在系统的`/mnt`下
2. 看下板子的/文件系统挂载在哪个分区下,这里看到在*mmcblk1p8*下
	```shell 
	$ lsblk
	NAME  MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
	├── mmcblk1rpmb  179:48  0 512K  0 disk
	├── mmmcblk1boot0 179:16  0  4M  1 disk
	├── mmcblk1boot1 179:32  0  4M  1 disk
	├── mmcblk1    179:0   0  7.3G  0 disk
	├── mmcblk1p1  179:1   0  4M  0 part
	├── mmcblk1p2  179:2   0  4M  0 part
	├── mmcblk1p3  179:3   0  4M  0 part
	├── mmcblk1p4  179:4   0  32M  0 part
	├── mmcblk1p5  179:5   0  32M  0 part
	├── mmcblk1p6  179:6   0  32M  0 part
	├── mmcblk1p7  179:7   0  64M  0 part
	└── mmcblk1p8 179:8  0 7.1G 0 part /
	```
3. 进入u盘，挂载文件系统容器，拷贝文件 
```shell
sudo mount /dev/mmcblk1p8 ubuntu
sudo mount linux-rootfs.img rootfs
sudo cp -a ubuntu/* rootfs/
```
### 导出后，减小镜像大小
```shell
e2fsck -f linux-rootfs.img
resize2fs -M linux-rootfs.img
```

# 导出文件系统失败
* 系统不支持 U 盘的文件格式
* 更换到 ubuntu 虚拟机试一试

