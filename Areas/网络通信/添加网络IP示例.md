---
tags: Network
---

# 添加网络 IP 示例
1. 为节点添加 IP

~~~shell
sudo ip addr add 10.102.66.200/24 dev enp0s25
~~~

2. 重启网络节点

~~~shell
ip link set dev enp0s25 up
ip link set dev enp0s25 down
~~~

3. 查看添加网络情况
~~~shell
ip address show dev enp0s25
~~~

4. 添加路由
~~~shell
sudo ip route add default via 10.102.66.1
~~~

5. 查看路由
~~~shell
ip route show
~~~

6. 清除临时网络设置
~~~shell
ip addr flush eth0
~~~
使用 flush 命令不会清除`/etc/resolv.conf`的内容，重启之后，`/etc/systemd/resolve/stub-resolv.conf` 重新写入 `/etc/resolv.conf`
