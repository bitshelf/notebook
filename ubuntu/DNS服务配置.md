---
tags: Ubuntu Network
---

# DNS 服务配置
1. 配置文件：`/etc/systemd/resolved.conf`
2. 查看当前使用的 DNS 配置
	1. `systemd-resolve --status`
	2. `resolvectl status`
3. 使用 `systemd-resolved` 配置 DNS
```shell
sudo systemctl daemon-reload
sudo systemctl restart systemd-networkd
sudo systemctl restart systemd-resolved
```

# Link 
1. [systemd-resolved - ArchWiki](https://wiki.archlinux.org/title/systemd-resolved)