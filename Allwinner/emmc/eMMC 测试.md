---
tags:
  - eMMC
---
## Allwinner eMMC 测试
### sunxi_host_perf 
`sunxi_host_perf` 是全志（Allwinner/sunxi）平台 MMC/SD 控制器驱动提供的**性能验证调试节点**，用于记录底层存储（eMMC/SD 等）在 host driver 层面的读写性能。它记录的数据**不包含 I/O 调度器和文件系统的影响**，即测量的是最贴近 host 驱动层的裸读写吞吐（注意：该节点在 cmdq 开启的情况下无效）、

节点位置
```
/sys/devices/platform/soc@3000000/4022000.sdmmc/sunxi_host_perf
```

测试 eMMC 性能
```shell
# 开始计数
echo 1 > /sys/devices/platform/soc@3000000/4022000.sdmmc/sunxi_host_perf

dd if=/dev/urandom of=/root/hp.bin bs=1M count=700 && sync

 # 读结果：bytes/us
cat /sys/devices/platform/soc@3000000/4022000.sdmmc/sunxi_host_perf
```