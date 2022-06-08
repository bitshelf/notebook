---
tags: Debian
---

# Debian 换源
- [debian |清华大学开源软件镜像站 ](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)
- [debian镜像_debian下载地址_debian安装教程-阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/debian)

### Debian 10（buster）
```shell:/etc/apt/sources.list
deb https://mirrors.aliyun.com/debian/ buster main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ buster main non-free contrib
deb https://mirrors.aliyun.com/debian-security buster/updates main
deb-src https://mirrors.aliyun.com/debian-security buster/updates main
deb https://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb https://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
```

### Debian11 （bullseye）
```shell:/etc/apt/sources.list
deb https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb-src https://mirrors.aliyun.com/debian-security/ bullseye-security main
deb https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb-src https://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
```
## Debian 全球镜像站列表
[Debian -- Debian 全球镜像站](https://www.debian.org/mirror/list)