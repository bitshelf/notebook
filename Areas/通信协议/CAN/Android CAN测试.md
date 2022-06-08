---
tags: [command,Android,ip]
---
# 命令
1. `ip link set can0 down`
2. `ip link set can0 type can bitrate 500000`
3. `ip link set can0 up`
4. `candump can0&` 后台接收总线上的数据（ `candump -h`)
5. `cansend can0 123#DEADBEEF` 发送单个帧 (`cansend -h`)
```shell
ip link set can0 down;ip link set can0 type can bitrate 500000;ip link set can0 up;cansend can0 123#ABABABAB;candump can0&
```

> [!info] fd
> ```shell
> ip link set can0 type can bitrate 500000 dbitrate 3000000 fd on
> ```

## 硬件自检
### 内部回环测试模式
* harware self-test (no need to connect an external CAN node on the CAN bus)
* FDCAN 将发送的消息作为接收消息进行处理。此选项用于硬件自检
* 配置和启用 SocketCAN：`ip link set can0 up type can bitrate 1000000 dbitrate 2000000 fd on loopback`
* 同一接口上发送和接收消息：`candump can0 -L &`


---
# 相关信息
* 软件包：*can-utils*