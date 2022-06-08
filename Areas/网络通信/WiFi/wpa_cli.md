---
tags: Linux/command Wi-Fi
---

> [!info] wpa_supplicant
> 
> `wpa_supplicant` 是一个连接、配置 WIFI 的工具，它主要包含 wpa_supplicant 与 wpa_cli 两个程序。通常情况下，可以通过 wpa_cli 来进行 WIFI 的配置与连接
> 

---
# 使用交互式连接 Wifi

> [!error] wpa_cli 报错
> ```shell
> root@RK3588:/# wpa_cli
wpa_cli v2.9
Copyright (c) 2004-2019, Jouni Malinen <j@w1.fi> and contributors
>
This software may be distributed under the terms of the BSD license.
See README for more details.
>
Interactive mode
>
>Could not connect to wpa_supplicant: (nil) - re-trying
> ```
> 解决办法：
> ```shell
> wpa_supplicant -iwlan0 -Dnl80211 -c /etc/wpa_supplicant.conf -B
> ```

1. 指定接口：`wpa_cli -i wlan0`
2. 在交互模式下，扫描 WiFi：`scan`（`wpa_cli scan`/`wpa_cli -i wlan0 scan`)
3. 退出交换式 wpa_cli: `quit`
* 自动分配IP：`udhcpc -i wlan0 -q`

# 直接在命令输入SSID与密码
1. 直接使用SSID与密码连接
```shell
 wpa_supplicant -B -i interface -c <(wpa_passphrase MYSSID passphrase)
```
3. 保存SSID与密码到配置文件
```shell
 wpa_passphrase MYSSID passphrase
 wpa_passphrase MYSSID passphrase > /etc/wpa_supplicant/example.conf
```

# 使用配置文件连接 WiFi
1. 在 wpa_supplicant. conf 文件中添加 WiFi 的用户名、密码 
	~~~shell
	#vim /etc/wpa_supplicant.conf 
	network={
		ssid="username" #用户名
		psk="password" #密码
		key_mgmt=WPA-PSK #加密方式
	}
	~~~
1. 在命令行启动 wpa_supplicant 程序
	~~~shell 
	wpa_supplicant -i wlan0 -D nl80211 -c /etc/wpa_supplicant.conf -B
	~~~
* `-B` - Fork into background
* `-c filename` Path to configuration file
* `-i interface` - Interface to listen on
* `-D driver` -Optionally specify the driver to be used. For a list of supported drivers see the output of `wpa_supplicant -h`
	* `nl80211` is the current standard, but not all wireless chip's modules support it
	* `wext` is currently deprecated, but still widely supported

## 启动 `wpa_supplicant` 应用
~~~shell
wpa_supplicant -D nl80211 -i wlan0 -c /etc/wpa_supplicant.conf -B
echo 1 > /sys/class/rfkill/rfkill1/state #打开 WiFi
~~~

# 启动 `wpa_cli` 应用
~~~shell
wpa_cli -i wlan0 scan             # 搜索附近 wifi 网络
wpa_cli -i wlan0 scan_result      # 打印搜索 wifi 网络结果
wpa_cli -i wlan0 add_network      # 添加一个网络连接
~~~
* 连接加密方式是 `[WPA-PSK-CCMP+TKIP][WPA2-PSK-CCMP+TKIP][ESS]` (`wpa` 加密)，`wifi` 名称是 `name`，`wifi` 密码是：`psk`
~~~shell
wpa_cli -i wlan0 set_network 0 ssid '"name"'
wpa_cli -i wlan0 set_network 0 psk '"psk"'
wpa_cli -i wlan0 enable_network 0
~~~
* 连接加密方式是 `[WEP][ESS]` (`wep` 加密)，`wifi` 名称是 `name`，`wifi` 密码是 `psk`
~~~shell
wpa_cli -i wlan0 set_network 0 ssid '"name"'
wpa_cli -i wlan0 set_network 0 key_mgmt NONE # 连接无密码 WiFi
wpa_cli -i wlan0 set_network 0 wep_key0 '"psk"'
wpa_cli -i wlan0 enable_network 0
~~~

## 分配 *ip/netmask/gateway/dns*
~~~shell
udhcpc -i wlan0 -s /etc/udhcpc. script -q
~~~
执行完毕，就可以连接网络
## 保存连接
~~~shell
wpa_cli -i wlan0 save_config
~~~

## 断开链接
~~~shell
wpa_cli -i wlan0 disable_network 0    #与 id0 的网络进行断开
wpa_cli -i wlan0 remove_network 0     #将 id0 的网络移除掉, 必须先断开才
wpa_cli -i wlan0 save_config          #并更新 wpa_supplicant.conf 文件
~~~

## 连接已有的连接

```shell 
wpa_cli -i wlan0 list_network             列举所有保存的连接
wpa_cli -i wlan0 select_network 0         连接第1个保存的连接
wpa_cli -i wlan0 enable_network 0         使能第1个保存的连接
```
## 查看网卡当前连接的信息
```shell
wpa_cli -i wlan0 status          #查看当前网卡是处于什么状态
wpa_cli -i wlan0 list_network    #查看当前连接的是哪个网络
```

# 断开`wifi`
```shell
ifconfig wlan0 down
killall udhcpc
killall wpa_supplicant
```

---
# Link
* <https://wiki.archlinux.org/title/wpa_supplicant>



