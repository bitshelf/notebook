---
tag: iperf
---

# 以太网测试
## UDP 测试
1. 服务端运行：`iperf -s -b 1600M -i 1`
2. 客户端运行：`iperf -u -c 192.168.1.95 -b 1000M -i 1 -t 20 -w 512K`
3. Iperf3 客户端：`iperf3 -u -c 192.168.1.95 -b 1000M -i 1 -t 20 -w 512K`
**iperf3 服务器端不用 `-u`** ：服务器会自动确定协议
## TCP 测试
1. 服务端运行：`iperf -s -i 1`
2. 客户端运行：`iperf -c 192.168.1.95 -i 1 -t 43200 -w 1M`
---
* `-s` : 表示作为服务端
* `-c` : 表示作为客户端
* `-i 1` : 表示间隔 1 秒显示一次传输数据（Reporting intervals）
* `-p` : 表示使用网络端口号，如果执行时出现错误有可能端口号被占用，可换个端口号试下
* `-t` : 表示总测试时间，单位：秒
* `-w` : 表示 TCP window 大小（socket buffer size），如果 TCP window 较小会导致传输速度偏小，无法体现最大传输速度
* `-u` : 表示使用 udp 协议，可以测试丢包率
* `-b` : 表示指定带宽
* `-l` ： Setting the iPerf buffer 
* `-B` : 绑定网络接口（Bind to specific interfaces）
* `-f` ：改变输出的数字格式
* `-F/--file name` : 测试所用文件的文件(xmit/recv the specified file)
* `-t` ：长度测试
* `-P` ：并行测试（Parallel streams）
* `-D` : 在后台以守护进程运行(Run the server in background as a daemon)
---
# iperf 3.0
* `-R` : 反转测试模式，服务器发送，客户端接收
* `-V/--verbose` ：查看更多详细信息
* `-J` ：输出 JSON 格式
* `-Z` ：使用零拷贝模式，占用更少的 CPU
* `-T` ：每次的前缀标题
* `-4` ：只使用 IPv4
* `-6` ：只使用 IPv6
* `--logfile file` : 输出到日志文件
* `--sctp` ：使用 SCTP，不用 TCP

## iperf3 工作原理
iperf3 主要的功能是测试基于特定路径的带宽，在客户端和服务器端建立连接（三次握手）后，客户端发送一定大小的数据报并记下发送的时间，或者客户端在一定的时间内发送数据并记下发送的总数据。带宽的大小等于发送的总数据除以发送的总时间。对服务器端来说，在连接建立时间内，接收的总数据除以所花时间即为服务器端所测得的带宽。

iperf3 测试 UDP 的性能时，客户端可以指定 UDP 数据流的速率。客户端发送数据时，将根据客户提供的速率计算数据报发送之间的时延，客户还可以指定发送数据报的大小。每个发送的数据报包含一个 ID 号，用来唯一地标识该报文。服务器端则根据该 ID 号来确定数据报丢失和乱序。当把 UDP 报文大小设置可以将整个报文放入 IP 层的包（packet）内时，那么 UDP 所测得的报文丢失数据即为 IP 层包的丢失数据。这提供了一个有效的测试包丢失情况的方法。数据报传输延迟抖动（Jitter）的测试由服务器端完成，客户发送的报文数据包含有发送时间戳，服务器端根据该时间信息和接收到报文的时间戳来计算传输延迟抖动。传输延迟抖动反映传输过程中是否平滑。由于它是一个相对值，所以并不需要客户端和服务器端时间同步

### 反向带宽测试
服务端使用的命令不变，客户端需要加上参数-R，在帮助信息中，可以看到-R 的信息是 run in reverse mode (server sends, client receives)

### 同步双向带宽测试
- 客户端加上命令参数 -bidir
```shell
# 服务端：
iperf3 -s -p 6868
# 客户端：
./bin/iperf3 -c 172.17.5.159 -p 6868 -u -b 100M -bidir
```

### Link
[OpenHarmony Liteos_A内核之iperf3移植心得](https://mp.weixin.qq.com/s/z0_9jQWBJKDYtx05olz8aw)