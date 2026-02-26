---
tags:
  - eMMC
---
## eMMC 信息查看
1. 查看 eMMC 寿命
```shell
find /sys/ | grep life_time

cat /sys/devices/platform/soc@3000000/4022000.sdmmc/mmc_host/mmc0/mmc0:0001/life_time
```
## FIQ
### 为什么重新烧录能修复，问题会消失

| 重烧录的效果                | 影响                                            |
| --------------------- | --------------------------------------------- |
| 重置 EXT_CSD 易失性寄存器     | CACHE_CTRL、BKOPS_EN、inand_CMD 38_ ARG 全部回到默认值 |
| FTL 映射表重建             | 旧的碎片化映射被擦除，新映射为连续顺序                           |
| 全量写入触发 eMMC 内部整理      | 大量连续写入让 FTL 有机会批量合并和整理                        |
| HS 200 re-tuning 重新执行 | U-Boot 重新做 tuning，找到当前环境下的最佳采样窗口              |
| 分区重新对齐                | 如果烧录工具按 erase group 边界对齐，减少写放大                |
![](assets/Pasted%20image%2020260730151844.png)