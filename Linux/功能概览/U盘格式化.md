# mkfs
* 格式化为 ext4 分区: `sudo mkfs.ext4 /dev/sda1`
> [!info] 注意
> 要格式化的分区必须要先用 `umount` 卸载掉才能格式化
* ` -L labelname` ：-L 命令是可选， U盘重新命名