---
tags: Rockchip
---

# RK Android 12 分区表修改
### 修改 bootimage_partition 分区大小
修改文件：`device/rockchip/common/build/rockchip/Partitions.mk`
```mk
BOARD_BOOTIMAGE_PARTITION_SIZE ?=
```