---
tags:
  - cmake
---
## cmake 编译指定版本
```shell
wget https://github.com/Kitware/CMake/releases/download/v3.27.1/cmake-3.27.1.tar.gz
tar -zxvf cmake-{version number}.tar.gz
cd cmake-{version number}
./bootstrap
make
sudo make install
```

## link
- [Site Unreachable](https://linuxcapable.com/zh-cn/%E5%A6%82%E4%BD%95%E5%9C%A8debian-linux%E4%B8%8A%E5%AE%89%E8%A3%85cmake/)