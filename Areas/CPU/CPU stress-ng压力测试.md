---
tags:
  - CPU
---
## stress-ng 

```shell
stress-ng \
  --cpu 0 --cpu-method matrixprod \
  --matrix-3d 0 \
  --matrix 0 --matrix-size 256 --matrix-yx \
  --fp 0 --fp-method all \
  --vecmath 0 \
  --cache 0 --cache-enable-all --cache-level 3 \
  --stream 0 \
  --vm 0 --vm-bytes 80% --vm-method all --vm-locked \
  --hdd 0 --hdd-bytes 10% \
  --iomix 0 \
  --aggressive \
  --maximize \
  --ignite-cpu \
  --verify \
  --thermalstat 5 \
   --tz
```
- 参数解释
```shell
--cpu 0                          # 所有核跑 matrixprod（最热 CPU method）
--matrix-3d 0                    # 3D 矩阵，cache miss 之王
--matrix 0 --matrix-size 256     # 大尺寸 2D 矩阵，压内存带宽
--fp 0 --fp-method all           # 所有浮点类型全覆盖
--vecmath 0                      # SIMD 向量压满
--cache 0 --cache-enable-all     # 缓存颠簸 + clflush/fence/prefetch
--stream 0                       # 纯内存带宽
--vm 0 --vm-bytes 80%            # 80% 物理内存 VM 压力
--hdd 0                          # 磁盘 IO
--io 0                           # sync 风暴
--iomix 0                        # 更好地模拟真实世界的应用程序负载
--aggressive                     # 全局激进策略
--maximize                       # 最大参数
--ignite-cpu                     # 锁定最高频率
--verify                         # 额外校验开销
--thermalstat 5                  # 每 5 秒打印温度
-t 120s                          # 跑 120 秒
```

### 缓存压力
```shell
# 基础缓存颠簸（随机读写，击穿所有缓存层次）
stress-ng --cache 0

# 激进模式：启用所有缓存操作（clflush、prefetch、fence 等）
stress-ng --cache 0 --cache-enable-all --cache-level 3

# 指定缓存级别
stress-ng --cache 0 --cache-level 1    # 只打 L1
stress-ng --cache 0 --cache-level 2    # 打 L1+L2
stress-ng --cache 0 --cache-level 3    # 打 LLC（发热最大）
```
### 内存压力
```shell
# VM 压力——分配内存 + 随机访问模式
stress-ng --vm 0 --vm-bytes 80% --vm-method all

# VM 使用大页 + 锁定内存（减少 TLB miss，但同时增加访存带宽压力）
stress-ng --vm 0 --vm-bytes 80% --vm-method prime --vm-locked --vm-madvise hugepage

# STREAM——纯内存带宽压力（基于 McCalpin STREAM benchmark）
stress-ng --stream 0 --stream-mlock

# 强制换页（分配超过物理内存的量）
stress-ng --vm 2 --vm-bytes 2G --mmap 2 --mmap-bytes 2G --page-in
```
### IO 压力
```shell
# 经典 IO 压力（sync 系统调用）
stress-ng --io 0

# HDD 压力：直接 IO，绕过 page cache
stress-ng --hdd 0 --hdd-bytes 10% --aggressive

# HDD 压力：O_DIRECT + O_SYNC（功耗最大）
stress-ng --hdd 0 --hdd-bytes 5G --hdd-opts direct,sync

# 批量文件操作
stress-ng --hdd 0 --hdd-write-size 4M
```