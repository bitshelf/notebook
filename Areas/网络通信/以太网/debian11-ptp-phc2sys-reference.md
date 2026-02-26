---
tags:
  - PTP
---
# RK3576 Debian 11 PTP/phc2sys 配置参考


- Debian 没有使用默认的 `/etc/linuxptp/ptp4l.conf`、`/etc/default/ptp4l`、`/etc/default/phc2sys`。
- 实际生效的是自定义 systemd 服务：`ptp4l-eth1.service` 和 `phc2sys-eth1.service`。
- `ptp4l-eth1.service` 是开机启用并常驻运行的服务。
- `phc2sys-eth1.service` 服务文件存在，但默认是 `disabled`，采集时也是 `inactive`；业务切到 PTP 模式时再启动它。
- PTP 模式下业务逻辑是：等待 `ptp4l` 的 `pmc` 管理接口可用，应用主从角色，启动 `phc2sys`，关闭 `chrony`。
- `phc2sys` 的作用是把系统时钟 `CLOCK_REALTIME` 对齐到网口 PHC；设备间 PTP/PHC 同步首先要靠 `ptp4l` 成功锁定。

## 1. 194 设备采集摘要

采集对象：

| 项目 | 194 设备值 |
| --- | --- |
| 系统 | Debian GNU/Linux 11 bullseye |
| 内核 | Linux 5.10.198 aarch64 |
| PTP 网口 | `eth1` |
| IP | `192.168.17.194/24` |
| PHC 设备 | `/dev/ptp0` |
| PHC 名称 | `Microchip clock` |
| PHC sysfs | `/sys/devices/platform/feac0000.i2c/i2c-4/4-005f/ptp/ptp0` |
| `ptp4l` socket | `/var/run/ptp4l` |
| `ptp4l` 二进制 | `/usr/sbin/ptp4l` |
| `phc2sys` 二进制 | `/usr/sbin/phc2sys` |
| `pmc` 二进制 | `/usr/sbin/pmc` |

采集时的服务状态：

| 服务 | 是否启用 | 运行状态 | 说明 |
| --- | --- | --- | --- |
| `ptp4l-eth1.service` | `enabled` | `active/running` | 上一代默认常驻 |
| `phc2sys-eth1.service` | `disabled` | `inactive/dead` | 文件存在，PTP 模式按需启动 |
| `chrony.service` | `enabled` | `inactive/dead` | GPS/NTP 侧使用，PTP 模式应关闭 |
| `ptp4l.service` | 不存在 | inactive | 未使用发行版默认服务名 |
| `phc2sys.service` | 不存在 | inactive | 未使用发行版默认服务名 |
| `linuxptp.service` | 不存在 | inactive | 未使用发行版默认服务名 |

采集时 `ptp4l` 进程为：

```text
/bin/bash /ptp/e2e/linuxptp.sh
ptp4l -p /dev/ptp0 -i eth1 -f default.cfg -l 4
```

194 上 `pmc` 查询到的当时状态示例：

```text
PORT_DATA_SET:
  portState               SLAVE
  logAnnounceInterval     1
  announceReceiptTimeout  3
  logSyncInterval         0
  delayMechanism          1

CURRENT_DATA_SET:
  stepsRemoved     1
  offsetFromMaster 31.0
  meanPathDelay    6609.0

TIME_STATUS_NP:
  master_offset 31
  gmPresent     true
```

这个快照说明 194 当时 `ptp4l` 已经作为从设备进入 `SLAVE`，并且 `offsetFromMaster`、`master_offset` 都在几十 ns 量级。它只能证明采集时刻状态正常，不等价于长期稳定性报告。

## 2. 实际文件布局

194 上与 `ptp4l`/`phc2sys` 相关的生效文件：

