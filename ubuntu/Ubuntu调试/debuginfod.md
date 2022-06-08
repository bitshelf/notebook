---
tags:
  - GDB
---

## 安装 debuginfod
```shell
sudo apt update 
sudo apt -y install debuginfod
```

- 设置调试服务器：`export DEBUGINFOD_URLS="https://debuginfod.ubuntu.com"`

## Link 
- [Service - Debuginfod | Ubuntu](https://ubuntu.com/server/docs/service-debuginfod)