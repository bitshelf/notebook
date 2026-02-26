---
tags:
  - Allwinner/eMMC
---
##  如何获取emmc的寿命信息
进入内核之后输入下面命令  
```shell
cd /sys/block/mmcblk0/device
cat life_time  
```

得到的两个值分别代表emmc **type A**和 **type B** 两种类型的寿命值  
值1代表寿命用了0% - 10% ，其他值依次类推  
值到了0x0B表示已经超过了emmc的寿命了  

###  `cat pre_eol_info`  
得到的值代表emmc内部保留块的平均寿命水平  
- `0x01`代表Normal水平  
- `0x02`代表Warning水平，表示保留块已经消耗了80%  
- `0x03`Urgent：保留块寿命块完了