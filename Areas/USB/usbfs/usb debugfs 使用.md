---
tags:
  - usbfs
---
## usb总线上的设备信息
进入到/sys/bus/usb/devices文件进行查看, 该文件列出了所有设备在usb总线上的挂载情况
```shell
ls /sys/bus/usb/devices/ -l
```
1. 以usb开头的代表usb controller (可以理解usb驱动) 也就是一个roothub即代表一个usb总线，后面跟着的数字即代表总线号，从1开始递增。如：usb1 usb2 usbx等
2. “1-0:1.0” “2-0:1.0” 是一个特殊的实例，代表是一个root hub接口。
“1-0:1.0” 就代表总线1的root hub， “2-0:1.0” 就代表总线2的root hub

## debugfs中的设备拓扑信息
```shell
cat /sys/kernel/debug/usb/devices
```

### T（Topology )
```
T:   Bus=dd Lev=dd Prnt=dd Port=dd Cnt=dd Dev#=ddd Spd=ddd MxCh=dd
|      |     |      |       |       |      |        |        |__最⼤⼦设备
|      |     |      |       |       |      |        |__设备速度（Mbps）
|      |     |      |       |       |      |__设备编号
|      |     |      |       |       |__这层的设备数
|      |     |      |       |__此设备的⽗连接器/端⼝
|      |     |      |__⽗设备号
|      |     |__此总线在拓扑结构中的层次
|      |__总线编号
|__拓扑信息标志

```

### B（Bandwidth)
```
B:   Alloc=ddd/ddd us (xx%), #Int=ddd, #Iso=ddd
|       |                      |         |__同步请求编号
|       |                      |__中断请求号
|       |__分配给此总线的总带宽
|__带宽信息标志

```
### D（Device descriptor info)
```
D:   Ver=x.xx Cls=xx(sssss) Sub=xx Prot=xx MxPS=dd #Cfgs=dd
|       |      |             |      |       |        |__配置编号
|       |      |             |      |       |______缺省终端点的最⼤包尺⼨
|       |      |             |      |__设备协议
|       |      |             |__设备⼦类型
|       |      |__设备类型
|       |__设备USB版本
|__设备信息标志编号#1

```

## Link
- [usb设备拓扑关系\_usbfs-CSDN博客](https://blog.csdn.net/sevenjoin/article/details/129375854)