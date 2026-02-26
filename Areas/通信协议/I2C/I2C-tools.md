---
tags: I2C
---

# i2c-tools
## i2cdetect 
#### 查看板子有几组$I^2C$ 总线
```shell
i2cdetect -l
```

#### 查看$I^2C$ 总线上的设备
```shell
i2cdetect   1 # 查看总线1上的设备
```
- `--`: 探测该地址没有设备应答
- `UU`：跳过探测该地址，当前地址被驱动使用，表明该地址连接一个 IC
- 16 进制表明一个 $I^2C$  在该地址

- `-y`: 关闭交互模式
#### 查看$I^2C$ 设备支持的功能
```shell
i2cdetect -F 3 # /dev/i2c-3
```

#### i2cget
获取$I^2C$ 设备寄存器的值
```shell
i2cget -y 0 0x50 0
```
- 读取总线 0 上，地址为 0x50，偏移地址为 0 的寄存器的值

#### i2cset
设置 $I^2C$ 设备寄存器的值
```shell
# 1.Read the device at offset 0x2.
[root]$ i2cget -y 1 0x68 0x2
0x14
[root]$

# 2.Write the 0x12 at offset 0x2 of slave device 0x68
[root]$ i2cset -y 1 0x68 0x2 0x12
[root]$

# 3.Read back the device at offset 0x2 and verify the data should be 0x12.
[root]$ i2cget -y 1 0x68 0x2
0x12
[root]$
```

#### i2cdump
批量查看$I^2C$ 设备寄存器的值
```shell
i2cdump -y -r 0x0-0xf 1 0x68
```
- `-r 0x0-0xf` $I^2C$ 设备寄存器地址
- `1`： $I^2C$ 总线地址
- `0x68` 总线上的设备地址

#### i2ctransfer
批量写入 $I^2C$ 设备寄存器的值

## i2c trace/tracepoint
```shell
echo 1 > /sys/kernel/tracing/events/i2c/enable
cat /sys/kernel/tracing/trace

i2c_write: i2c-4 #0 a=010 f=0000 l=3 [00-00-00]
            │      │   │     │    │   └── 写入的数据（16进制dump）
            │      │   │     │    └── length = 3 bytes
            │      │   │     └── flags = 0（write）
            │      │   └── address = 0x10
            │      └── msg #0（第几条消息）
            └── adapter nr = 4
```

## i2c Dynamic Debug
```shell
# 查看所有可用的 debug 打印点
cat /sys/kernel/debug/dynamic_debug/control | grep i2c
```

##  regmap 调试方法
```shell
# 在 drivers/base/regmap/regmap.c 中加一行：
#define LOG_DEVICE "0-006a"
```

## 快速排查决策树
```
设备 probe 失败？
  │
  ├── dmesg 有 probe 消息吗？
  │     ├── 无 → DTO 没加载 / compatible 不匹配
  │     └── 有 → 看错误码
  │           ├── -121 (EREMOTEIO) / -6 (ENXIO)
  │           │     └── i2cdetect 有设备吗？
  │           │           ├── 无 → 硬件：排线/供电/上拉/地址
  │           │           └── 有(UU或数字) → 驱动地址与 DTS 不一致
  │           ├── -110 (ETIMEDOUT)
  │           │     └── 示波器量 SCL → stuck low?
  │           │           ├── 是 → slave 拉死 → bus recovery
  │           │           └── 否 → clock stretching 超时 → 调整 timeout
  │           ├── -22 (EINVAL)
  │           │     └── DTS 参数错误，检查 port/reg/endpoint
  │           └── -19 (ENODEV)
  │                 └── chip ID 读成功但值不匹配 → 用了错误的芯片型号
  │
  └── probe 成功但功能异常？
        ├── ftrace → 看收发数据是否与 datasheet 一致
        ├── regmap debugfs → 检查缓存 vs 实际值
        └── fault injection → 测试鲁棒性
```

# Link
- [【linux】i2c使用分析&原始碼實戰 | IT人](https://iter01.com/563143.html)
- [Site Unreachable](https://linuxhint.com/i2c-linux-utilities/)