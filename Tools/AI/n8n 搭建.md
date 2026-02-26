---
tags:
  - n8n
---
## n8n 搭建
- 启动 docker-compose
```shell
docker-compose up -d
```
- 停止并删除容器（不删数据卷）
```shel
docker-compose down
docker-compose -f compose-configs/docker-compose.n8n-postgres.yml down
```
- 查看运行中的容器
```shell
docker container ls

# 查看运行中容器的数据
docker inspect
```
- 查看 docker-compose 日志
```shell
docker-compose -f docker-compose.n8n-postgres.yml logs
```


## n8n 使用
1. 启动 n8n compose
```shell
docker-compose up -d
```

2. 浏览器访问
```
192.168.1.203:5678/
```

## Link
- [AtomGit n8n](https://gitcode.com/JZ_Loh/n8n)