1. 使用`ifconfig`查看以太网使用那一块网卡
2. `vim /etc/network/interfaces`添加如下信息 
	```bash
	iface eth0 
	iface eth0 inet static
	address 192.168.1.90
	gateway 191.168.1.1
	netmask 255.255.255.0
	```
3. `vim /etc/resolvconf/resolv.conf.d/head` 添加 DNS 服务后器，然后 reboot 板子生效 
~~~
nameserver 8.8.8.8
~~~
