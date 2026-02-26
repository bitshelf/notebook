---
tags:
  - podman
---
## Debian 安装 podman
```shell
sudo apt  update
sudo apt install podmam uidmap slirp4netns
```

### 测试 podman
```shell
podman run docker.m.daocloud.io/library/hello-world
```