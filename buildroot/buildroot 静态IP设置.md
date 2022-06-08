---
tags: buildroot
---

# buildroot 静态 IP 设置
## 命令行配置
```shell
ip link set eth0 down
ip addr add 192.168.2.117/24 dev eth0
ip route add default via 192.168.2.1 dev eth0
ip link set eth0 up
```
### `ifconfig`
```shell
sudo ifconfig eth0 192.168.1.1 netmask 255.255.255.0 
```

## 配置文件配置
```shell
# /etc/network/interfaces
auto lo

iface lo inet loopback
iface eth0 inet static
address 192.168.1.2
netmask 255.255.255.0
gateway 192.168.1.1
#iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp
```

### 使配置生效
```shell
ifdown eth0 
ifup eth0
```

- `/etc/wpa_supplicant/wpa_supplicant. conf`
- `wpa-roam` 是一种您可以浏览和连接到无线网络的方法。
设置的结果是，如果未连接以太网电缆，则 wlan0 优先，并将您连接到所需的无线网络、可用的开放无线网络或预定的无线网络。如果您连接了以太网电缆，有线网络连接会立即关闭 WiFi 访问，然后 eth0 会将您连接到有线网络。拔下网线后，无线连接将立即恢复

```shell
# /etc/network/interfaces
allow-hotplug eth1
iface eth1 inet manual
    wpa-driver wext
    wpa-roam /etc/wpa_supplicant/wpa_roam.conf

# id_str="uni"
iface uni inet dhcp

# id_str="home_static"
iface home_static inet static
        address 192.168.0.20
        netmask 255.255.255.0
        network 192.168.0.0
        broadcast 192.168.0.255
        gateway 192.168.0.1
```
---

```shell
network={
        ssid="foo"
        key_mgmt=NONE
        # this id_str will notify /sbin/wpa_action to 'ifup uni'
        id_str="uni"
}

network={
        ssid="bar"
        psk=123456789...
        # this id_str will notify /sbin/wpa_action to 'ifup home_static'
        id_str="home_static"
}
```
