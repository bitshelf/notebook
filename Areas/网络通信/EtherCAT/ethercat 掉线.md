---
tags:
  - EtherCAT
---
## 现象
同时接
1. 普通以太网
2. 工业以太网 ethercat 连接电机伺服器
3. Type-C 转 Type-A，接 Type-A U 盘（USB2.0 与 USB3.0）
4. 之前出现，后面复现有难度

## 测试命令
usb
```shell
# 进入 U 盘挂载路径
ls -l
```
ethercat
```shell
# 
```

查看日志
```shell
dmesg
```