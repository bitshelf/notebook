---
tags: Linux/command Wi-Fi
---

# linux 配置文件
* `/etc/resolv. conf` 域名解析的地址配置文件，通过命令 `udhcpc -i wlan0` 可以从 DHCP 服务器上获取 IP 地址和有效的 DNS 并自动写入这个文件
* `/etc/network/interfaces` 网卡配置文件
* `/etc/wpa_supplicant. conf` 无线网卡连接配置文件
## WiFi 连接
1. 将 WiFi 名字，WiFi 密码写入到配置文件 
	> ` wpa_passphrase SSID password > /etc/wpa_supplicant. conf`
2. 指定节点使用配置文件连接 WiFi 
	> `wpa_supplicant -i wlan0 -c /etc/wpa_supplicant.conf -B`
3. 指定通过 wlan0 连接网络
	> `udhcpc -i wlan0`
* `wpa_cli -i wlan0 scan` 启动扫描
* `wpa_cli -i wlan0 scan_results` 查看扫描结果
# iw
* `iw dev wlan0 scan`    扫描
* `iw dev wlan0 link` 获得链路状态
* `iw list`    获得所有设备的功能，如带宽信息（2.4GHz，和 5GHz），和 802.11n 的信息
* `iw wlan0 connect AP` : 无加密
* `iw wlan0 connect apname keys d:0 123456878` *d*:default, $0$ : 第 0 个密码
# iwlist
* `iwlist wlan0 scan` 使用无线网卡 wlan0 扫描可见的 wifi
* `iwlist wlan0 scan | grep SSID` 只显示名称，不过一般使用 wpa_cli 命令搜索 wifi 
# [[Areas/网络通信/WiFi/wpa_cli|wap_cli]]
>**wpa_supplicant** 工具包含 wpa_supplicant 和 wpa_cli 这 2 个程序，其中 wpa_supplicant 程序作为服务端在后台运行，服务 wpa_cli 客户端的请求，从而实现 WiFi 的配置连接 

