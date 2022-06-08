1. 使用 `df -h` 命令查看，然后大概进行估算
# 查看 `cat /sys/block/mmcblk0/size`
1. 将得到的值 (扇区值），乘以 $512$ ，再除以 $1024\times1024\times1024$ 转化为 $G$ 
2. 如为 eMMc，则可以在 `/sys/block/` 下查看到 `mmcblk0、mmcblk**、mmcblk**` 的几个目录，查看 `mmcblk0` 即可