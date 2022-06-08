---
tags: apt Ubuntu 
---

# 依赖
检查是否有损坏的依赖
```shell
sudo apt-get check
```
卸载出错 ”为满足依赖的软件包“
```shell 
sudo apt-get remove --purge <packagename>
# 系统中卸载软件包 foo 和它的配置文件
sudo apt purge foo
```
查看命令所属软件包
~~~shell
apt-cache search command
~~~
查看 net-tools 包的信息
~~~shell
apt-cache show net-tools
cat /proc/version
~~~
单独升级软件包
```shell
sudo apt-get install --only-upgrade <package>
```
# 版本升级
1. 滚动升级版本：`do-release-upgrade`

---
## Link
- [第 8 章 Debian 软件包管理工具](https://www.debian.org/doc/manuals/debian-faq/pkgtools.zh-cn.html)