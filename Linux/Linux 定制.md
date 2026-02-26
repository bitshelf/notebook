---
tags:
  - Debian
---
# 全局时区配置
~~~shell 
ln -fs /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
~~~
即配置/etc/localtime为需要的时区
# chroot 虚拟运行文件系统，安装虚拟工具
~~~shell 
sudo apt install qemu-user-static
~~~
## qemu环境准备
* ARM平台环境 
~~~shell 
sudo cp /usr/bin/qemu-arm-static usr/bin/
~~~
* ARM64平台环境
~~~shell 
 sudo cp /usr/bin/qemu-aarch64-static usr/bin/
~~~
### 拷贝DNS （不拷贝的虚拟运行后可能不能联网）
~~~shell 
sudo cp /etc/resolve.conf etc/resolve.conf
~~~
