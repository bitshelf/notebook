---
tags: Network
---

# lshw 查看网络状态
1. `sudo lshw -class network` （`lshw` 命令需要安装）
2. 使用 ethtool 工具查看：`sudo ethtool eth0`

# nmcli 静态 IP 设置
1. 查看 nmcli 网络接管：`nmcli c`
2. 配置网络
```shell
nmcli con mod "Wired connection 1"
  ipv4.addresses "HOST_IP_ADDRESS/IP_NETMASK_BIT_COUNT"
  ipv4.gateway "IP_GATEWAY"
  ipv4.dns "PRIMARY_IP_DNS,SECONDARY_IP_DNS"
  ipv4.dns-search "DOMAIN_NAME"
  ipv4.method "manual"/ipv4.method "auto"

# example
nmcli con mod "Wired connection 1" \
ipv4.address 192.168.2.120/24 \
ipv4.gateway 192.168.2.1 \
ipv4.dns 114.114.114.114 \
ipv4.method "manual"

nmcli con reload
nmcli  c down "Wired connection 1"
nmcli  c up "Wired connection 1"

# or
nmcli d mod enP4p65s0 ipv4.address 192.168.2.122/24
```
> [!info] nncli 配置网络
> `nmcli con add ...`

或者直接修改目录下的配置文件：`/etc/NetworkManager/system-connections/`

# 使用`/etc/network/interfaces`
1. 删除 nmcli 接管：`nmcli c delete eth0`
2. `nmcli connection down` : 停用一个设备的连接，但不阻止该设备进一步自动激活。
3. `nmcli device disconnect` :断开一个设备的连接，防止自动激活
4. 添加配置文件
```conf
allow-hotplug eth0
iface eth0 inet static
address 192.168.1.139
netmask 255.255.255.0
gateway 192.168.1.1
```

---
### Link 
- [27 nmcli command examples (cheatsheet), compare nm-settings with if-cfg file | GoLinuxCloud](https://www.golinuxcloud.com/nmcli-command-examples-cheatsheet-centos-rhel/) 
- [3.3. Configuring IP Networking with nmcli Red Hat Enterprise Linux 7 | Red Hat Customer Portal](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-configuring_ip_networking_with_nmcli)