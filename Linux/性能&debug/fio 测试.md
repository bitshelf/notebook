---
tags:
  - fio
---
## fio 命令使用
Fio 提供两种配置方式：命令行参数和配置文件
```shell
fio --cmdhelp

# 查看支持的引擎
fio --enghelp

# 使用配置文件
fio io-test.fio

# fio 支持输出不同格式的测试结果，如 JSON, terse 等
fio --output-format=json io-test.fio > result.json

```
### 配置文件参考
```ini
[global]
directory = /workspaces/zeodev/test-io  # 替换为你的测试目录路径
ioengine  = libaio         # 异步 I/O 引擎，提高并发效率
direct    = 1              # 绕过系统缓存，测试真实磁盘性能
runtime   = 300            # 测试时长（秒）
randrepeat= 1              # 确保随机模式可复现
time_based= 1              # 按时间运行（而非文件大小）

# 大文件随机读写
[bigfile_randrw]
filesize    = 2g           # 测试文件大小（建议≥内存 2 倍）
bs          = 128k         # 大块 I/O（128KB），匹配大文件访问特征
rw          = randrw       # 随机读写混合模式
rwmixread   = 70           # 70% 读 + 30% 写（常见负载比例）
iodepth     = 32           # 队列深度 32（适合 NVMe SSD）
numjobs     = 4            # 并发作业数（总并发=32×4=128）
group_reporting=1          # 汇总测试结果（默认每个线程一个 report）

# 小文件随机读写
[smallfiles_randrw]
stonewall   = 1            # 等待之前的 job 运行完成
                           # （默认所有 job 并行）
nrfiles     = 250          # 创建 250 个独立文件/job
filesize    = 4k-2m        # 每个文件大小范围（典型小文件）
bs          = 4k           # 小块（4KB），模拟真实小文件 I/O
rw          = randrw
rwmixread   = 70
iodepth     = 64           # 高队列深度应对高频率 I/O
numjobs     = 16           # 并发作业数（总并发=64×16=1024）
fsync       = 1            # 每写操作后同步元数据（会显著影响性能，增强真实性）
group_reporting=1

# 大文件顺序读取
[largefile_seq_read]
stonewall   = 1
rw          = read
filesize    = 2g
bs          = 1m           # 大块 I/O（1MB），最大化吞吐
iodepth     = 128
numjobs     = 4
group_reporting=1

# 大文件顺序写入
[largefile_seq_write]
stonewall   = 1
rw          = write
filesize    = 2g
bs          = 1m
iodepth     = 128
numjobs     = 4
group_reporting=1
```
## fio 测试
- 长时间持续写会明显消耗 eMMC 寿命
### 判定标准
通过需要同时满足：
- fio 最终显示 `err=0`
- CRC 校验没有 `verify: bad`
- 内核没有 `timer timeout`
- 没有 `card maybe busy too long`
- 没有 CRC、reset、I/O error 或 EXT 4 错误
- `clat max` 可以因 eMMC GC 偶尔升高，但不应伴随控制器超时

## Link
- [1. fio - Flexible I/O tester rev. 3.42 — fio 3.42-115-gcd29 documentation](https://fio.readthedocs.io/en/latest/fio_doc.html)