---
tags:
  - allwinner/SWUpdate
---
## OTA
- OTA 是 Over The Air 的简称, 通过网络从服务器上下载更新文件, 对本地系统或
者文件进行升级, 便于客户为其用户及时更新系统和应用程序

## 实现方式
1. **原地升级**：flash 上只有一个系统，系统运行时对系统分区进行写操作
2. **AB 系统升级**：一个作为运行时系统，一个作为备份系统，运行时系统升级备份系统
3. **Recovery 系统升级**：主系统升级 recovery, recovery 升级主系统
### 优点和缺点
1. 原地升级：系统简单，但风险大，升级过程中掉电会导致设备工作异常
2. AB 系统升级：系统配置简单，风险小，可防止异常掉电，但需要系统不能太大
3. Recovery 系统升级：recovery 可以做到精简，风险小，可防止异常掉电，但系统配置麻烦

## Link
- [events17.linuxfoundation.org/sites/events/files/slides/SWUpdateELCE2017.pdf](http://events17.linuxfoundation.org/sites/events/files/slides/SWUpdateELCE2017.pdf)