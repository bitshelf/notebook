---
tags: Ubuntu
---

# Ubuntu 编译缺少头文件
#### 安装库文件
```shell
sudo apt-get install libx11-dev
```

#### 安装依赖软件包
```shell
sudo apt-get install apt-file
sudo apt-file update
```

#### 搜索软件包名
```shell
apt-file search XXXX.h
```