| 路径 | 用途 |
| --- | --- |
| `/etc/systemd/system/ptp4l-eth1.service` | `ptp4l` 主服务 |
| `/etc/systemd/system/ptp4l-eth1.service.d/10-reapply-baseline.conf` | `ptp4l` 启动后重新应用 IRQ baseline |
| `/etc/systemd/system/ptp4l-eth1.service.d/cpu-affinity.conf` | 限制服务 CPU 亲和性 |
| `/etc/systemd/system/phc2sys-eth1.service` | `phc2sys` 服务 |
| `/etc/systemd/system/phc2sys-eth1.service.d/10-reapply-baseline.conf` | `phc2sys` 启动后重新应用 IRQ baseline |
| `/etc/systemd/system/phc2sys-eth1.service.d/cpu-affinity.conf` | 限制服务 CPU 亲和性 |
| `/ptp/e2e/linuxptp.sh` | `ptp4l` 启动脚本 |
| `/ptp/e2e/default.cfg` | 当前 `ptp4l` 使用的 E2E 配置 |
| `/usr/local/sbin/sonodaq-apply-baseline.sh` | IRQ/CPU baseline 脚本 |

194 上也存在其它 PTP profile，但采集时未被 systemd 主链路引用：

```text
/ptp/avb/gPTP.cfg
/ptp/avb/gPTP_auto.cfg
/ptp/avb/gPTP_auto_def.cfg
/ptp/avb/linuxptp.sh
/ptp/avb/phc.sh
/ptp/e2e/tc/default.cfg
/ptp/e2e/tc/linuxptp.sh
/ptp/p2p/default.cfg
/ptp/p2p/linuxptp.sh
/ptp/p2p/tc/default.cfg
/ptp/p2p/tc/linuxptp.sh
/ptp/phc.sh
/ptp/power/default.cfg
/ptp/power/linuxptp.sh
```

RK3576 迁移如果目标是复刻 194 当前运行方式，应优先复刻 `/ptp/e2e/default.cfg`、`/ptp/e2e/linuxptp.sh` 和两个 systemd 服务，不要先照 inactive profile 配。

## 3. `ptp4l-eth1.service`

194 上的完整服务文件：

```ini
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

Drop-in：`/etc/systemd/system/ptp4l-eth1.service.d/10-reapply-baseline.conf`

```ini
[Service]
ExecStartPost=/bin/sh -c 'sleep 1; /usr/local/sbin/sonodaq-apply-baseline.sh || true'
```

Drop-in：`/etc/systemd/system/ptp4l-eth1.service.d/cpu-affinity.conf`

```ini
[Service]
CPUAffinity=0 1 2 3
```

要点：

- `ptp4l` 服务以 `/ptp/e2e/` 作为工作目录，因此 `-f default.cfg` 实际读取的是 `/ptp/e2e/default.cfg`。
- `ExecStartPre=/bin/sleep 5` 用于等待网络和设备节点稳定。
- `Restart=always`，异常退出后 5 秒重启。
- `CPUAffinity=0 1 2 3` 是 194 的 CPU 布局策略，RK3576 是否照搬要看核数、IRQ 分布和实时负载。

## 4. `phc2sys-eth1.service`

194 上的完整服务文件：

```ini
[Unit]
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

Drop-in：`/etc/systemd/system/phc2sys-eth1.service.d/10-reapply-baseline.conf`

```ini
[Service]
ExecStartPost=-/usr/local/sbin/sonodaq-apply-baseline.sh
```

Drop-in：`/etc/systemd/system/phc2sys-eth1.service.d/cpu-affinity.conf`

```ini
[Service]
CPUAffinity=0 1 2 3
```

命令含义：

```text
/usr/sbin/phc2sys -s eth1 -c CLOCK_REALTIME -O 0 -w
```

- `-s eth1`：使用 `eth1` 对应的 PHC 作为源时钟。
- `-c CLOCK_REALTIME`：把系统时钟作为目标时钟。
- `-O 0`：源和目标之间使用 0 秒 offset。
- `-w`：等待 `ptp4l` 进入可用同步状态后再开始。

注意：194 上该服务文件存在，但默认没有 enable，采集时也没有运行。上一代不是让 `phc2sys` 开机常驻，而是在 PTP 模式流程里按需 `systemctl start phc2sys-eth1.service`。


## 5. `/ptp/e2e/linuxptp.sh`

194 上完整脚本如下：

