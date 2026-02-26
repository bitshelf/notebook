---
tags:
  - 异地组网
---
## 安装 podman
```shell
sudo apt install podman podman-compose
```

## 编写 docker-compose.yml
```yml
services:
  watchtower: # 用于自动更新easytier镜像，若不需要请删除这部分
    image: m.daocloud.io/docker.io/containrrr/watchtower
    container_name: watchtower
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
      - WATCHTOWER_NO_STARTUP_MESSAGE
    volumes:
      - /run/podman/podman.sock:/run/podman/podman.sock
    command: --interval 3600 --cleanup --label-enable
  easytier:
    # image: easytier/easytier:latest # 国内用户可以使用 m.daocloud.io/docker.io/easytier/easytier:latest
    image: m.daocloud.io/docker.io/easytier/easytier:latest
    hostname: easytier
    container_name: easytier
    labels:
      com.centurylinklabs.watchtower.enable: 'true'
    restart: unless-stopped
    network_mode: host
    cap_add:
      - NET_ADMIN
      - NET_RAW
    environment:
      - TZ=Asia/Shanghai
    devices:
      - /dev/net/tun:/dev/net/tun
    volumes:
      - ./:/root
      - /etc/machine-id:/etc/machine-id:ro # 映射宿主机机器码
    command: -d --network-name wukong --network-secret wukong_passwd@
```

## 启动 Podman 的 Socket 服务
```shell
systemctl enable --now podman.socket
```
## 启动 easytier 进程
```shell
podman-compose up -d

# 查看运行中容器
podman ps
```

## Link
- [安装 (命令行程序) \| EasyTier - 简单、安全、去中心化的异地组网方案](https://easytier.cn/guide/installation.html)