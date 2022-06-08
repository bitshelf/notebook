---
tags: Ubuntu
---

## apt update  报错
```ad-error
E: Release file for http://dl.google.com/linux/chrome/deb/dists/stable/Release is not valid yet (invalid for another 2h 45min 28s). Updates for this repository will not be applied.
```

```shell
apt-get -o Acquire::Check-Valid-Until=false -o Acquire::Check-Date=false update
```

## apt-cache
用来搜索和收集软件包信息，查找可安装包的 
## apt-cache pkgnames
显示所有可安装包信息
`sudo apt-cache pkgnames keyword`  列出所有以`keyword`开头的包

## search 搜索软件包信息
~~~shell 
sudo apt-cache search keyword 
~~~
使用`search`命令可以方便地查询`keyword`匹配的软件包，并打印简介信息

## show 查询包的详细信息
~~~shell 
sudo apt-cache show pkgnames 
~~~
查询包的版本、检验和、大小、安装大小和类别等信息

# policy/madison 列出软件包的所有版本
1. `apt-cache policy pkgnames `
2. `apt-cache madison pkgnames`

## showpkg 查询依赖信息
~~~shell 
sudo apt-cache showpkg pkgnames 
~~~
查询未安装的依赖包

## stats 查询cache的统计信息
~~~shell 
sudo apt-cache stats 
~~~

# apt-get
## 使用通配符安装： 
~~~shell 
sudo apt-get install "*pkgnames*"
~~~

## 安装特定版本的软件包
1. `apt-cache madison / policy pkgnames`获取所有可安装的版本
2. `sudo apt-get install pkgnames-*`安装特定版本软件包

## changelog 查看包的更新日志
~~~shell 
sudo apt-get changelog pkgnames 
~~~


## Link
- [APT Developers · GitLab](https://salsa.debian.org/apt-team)