```bash
#!/bin/bash

# This script invokes Linux PTP to run in E2E mode.

PORT0=eth1
VERBOSE="-l 4"

if [ "$1" = "-v" ]; then
    VERBOSE="-m"
    shift
fi
if [ ! -z "$1" ]; then
    PORT0=$1
fi
if [ ! -e "/sys/class/net/$PORT0" ]; then
    echo "$PORT0 not existed"
    exit 1
fi

ptp4l -p /dev/ptp0 -i $PORT0 -f default.cfg $VERBOSE
```

迁移注意：

- 194 写法里 `ptp4l` 没有写绝对路径，依赖 systemd/root 环境能找到 `/usr/sbin/ptp4l`。
- 采集时普通 `linaro` 用户的 `PATH` 找不到 `ptp4l`、`phc2sys`、`pmc`，但 `/usr/sbin` 下文件存在。
- RK3576 上建议确认 systemd 环境是否包含 `/usr/sbin`；不确定时可以把脚本最后一行改成 `/usr/sbin/ptp4l ...`。

## 6. `/ptp/e2e/default.cfg`

194 上当前 `ptp4l` 生效的 E2E 配置：

```ini
[global]
#
# Default Data Set
#
twoStepFlag		0
slaveOnly		0
priority1		128
priority2		128
domainNumber		0
#utc_offset		37
clockClass		248
clockAccuracy		0x21
offsetScaledLogVariance	0x436A
free_running		0
freq_est_interval	1
dscp_event		0
dscp_general		0
#
# Port Data Set
#
logAnnounceInterval	1
logSyncInterval		0
logMinDelayReqInterval	0
logMinPdelayReqInterval	0
announceReceiptTimeout	3
syncReceiptTimeout	0
delayAsymmetry		0
fault_reset_interval	4
neighborPropDelayThresh	20000000
#
# Run time options
#
assume_two_step		0
logging_level		6
path_trace_enabled	0
follow_up_info		0
hybrid_e2e		0
tx_timestamp_timeout	1
use_syslog		1
verbose			0
summary_interval	0
kernel_leap		1
check_fup_sync		0
#
# Servo Options
#
pi_proportional_const	0.5
pi_integral_const	0.1
pi_proportional_scale	0.0
pi_proportional_exponent	-0.3
pi_proportional_norm_max	0.7
pi_integral_scale	0.0
pi_integral_exponent	0.4
pi_integral_norm_max	0.3
step_threshold		0.0000008
first_step_threshold	0.0000005
max_frequency		900000000
clock_servo		pi
sanity_freq_limit	200000000
ntpshm_segment		0
#
# Transport options
#
transportSpecific	0x0
ptp_dst_mac		01:1B:19:00:00:00
p2p_dst_mac		01:80:C2:00:00:0E
udp_ttl			1
udp6_scope		0x0E
uds_address		/var/run/ptp4l
#
# Default interface options
#
network_transport	UDPv4
delay_mechanism		E2E
time_stamping		hardware
tsproc_mode		filter
delay_filter		moving_median
delay_filter_length	10
egressLatency		0
ingressLatency		0
boundary_clock_jbod	0
#
# Clock description
#
productDescription	Microchip KSZ9897;;
revisionData		1.0.0;1.0.0;1.0.0
manufacturerIdentity	00:10:A1
userDescription		Microchip KSZ 1588 PTP Clock;
timeSource		0xA0
```

关键项：

- `network_transport UDPv4`：走 UDPv4 PTP。
- `delay_mechanism E2E`：端到端 delay 机制。
- `time_stamping hardware`：必须是硬件时间戳。若 RK3576 侧退化成软件时间戳，20 ns/40 ns 目标基本不可达。
- `twoStepFlag 0`：一阶段时间戳。
- `slaveOnly 0`：允许 BMCA 选主；主从由优先级和业务逻辑控制。
- `priority1 128`、`priority2 128`：默认偏从设备取值。
- `step_threshold 0.0000008`、`first_step_threshold 0.0000005`：servo 阈值很小，目标是 ns 级收敛。

## 7. 业务侧如何控制 PTP/GPS/默认模式

上一代软件层不是单纯依赖 systemd enable 状态判断模式，而是组合控制服务：

