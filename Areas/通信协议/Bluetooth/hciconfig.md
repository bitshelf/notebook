---
tags: [bluetooth hciconfig]
---

# hciconfig
> [!info] rfkill
> 
>1. 查看所有射频
> ```shell
> rfkill list
> ```
> 
> 2. 取消阻止/打开蓝牙堆栈
> ```shell
>sudo rfkill block/unblock bluetooth
> ```

#### 查看设备节点
```shell
hciconfig -a
```
#### 给蓝牙设备上电，开启设备节点
~~~shell
hciconfig hci0 up
~~~

#### 蓝牙扫描
```shell
hcitool scan
```

#### 蓝牙设置
~~~shell
hciconfig hci0 leadv 0
hciconfig hci0 piscan
~~~
> [!info] 蓝牙搜索和连接
> - 开启 Inquiry Scan： 可以被搜索
> - 开启 Page Scan：可以被连接

#### hciconfig 子命令说明
~~~shell
hciconfig [-a] hciX [command ...]
~~~
- `piscan` ：将 Page Scan 和 Inquiry Scan 都打开
- `iscan` ：仅打开 Inquriy Scan
- `pscan` ：仅打开 Page Scan
- `noscan` ：关闭 Page Scan 和 Inquiry Scan
- `hciconfig hci0 leadv [type]` 可以控制 adapter 发 LE Adverting，type 参数为 advertisingtype（0～4）
- 用 `hciconfig hci0 noleadv` 停止 advertising
#### 设置蓝牙参数并开启
```shell
brcm_patchram_plus1 --bd_addr_rand --enable_hci --no2bytes --use_baudrate_for_download --tosleep 200000 --baudrate 1500000 --patchram /BCM4345C5.hcd /dev/ttyS0 &

hciconfig hci0 up
```

####  查看设备是否被连接
~~~shell
hciconfig
~~~

> [!info] 蓝牙 bluetoothctl  控制
> - 使用 bluetoothctl 也可以打开可发现和可连接模式，输入 `discoverable on` 可以同时打开 discoverable 和 connectable
> - 默认情况开启的是 limited discoverable，时间为 180s
> - 如果希望 discoverable 一直开着，则设置 main. con 中的 DiscoverableTimeout 为 0。不过使用 discoverableon 不会打开 LE advertising
> - 打开蓝牙广播，可以使用 `hciconfig hci0 leadv`，也可以使用 `hcitool cmd` 发送 HCI LE commands 设置广播格式并开启广播
