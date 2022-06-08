---
tags:
  - Rockchip/Openeuler
---
## 安装 oebuild
```shell
# 安装必要的软件包
sudo apt-get install python3 python3-pip docker docker.io
pip install oebuild

# 配置docker环境
sudo usermod -a -G docker $(whoami)
sudo systemctl daemon-reload && sudo systemctl restart docker
sudo chmod o+rw /var/run/docker.sock
```
- oebuild是openEuler Embedded孵化的一个开源项目，是为了辅助开发openEuler Embedded项目而衍生的辅助开发工具

## 初始化oebuild目录
```shell
oebuild init <directory>
```

## 更新oebuild运行环境
```shell
oebuild update
```

## 创建编译配置文件
```shell
oebuild generate
```

## 执行构建操作
```shell
oebuild bitbake openeuler-image
```

## link
- [基于 oebuild 快速构建 — openEuler Embedded在线文档 1.0.0 documentation](https://embedded.pages.openeuler.org/openEuler-23.03/yocto/oebuild.html#openeuler-embedded-oebuild)