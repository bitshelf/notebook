---
tags:
  - brew
---
## 替换源
```shell
cat << 'EOF' >> ~/.bashrc

# Homebrew 腾讯云镜像配置
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.cloud.tencent.com/homebrew/brew.git"
export HOMEBREW_API_DOMAIN="https://mirrors.cloud.tencent.com/homebrew/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.cloud.tencent.com/homebrew/homebrew-bottles"
EOF

# 使配置立即生效
source ~/.bashrc
```