---
tags: Docker 
---

## 重新运行 docker 
```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl restart docker.socket docker.service
# remove all containers which can cause your problem
docker rm -f <container id> 
```