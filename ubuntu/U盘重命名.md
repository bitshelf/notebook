---
tags:
  - U盘
---

1. 查看当前所有分区
	```shell
	sudo fdisk -l
	```
2. 卸载需要更改名字的分区
	```shell 
	sudo umount /dev/mmxxx
	```
3. 修改名称
```shell
sudo ntfslabel /dev/mmxxx filename
```
`ntfslabel` 会修改名称后自动重新加载，不用再执行 mount 命令，如果没有自动挂载，可以手动 mount 一下 `sudo mount /dev/mmxxx`
