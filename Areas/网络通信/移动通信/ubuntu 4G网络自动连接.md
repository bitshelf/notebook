---
tags: Ubuntu Network
---

# 配置自动连接
1. 打开 4G 模块
```shell
nmcli r wwan on
```
1. 查询当前使用的ttyUSB节点
```shell
nmcli d
```
1. 添加配置， **`ttyUSB*`节点取决于 nmcli d** 的查询结果
2. 命令`sudo nmcli c add type gsm  con-name MobileNet ifname ttyUSB2 apn wap user <usernme> password <userpasswd>`
* 示例
```shell
sudo nmcli c add type gsm con-name MobileNet ifname ttyUSB2 apn wap user rpdzkj password rpdzkj
```
1. 此时插上 4G 模块，ubuntu 会自动连接 4G 网络

> [!info] 重启
>重启后，不用再次连接
## 删除连接
~~~shell 
sudo nmcli c delete 连接名称
~~~
**如果存在多个连接，则默认使用第一个**
## 手动连接
~~~shell 
sudo nmcli d connect ttyUSB*
~~~
**`ttyUSB*`节点取决于 nmcli d** 的查询结果