| 模式 | `ptp4l-eth1` | `phc2sys-eth1` | `chrony` |
| --- | --- | --- | --- |
| PTP 模式 | 常驻运行 | 启动 | 停止 |
| GPS 模式 | 常驻运行 | 停止 | 启动 |
| 默认模式 | 常驻运行 | 停止 | 停止 |

业务代码中的核心逻辑：

```cpp
// PTP 模式
// 1. 等待 /var/run/ptp4l 的 pmc 管理查询可用
// 2. 应用缓存的 PTP 主从角色
// 3. systemctl start phc2sys-eth1.service
// 4. systemctl stop chrony.service
```

PTP 主从角色通过 `pmc` 修改 `ptp4l` priority：

| 角色 | `PRIORITY1` | `PRIORITY2` |
| --- | --- | --- |
| MASTER | `120` | `128` |
| SLAVE | `128` | `128` |

对应命令形式：

```bash
pmc -u -b 0 -s /var/run/ptp4l "SET PRIORITY1 120"
pmc -u -b 0 -s /var/run/ptp4l "SET PRIORITY2 128"

pmc -u -b 0 -s /var/run/ptp4l "SET PRIORITY1 128"
pmc -u -b 0 -s /var/run/ptp4l "SET PRIORITY2 128"
```

同步判定时，上一代软件会同时看两个值：

- `CURRENT_DATA_SET.offsetFromMaster`
- `TIME_STATUS_NP.master_offset`

两个绝对值都满足阈值时才认为 PTP 同步完成。

## 8. RK3576 Debian 11 复刻建议

以下步骤按 194 当前运行方式整理。执行前先把网口名、PHC 设备和 CPU/IRQ 策略替换成 RK3576 实际值。

### 8.1 前置确认

先确认 RK3576 系统具备这些条件：

```bash
ip link show eth1
ls -l /dev/ptp0
cat /sys/class/ptp/ptp0/clock_name
cat /sys/class/ptp/ptp0/pps_available
ethtool -T eth1
ls -l /usr/sbin/ptp4l /usr/sbin/phc2sys /usr/sbin/pmc
```

必须重点确认：

- 网口名是否真的是 `eth1`。
- `eth1` 是否映射到要使用的 PHC。
- 是否支持 `hardware-transmit`、`hardware-receive`、`hardware-raw-clock`。
- `/dev/ptp0` 是否是交换机/时钟芯片对应的 PHC，而不是 SoC 另一个 MAC 的 PHC。
- `ptp4l`、`phc2sys`、`pmc` 是否在 `/usr/sbin`，或者 systemd 是否能找到它们。

### 8.2 创建目录和脚本

```bash
sudo mkdir -p /ptp/e2e
sudo install -m 0755 linuxptp.sh /ptp/e2e/linuxptp.sh
sudo install -m 0644 default.cfg /ptp/e2e/default.cfg
```

如果保持 194 写法，`linuxptp.sh` 中默认：

```bash
PORT0=eth1
ptp4l -p /dev/ptp0 -i $PORT0 -f default.cfg $VERBOSE
```

RK3576 如使用其它网口或 PHC，要对应改成：

```bash
PORT0=<rk3576_ptp_iface>
/usr/sbin/ptp4l -p /dev/<rk3576_ptp_device> -i $PORT0 -f default.cfg $VERBOSE
```

### 8.3 创建 systemd 服务

创建：

```text
/etc/systemd/system/ptp4l-eth1.service
/etc/systemd/system/phc2sys-eth1.service
```

内容按本文第 3、4 节复刻。然后创建 drop-in：

```bash
sudo mkdir -p /etc/systemd/system/ptp4l-eth1.service.d
sudo mkdir -p /etc/systemd/system/phc2sys-eth1.service.d
```

如果 RK3576 CPU/IRQ 策略还没确认，可以先不加 `CPUAffinity=0 1 2 3`，等锁定 PTP 后再做实时性优化。不要盲目照搬 194 的 `4 5 7` IRQ CPU 分配。

### 8.4 启动策略

推荐按上一代策略：

```bash
sudo systemctl daemon-reload
sudo systemctl enable ptp4l-eth1.service
sudo systemctl start ptp4l-eth1.service

# phc2sys 默认先不 enable，由业务/PTP模式按需启动
sudo systemctl disable phc2sys-eth1.service
```

