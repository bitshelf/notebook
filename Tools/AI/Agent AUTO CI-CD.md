---
tags:
  - Agent/embedded
---

# RK 平台 CI/CD 自动化测试与 AI 持续开发方案
## 需求
1. 覆盖 Android，Debian，buildroot，yocto 多系统
2. 内核的崩溃
3. 偶现 bug，如卡死，can，UART，EMMC 大数据读写的偶现异常问题
4. agent 并行工作，加快速度，提升专业性
5. 对于复杂问题使用 Hermes Engineering  的方法进行验证
6. 设备列表有统一的模版
7. 使用 openeuler，federa，archlinux，tencentos，Debian，ubuntu 的测试方案，保证固件的稳定性
8. 测试需要 rust 编写，且使用静态链接的方式

## 使用到工具
### 硬件设备
1. USB 继电器
### 软件工具
1. `upgrade_tool` ARM64 Linux 版本
2. `tio`
## 外设性能及老化测试
- can，以太网，WiFi，USB，sd 卡，M2.0
- LAVA 做设备系统与外设的全功能测试，opencode 根据测试结果再做修改，LAVA 继续测试以此反复，直到优化收敛，各功能稳定
## 解决 AI 幻觉
1. 优先从 stackoverflow, linaro，bootlin，nxp，ti，Google，intel，Linux maintainer，archlinux，fedora，openeuler 社区获取解决办法
2. Android，yocto 有着成熟完善的测试代码和方法
	1. VTS (内核/HAL)、CTS (Camera/Graphics/Media)、ITS (成像质量)
	2. ptest (运行时包测试)、oe-selftest (构建验证)、meta-lava
3. 使用工业测试程序对 can，UART，USB 的严苛测试
4. 使用 kernelci，LAVA，lkp-tests 的方案进行测试

### 难点
1. 摄像头的测试，流畅度，
2. 视频播放测试
3. QT 桌面应用的的性能监控
4. PDF 中的图片信息获取
5. DDR，GPU 等资料获取不到


---

# 总体架构

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CI/CD 控制层 (Ubuntu Server)                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ GitLab/Gitea │  │ LAVA Master  │  │ KernelCI API │  │ lkp-tests │ │
│  │  (代码仓库)  │  │ (任务调度)   │  │ (构建管道)   │  │ (性能回归) │ │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  └─────┬─────┘ │
│         │                │                  │                │       │
│         └────────────────┴──────────────────┴────────────────┘       │
│                                   │                                   │
│                    Docker Compose 统一编排                            │
└───────────────────────────────────┬──────────────────────────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
     ┌────────▼────────┐   ┌───────▼───────┐   ┌────────▼────────┐
     │ LAVA Worker #1  │   │ LAVA Worker #2│   │ 开发主机群       │
     │ (RK3576 宿主机) │   │ (x86 工控机) │   │ (RK3576 × N)    │
     │                  │   │               │   │                  │
     │ ser2net +       │   │ ser2net +    │   │ OpenCode/Claude  │
     │ USB Relay +     │   │ USB Relay +  │   │ Code + Git 工作区│
     │ SD MUX          │   │ SD MUX       │   │                  │
     └────────┬────────┘   └───────┬───────┘   └────────┬────────┘
              │                    │                     │
    ┌─────────┼────────┐  ┌───────┼───────┐    ┌───────┼───────┐
    │ USB Relay│SD MUX │  │ USB R. │SD MUX │    │USB烧录 │串口读取│
    └────┬─────┴───┬───┘  └───┬───┴───┬───┘    └───┬───┴───┬───┘
         │         │          │       │            │       │
    ┌────▼─────────▼────┐ ┌───▼───────▼───┐   ┌───▼───────▼───┐
    │  DUT 机架 #1      │ │ DUT 机架 #2   │   │ DUT (被测设备) │
    │  RK3576 × 4       │ │ RK3588 × 4    │   │ 开发主机本身   │
    │  Allwinner × 4    │ │ 专用外设测试  │   │ 也可作DUT     │
    └───────────────────┘ └───────────────┘   └───────────────┘
```

### 核心设计原则

| 原则             | 说明                                                                   |
| -------------- | -------------------------------------------------------------------- |
| **分布式 Worker** | LAVA Worker 可按芯片平台或外设类型分组，互不干扰                                       |
| **测试即代码**      | LAVA job definitions、测试脚本、设备配置全部 Git 管理                              |
| **AI 闭环**      | OpenCode/Claude Code → 生成 patch → LAVA 测试 → 结果反馈 → AI 修正 → 再次测试，直至收敛 |

---

## 三、软件栈部署方案

### 3.1 LAVA 架构部署

参考 [LAVA 官方文档](https://lava.readthedocs.io/) 、[Bootlin 实践](https://bootlin.com/blog/tag/testing/) 和 [Collabora Board Farm](https://www.collabora.com/news-and-blog/blog/2024/06/27/building-a-board-farm-for-embedded-world/)。

#### 3.1.1 组件

```
┌───────────────────────────────────────────────────────┐
│                 LAVA Master (Ubuntu Server)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ lava-server  │  │ PostgreSQL   │  │ Nginx/Apache │ │
│  │ (Django WSGI)│  │ (任务/结果)  │  │ (Web UI/API) │ │
│  └──────┬───────┘  └──────────────┘  └──────────────┘ │
│         │                                               │
│  ┌──────┴────────────────────────────────────────┐    │
│  │         lava-server-gunicorn                   │    │
│  │  - XML-RPC API (job 提交)                      │    │
│  │  - ZMQ 事件总线 (与 Worker 通信)               │    │
│  │  - lava-master (调度器)                        │    │
│  └───────────────────────────────────────────────┘    │
└───────────────────────┬───────────────────────────────┘
                        │ ZMQ + HTTP
      ┌─────────────────┼─────────────────┐
      │                 │                 │
┌─────▼─────┐    ┌──────▼──────┐    ┌─────▼─────┐
│ Worker #1 │    │  Worker #2  │    │ Worker #N │
│ (x86)     │    │  (RK3576)   │    │ (RK3576)  │
│           │    │             │    │           │
│ ser2net   │    │ ser2net     │    │ ser2net   │
│ YKUSH ctl │    │ YKUSH ctl   │    │ YKUSH ctl │
│ SDWire ctl│    │ SDWire ctl  │    │ SDWire ctl│
│ Docker    │    │ Docker      │    │ Docker    │
└─────┬─────┘    └──────┬──────┘    └─────┬─────┘
      │                 │                 │
   ┌──┴──────────┐  ┌───┴────────┐  ┌───┴────────┐
   │ DUT × 8     │  │ DUT × 4    │  │ DUT × 4    │
   │ (RK3588 +   │  │ (RK3576)   │  │ (Allwinner) │
   │  Allwinner)  │  │            │  │            │
   └─────────────┘  └────────────┘  └────────────┘
```


### 3.2 KernelCI 集成

KernelCI 负责**构建**环节：拉取内核源码 → 交叉编译 → 生成 kernel Image + DTBs + modules → 触发 LAVA 测试。

参考 [KernelCI 新架构](https://github.com/kernelci/kernelci-project) 和 [TuxMake/TuxRun](https://www.linaro.org/blog/linaro-transfers-kernel-building-and-testing-tools-to-the-kernelci-project)。

```yaml
# kernelci-pipeline.yaml
pipeline:
  checkout:
    repo: https://github.com/torvalds/linux.git
    branch: master
    
  build:
    tool: tuxmake
    targets:
      - arch: arm64
        defconfig: defconfig
        fragments:
          - rockchip.config
          - allwinner.config
        toolchain: gcc-13
    
  test:
    tool: tuxrun
    lava:
      server: http://lava-master:8080
      device_types:
        - rk3576-evk
        - rk3588-rock5b
        - allwinner-t527
      test_plans:
        - boot
        - baseline
        - peripherals
        - performance
```

### 3.3 lkp-tests 集成（Intel 0day 方案）

[lkp-tests](https://github.com/intel/lkp-tests) 用于**性能回归测试**。Intel 的 0day 基础设施使用它将每个内核 patch 做性能对比。

```
lkp-tests 工作流:
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌──────────┐
│ 内核    │───▶│ lkp      │───▶│ 部署到    │───▶│ 运行     │
│ commit  │    │ install  │    │ DUT       │    │ benchmark│
└─────────┘    └──────────┘    └───────────┘    └──────────┘
                                                    │
                     ┌──────────────────────────────┘
                     ▼
              ┌──────────┐    ┌───────────┐
              │ lkp      │───▶│ JSON 报告 │
              │ collect  │    │ + 性能回归│
              └──────────┘    │ 检测告警  │
                              └───────────┘
