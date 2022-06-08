---
tags:
  - dpcp
---
## 内核配置
```
CONFIG_IP_PNP=y
CONFIG_IP_PNP_DHCP=y
```
### 配合 udev
```
CONFIG_INOTIFY_USER=y
```

## buildroot 配置
```config
BR2_PACKAGE_DHCP=y
BR2_PACKAGE_DHCP_CLIENT=y
BR2_PACKAGE_DHCPCD=y
```
