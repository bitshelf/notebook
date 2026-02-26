---
tags:
  - Ubuntu
---
## Ubuntu 使能自动更新
```
sudo tee /etc/apt/apt.conf.d/20auto-upgrades >/dev/null <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF

sudo systemctl enable --now unattended-upgrades
```