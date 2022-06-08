---
tags:
  - Allwinner
---
# uboot 挂载文件系统
1. 进去 uboot 命令行
```shell
env set mmc_root /dev/mmcblock # mmcblock 为不存在的节点，就是为了挂载失败
save
boot
```
- 由于文件根文件系统挂载失败，会进入 ramdisk

2. 找到文件系统所在分区，并挂载
```shell
# fdisk -l
Found valid GPT with protective MBR; using GPT

Disk /dev/mmcblk0: 30576640 sectors, 2642M
Logical sector size: 512
Disk identifier (GUID): ab6f3888-569a-4926-9668-80941dcb40bc
Partition table holds up to 5 entries
First usable sector is 73728, last usable sector is 30576606

Number  Start (sector)    End (sector)  Size Name
     1           73728          139263 32.0M boot-resource
     2          139264          172031 16.0M env
     3          172032          368639 96.0M boot
     4          368640         8757247 4096M rootfs
     5         8757248        30576606 10.4G userdata
```
- 由 `4          368640         8757247 4096M rootfs` 可知 rootfs 在第四个分区