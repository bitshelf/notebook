---
tags: Docs
---

# sphnix 安装
1. 安装软件包
```shell
sudo apt install python3-sphinx-autobuild
```

---
* 启动 HTTP 服务
```shell
sphinx-autobuild source build/html
```
默认启动 8000 端口，在浏览器输入 http://127.0.0.1:8000