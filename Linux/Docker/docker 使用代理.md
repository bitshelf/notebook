---
tags:
  - Docker
---
## 系统代理
```shell:/etc/systemd/system/docker.service.d/http-proxy.conf
# /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://192.168.1.175:7897"
Environment="HTTPS_PROXY=http://192.168.1.175:7897"
```

## 重启 docker
```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```