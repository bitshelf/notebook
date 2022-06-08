---
tags: Linux
---

# Linux ISO 镜像文件解压
#### 安装
~~~shell
sudo apt-get install p7zip-full p7zip-rar
~~~

#### 解压
~~~shell
 7z x ubuntu-16.10-server-amd64.iso
~~~

#### 查看 ISO 镜像文件
~~~shell
isoinfo -i ubuntu.iso -l
~~~
