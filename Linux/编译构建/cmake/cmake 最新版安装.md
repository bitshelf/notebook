---
tags:
  - cmake
---
# Ubuntu 安装最新版 cmake
## 官网下载脚本
- [Download CMake](https://cmake.org/download/) 下载对应脚本
```
sudo bash cmake-3.20.6-inux-x86_64.sh --skip-licence --prefix=/usr 
```

## 添加 apt 源
```shell
sudo apt purge --auto-remove cmake

# Obtain a copy of the signing key
wget -O - https://apt.kitware.com/keys/kitware-archive-latest.asc 2>/dev/null | gpg --dearmor - | sudo tee /usr/share/keyrings/kitware-archive-keyring.gpg >/dev/null

# Add the repository to your sources list
echo 'deb [signed-by=/usr/share/keyrings/kitware-archive-keyring.gpg] https://apt.kitware.com/ubuntu/ focal-rc main' | sudo tee -a /etc/apt/sources.list.d/kitware.list >/dev/null # ubuntu20

sudo apt update
sudo apt install cmake
```

## link
- [Kitware APT Repository](https://apt.kitware.com/)