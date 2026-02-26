---
tags:
  - Allwinner
---
## uboot 阶段挂在 SD 卡的系统
1. 按 `s` 进入 uboot 命令行（先不插入 SD 卡，避免从 SD 卡启动）
2. 修改文件系统的路径
```shell
# 查看
printenv

# 修改
env set mmc_root /dev/mmcblk1p4

# 保存
saveenv

# 启动进入系统
boot
```

> [!info]
> 使用 SD 卡制作启动卡，不是烧录卡