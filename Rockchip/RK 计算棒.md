---
tags: Rockchip
---

# RK 计算棒支持
1. 内核开启 RNDIS 支持
```config
CONFIG_USB_NET_RNDIS_HOST=y
CONFIG_USB_U_ETHER=y
CONFIG_USB_F_ECM=m
CONFIG_USB_F_SUBSET=m
CONFIG_USB_F_RNDIS=y
CONFIG_USB_CONFIGFS_RNDIS=y
CONFIG_USB_ETH=m
CONFIG_USB_ETH_RNDIS=y
CONFIG_USB_FUNCTIONFS=y
CONFIG_USB_FUNCTIONFS_RNDIS=y
```

```
sudo nmcli connection add con-name toybrick type ethernet ifname enx10dcb69f359d autoconnect yes ip4 192.168.180.1/24
```

# Link
- [Toybrick Wiki](https://t.rock-chips.com/wiki.php?filename=%E6%9D%BF%E7%BA%A7%E6%8C%87%E5%8D%97/TB-RK1808S0#hash_6)
- [TB-RK3399ProD wiki](https://t.rock-chips.com/en/wiki.php?filename=Board_Guide/TB-RK1808S0)