```

RK/Allwinner 平台适配：
- lkp-tests 支持 ARM64，需配置 cross-compile 环境和 deploy 方式
- 使用 `lkp install` 安装测试依赖到目标 rootfs
- 关键 benchmark：`hackbench`、`cyclictest`、`iperf3`、`fio`、`lmbench`

### 3.4 labgrid（备选方案）

[labgrid](https://github.com/labgrid-project/labgrid) 是 Pengutronix 开发的嵌入式系统控制库，可替代 LAVA 做底层硬件控制，也可与 LAVA 配合使用。其优势：
- Python 库形式，易于集成到自定义测试框架
- 内置 USB Relay、SD MUX、串口控制驱动
- 支持 pytest 集成

```
labgrid 角色分配:
- Coordinator: 管理所有 resources (串口、电源、USB)
- Client: 从 Coordinator 获取 resource，执行测试
- 可选: 作为 LAVA 的硬件抽象层，简化 device dictionary 配置
```

---

## 四、AI 驱动代码修改与测试闭环

这是本方案的核心创新点：OpenCode/Claude Code 根据 LAVA 测试结果自动修改内核/驱动代码，形成迭代优化闭环。

### 4.1 整体流程

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI 驱动迭代优化闭环                          │
│                                                                  │
│  ① 问题输入                                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ - LAVA 测试失败日志                                       │   │
│  │ - lkp-tests 性能回归报告                                  │   │
│  │ - kernelci 构建失败日志                                   │   │
│  │ - 用户提出的功能需求                                      │   │
│  └──────────────────────┬───────────────────────────────────┘   │
│                         ▼                                        │
│  ② AI 分析与代码修改 (OpenCode / Claude Code)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 规则约束:                                                 │   │
│  │ ✓ 优先从 upstream (torvalds/linux, linux-next,            │   │
│  │   linux-stable, maintainer trees) 做 backport             │   │
│  │ ✓ 参考 Linaro, Bootlin, Collabora, LWN.net 的            │   │
│  │   相关讨论和 patch                                       │   │
│  │ ✓ 遵循 Linux 内核编码规范 (checkpatch.pl)                │   │
│  │ ✓ 生成 commit message 遵循内核规范                       │   │
│  │ ✓ 每个 patch 做 KUnit / selftest 自检                    │   │
│  └──────────────────────┬───────────────────────────────────┘   │
│                         ▼                                        │
│  ③ 构建验证                                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ tuxmake → 交叉编译验证 → 静态分析 (smatch/sparse)        │   │
│  │ → checkpatch → DTC 编译检查                              │   │
│  └──────────────────────┬───────────────────────────────────┘   │
│                         ▼                                        │
│  ④ LAVA 硬件测试                                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 全功能测试矩阵 → 性能回归测试 → 长时间老化测试           │   │
│  └──────────────────────┬───────────────────────────────────┘   │
│                         ▼                                        │
│  ⑤ 结果分析与收敛判断                                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ ✓ 通过 → 标记 patch ready → 准备提交 upstream            │   │
│  │ ✗ 失败 → 回到 ①，AI 根据失败日志重新分析修改            │   │
│  │ △ 性能退化 → AI 分析退化原因 → 优化或回退               │   │
│  │ 最大迭代次数: 5 轮，超限人工介入                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 五、全功能外设测试矩阵

### 5.1 测试分类

```
┌──────────────────────────────────────────────────────────────┐
│                    测试金字塔 (嵌入式 CI)                     │
│                                                               │
│                    ┌─────────────┐                            │
│                    │  老化测试   │  72h+ 持续运行             │
│                    │  (Aging)   │                             │
│                   ┌┴─────────────┴┐                           │
│                   │  性能测试     │  lkp-tests 基准           │
│                   │ (Performance) │  iperf3/fio/cyclictest   │
│                  ┌┴───────────────┴┐                          │
│                  │  外设功能测试   │  CAN/Ethernet/WiFi/     │
│                  │  (Peripheral)  │  USB/SD/M.2/PCIe/GPIO   │
│                 ┌┴─────────────────┴┐                         │
│                 │  内核子系统测试   │  LTP syscalls/fs/net   │
│                 │  (Subsystem)     │  mem/vm/sched           │
│                ┌┴───────────────────┴┐                        │
│                │  Boot + smoke test │ 启动 + 基本功能        │
│                │  (每次提交)        │                        │
│                └────────────────────┘                        │
└──────────────────────────────────────────────────────────────┘
```

### 5.3 完整外设测试矩阵

| 外设 | 功能测试 | 压力测试 | 性能基准 | LAVA MultiNode |
|------|----------|----------|----------|----------------|
| **CAN** | 内部回环 + 外部回环 | cangen 持续发送 5min，0 bit error | 各波特率延迟 (cansend+timestamp) | ✗ |
| **Ethernet** | link detect, PHY 寄存器 | iperf3 30min, ping flood | iperf3 TCP/UDP 吞吐量 | ✓ (DUT+Ref PC) |
| **WiFi** | scan + connect + WPA2/3 | iperf3 持续, 反复连接/断开 | 吞吐量 (2.4G/5G), 信号强度 | ✓ |
| **USB Host** | 设备枚举, 读写 | 热插拔 × 50, dd 压力 | dd 读写速度 | ✗ |
| **USB Device** | gadget (mass_storage, CDC/NCM) | 大文件传输 | 传输速率 | ✓ |
| **SD/eMMC** | 检测 + 容量识别 | fio randrw 4k 30min | hdparm -t + fio 4k rand IOPS | ✗ |
| **M.2 NVMe** | PCIe link 检测 | fio 全盘顺序 + 随机读写 | PCIe 2.1 带宽 | ✗ |
| **GPIO** | 输出翻转, 输入读取 | libgpiod toggle 1M 次 | 翻转频率 | ✗ |
| **I2C** | 设备扫描, 寄存器读写 | 循环读写 1000 次 | I2C 时钟实际频率 | ✗ |
| **SPI** | loopback 测试 | 全速 DMA 传输 10min | 实际 SPI 时钟速率 | ✗ |
| **UART** | 基本收发 | 高速 4Mbps 收发 100KB | 实际波特率误码率 | ✗ |
| **Audio (I2S)** | aplay/arecord | 24h 持续录音播放 | 延迟 (jack_iodelay) | ✗ |
| **Video (MIPI/HDMI)** | modetest, 显示输出 | 4K 视频解码 loop | framerate 检测 | ✗ |
| **GPU (Mali)** | Vulkan vkmark, glmark2 | stress 渲染 1h | vkmark benchmark | ✗ |
| **NPU (RK3576)** | RKNN sample models | 持续推理 1h | TOPS/inference time | ✗ |

---

## 十、关键参考资料

| 来源 | 链接 | 参考内容 |
|------|------|----------|
| KernelCI 新架构 | https://github.com/kernelci/kernelci-project | Pipeline + LAVA 集成 |
| Bootlin 测试实践 | https://bootlin.com/blog/tag/testing/ | ctt.py + MultiNode + 每日回归 |
| Collabora Board Farm | https://www.collabora.com/news-and-blog/blog/2024/06/27/building-a-board-farm-for-embedded-world/ | Boardswarm + YKUSH + SDWire 硬件方案 |
| Boardswarm | https://github.com/boardswarm/boardswarm | 分布式板卡管理 |
| LAVA 文档 | https://lava.readthedocs.io/ | Device setup, ser2net, MultiNode |
| lkp-tests (Intel) | https://github.com/intel/lkp-tests | 内核性能回归测试 |
| labgrid | https://github.com/labgrid-project/labgrid | 硬件控制库 |
| DRM-CI (Collabora) | https://lwn.net/Articles/961655/ | GitLab CI for kernel |
| LWN: kernel CI | https://lwn.net/Articles/972713/ | 内核 CI 社区讨论 |
| TuxMake/TuxRun | https://www.linaro.org/blog/linaro-transfers-kernel-building-and-testing-tools-to-the-kernelci-project | 统一构建工具 |
| OpenCode Rules | https://opencode.ai/docs/rules/ | Agent 规则配置 |
| Claude Code Skills | https://docs.anthropic.com/en/docs/claude-code | Skill 定义格式 |
| chezmoi | https://chezmoi.io | dotfiles 管理 |
| openEuler mugen | https://atomgit.com/openeuler/mugen | 发行版通用测试框架 |
| Debian autopkgtest/ci.d.n | https://ci.debian.net | archive-wide 自动化测试 |
| Ubuntu autopkgtest | https://autopkgtest.ubuntu.com | 云原生包测试基础设施 |
| Fedora CI/Bodhi | https://docs.fedoraproject.org/en-US/ci/ | 发行版 CI/CD 管道 |
| 发行版测试体系详解 | 参见 二十六节 | 六大发行版稳定性实践 |

---

### 11.2 Android 测试体系利用方案

Android 拥有业界最成熟的嵌入式测试基础设施，**必须充分复用**：

#### CTS (Compatibility Test Suite) — 兼容性验证

```bash
# Android CTS 运行（在开发主机上）
cd android-cts/
./tools/cts-tradefed

# 针对 RK3576 运行特定模块
run cts -m CtsCameraTestCases          # Camera HAL
run cts -m CtsHardwareTestCases        # 硬件抽象层（CAN/USB/传感器）
run cts -m CtsGraphicsTestCases        # GPU 渲染
run cts -m CtsMediaTestCases           # 视频编解码
run cts -m CtsNetTestCases             # 网络/WiFi
run cts -m CtsAppSecurityHostTestCases # 权限/安全
```

#### VTS (Vendor Test Suite) — 内核/HAL 层验证

VTS 直接测试内核驱动和 HAL 实现，与 LAVA 互补：

```bash
# VTS 内核测试 (基于 LTP)
run vts-kernel -m VtsKernelLtp

# VTS 外设 HAL 测试
run vts -m VtsHalCanBusV1_0Target     # CAN HAL
run vts -m VtsHalUsbV1_2Target        # USB HAL
run vts -m VtsHalWifiV1_0Target       # WiFi HAL
run vts -m VtsHalGraphicsMapperV4_0Target  # 图形 HAL

# LAVA 集成：在 LAVA test definition 中调用 VTS
# tests/android/vts-test.sh
adb wait-for-device
vts-tradefed run commandAndExit vts-kernel \
    --module VtsKernelLtp \
    --test-filter "*mem*" \
    --log-file /tmp/vts_kernel.log
```

#### Camera ITS (Image Test Suite) — 摄像头成像质量

Android CTS 中的 ITS 是摄像头测试的黄金标准：

```bash
# Camera ITS 测试
# 需要: 标准测试图表 + 受控照明
python tools/run_all_tests.py \
    camera=0 \
    scenes=0,1,2,3,4,5,6 \
    chart=2  # scene2 需要图表

# 测试项包括:
# scene0: 基本采集、JPEG 编码
# scene1: 曝光、白平衡、增益
# scene2: 空间分辨率/MTF
# scene3: 色彩准确度
# scene4: 传感器融合 (Camera + IMU)
# scene5: 闪光灯
# scene6: 视频录制
```

###  Yocto 测试体系利用方案

Yocto Project 有 `ptest`（Package Test）和 `oe-selftest` 两套框架：

#### ptest — 包级别运行时测试

```bash
# 在 Yocto 构建系统中启用 ptest
# local.conf
EXTRA_IMAGE_FEATURES += "ptest-pkgs"
IMAGE_INSTALL:append = " ptest-runner"

# 运行单包 ptest
ptest-runner can-utils
ptest-runner ltp
ptest-runner lttng-tools
ptest-runner iperf3

# LAVA 集成
# tests/yocto/ptest-runner.sh
#!/bin/bash
ptest-runner -t 3600 ltp  # 1小时超时
ptest-runner -t 1800 can-utils
```

#### oe-selftest — 构建系统验证

```bash
# 在构建主机上运行
oe-selftest --run-tests bsp.Machine
oe-selftest --run-tests kernel.KernelDevsrc
oe-selftest --run-tests runtime_test.Systemd
```

#### Yocto LAVA 集成（meta-lava）

```bash
# 使用 meta-lava layer 自动生成 LAVA job
git clone https://git.lavasoftware.org/lava/meta-lava.git
# bitbake 后在 tmp/deploy/images 生成 YAML
```

### 11.4 Buildroot 测试策略

Buildroot 轻量高效，测试策略以自写脚本 + LAVA 为主：

```bash
# Buildroot 自带测试
make legal-info          # 许可证合规检查
make graph-build         # 构建依赖图
make check-package       # 包规范检查

# 运行时测试 (自建)
# board/rockchip/rk3576/post-build.sh
cat >> ${TARGET_DIR}/etc/init.d/S99test << 'EOF'
#!/bin/sh
# 启动时自动运行冒烟测试
/tests/smoke-test.sh > /var/log/smoke.log 2>&1
EOF
```

### 11.5 Debian 测试策略

Debian 使用标准 Linux 测试栈，与主线方案完全对接：

```bash
# Debian 包自带 autopkgtest
autopkgtest linux-image-$(uname -r) -- null
autopkgtest can-utils -- null
autopkgtest usbutils -- null

# 内核包自测
apt install linux-image-$(uname -r)-dbg
# 使用 debian/config 中的 test 配置
```

---

## 内核崩溃与偶现 Bug 检测体系

### 13.1 崩溃捕获基础设施

```
内核崩溃分层捕获:

