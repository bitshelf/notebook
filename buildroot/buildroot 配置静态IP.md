## 在 `/etc/dhcpcd.conf` 追加静态 IP 配置信息
~~~config
interface eth0  
static ip_address=192.168.1.235/24       #配置 IP 地址  
static routers=192.168.1.1               #网关  
static domain_name_servers=8.8.8.8       #DNS
~~~