切到 PTP 模式时：

```bash
sudo systemctl start phc2sys-eth1.service
sudo systemctl stop chrony.service
```

切到 GPS 模式时：

```bash
sudo systemctl stop phc2sys-eth1.service
sudo systemctl start chrony.service
```

默认模式：

```bash
sudo systemctl stop phc2sys-eth1.service
sudo systemctl stop chrony.service
```

## 9. 验证命令

服务状态：

```bash
systemctl is-enabled ptp4l-eth1.service
systemctl is-active ptp4l-eth1.service
systemctl status ptp4l-eth1.service --no-pager -l

systemctl is-enabled phc2sys-eth1.service
systemctl is-active phc2sys-eth1.service
systemctl status phc2sys-eth1.service --no-pager -l
```

进程命令行：

```bash
ps -eo pid,ppid,user,stat,psr,comm,args | grep -E 'ptp4l|phc2sys|linuxptp' | grep -v grep
```

PTP 管理状态：

```bash
/usr/sbin/pmc -u -b 0 -s /var/run/ptp4l "GET DEFAULT_DATA_SET"
/usr/sbin/pmc -u -b 0 -s /var/run/ptp4l "GET PORT_DATA_SET"
/usr/sbin/pmc -u -b 0 -s /var/run/ptp4l "GET CURRENT_DATA_SET"
/usr/sbin/pmc -u -b 0 -s /var/run/ptp4l "GET TIME_STATUS_NP"
```

从设备期望看到：

```text
PORT_DATA_SET:
  portState SLAVE

TIME_STATUS_NP:
  gmPresent true

CURRENT_DATA_SET:
  offsetFromMaster 接近目标阈值
```

如果 `ptp4l` 尚未锁定，不要先看 `phc2sys` 或 1PPS 结果。应先解决 `pmc` 查询、`portState`、`gmPresent`、`offsetFromMaster`。

## 10. 对当前 1PPS 偏差问题的判断建议

当前现象是两块板卡 1PPS 都能输出，但相差约 570 ms，远大于 20 ns；同时从机 PTP 状态异常，ZL30631 时钟模式不能锁定。

按上一代链路看，排查顺序建议是：

1. 先确认 `ptp4l` 是否在从设备上进入 `SLAVE`，且 `gmPresent=true`。
2. 再看 `CURRENT_DATA_SET.offsetFromMaster` 和 `TIME_STATUS_NP.master_offset` 是否进入 40 ns 范围。
3. `ptp4l` 没有成功同步前，`phc2sys` 无法从根上修正设备间 PHC/PTP 问题。
4. `phc2sys` 成功后只能说明系统时钟跟随 PHC，不等价于 ZL30631 已锁定。
5. ZL30631 的 REF 输入、DPLL 模式、1PPS 输出路径还需要单独确认。PTP 软件层稳定后，再看芯片 lock status 和输出相位。

对他们可以直接说明：

```text
上一代产品里 ptp4l 是开机常驻的 ptp4l-eth1.service，使用 /ptp/e2e/default.cfg，
命令是 ptp4l -p /dev/ptp0 -i eth1 -f default.cfg -l 4。

phc2sys 服务文件也有，命令是 /usr/sbin/phc2sys -s eth1 -c CLOCK_REALTIME -O 0 -w，
但默认 disabled，不是开机一直运行；业务切到 PTP 模式时才 start phc2sys，并 stop chrony。

所以现在 1PPS 相差 570ms，建议先把 ptp4l 的 pmc 状态调到 SLAVE/gmPresent=true，
offsetFromMaster 和 master_offset 进入 40ns 内，再看 phc2sys 和 ZL30631 lock。
```

## 11. 原始证据

本次采集为只读操作，没有在 194 上写文件、重启服务或修改配置。

原始采集文件：

```text
.execution-guardian/ptp-config-194-rk3576-debian11-20260526/artifacts/ptp-config-194-20260526-161834/raw.txt
```

采集脚本：

```text
.execution-guardian/ptp-config-194-rk3576-debian11-20260526/tools/collect_194_ptp_config.sh
```
