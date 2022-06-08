---
tags: Ubuntu Network
---

# Ubuntu DNS 配置
##  `/etc/network/interfaces`
```config
dns-nameservers 12.34.56.78 12.34.56.79
```

## NetworkManager
在`/etc/sysconfig/network-scripts/ifcfg-*`添加
```
DNS1=127.0.0.1
DNS2=8.8.8.8
DNS3=8.8.4.4
```

## DHCP 客户端配置
在配置文件：`/etc/dhcp/dhclient.conf.`
```
supersede domain-name-servers 12.34.56.78, 12.34.56.79
```
或者
```
prepend domain-name-servers 12.34.56.78, 12.34.56.79
```

# Link
- [NetworkConfiguration - Debian Wiki](https://wiki.debian.org/zh_CN/NetworkConfiguration)