Layer 1: pstore/ramoops (轻量级，重启后恢复)
  ├── 需求: 预留 dts memory region
  ├── 容量: 1MB (足够存 panic 栈回溯)
  └── 恢复: mount pstore; cat /sys/fs/pstore/*

Layer 2: kdump/kexec (完整 vmcore)
  ├── 需求: 预留 crashkernel=128M
  ├── 容量: 完整内存转储
  └── 恢复: crash 工具解析 vmcore

Layer 3: 串口日志 (实时)
  ├── ser2net → 持续记录到 CI 服务器
  └── 即使内核 panic，最后输出已流式保存
```

#### pstore 配置 (DTS)

```dts
// arch/arm64/boot/dts/rockchip/rk3576-evb.dts
/ {
    reserved-memory {
        ramoops: ramoops@110000 {
            compatible = "ramoops";
            reg = <0x0 0x110000 0x0 0x100000>;  // 1MB
            record-size = <0x20000>;              // 128KB
            console-size = <0x80000>;              // 512KB
            ftrace-size = <0x20000>;               // 128KB
            pmsg-size = <0x20000>;                 // 128KB
        };
    };
};
```

```kconfig
# kernel config fragment
CONFIG_PSTORE=y
CONFIG_PSTORE_RAM=y
CONFIG_PSTORE_CONSOLE=y
CONFIG_PSTORE_FTRACE=y
CONFIG_PSTORE_PMSG=y
CONFIG_CRASH_DUMP=y
CONFIG_KEXEC=y
```

#### eMMC 大数据读写偶现异常

```bash
#!/bin/bash
# tests/stability/emmc-stress.sh

EMMC_DEV="/dev/mmcblk0"
TEST_MOUNT="/mnt/emmc_test"
LOG_DIR="/tmp/emmc_stress"
mkdir -p $LOG_DIR $TEST_MOUNT

# 分区准备
mount ${EMMC_DEV}p8 $TEST_MOUNT 2>/dev/null || mount $EMMC_DEV $TEST_MOUNT

# fio 全盘随机读写 + 校验
fio --name=emmc_stress \
    --filename=$TEST_MOUNT/fio_test \
    --size=2G \
    --rw=randrw \
    --rwmixread=70 \
    --bs=4k \
    --direct=1 \
    --numjobs=4 \
    --runtime=3600 \
    --time_based \
    --verify=crc32c \
    --verify_fatal=1 \
    --group_reporting \
    --output-format=json \
    --output=$LOG_DIR/fio_result.json 2>&1

FIO_EXIT=$?
if [ $FIO_EXIT -eq 0 ]; then
    echo "PASS: eMMC 1h randrw + CRC verify"
    lava-test-case emmc-stress --result pass
else
    echo "FAIL: eMMC stress test exit code: $FIO_EXIT"
    lava-test-case emmc-stress --result fail
fi

# 检查 MMC 驱动层错误
dmesg | grep -i "mmc.*error\|mmc.*timeout\|emmc.*fail" > $LOG_DIR/mmc_errors.log
MMC_ERRS=$(wc -l < $LOG_DIR/mmc_errors.log)
if [ "$MMC_ERRS" -gt 0 ]; then
    echo "WARN: eMMC driver errors: $MMC_ERRS events"
    lava-test-case emmc-driver-errors --result fail
    lava-test-run-attach mmc_errors.log text/plain
fi

umount $TEST_MOUNT
```

---

## 十六、行业严苛测试源码仓库

### 16.1 CAN 总线测试

| 仓库 | 链接 | 说明 |
|------|------|------|
| **linux-can/can-utils** | https://github.com/linux-can/can-utils | SocketCAN 官方工具集：candump, cansend, cangen, cansniffer |
| **linux-can/can-tests** | https://github.com/linux-can/can-tests | CAN 内核驱动回归测试套件 |
| **hardbyte/python-can** | https://github.com/hardbyte/python-can | Python CAN 库，包含 SocketCAN loopback 测试 |
| **CANdevStudio** | https://github.com/GENIVI/CANdevStudio | CAN 总线仿真工具，支持 CANopen |
| **can-utils 内核 selftest** | `tools/testing/selftests/net/` (内核树内) | 内核自带 SocketCAN 测试 |
| **CANopenNode** | https://github.com/CANopenNode/CANopenNode | CANopen 协议栈 + 测试 |
| **kaliatech/CANalyst-II** | https://github.com/kaliatech/CANalyst-II | USB-CAN 适配器 Linux 测试 |

### 16.2 UART/串口测试

| 仓库 | 链接 | 说明 |
|------|------|------|
| **cbrake/linux-serial-test** | https://github.com/cbrake/linux-serial-test | Linux 串口回环与性能测试 |
| **stonewill/serial-tester** | https://gitee.com/stonewill/serial-tester | RS232/485/422 多模式测试 |
| **claudioarena/Serial_stress_test** | https://github.com/claudioarena/Serial_stress_test | Python 串口压力测试 |
| **iiot-ga/uart-latency** | https://github.com/iiot-ga/uart-latency | UART 回环延迟测量 |
| **pyserial** | https://github.com/pyserial/pyserial | Python 串口库，包含测试套件 |
| **npat-efault/picocom** | https://github.com/npat-efault/picocom | 轻量终端 + 可脚本化测试 |

### 16.3 USB 测试

| 仓库 | 链接 | 说明 |
|------|------|------|
| **USB-IF USB3CV** | https://usb.org/document-library/usb3cv | USB 3.x 官方合规验证工具 (Windows 下运行) |
| **USB-IF USBCV** | https://usb.org/document-library/usbcv | USB 2.0 合规验证工具 |
| **linux-usb/usbtest** | 内核树内 `drivers/usb/misc/usbtest.c` | 内核 USB gadget/host 测试驱动 |
| **USB_TEST_MODE** | https://github.com/JH989876525/USB_TEST_MODE | USB 测试模式工具 |
| **usbguard** | https://github.com/USBGuard/usbguard | USB 设备策略 + 审计 |
| **vbus_notify** | 内核树内 `drivers/usb/core/` | USB VBUS 通知测试 |
| **ioctl_usb_test** | https://github.com/torvalds/linux/tree/master/tools/usb | 内核树内 USB 测试工具 |

### 16.4 综合嵌入式测试

| 仓库 | 链接 | 说明 |
|------|------|------|
| **Linux Test Project (LTP)** | https://github.com/linux-test-project/ltp | 内核/系统综合测试 |
| **LTP-DDT (TI)** | https://git.ti.com/cgit/test-automation/ltp-ddt/ | TI 维护的硬件驱动测试版 |
| **stress-ng** | https://github.com/ColinIanKing/stress-ng | 系统压力测试 |
| **FIO** | https://github.com/axboe/fio | 存储 IO 基准测试 |
| **rt-tests (cyclictest)** | https://git.kernel.org/pub/scm/utils/rt-tests/rt-tests.git | 实时性测试 |
| **Phoronix Test Suite** | https://github.com/phoronix-test-suite/phoronix-test-suite | 综合性能基准测试 |
| **labgrid** | https://github.com/labgrid-project/labgrid | Pengutronix 硬件控制 + pytest |
| **Boardswarm** | https://github.com/boardswarm/boardswarm | Collabora 板卡管理 |

---

## 十七、完整参考资料链接

### 社区与组织

| 来源 | 链接 | 相关领域 |
|------|------|----------|
| **KernelCI** | https://kernelci.org | 内核 CI 测试总览 |
| **KernelCI GitHub** | https://github.com/kernelci | 源码与项目规划 |
| **KernelCI 新架构文档** | https://github.com/kernelci/kernelci-project | Pipeline + API 设计 |
| **KernelCI Core** | https://github.com/kernelci/kernelci-core | 构建/测试核心工具 |
| **LAVA 官方文档** | https://lava.readthedocs.io/ | LAVA 部署与设备配置 |
| **LAVA GitLab** | https://gitlab.com/lava | LAVA 源码 |
| **lkp-tests (Intel 0day)** | https://github.com/intel/lkp-tests | 性能回归测试框架 |
| **TuxMake** | https://gitlab.com/Linaro/tuxmake | Linaro 统一内核构建 |
| **TuxRun** | https://gitlab.com/Linaro/tuxrun | Linaro 统一内核测试 |

### 头部公司实践

| 来源 | 链接 | 参考要点 |
|------|------|----------|
| **Collabora Board Farm** | https://www.collabora.com/news-and-blog/blog/2024/06/27/building-a-board-farm-for-embedded-world/ | Boardswarm + YKUSH 硬件方案 |
| **Collabora KernelCI** | https://www.collabora.com/news-and-blog/blog/2024/02/08/automatic-regression-handling-and-reporting-for-the-linux-kernel/ | 自动回归处理 |
| **Bootlin 测试架构** | https://bootlin.com/blog/tag/testing/ | ctt.py + MultiNode |
| **Bootlin 自定义 LAVA 测试** | https://bootlin.com/blog/beyond-boot-testing-custom-tests-lava/ | 外设测试设计思路 |
| **DRM-CI (Collabora)** | https://lwn.net/Articles/961655/ | GitLab CI for GPU 驱动 |
| **Google AOSP VTS** | https://source.android.com/docs/core/tests/vts | Vendor Test Suite |
| **Google Camera ITS** | https://source.android.com/docs/compatibility/cts/camera-its | 摄像头成像测试 |
| **Pengutronix labgrid** | https://github.com/labgrid-project/labgrid | 硬件控制层 |
| **NXP Board Farm** | https://www.nxp.com/design/software/embedded-software/ | i.MX 测试基础设施 |
| **TI LTP-DDT** | https://git.ti.com/cgit/test-automation/ltp-ddt/ | 硬件驱动测试套件 |

### 内核与驱动开发

| 来源 | 链接 | 参考要点 |
|------|------|----------|
| **LWN.net (内核测试)** | https://lwn.net/Articles/972713/ | GitLab CI for kernel 讨论 |
| **LWN.net (DRM-CI)** | https://lwn.net/Articles/961655/ | 图形 CI 管道 |
| **kernel.org PM 测试** | https://www.kernel.org/doc/html/latest/power/drivers-testing.html | 休眠唤醒测试 |
| **Linux pstore 文档** | https://www.kernel.org/doc/html/latest/admin-guide/pstore-blk.html | 崩溃日志持久化 |
| **elixir.bootlin.com** | https://elixir.bootlin.com/linux/latest/source | 内核源码交叉引用 |
| **CAN 内核文档** | https://www.kernel.org/doc/html/latest/networking/can.html | SocketCAN 官方文档 |

### 芯片平台

| 来源 | 链接 | 参考要点 |
|------|------|----------|
| **Rockchip TRM/Datasheet** | https://rockchip.fr (镜像) | TRM PDF 下载 |
| **Rockchip 固件下载** | https://redmine.rock-chips.com/urllist | SDK + 文档 |
| **rkdocs-rk3588** | https://github.com/axlrose/rkdocs | Rockchip BSP 文档集合 |
| **rknn-llm (Rockchip NPU)** | https://github.com/airockchip/rknn-llm | NPU LLM 部署 |
| **ezrknn-llm** | https://github.com/ioef/ezrknn-llm | NPU LLM 简化工具 |
| **linux-sunxi Mainlining** | https://linux-sunxi.org/Linux_mainlining_effort | Allwinner 主线进度 |
| **meta-sunxi (Yocto)** | https://github.com/linux-sunxi/meta-sunxi | Allwinner Yocto BSP |
| **Allwinner 在线文档** | https://docs.aw-ol.com | 全志 Tina Linux 文档 |
| **Tina SDK 文档** | https://tina.100ask.net | 全志 SDK 使用指南 |

### AI 工具与 Skill 管理

| 来源 | 链接 | 参考要点 |
|------|------|----------|
| **OpenCode Rules** | https://opencode.ai/docs/rules/ | AGENTS.md 配置 |
| **OpenCode Skills** | https://opencode.ai/docs/skills/ | Skill 定义格式 |
| **Claude Code Skills** | https://docs.anthropic.com/en/docs/claude-code | 官方 Skill 文档 |
| **chezmoi** | https://chezmoi.io | dotfiles 管理 |
| **RAG MCP Server** | https://github.com/rubrum95/rag-mcp-server | PDF 知识库 MCP |
| **markitdown** | https://github.com/microsoft/markitdown | PDF→Markdown 转换 |
| **chromadb** | https://github.com/chroma-core/chroma | 向量数据库 |

### 测试标准与规范

| 来源 | 链接 | 参考要点 |
|------|------|----------|
| **USB-IF 合规测试** | https://usb.org/compliance | USB3CV/USBCV |
| **JEDEC eMMC** | https://www.jedec.org/standards-documents/technology-focus-areas/flash-memory-ssds | eMMC 标准 |
| **ISO 11898 (CAN)** | https://www.iso.org/standard/63648.html | CAN 总线标准 |
| **Linux Test Project** | https://linux-test-project.readthedocs.io/ | LTP 文档 |


## 二十五、头部公司实践案例与分享链接

### 25.1 Linaro — LKFT (Linux Kernel Functional Testing)

> "How and why Linaro builds, boots and tests over a million Linux kernels per year"

| 资源 | 链接 |
|------|------|
| **LKFT 官网** | https://lkft.linaro.org |
| **LKFT 101 入门** | https://lkft.linaro.org/lkft-101 |
| **Linaro Testing Services** | https://www.linaro.org/services/testingandautomation/ |
| **Linaro @ FOSDEM 2024** | https://www.linaro.org/blog/linaro-fosdem-2024 |
| **LKFT LPC 2019 演讲 PDF** | https://lpc.events/event/4/contributions/405/attachments/325/549/Linux_Kernel_Functional_Testing_LKFT.pdf |
| **LKFT LIS25 演讲** | https://www.linkedin.com/posts/naresh-kamboju-2248ab131_lis25-111-the-importance-of-linux-kernel-activity-7339999297934905347 |
| **TuxMake/TuxRun** | https://www.linaro.org/blog/how-to-build-and-test-the-linux-kernel-locally |
| **LKFT 仓库** | https://github.com/linaro/test-definitions |
| **LAVA Test Plans** | https://github.com/linaro/lava-test-plans |
| **KIR (Kernel Image Repacking)** | https://github.com/linaro/kir |

**核心实践**: LKFT 每日测试 linux-stable、linux-next、mainline、Android Common Kernel 等 6+ 分支，使用 `kernel-trigger` 监控上游变更 → `tuxbuild` 构建 → `lava-test-plans` 生成 LAVA job → `qa-reports` 展示结果。NXP 也将其 LAVA lab 接入 LKFT。

### 25.2 Bootlin — 自定义 LAVA 测试架构

| 资源 | 链接 |
|------|------|
| **Bootlin 测试系列 (Tag: testing)** | https://bootlin.com/blog/tag/testing/ |
| **Beyond boot testing: custom tests with LAVA** | https://bootlin.com/blog/beyond-boot-testing-custom-tests-lava/ |
| **Software architecture of Bootlin's lab** | https://bootlin.com/blog/software-architecture-of-bootlins-lab |
| **Hardware architecture of Bootlin's lab** | https://bootlin.com/blog/hardware-architecture-of-bootlins-lab |
| **Continuous integration in Linux kernel** | https://bootlin.com/blog/tag/continuous-integration/ |
| **Tag: farm (板群架构)** | https://bootlin.com/blog/tag/farm/ |

**核心实践**: Bootlin 从 2016 年起运行自己的 LAVA 测试实验室，2020 年迁移到 ctt.py（Custom Test Tool），用 Python 写测试用例替代 LAVA YAML 的测试定义限制。支持 MultiNode 以太网测试（DUT + Reference PC 配对），每日对 mainline 和 stable 内核做回归测试。

### 25.3 Collabora — Board Farm + 上游 CI

| 资源 | 链接 |
|------|------|
| **Building a Board Farm for Embedded World** | https://www.collabora.com/news-and-blog/blog/2024/06/27/building-a-board-farm-for-embedded-world/ |
| **Growing a lab (FOSDEM 2023)** | https://archive.fosdem.org/2023/schedule/event/growing_testing_lab/ |
| **Automatic regression handling for Linux kernel** | https://www.collabora.com/news-and-blog/blog/2024/02/08/automatic-regression-handling-and-reporting-for-the-linux-kernel/ |
| **Meet Boardswarm** | https://www.collabora.com/news-and-blog/news-and-events/meet-boardswarm-a-new-open-source-tool-for-board-management-and-distributed-development.html |
| **Testing RISC-V with LAVA** | https://www.collabora.com/news-and-blog/news-and-events/tested-on-real-silicon-automating-risc-v-hardware-in-the-loop.html |

**核心实践**: Collabora 运营 100+ DUT 的 LAVA lab，月运行 10 万+ test job。FOSDEM 2023 演讲《Growing a lab for automated upstream testing》详细讲述了设备生命周期管理、自动恢复机制、Boardswarm 分布式板卡管理。YKUSH + SDWire + USB-TTL 是其标准硬件配置。

### 25.4 Google — Android Kernel Testing + Syzbot

| 资源 | 链接 |
|------|------|
| **Android Common Kernel Testing (LPC 2017)** | http://linuxplumbersconf.org/2017/ocw/system/presentations/4805/original/LPC-TestingAndroid.pdf |
| **Android VTS** | https://source.android.com/docs/core/tests/vts |
| **Android Kernel Network Tests** | https://source.android.com/docs/core/architecture/kernel/network_tests |
| **Syzbot: automated kernel testing (LPC 2018)** | https://linuxplumbersconf.org/event/2/contributions/237/attachments/61/71/syzbot_automated_kernel_testing.pdf |
| **Syzbot on GitHub** | https://github.com/google/syzkaller |
| **KernelCI + Syzbot 集成** | https://lpc.events/event/16/contributions/1194/ |

**核心实践**: Google 在 Android 通用内核测试中同时运行三项工作：(1) **VTS** 做 HAL/内核层功能验证；(2) **LKFT** 做 LTP + benchmark 回归；(3) **Syzbot** 做 fuzzing 安全测试。所有测试结果统一到 Android CI Dashboard。Google 的 Trade Federation 框架可以在多 DUT 上并行调度测试。

### 25.5 TI (Texas Instruments) — LTP-DDT

| 资源 | 链接 |
|------|------|
| **TI LTP-DDT 官方文档** | https://software-dl.ti.com/processor-sdk-linux/esd/AM335X/09_01_00_001/exports/docs/linux/Foundational_Components_Kernel_LTP-DDT_Validation.html |
| **LTP-DDT 源码** | https://git.ti.com/cgit/test-automation/ltp-ddt/ |
| **TI 硬件自动化测试 (中文)** | https://blog.csdn.net/z1026544682/article/details/102519435 |

**核心实践**: LTP-DDT 是 TI 基于 LTP 扩展的硬件驱动测试套件。它在 LTP 的基础上增加了诸多硬件模块的测试用例：`i2c`、`spi`、`mmc`、`nand`、`usb`、`v4l2`、`alsa`、`can`、`pwm`、`gpio`。每个模块有独立的 `runtest/ddt/` 测试场景文件。TI 用于 AM335x/AM437x/AM57x 等平台的出厂验证。

### 25.6 Intel — 0day/LKP (Linux Kernel Performance)

| 资源 | 链接 |
|------|------|
| **lkp-tests 仓库** | https://github.com/intel/lkp-tests |
| **Intel 0day 介绍 (LWN)** | https://lwn.net/Articles/514278/ |
| **lkp 快速入门** | https://github.com/intel/lkp-tests#readme |

**核心实践**: Intel 的 0day 基础设施每个内核 commit 都做性能基准测试。`lkp install` + `lkp run` + `lkp collect` + `lkp compare` 四步完成性能回归检测，自动对比基线数据。

### 25.7 NXP — LAVA Lab 联盟

| 资源 | 链接 |
|------|------|
| **NXP LAVA 支持页面** | https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-8-applications-processors/lava-linaro-automated-validation-architecture-support-for-nxp-products:LAVA-SUPPORT |
| **NXP LAVA Lab (接入 LKFT)** | https://lkft.linaro.org (NXP 的 lab 数据也在上面) |

**核心实践**: NXP 将其 i.MX 平台的 LAVA lab 接入 Linaro LKFT 网络，形成 federated testing 模式。NXP 提供 device integration 指南，帮助 i.MX 客户搭建自己的 LAVA 测试环境。

### 25.8 Bootlin 系列深度文章（必读）

| 文章 | 核心内容 |
|------|----------|
| https://bootlin.com/blog/hardware-architecture-of-bootlins-lab | 硬件拓扑、组网、供电方案 |
| https://bootlin.com/blog/software-architecture-of-bootlins-lab | LAVA + ctt.py 软件架构 |
| https://bootlin.com/blog/beyond-boot-testing-custom-tests-lava | 外设功能测试设计方法 |
| https://bootlin.com/blog/continuous-integration-in-the-linux-kernel | CI 流程与实践 |

---

## 二十六、主流 Linux 发行版测试体系与企业级稳定性保障

> 从发行版视角研究最先进的 QA/CI/CD 实践，提取可借鉴的测试策略和企业级稳定性保障机制。

### 26.1 openEuler — 鲲鹏昇腾生态的测试体系

openEuler 是华为主导的面向数字基础设施的开源操作系统，构建了**四层测试保障体系**。

| 资源 | 链接 |
|------|------|
| **mugen 测试框架（社区主框架）** | https://atomgit.com/openeuler/mugen |
| **compass-ci 大规模持续集成平台** | https://gitee.com/openeuler/compass-ci |
| **radiaTest 测试管理平台** | https://www.openeuler.org/zh/blog/Ethan-Zhang/20230321-radiaTest使用指南 |
| **Avocado-VT 虚拟化测试** | https://www.openeuler.org/zh/blog/kezhiming/2021-01-20-virttest-avocado-vt.html |
| **EulerCertified 兼容性认证** | https://www.openeuler.org/zh/compatibility/ |
| **oec-hardware 硬件测试工具** | https://gitee.com/openeuler/oec-hardware |
| **x2openEuler 迁移评估工具** | https://www.openeuler.org/zh/migration/ |
| **openEuler 测试规范 Bugzilla** | https://bugzilla.openeuler.org |
| **CI/CD 闭环深度解读（华为云博客）** | https://bbs.huaweicloud.com/blogs/454566 |
| **软件包质量分级（L1~L4）** | https://www.openeuler.org/zh/blog/wxggxl/2023-11-10-quality-classification |

**核心实践**:

1. **mugen 框架**：社区自研的通用测试框架，支持多版本、多架构（x86/ARM/riscv64/LoongArch）的用例协同贡献。openEuler Embedded 也采用 mugen 做远程测试。
2. **compass-ci**：大规模持续集成测试平台，对上游开源软件 PR 做自动化构建测试、包用例测试，与 lkp-tests 深度集成。
3. **Avocado/Avocado-VT**：虚拟化测试框架，模拟用户操作对 KVM/StratoVirt 等虚拟化组件做自动化验证。
4. **radiaTest**：测试管理平台，涵盖测试资产管理、任务管理、资源调度与执行，提供 Web 可视化界面。

**企业级稳定性保障机制**：

```
四层保障体系：
┌─────────────────────────────────────────────┐
│  1. 框架层                                    │
│  mugen + compass-ci + Avocado-VT + LTP/openQA │
├─────────────────────────────────────────────┤
│  2. 流程层                                    │
│  Gitee PR → ci-bot → OBS 构建 → Jenkins 测试  │
│  → 质量分析 → 制品发布（完整 CI/CD 闭环）      │
├─────────────────────────────────────────────┤
│  3. 治理层                                    │
│  L1~L4 软件包质量分级 + LTS/创新版双轨生命周期 │
│  + LTS SP 补丁策略 + Beta 后冻结质量分级       │
├─────────────────────────────────────────────┤
│  4. 认证层                                    │
│  EulerCertified 技术测评 — 覆盖软件/硬件/OS    │
│  三个维度标准化测试（构建/兼容/功能/性能/安全） │
└─────────────────────────────────────────────┘
```

**关键经验可借鉴**：
- 软件包质量分级（L1~L4）是管理大规模软件包的**量化方法**，可迁移到嵌入式 BSP 组件分级管理
- EulerCertified 的硬件兼容性测试流程可参考用于 DUT 认证体系
- compass-ci 的"上游 PR 自动测试"模式可借鉴用于内核上游 patch 跟踪

---

### 26.2 Fedora — RHEL 上游创新引擎的测试工厂

Fedora 是 Red Hat Enterprise Linux 的上游社区发行版，拥有业内**最成熟的发行版 CI/CD 管道**之一。

| 资源 | 链接 |
|------|------|
| **Fedora CI 总入口文档** | https://docs.fedoraproject.org/en-US/ci/ |
| **Bodhi 更新门控系统（生产环境）** | https://bodhi.fedoraproject.org/ |
| **openQA Fedora Wiki** | https://fedoraproject.org/wiki/OpenQA |
| **openQA 测试分发（os-autoinst-distri-fedora）** | https://pagure.io/fedora-qa/os-autoinst-distri-fedora |
| **ResultsDB — 统一测试结果数据库** | https://docs.fedoraproject.org/en-US/ci/ |
| **Greenwave — 门控决策引擎** | https://docs.fedoraproject.org/en-US/ci/ |
| **WaiverDB — 豁免管理** | https://docs.fedoraproject.org/en-US/ci/ |
| **Koschei — 依赖断裂检测** | https://koschei.fedoraproject.org/ |
| **Koji 构建系统** | https://koji.fedoraproject.org/ |
| **Fedora Kernel 测试 Wiki** | https://fedoraproject.org/wiki/KernelTestingInitiative |
| **Fedora QA 团队 Pagure** | https://pagure.io/fedora-qa |
| **Fedora CI Pagure 项目组** | https://pagure.io/group/fedora-ci |
| **更新策略文档** | https://fedoraproject.org/wiki/Updates_Policy |

**核心实践**：

1. **Bodhi 门控系统**：每个软件包更新必须通过 Bodhi 的 Karma 系统（人工 +/-1 打分）+ 自动化测试结果。Critical Path 包强制至少 7-14 天在 `updates-testing` 中暴露。
2. **openQA 全自动桌面验证**：模拟人类操作（虚拟键盘/鼠标/截屏比对），在每次版发布前自动验证安装、桌面、应用场景。
3. **Greenwave 决策引擎**：汇集所有测试系统结果 → 生成 Go/No-Go 决策 → 失败的测试阻塞更新进入 stable。
4. **Koschei 依赖断裂检测**：在 Rawhide（开发分支）上持续重建所有包，发现依赖断裂立即报警。

**完整测试管道**：

```
Package Source (dist-git)
    │
    ▼
Koji Build
    │
    ├──→ Koschei (依赖驱动重建测试，Rawhide)
    │
    ▼
Bodhi Update Created
    │
    ├──→ Fedora CI tests (tier0: 功能, tier1: 集成)
    ├──→ openQA tests (安装/桌面/更新验证)
    │
    ▼
ResultsDB ←── 所有测试结果汇聚
    │
    ▼
Greenwave (Go/No-Go 决策)
    │
    ├── 失败 → WaiverDB (人工豁免)
    │
    ▼
Bodhi Gating Decision
    │
    ├── Pass → Stable 仓库
    └── Fail → 阻塞 (除非豁免)
    │
    ▼
updates-testing (人工 Karma + Proven Testers)
    │
    ▼
Stable Repository → 未来进入 RHEL 继承
```

**企业级稳定性保障 — Fedora → CentOS Stream → RHEL 管道**：

```
Fedora (快速迭代，社区测试)
    │
    ├── Fedora ELN (RHEL 模拟构建环境，早期反馈)
    │
    ▼
CentOS Stream (下一版 RHEL 的持续预览，持续测试)
    │
    ▼
RHEL (加固、认证、长期支持维护)
```

**关键经验可借鉴**：
- **Greenwave + ResultsDB + WaiverDB** 三层门控架构是工业级质量门的最佳实现，可直接参考设计自家的测试结果汇总与决策系统
- Fedora 的"每个包都有 `debian/tests/` 风格的测试"理念，可推动 BSP 驱动模块测试标准化
- ELN (Enterprise Linux Next) 的"模拟目标环境提前构建"做法，可用于多 Yocto/Debian 版本的提前兼容性检测

---

### 26.3 Arch Linux — 滚动发行的稳定性艺术

Arch Linux 通过**极简的流程设计**实现了滚动发行模型下的稳定性保证，虽然规模有限但设计精良。

| 资源 | 链接 |
|------|------|
| **官方仓库体系（含测试仓库）** | https://wiki.archlinux.org/title/Official_repositories |
| **Arch 打包 GitLab** | https://gitlab.archlinux.org/archlinux/packaging/packages |
| **devtools / pkgctl 构建工具** | https://gitlab.archlinux.org/archlinux/devtools |
| **Signoff 签核看板** | https://archlinux.org/packages/signoffs/ |
| **Rebuild-TODO 列表** | https://archlinux.org/todo/ |
| **安全漏洞追踪** | https://security.archlinux.org/ |
| **可重现构建状态** | https://reproducible.archlinux.org/ |
| **Buildbot 实例** | https://buildbot.pkgbuild.com/ |
| **repod 仓库管理工具** | https://gitlab.archlinux.org/archlinux/repod |
| **Git 迁移公告** | https://archlinux.org/news/git-migration-completed/ |

**核心实践**：

1. **测试仓库分级流水线**：
   - `*-staging`：开发者专用，存放 Soname 变更等破坏性包，普通用户**不应启用**
   - `*-testing`（core-testing/extra-testing）：核心包**必须**经过，至少 1 周暴露时间
   - `gnome-unstable` / `kde-unstable`：桌面预发布版本，独立于 testing 仓库

2. **Signoff 签核机制**：
   - 所有 `core` 包必须获得 **2 个签核**才可移入 stable（维护者自己算一个）
   - 通过 [archweb signoff 页面](https://archlinux.org/packages/signoffs/) 公开追踪
   - 配合 IRC 实时协调加速签核流程

3. **Clean Chroot 强制隔离构建**：
   - `devtools` / `pkgctl build` 强制每个包在干净的 systemd-nspawn 容器中构建
   - 自动捕获缺失的依赖声明 —— 这是 Arch 的"构建自验证"

4. **可重现构建**：
   - 约 87% 的包可重现，5+ 个独立 rebuilders 使用 `rebuilderd` 持续验证
   - 发布 ISO 的 squashfs 镜像是可重现的

5. **安全追踪**：
   - 专用安全团队维护 [security.archlinux.org](https://security.archlinux.org)
   - 按严重程度（Critical/High/Medium/Low）分类，从 NVD 获取 CVE

**稳定性分层架构**：

```
┌──────────────────────────────────────────────────┐
│              上游发布                               │
│                    ↓                               │
│  *-staging (开发者隔离区，Soname 大重构)            │
│                    ↓                               │
│  *-testing (核心包强制 1 周 + 2 签核)              │
│  ┌──────────────────────────────────────┐         │
│  │ Arch Testing Team (社区志愿者裸机测试) │         │
│  │ + signoff CLI 工具 + archweb 看板     │         │
│  └──────────────────────────────────────┘         │
│                    ↓                               │
│  Stable (core / extra / multilib)                  │
│  ┌──────────────────────────────────────┐         │
│  │ linux (最新) + linux-lts (兜底)       │         │
│  │ reproducible.archlinux.org 持续验证   │         │
│  │ security.archlinux.org CVE 追踪       │         │
│  └──────────────────────────────────────┘         │
└──────────────────────────────────────────────────┘
```

**关键经验可借鉴**：
- **Clean Chroot 构建**是一个低成本高效的自动化验证 —— 适用于嵌入式构建环境的自验证
- **双内核策略**（linux + linux-lts）是一个简单有效的兜底方案 —— 嵌入式设备的 fallback kernel 机制可参考
- **Signoff 签核机制**虽然依赖人力但在团队内部非常有价值 —— 可用于 BSP patch 的同行评审流程

---

### 26.4 TencentOS Server — 千万级节点的验证体系

TencentOS Server（原 TLinux）是腾讯自研的企业级 Linux 发行版，部署量达**千万级节点**，支持六大架构。

| 资源 | 链接 |
|------|------|
| **TencentOS Server 官方网站** | https://cloud.tencent.com/product/ts |
| **OpenCloudOS 社区 Testing SIG** | https://github.com/OpenCloudOS/SIG-Testing |
| **OpenCloudOS 测试仓库（Gitee）** | https://gitee.com/opencloudos-testing |
| **OpenCloudOS-IV 集成验证** | https://gitee.com/opencloudos-stream/test-ltp-full |
| **OpenCloudOS-HCT 硬件兼容性测试** | https://gitee.com/opencloudos-testing/hct |
| **tst-lkvs 内核验证套件** | https://gitee.com/openeuler/lkvs |
| **buildsys (Koji) 构建系统** | https://build.opencloudos.tech/ |
| **CICD 项目** | https://gitee.com/opencloudos-stream/cicd |
| **TencentOS AI Enhanced (运维智能)** | https://cloud.tencent.com/developer/article/2513404 |
| **TencentOS 宕机率降低 70% 技术解读** | https://www.toutiao.com/article/7524273402262962729 |

**核心实践**：

1. **OpenCloudOS Testing SIG**：
   - 腾讯与社区共同维护的测试工作组
   - 子项目：CICD（社区 CI/CD 系统）、OpenCloudOS-IV（集成验证）、HCT（硬件兼容性测试）、packages-testing（包功能测试）、tst-lkvs（内核验证）

2. **TencentOS AI Enhanced 运维智能**：
   - 覆盖 9 个领域 24 项能力（安装、架构分析、异常定位、Bugfix 建议、热补丁等）
   - Crash-expert：7 阶段自动化 vmcore 分析，大幅缩短宕机根因分析时间

3. **"研运一体"模式**：
   - 腾讯既是 OS 开发者，也是深度用户和运营商
   - 形成"技术 + 场景 + 验证"的闭环 —— 所有优化都在腾讯自有业务上充分验证

4. **内部测试框架 tost**：
   - Go 语言实现的 5 层渐进抽象测试平台（语义层→契约层→资源层→执行层→基础设施层）
   - 覆盖 200+ 微服务，CI 通过率 99.6%

**企业级稳定性保障**：

```
┌──────────────────────────────────────────────────────┐
│              腾讯业务（千万级节点）                      │
│  微信、QQ、腾讯云、腾讯会议、腾讯游戏...                  │
└───────────────────────┬──────────────────────────────┘
                        │ 海量业务验证
                        ▼
┌──────────────────────────────────────────────────────┐
│            TencentOS Server 测试闭环                    │
│                                                        │
│  构建层: Koji (build.opencloudos.tech)                 │
│  ├── dist-oc9 (BaseOS)                                │
│  └── dist-oc9-epol (Extra Packages)                   │
│                                                        │
│  测试层:                                               │
│  ├── OS Smoke Test (轻量冒烟)                          │
│  ├── OpenCloudOS-IV (LTP 全量 + 72h 长时间)            │
│  ├── tst-lkvs (内核验证套件)                            │
│  ├── packages-testing (包级功能测试)                    │
│  └── OpenCloudOS-HCT (CPU/GPU/NPU/存储/网络兼容)        │
│                                                        │
│  运维层:                                               │
│  ├── TManager (crash 自动分析 + 热补丁)                 │
│  ├── TencentOS AI (9 域 24 能力)                       │
│  └── Crash-expert (7 阶段 vmcore 自动分析)              │
└──────────────────────────────────────────────────────┘
```

**关键经验可借鉴**：
- **"研运一体"** 是最珍贵的验证模式 —— 嵌入式设备也应建立"开发者自用 + CI 自动化"双重验证
- TencentOS 的崩溃自动分析链路（Crash-expert）可参考设计为测试失败的自动分类系统
- OpenCloudOS-HCT 的**多架构硬件兼容性测试框架**直接适用于 RK/Allwinner 的多平台 DUT 管理

---

### 26.5 Debian — 稳定性的黄金标准

Debian 通过**全球最大的分布式 archive-wide 测试基础设施**实现了业界公认的最高稳定性。

| 资源 | 链接 |
|------|------|
| **ci.debian.net（Debian CI 主面板）** | https://ci.debian.net |
| **debci 框架（GitLab）** | https://salsa.debian.org/ci-team/debci |
| **autopkgtest 指南** | https://wiki.debian.org/ContinuousIntegration/autopkgtest |
| **piuparts (安装/升级/卸载测试)** | https://piuparts.debian.org |
| **lintian 在线 (包合规检查)** | https://lintian.debian.org |
| **Jenkins Debian** | https://jenkins.debian.net |
| **可重现构建** | https://reproducible-builds.debian.net |
| **Release Team (testing 迁移)** | https://release.debian.org |
| **britney2 (迁移工具源码)** | https://salsa.debian.org/release-team/britney2 |
| **security-tracker** | https://security-tracker.debian.org |
| **Salsa CI Pipeline (per-package)** | https://salsa.debian.org/salsa-ci-team/pipeline |
| **buildd 构建网络** | https://buildd.debian.org |
| **Debian LTS 信息** | https://wiki.debian.org/LTS |

**核心实践**：

1. **britney2 — 最先进的迁移引擎**：
   - autopkgtest 回归：包及其**所有反向依赖**的测试必须通过
   - piuparts 结果：包的安装/升级/卸载路径无错误
   - RC bug 计数：无新增 release-critical bug
   - 迁移等待期：强制最低年龄要求，autopkgtest passing 可缩短
   - Hint 系统：Release Team 可手动干预迁移

2. **autopkgtest — DEP-8 标准**：
   - 每个 Debian 包在 `debian/tests/control` 中声明测试
   - 在 ephemeral LXC/QEMU 虚拟机中执行
   - 三大触发路径：britney 迁移触发 + 月度全量运行 + 安全团队测试安全更新

3. **piuparts — 全生命周期测试**：
   - 对归档中**所有软件包**做 purge/install/upgrade/dist-upgrade 测试
   - 覆盖从旧 stable 到 testing 的跨版本升级路径

4. **可重现构建**：
   - 约 96% 的包在连续多次构建中产物一致
   - 自 2013 年起为正式发布目标

**Debian 质量保障全景**：

```
┌──────────────────────────────────────────────────────────────┐
│                     DEBIAN QUALITY ASSURANCE                   │
├──────────────────┬───────────────────┬────────────────────────┤
│   构建时验证       │   归档级扫描        │   发布门控               │
├──────────────────┼───────────────────┼────────────────────────┤
│ Salsa CI         │ ci.debian.net     │ britney2               │
│ (GitLab CI)      │ (debci +          │ (testing 迁移引擎)       │
│                  │  autopkgtest)     │                        │
│ lintian          │ piuparts          │ RC bug 追踪             │
│ (包合规检查)      │ (安装/升级/卸载)   │ (BTS + UDD)            │
│ reprotest        │ reproducible.     │ autopkgtest 回归       │
│ (可重现测试)      │ debian.net        │ piuparts 结果          │
│ blhc             │ lintian.d.o       │ 迁移追踪 (ben)         │
│ (构建日志加固)    │ (在线 lintian)    │ 冻结阶段               │
│ autopkgtest      │                   │ Release Team hints     │
├──────────────────┴───────────────────┴────────────────────────┤
│            buildd 网络 (wanna-build, 20+ 架构)                  │
└──────────────────────────────────────────────────────────────┘
```

**企业级稳定性保障**：

- **testing 分支始终处于可发布状态**（持续可发布理念）
- **Stable 5 年安全支持**（Security Team）→ 可选再续 5 年（Freexian ELTS）
- **冻结流程**（Freeze）确保每个 Stable 发布前充分测试
- **Release-Critical Bug** 作为唯一发布阻塞条件

**关键经验可借鉴**：
- **britney2 的反向依赖回归测试**理念可直接应用于嵌入式 BSP —— 一个 DT 变更需要测试所有使用该 DT 的板卡
- **piuparts 的跨版本升级测试**对嵌入式 OTA 场景极具参考价值
- **DEP-8 (autopkgtest)** 可为嵌入式组件的测试标准化提供规范模板

---

### 26.6 Ubuntu — 企业级商业支持的测试工厂

Ubuntu 拥有**最工业化的软件包测试基础设施**和 Canonical 承诺的商业级服务质量。

| 资源 | 链接 |
|------|------|
| **Ubuntu QA Team 介绍** | https://discourse.ubuntu.com/t/introducing-the-ubuntu-qa-team/28951 |
| **QA Team Wiki** | https://wiki.ubuntu.com/QATeam |
| **autopkgtest 结果面板** | https://autopkgtest.ubuntu.com |
| **ProposedMigration (更新门控)** | https://wiki.ubuntu.com/ProposedMigration |
| **Britney 更新 Excuses** | https://people.canonical.com/~ubuntu-archive/proposed-migration/update_excuses.html |
| **Ubuntu Error Tracker** | https://errors.ubuntu.com |
| **Ubuntu Kernel Team** | https://kernel.ubuntu.com |
| **Kernel SRU 文档** | https://wiki.ubuntu.com/Kernel/kernel-sru-workflow |
| **ubuntu-kernel-tests 仓库** | https://code.launchpad.net/~canonical-kernel-team/ubuntu-kernel-tests |
| **Ubuntu Security (CVE/USN)** | https://ubuntu.com/security |
| **Ubuntu Pro / ESM** | https://ubuntu.com/pro |
| **Checkbox 测试框架（硬件认证）** | https://github.com/canonical/checkbox |
| **Ubuntu Certified Hardware** | https://ubuntu.com/certified |

**核心实践**：

1. **Britney CI Gate — 五重门控**：
   - ① 所有架构构建成功
   - ② 依赖关系可满足
   - ③ autopkgtest 通过（包 + 反向依赖）
   - ④ 无 block-proposed 标签的 bug
   - ⑤ 不会破坏已发布的包

2. **云原生 autopkgtest 基础设施**（2025-2026 重大架构升级）：
   - **旧架构**：OpenStack Swift (结果存储) + RabbitMQ (任务队列) + Juju Charms (worker 编排)
   - **新架构**：全部迁移到 **LXD 容器/VM**，`isolation-machine` 测试在 LXD VM 中运行
   - 数据保留策略：上传后自动丢弃，存储需求从 >1PB 降至 ~600GB

3. **Kernel SRU 四重签名（V+ C+ R+ S+）**：
   - **V: Verification** — 在受影响的硬件上手动验证
   - **C: Certification** — 在所有认证设备上持续回归测试
   - **R: Regression** — 通过 LTP、stress-ng 等回归套件
   - **S: Security** — 安全团队审查和签名

4. **Ubuntu Error Tracker**：
   - 从数百万台机器收集崩溃报告
   - 自动聚合相同类型的崩溃
   - 指导 Bugfix 优先级

5. **Checkbox 硬件认证**：
   - 服务器/桌面/IoT 认证测试框架
   - 阻断性测试（必须通过）vs 非阻断性测试（记录但不阻塞）
   - Certified Hardware 在 Kernel SRU 时获得持续回归测试

**Ubuntu 完整的测试/CI/CD 全景**：

```
┌─────────────────────────────────────────────────────────────┐
│ Package Lifecycle                                             │
│                                                               │
│  Upload ──→ -proposed Pocket ──→ Britney 五重门控             │
│                                      │                        │
│                   ┌──────────────────┼──────────────────┐    │
│                   ↓                  ↓                   ↓    │
│          ① 所有架构构建     ② 依赖可满足      ③ autopkgtest  │
│                   ↓                  ↓                   ↓    │
│          ④ 无 block-proposed bug      ⑤ 不破坏已发布包        │
│                   └──────────────────┼──────────────────┘    │
│                                      ↓                        │
│                                -release Pocket               │
├─────────────────────────────────────────────────────────────┤
│ Autopkgtest 基础设施 (2026 新架构)                            │
│                                                               │
│  RabbitMQ Queue ──→ Juju Workers ──→ LXD VMs/Containers      │
│                                          │                    │
│                                          ↓                    │
│                              Swift Result Store               │
│                                          │                    │
│                                          ↓                    │
│                              autopkgtest.ubuntu.com           │
├─────────────────────────────────────────────────────────────┤
│ 企业级稳定性                                                  │
│                                                               │
│  Security Team CVE Triage → Private PPA → USN 公告 →         │
│  -security Pocket                                            │
│                                                               │
│  Ubuntu Pro (ESM/esm-infra/esm-apps):                        │
│  ── 主仓库 5 年 + ESM 5 年 + Legacy 2-5 年 = 最多 15 年      │
│                                                               │
│  Certified Hardware:                                         │
│  ── 每次 Kernel SRU 在所有认证设备上持续回归测试               │
└─────────────────────────────────────────────────────────────┘
```

**关键经验可借鉴**：
- **Britney 五重门控**是嵌入式 CI/CD 质量门的最佳参考 —— 可简化为"构建通过 + 冒烟通过 + 外设回归通过 + 无已知回归 bug"
- **Kernel SRU 四重签名（V/C/R/S）** 可直接映射为嵌入式内核 patch 的四重验证：Verification (手动验证) / Hardware (多板卡回归) / Regression (LTP/外设测试) / Stability (老化测试)
- **Ubuntu Error Tracker** 的崩溃聚合思路可借鉴为 DUT 测试失败的自动分类系统

---

### 26.7 发行版测试体系横向对比

| 维度 | openEuler | Fedora | Arch | TencentOS | Debian | Ubuntu |
|------|-----------|--------|------|-----------|--------|--------|
| **测试框架** | mugen + compass-ci | Fedora CI + openQA | devtools + signoff | tost + OpenCloudOS-IV | debci + autopkgtest | autopkgtest |
| **构建系统** | OBS | Koji | devtools/pkgctl | Koji | buildd/sbuild | Launchpad |
| **门控系统** | ci-bot + quality gates | Greenwave + Bodhi | signoff (人力) | CICD + AI 分析 | britney2 | britney2-ubuntu |
| **迁移策略** | LTS SP 策略 | 6 月周期 + RHEL 派生 | 滚动 (testing → core) | 研运一体闭环 | testing → stable 冻结 | SRU + proposed 迁移 |
| **硬件测试** | oec-hardware + EulerCertified | openQA + kernel CI | 社区裸机测试 | OpenCloudOS-HCT | jenkins.d.n 多架构 | Checkbox 认证 |
| **安全支持** | CVE 跟踪 + 安全公告 | 13 个月/版本 | security.archlinux.org | 腾讯业务级运维 | 5 年 + ELTS 5 年 | 10-15 年 (Pro) |
| **可重现构建** | - | ✓ | ✓ (~87%) | - | ✓ (~96%) | ✓ |
| **独有亮点** | 软件包质量 L1~L4 分级 | ELN (RHEL 预览) | clean chroot 隔离 | 千万节点业务验证 | 20+ 架构构建网络 | Kernel SRU V/C/R/S |

### 26.8 对 RK/Allwinner CI/CD 的启示

综合六大发行版的实践，以下机制可直接借鉴：

| 发行版来源 | 可借鉴机制 | 应用于 |
|-----------|-----------|--------|
| **openEuler** | 软件包质量 L1~L4 分级 | BSP 组件（内核/DTS/驱动）按关键程度分级测试 |
| **Fedora** | Greenwave + ResultsDB + WaiverDB 三层门控 | 测试结果汇总 → 自动 Go/No-Go 决策 |
| **Fedora** | ELN 提前构建 | 多 Yocto/Debian 版本的提前兼容性检测 |
| **Arch** | 双内核 fallback | DUT 同时保留 stable 和 latest 内核 |
| **Arch** | Clean chroot 隔离构建 | 交叉编译环境的自验证 |
| **TencentOS** | "研运一体" + AI crash 分析 | AI 驱动的测试失败自动根因分析 |
| **TencentOS** | 多架构 HCT | RK3576/RK3588/T527/H618 统一硬件测试矩阵 |
| **Debian** | britney2 反向依赖回归 | DT/驱动变更 → 自动测试所有受影响板卡 |
| **Debian** | piuparts 跨版本升级 | OTA 升级路径的自动化测试 |
| **Ubuntu** | Britney 五重门控 | CI/CD 质量门设计 |
| **Ubuntu** | Kernel SRU V/C/R/S 签名 | 内核 patch 四重验证流程 |
| **Ubuntu** | Error Tracker 崩溃聚合 | DUT 测试失败的自动分类与聚合 |

---

### 26.9 参考资料全集

| 来源 | 链接 | 内容 |
|------|------|------|
| **openEuler mugen** | https://atomgit.com/openeuler/mugen | 社区测试框架 |
| **openEuler compass-ci** | https://gitee.com/openeuler/compass-ci | 大规模 CI 平台 |
| **openEuler CI 闭环** | https://bbs.huaweicloud.com/blogs/454566 | 华为云技术解读 |
| **Fedora CI Docs** | https://docs.fedoraproject.org/en-US/ci/ | 完整 CI 文档 |
| **Fedora Bodhi** | https://bodhi.fedoraproject.org/ | 更新门控系统 |
| **Arch Wiki: Official Repos** | https://wiki.archlinux.org/title/Official_repositories | 仓库分层与测试流程 |
| **Arch Signoff** | https://archlinux.org/packages/signoffs/ | 签核追踪 |
| **Arch Security** | https://security.archlinux.org/ | CVE 追踪 |
| **TencentOS Server** | https://cloud.tencent.com/product/ts | 产品主页 |
| **OpenCloudOS Testing SIG** | https://github.com/OpenCloudOS/SIG-Testing | 测试工作组 |
| **OpenCloudOS-HCT** | https://gitee.com/opencloudos-testing/hct | 硬件兼容性测试 |
| **TencentOS AI Enhanced** | https://cloud.tencent.com/developer/article/2513404 | 运维智能 |
| **Debian CI** | https://ci.debian.net | 主面板 |
| **debci 源码** | https://salsa.debian.org/ci-team/debci | CI 框架 |
| **Debian piuparts** | https://piuparts.debian.org | 生命周期测试 |
| **Debian Reproducible** | https://reproducible-builds.debian.net | 可重现构建 |
| **Ubuntu QA Team** | https://wiki.ubuntu.com/QATeam | QA 团队 |
| **Ubuntu autopkgtest** | https://autopkgtest.ubuntu.com | 包测试面板 |
| **Ubuntu Kernel SRU** | https://wiki.ubuntu.com/Kernel/kernel-sru-workflow | 内核更新流程 |
| **Ubuntu Checkbox** | https://github.com/canonicalM** | https://ubuntu.com/pro | 企业支持 |

---

## 二十七、Android 厂商系统稳定性测试体系深度分析

> 研究 Google、华为、小米、OPPO、vivo 五大 Android 厂商如何构建多层测试体系，保障亿级设备的系统稳定性。

### 27.1 Google (Pixel/AOSP) — 兼容性测试的奠基者

Google 作为 AOSP 维护者和 Pixel 设备制造商，构建了从 HAL 到 App 的五层兼容性测试闭环。

| 资源 | 链接 |
|------|------|
| **CTS (Compatibility Test Suite)** | https://source.android.com/docs/compatibility/cts |
| **VTS (Vendor Test Suite)** | https://source.android.com/docs/core/tests/vts |
| **GTS (GMS Test Suite)** | https://source.android.com/compatibility/gts |
| **STS (Security Test Suite)** | https://source.android.com/docs/security/test/sts |
| **Trade Federation (TF)** | https://source.android.com/docs/core/tests/tradefed |
| **Syzkaller (Android 集成)** | https://source.android.com/docs/core/tests/syzkaller |
| **Android CI Dashboard** | https://ci.android.com |
| **Atest 本地测试工具** | https://source.android.com/docs/core/tests/atest |
| **Soong 构建系统** | https://source.android.com/docs/setup/build |
| **Android Kernel Testing (LPC)** | https://lpc.events/event/2/contributions/237/ |

**五层测试体系**：

```
┌─────────────────────────────────────────────────────┐
│  层5: GTS — GMS 应用兼容性 (Play Store, Gmail 等)    │
├─────────────────────────────────────────────────────┤
│  层4: STS — 安全漏洞模拟利用检测                      │
├─────────────────────────────────────────────────────┤
│  层3: CTS — Android 框架 API 兼容性，设备认证基础       │
├─────────────────────────────────────────────────────┤
│  层2: CTS-on-GSI — 基于通用系统镜像的硬件兼容性         │
├─────────────────────────────────────────────────────┤
│  层1: VTS — 硬件抽象层 (HAL) 驱动实现验证              │
│        Camera / Audio / Sensor / Graphics / ...      │
└─────────────────────────────────────────────────────┘
```

**核心实践**：

1. **Trade Federation (TF)** — Android 自动化测试调度框架：
   - **分片 (Sharding)**：将大型测试语料库拆分到多部设备上并行执行
   - **Build Provider**：自动下载测试所需的系统镜像和测试 APK
   - **目标准备器**：自动刷写设备、设置属性、连接 Wi-Fi
   - **结果报告**：统一汇聚测试结果

2. **Syzkaller 内核 Fuzzing** — Google 安全团队开发的内核模糊测试：
   - **syz-manager**：智能调度中心，生成和下发测试用例
   - **syz-executor**：在 Android 设备内执行系统调用测试
   - **覆盖率引导**：通过 KCOV 机制收集内核代码块触发信息
   - **自动恢复**：内核崩溃后自动重启设备继续测试，支持电池监控

3. **Test Mapping** — 代码树内嵌测试规则：
   - 在任何源目录中放置 `TEST_MAPPING` JSON 文件
   - 定义 presubmit（提交前）和 postsubmit（提交后）测试
   - Atest CLI 工具支持本地快速运行

4. **Android CI Dashboard (ci.android.com)**：
   - Android Common Kernel 分支上的提交后测试结果可视化
   - 绿色=成功、黄色=进行中、红色=失败
   - 构建工件可供下载和复现

**企业级稳定性保障**：
- 所有 Android 设备必须通过 CTS 才能获得 Google 认证
- GMS 设备必须通过 GTS 和 STS
- 月度安全补丁 + 年度大版本，Syzkaller 持续运行发现安全漏洞

---

### 27.2 华为 (HarmonyOS/EMUI) — 全生命周期测试与自研框架

华为拥有国内最完整的移动操作系统测试基础设施。

| 资源 | 链接 |
|------|------|
| **DevEco Testing 服务** | https://developer.huawei.com/consumer/cn/testing |
| **HarmonyOS 应用测试指南** | https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/testing-overview |
| **Hypium 测试框架** | https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hypium |
| **HDC 开发者大会（测试主题）** | https://developer.huawei.com/consumer/cn/hdc |

**核心实践**：

1. **DevEco Testing** — 全生命周期测试服务：
   - **兼容性测试**：覆盖 200+ 款在网机型（含 3 年前旧机型）
   - **稳定性测试**：Monkey 变异测试、内存泄漏检测、应用无响应十秒级诊断
   - **性能测试**：启动耗时、界面帧率、内存占用、功耗分析
   - **安全测试**：恶意URL拦截、广告合规、隐私合规扫描
   - **功耗测试**：专项功耗测试 + 功耗异常诊断
   - **体验测试**：多屏协作、隔空手势等特性的自动化测试

2. **Hypium 自研测试框架**：
   - 鸿蒙原生应用/元服务的自动化测试框架
   - 支持 UI 自动化（控件查找、点击、滑动）
   - 与 DevEco Studio 深度集成

3. **鸿蒙全场景测试**：
   - 从手机、平板、手表到车机、智慧屏的统一测试管线
   - Kirin 芯片平台专项测试（含 GPU Turbo、NPU 算子精度）

4. **华为 X-OS 实验室**：
   - 自研硬件设备模拟人类行为执行测试（机械臂操作手机）
   - 真实网络环境模拟（弱网/断网/网络切换）
   - 极端温湿度环境测试

**企业级稳定性保障**：
- 鸿蒙内核 100% 自研，端到端质量可控
- Kirin 芯片的软硬协同优化，从芯片设计阶段即考虑 OS 稳定性
- 200+ 在网机型持续兼容性验证

---

### 27.3 小米 (MIUI/HyperOS) — 亿级设备的质量管理

小米管理着数十款机型的系统更新，其测试体系以规模化和智能化为特色。

| 资源 | 链接 |
|------|------|
| **Shepherd 测试框架 (GitHub)** | https://github.com/XiaoMi/shepherd |
| **TestIt 云测平台** | https://testit.mi.com |
| **小米技术博客 (中文)** | https://xiaomiui.net |

**核心实践**：

1. **Shepherd 自动化测试框架**（开源）：
   - 基于 Python 的多设备自动化测试
   - 支持设备农场 (Device Farm) 模式：1800 台手机并行测试
   - 智能错误定位：自动聚类相同类型错误，减少人工 triage
   - 累计硬件投入超 30 万小时

2. **HyperOS 系统解耦**：
   - 硬件驱动与系统框架解耦，每个模块独立升级
   - 组件级测试：每个独立模块单独跑回归
   - 热修复能力：不重启系统的补丁推送

3. **多层级内测体系**：
   - 内测版（开发组）→ 公测版（数万名用户）→ 稳定版
   - 每个版本在 1800 台设备上并发自动化测试
   - 用户反馈自动聚合和分析

4. **TestIt 开发者云测平台**：
   - 面向第三方开发者的兼容性测试服务
   - 覆盖小米全系列设备

**企业级稳定性保障**：
- 1800 台真机并行测试，覆盖数十款在售机型
- 模块解耦 + 独立升级降低级联风险
- 数万名公测用户构成最后一层防线

---

### 27.4 OPPO (ColorOS) — 月度固定更新 + PreMerge 门禁

OPPO 是首家实现"月度固定更新"的国内 Android 厂商，对 CI/CD 流程有极致的工程化要求。

| 资源 | 链接 |
|------|------|
| **OPPO 云测平台** | https://open.oppomobile.com/#/cloudTest |
| **ODC 开发者大会** | https://open.oppomobile.com |
| **ColorOS 更新策略 (OPPO 社区)** | https://community.oppo.com |

**核心实践**：

1. **PreMerge CI 门禁系统**：
   - 代码合入前必须通过 PreMerge 自动化测试
   - 包括编译检查、单元测试、集成测试、兼容性测试
   - 不通过则无法合入 → 从源头阻断质量问题

2. **月度固定更新机制**（行业首创）：
   - 每月定期发布 ColorOS 系统更新
   - 严格的时间窗口：开发→测试→灰度→全量
   - 支持回滚机制和分批放量

3. **研发云 (DevCloud) 全流程 DevOps**：
   - 代码提交 → 静态扫描 → 编译验证 → 单元测试 → 集成测试 → 自动化冒烟
   - 失败自动退回 + 通知责任人

4. **Apex Guard 硬件品质实验室**：
   - 机械臂模拟人类操作（点击、滑动、多指手势）
   - 跌落/弯折/温湿度/盐雾等极端环境测试
   - RGB 灯效老化测试

5. **OPPO 云测 (Open Testing)**：
   - 面向开发者的一键自动化测试服务
   - 覆盖 ColorOS 主流机型

**企业级稳定性保障**：
- **月度发布节奏**要求 CI/CD 管道达到工业化成熟度
- PreMerge 从源码层面阻断问题
- 研发云 + 自动化冒烟 + 分批灰度 = 三层防线

---

### 27.5 vivo (OriginOS/FuntouchOS) — 流畅性引擎 + 流量录制回放

vivo 在流畅性底层重构和 DevOps 测试基础设施方面有独特实践。

| 资源 | 链接 |
|------|------|
| **vivo 云测平台 (VCL)** | https://dev.vivo.com.cn/promote/cloudtest |
| **月光宝盒 (MoonBox)** | https://github.com/vivo/MoonBox |
| **千镜内存安全检测** | https://developers.vivo.com/product/d/memSec |
| **VDC 开发者大会** | https://dev.vivo.com.cn |

**核心实践**：

1. **蓝河流畅引擎** — vivo 自研系统流畅性基座：
   - **计算层面**：超核计算 + 超级协程技术，降低调度开销
   - **存储层面**：光子存储技术，优化 IO 效率
   - **显示层面**：双渲染架构，重构显示子系统
   - 实测：连续启动 52 个应用后零卡顿

2. **VCL 云测平台**：
   - 1000+ 部真机在线，日测试 10 万+ 次
   - 自动化兼容性测试、稳定性测试、性能测试
   - 机型覆盖 vivo 全系列

3. **月光宝盒 (MoonBox)** — 开源流量录制回放工具：
   - 录制线上真实流量 → 在测试环境回放
   - 自动比对回放结果，发现兼容性问题
   - 支持 HTTP/gRPC/MQ 多协议

4. **千镜内存安全检测平台**：
   - Native 层内存安全扫描（use-after-free、buffer overflow 等）
   - 集成到 CI/CD 管道，每次构建自动扫描

5. **JaCoCo 覆盖率驱动测试**：
   - 通过覆盖率数据驱动测试范围精准界定
   - 新增代码合并后自动统计覆盖率，覆盖率不达标阻塞发布

6. **全链路多版本环境管理**：
   - 同时维护多个 OriginOS 版本（开发版、体验版、稳定版）
   - 自动环境切换 + 用例路由

**企业级稳定性保障**：
- 蓝河流畅引擎从底层重构安卓性能逻辑
- 千镜内存安全检测将 Native 层质量纳入 CI 门控
- 1000+ 真机云测 + 月光宝盒流量回放 = 双保险

---

### 27.6 五大厂商测试体系横向对比

| 维度 | Google | 华为 | 小米 | OPPO | vivo |
|------|--------|------|------|------|------|
| **核心测试框架** | xTS + Tradefed | DevEco Testing | Shepherd + TestIt | PreMerge + 研发云 | VCL + MoonBox |
| **测试设备规模** | 云端 CI | 200+ 云真机 | 1800 台并行 | 未公开 | 1000+ 真机 |
| **开源贡献** | 全部开源 | Hypium | Shepherd 开源 | 无显著开源项目 | MoonBox 开源 |
| **底层优化** | Syzkaller Fuzzing | 鸿蒙内核自研 | HyperOS 模块解耦 | Apex Guard 硬件品质 | 蓝河流畅引擎 |
| **更新频率** | 月度安全补丁 | 持续迭代 | 内测→公测→稳定 | **月度固定更新** | 年度大版本 |
| **CI 集成度** | Soong+Test Mapping | CI/CD 流水线 | 内部 CI/CD | PreMerge 门禁 | 全链路多版本 |
| **安全测试** | STS + Syzkaller | 安全基础质量测试 | 安全扫描 | DevSecOps | 千镜内存安全 |
| **开发者服务** | AOSP 文档完善 | 最完整的全生命周期 | TestIt 云测 | 一键自动化测试 | VCL 多维度测试 |

### 27.7 对 RK/Allwinner CI/CD 的启示

| 厂商来源 | 可借鉴机制 | 应用于 |
|----------|-----------|--------|
| **Google** | xTS 分层测试理念 | 外设 HAL → 内核驱动 → 应用的分层测试矩阵 |
| **Google** | Syzkaller + KCOV 覆盖率引导 | 内核驱动的 Fuzzing 模糊测试 |
| **Google** | Test Mapping (代码树内嵌测试) | 内核源码目录中放置 `TEST_MAPPING` 文件定义测试 |
| **华为** | DevEco 智能遍历 | AI 驱动的外设状态机遍历测试 |
| **小米** | Shepherd 多设备并行 | 多 DUT 并发测试调度 |
| **小米** | HyperOS 模块解耦独立升级 | BSP 组件独立编译和测试，降低耦合 |
| **OPPO** | PreMerge CI 门禁 | 代码合入前强制 外设冒烟测试通过 |
| **OPPO** | 月度固定更新 + 分批灰度 | 嵌入式 OTA 的分批推送 + 自动回滚 |
| **vivo** | MoonBox 流量录制回放 | CAN/Ethernet 总线流量的录制回放测试 |
| **vivo** | 千镜内存安全 | 内核驱动的 kmemleak/KASAN 纳入 CI 管道 |
| **vivo** | JaCoCo 覆盖率驱动 | LAVA 测试的覆盖率统计与不达标阻塞 |

---

### 28.5 CI/CD 架构深度分析

openRuyi 的 CI/CD 是 **分层异构体系**，不同子项目采用最适合的技术栈：

```
┌─────────────────────────────────────────────────────────────┐
│                      如意 CI/CD 全景                           │
├───────────────────┬───────────────────┬─────────────────────┤
│  openRuyi 发行版   │  RVCK 内核        │  RuyiSDK 工具链      │
├───────────────────┼───────────────────┼─────────────────────┤
│ OBS 构建平台       │ Jenkins + LAVA     │ GitHub Actions      │
│ (build.openruyi)  │ + 自研电源管理      │ + ruyi-litester     │
│ RPM 打包           │ 4 层级测试          │ 双周迭代 CI          │
│ x86_64 + riscv64  │ 真硬件验证          │ 交叉编译矩阵         │
├───────────────────┴───────────────────┴─────────────────────┤
│ 底层支持: QEMU RVA23, qemu-user, OBS obs-build, LAVA 集群   │
└─────────────────────────────────────────────────────────────┘
```

#### 28.5.1 openRuyi 构建管道（OBS）

| 资源 | 链接 |
|------|------|
| **构建平台** | https://build.openruyi.cn |
| **开发者快速入门** | https://openruyi.cn/zh-Hans/docs/guide/quick-start-for-developers |
| **发布公告（月度）** | https://openruyi.cn/news/releases/2026-04 |

基于开源 **Open Build Service (OBS)** 的构建架构：
- **Mono-repo 模式**：所有软件包源码在同一 Git 仓库，通过 `_service` 文件按子目录抽取
- **双架构构建**：x86_64（交叉编译宿主）+ riscv64（原生验证目标）
- **qemu-user 模拟**：在 x86_64 上通过 QEMU 用户模式模拟 RISC-V 指令进行构建
- **RVA23 指令集要求**：构建环境需较新版本 QEMU（推荐 Fedora/Arch/openSUSE Tumbleweed；Ubuntu 24.04 LTS 和 Debian Stable 自带版本不支持 RVA23）

构建流程：
```
开发者 Fork → 编写 RPM Spec → Git Push
→ OBS Trigger Services 拉取源码
→ obs-build (本地 chroot + qemu-user)
→ 生成 RPM 包 → 发布至仓库
```

#### 28.5.2 RVCK 内核测试体系

RVCK 内核拥有整个如意生态中**最硬核**的测试体系，包含四层递进的测试门禁：

```
┌──────────────────────────────────────────────────────┐
│  Layer 1: pre-silicon 验证                            │
│  ├── QEMU RISC-V 模拟器 + Spike ISS 指令集模拟器       │
│  ├── openRuyi Zero 版本在 FPGA 原型上运行              │
│  └── 目标: 芯片流片前完成 BSP/固件/内核互操作性验证     │
├──────────────────────────────────────────────────────┤
│  Layer 2: 内核门禁 (Kernel Gate)                      │
│  ├── 每个 PR 触发编译 + boot + LTP 快速套件            │
│  ├── 在多块 RISC-V 开发板上真硬件执行                  │
│  └── 资源: LAVA 集群 + 自研 USB 电源管理 PCB            │
├──────────────────────────────────────────────────────┤
│  Layer 3: 回归测试 (Regression)                       │
│  ├── 每个 RC 版本触发 LTP 全量 (72h 运行)             │
│  ├── 跨平台对比: 同一内核在 SG2042/TH1520/K1 等平台     │
│  └── 性能基准: dbench/fio/iperf3/unixbench             │
├──────────────────────────────────────────────────────┤
│  Layer 4: 用户态集成测试                               │
│  ├── 发行版级 autopkgtest 类似测试                     │
│  └── 目标: 内核+用户态+应用的整体稳定性验证             │
└──────────────────────────────────────────────────────┘
```

**LAVA 硬件测试集群**：
- 使用 LAVA 调度器管理多块 RISC-V 开发板
- **自研 USB 电源管理 PCB**：解决 RISC-V 开发板无法软件控制电源的问题，实现远程上下电
- 支持自动烧录 SD 卡（类似 SDWire 机制）
- 真硬件覆盖率远超传统发行版（传统发行版 RISC-V 多为 QEMU-only）

#### 28.5.3 RuyiSDK CI/CD（双周迭代）

| 资源 | 链接 |
|------|------|
| **RuyiSDK 官网** | https://ruyisdk.cn |
| **RuyiSDK 双周报** | https://ruyisdk.org/biweekly/ |
| **RuyiSDK 测试仓库** | https://gitee.com/yunxiangluo/ruyisdk-test |
| **ruyi-litester 测试框架** | https://gitee.com/ruyisdk/ruyi-litester |
| **RISC-V 操作系统支持矩阵** | https://matrix.ruyisdk.org |
| **支持矩阵源码** | https://github.com/ruyisdk/support-matrix |

**RuyiSDK CI 特点**：

1. **ruyi-litester 敏捷测试框架**：
   - 专为 RuyiSDK 的双周迭代节奏设计
   - 轻量级，测试在 30 分钟内完成
   - 覆盖编译器、链接器、库函数的交叉编译测试

2. **交叉编译矩阵**：
   - GitHub Actions 驱动的多目标交叉编译测试
   - 覆盖 x86_64→riscv64、riscv64 native 两种场景

3. **RISC-V 操作系统支持矩阵**：
   - 跨板卡 × 跨操作系统的兼容性全景可视化
   - 记录每个 RISC-V 开发板对各 Linux 发行版的支持状态
   - 驱动芯片厂商向"一等公民"目标改进

### 28.6 稳定性与快速迭代的平衡策略

```
快速迭代 ←──────────────────────────→ 稳定性
    │                                         │
    ├─ RuyiSDK: 双周发布 (敏捷)                │
    ├─ RevyOS: 月度/按需发布                   │
    ├─ openRuyi: 月度公告 + 滚动升级            │
    └─ RVCK: 基于 6.6 LTS + 大补丁集 (稳重)     │
         │                                    │
         └────── 四层级测试递进 ──────────────┘
              Layer 1 (快速) → Layer 4 (深度)
              阻塞越早 → 迭代越快
```

**核心理念**：**验证前移 (Shift-Left)** — 尽可能在早期暴露问题：
- 芯片 bringup 阶段就用 openRuyi Zero 验证
- PR 级别门禁（Layer 2）保证主分支可启动
- LAVA 硬件集群 7×24 持续测试
- 跨厂商多平台同时测试，避免"在我这能跑"的兼容性问题

### 28.7 与传统发行版的差异化

| 维度 | Debian/Fedora (RISC-V) | openRuyi |
|------|------------------------|----------|
| **RISC-V 地位** | 二等公民（移植架构） | **一等公民**（原生架构） |
| **内核策略** | 上游 mainline 或 vendor kernel | **RVCK 统一内核**（跨厂商协作） |
| **硬件测试** | 少量 QEMU，罕见真硬件 | **LAVA 集群 + 多平台真硬件** |
| **pre-silicon** | 不支持 | **openRuyi Zero 支持** |
| **开发工具** | 独立安装 | **RuyiSDK 内置集成** |
| **指令集要求** | 基础 RV64GC | **RVA23 及以上**（充分利用新特性） |
| **治理模式** | 社区自发 | **产研协同**（芯片厂+互联网+研究所联合） |

### 28.8 关键链接全集

| 资源 | URL |
|------|-----|
| openRuyi 官网 | https://openruyi.cn |
| openRuyi GitHub | https://github.com/openRuyi-Project |
| OBS 构建平台 | https://build.openruyi.cn |
| 开发者快速入门 | https://openruyi.cn/zh-Hans/docs/guide/quick-start-for-developers |
| 2026.04 发布说明 | https://openruyi.cn/news/releases/2026-04 |
| 贡献者公约 | https://openruyi.cn/zh-Hans/governance/legal/code-of-conduct |
| RuyiSDK 官网 | https://ruyisdk.cn |
| RuyiSDK 文档站 | https://ruyisdk.org |
| RuyiSDK 双周报 | https://ruyisdk.org/biweekly/ |
| RuyiSDK 测试仓库 | https://gitee.com/yunxiangluo/ruyisdk-test |
| ruyi-litester | https://gitee.com/ruyisdk/ruyi-litester |
| RISC-V 支持矩阵 | https://matrix.ruyisdk.org |
| 支持矩阵源码 | https://github.com/ruyisdk/support-matrix |
| RevyOS 文档 | https://github.com/revyos/docs |
| RVCK 内核仓库 | https://github.com/RVCK-Project/rvck |
| RVCK 贡献统计 | https://github.com/RVCK-Project/rvck/blob/contrib-stats/docs/index.md |
| RVCK 阶段性进展 | http://openeuler.org/zh/blog/20260317-RVCK/20260317-RVCK.html |
| ISCAS 镜像站 | https://mirror.iscas.ac.cn |
| ISCAS 如意发布新闻 | https://is.cas.cn/xwdt2016/rdxw2016/202603/t20260326_8178035.html |
| LinuxLinks 评测 | https://www.linuxlinks.com/openruyi-linux-distribution-risc-v/ |
| PLCT Lab RuyiOS 公告 | https://plctlab.org/zh/news/021/ |
| 如意百度百科 | https://baike.baidu.com/item/%E5%A6%82%E6%84%8F/67538979 |

### 28.9 对 RK/Allwinner CI/CD 的启示

| 如意来源 | 可借鉴机制 | 应用于 |
|----------|-----------|--------|
| **RVCK 统一内核** | 跨厂商（三星/NXP/TI）统一内核基线 | Rockchip + Allwinner 共享内核的跨平台 QA |
| **四层级分层测试** | L1(快速冒烟) → L4(深度全量) 递进 | DUT 测试按优先级分层调度 |
| **LAVA + 自研电源管理** | 硬件自动化测试的最佳实践 | RK/Allwinner DUT 机架的电源管理方案 |
| **pre-silicon 验证** | QEMU/FPGA 早期验证 | 新板卡 bringup 前的 QEMU 模拟测试 |
| **RuyiSDK 内置集成** | 工具链与 OS 一体化 | AI Agent + 测试框架 + 内核源码的统一环境 |
| **跨平台支持矩阵** | 芯片 × OS 兼容性可视化 | RK3576/3588/T527/H618 × Debian/Yocto/Android 矩阵 |
| **产研协同治理** | 芯片厂 + OS 社区联合开发 | 与 Rockchip/Allwinner 的联合测试合作 |
