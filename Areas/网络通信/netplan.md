---
tags: Network
---

# Netplan
## 配置文件
1. `/run/netplan/*.yaml`
2. `/etc/netplan/*.yaml`
3. `/lib/netplan/*.yaml`

> [!NOTE] 覆盖关系
> $1$ 覆盖 $2$，$2$ 覆盖 $3$
* netplan 默认由 systemd-networkd 接管，除非指定由 NetworkManger

---
1. 应用更改：`sudo netplan apply`
2. 测试配置是否有语法错误：`sudo netplan try`
3. 排错：`sudo netplan --debug apply`
### 示例
```yaml:/etc/netplan/50-cloud-init.yaml
# This file is generated from information provided by
# the datasource.  Changes to it will not persist across an instance.
# To disable cloud-init's network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
     dhcp4: no
     addresses: [192.168.1.233/24]
     gateway4: 192.168.1.1
     nameservers:
       addresses: [8.8.8.8,8.8.4.4]
```





---
# Links & Refrences
1. [Ubuntu Manpage: netplan - YAML network configuration abstraction for various backends](https://manpages.ubuntu.com/manpages/jammy/man5/netplan.5.html)
2. <https://ubuntu.com/blog/ubuntu-bionic-netplan>
3. [[Areas/网络通信/index-netplan|netplan-md]]