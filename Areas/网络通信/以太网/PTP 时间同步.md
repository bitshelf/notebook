---
tags:
  - PTP
---
## PTP 同步测试
在系统中运行两个服务
- 一个是同步底层ptp
- 另一个是同步底层时间和系统时间
所以只要两个板子间能通网络就会自动进行同步 ptp

### ptp4l-eth1.service
```shell
[Unit]
Description=PTP clock (eth1)
After=network.target NetworkManager.service

[Service]
Type=simple
WorkingDirectory=/ptp/e2e/
ExecStartPre=/bin/sleep 5
ExecStart=/ptp/e2e/linuxptp.sh
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```
### phc2sys-eth1.service
```shell
Description=Synchronize system clock to PTP hardware clock (PHC) on eth1
After=network.target ptp4l-eth1.service
Requires=ptp4l-eth1.service

[Service]
Type=simple
ExecStart=/usr/sbin/phc2sys -s eth1 -c CLOCK_REALTIME -O 0  -w
Restart=always
RestartSec=1

[Install]
WantedBy=multi-user.target
```

### 查看本机角色
```shell
pmc -u -b 0 "GET PORT_DATA_SET"
```

### 查看ptp同步是否成功
```shell
pmc -u -b 0 "GET  CURRENT_DATA_SET"
```
- slave是同步master时间的， 所以只需要在slave端查
- stepsRemoved: 表示当前时钟和主时钟之间的跳数
- offsetFromMaster 15.0 表示与主时钟的时钟偏差为15ns
- meanPathDelay    40.0 表示与主时钟间的链路网络延时为40ns
- 当offsetFromMaster的值较小就说明该同步可以使用