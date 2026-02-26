---
tags:
  - 异地组网
---
## 安装
```shell
TAG=$(curl -s https://api.github.com/repos/EasyTier/EasyTier/releases/latest | grep tag_name | cut -d'"' -f4)
echo "Latest version: $TAG"
cargo install --git https://github.com/EasyTier/EasyTier.git --tag $TAG easytier-core easytier-cli

# 设置权限
sudo setcap cap_net_admin=eip ~/.cargo/bin/easytier-core

# 启动服务
systemctl --user start easytier@default.service
```
## 配置文件
- `~/.config/easytier/default.yaml`
```toml
dhcp = false

listeners = [
    "tcp://0.0.0.0:11010",
    "udp://0.0.0.0:11010",
    "wg://0.0.0.0:11011",
    "ws://0.0.0.0:11011/",
    "wss://0.0.0.0:11012/",
]
exit_nodes = []
# rpc_portal = "0.0.0.0"
socks5_proxy = "socks5://0.0.0.0:7866"

[flags]
enable_kcp_proxy = true
enable_quic_proxy = true
private_mode = true
```