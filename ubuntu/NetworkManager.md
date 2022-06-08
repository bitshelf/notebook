---
tags: Network Linux command 
---

# nmcli
1. 命令行帮助：`nmcli --help` `nmcli device --help` 或者使用
	~~~shell
	nmcli> print
	~~~
2. `nmcli d disconnect eth0`断开一个网卡(interface)的连接
3. `nmcli d show`查看所有device详细信息 
4. `nmcli c` :how the current status of each of NetworkManager’s connection 
5. `nmcli r`:see the state of radio interfaces, including WiFi and WWAN (cellular) with the _radio_ argument
6. `nmcli n off`关闭NM托管
7. `nmcli n on`开启NM托管 
8. `nmcli connection reload` **NetworkManager** 重新读取该配置文件
9. `nmcli con load /etc/sysconfig/network-scripts/ifcfg-ifname` 只重新载入那些有变化的文件 ifcfg-_ifname_
# 连接 WiFi

> [!help] device connect 简写
> `d`：device
> `c`：connect
## WiFi 连接
1. `nmcli r wifi on`:打开WiFi
2. `nmcli device wifi list/nmcli d wifi list`：查看可连接的WiFi
3. `nmcli --ask device wifi connect "$SSID"` / `nmcli -a d wifi connect <wifiname>`
4. `nmcli device wifi connect <SSID> password <password>` 连接 WiFi
5. `nmcli d connect wlan0`
6. `nmcli device wifi connect SSID password password hidden yes` 连接到隐藏网
7. `nmcli -p -f general,wifi-properties device show wlan0` 查看网络接口的通用信息属性
NetworkManager 的配置文件在 `/etc/NetworkManager/` 下
### 断开连接
* `nmcli d disconnect wlan0`
* `nmcli c down <wifiname>` ：`<wifiname>` 为 `nmcli c` 看到 WiFi 名
* `nmcli radio wifi off` / `nmcli r wifi off`
* 删除 `nmcli c` 看到结果：`nmcli c del <name>` (`<name>` 为 `nmcli c` 看到名字)
### nmtui
* `man nmtui`
---
* 相关连接：[NetworkManager](https://developer-old.gnome.org/NetworkManager/stable/nmcli-examples.html)
### device的4种常见状态
* *connect*：已被NM托管，并且当前有活跃的connection 
*  *disconnected*：已被NM托管，但是当前没有活跃的connection 
*  *unmanaged*：未被NM托管，就是不让NM动这个设备相关的任何操作
*  *unavailable*：不可用，NM无法托管，通常出现于网卡link为down的时候（比如ip link set ethX down）
### connection通常有两种状态
* 活跃（带颜色字体）：表示当前该connection是正在使用的 
* 非活跃（正常字体）：表示当前该 connection 没有连接
# 网络管理
* `nmcli connection reload`
* `nmcli networking off`
* `nmcli networking on`
* `nmcli nm enable false`
* `nmcli nm enable true`
> [!info] NetworkManager 接管网络配置文件
> `/usr/lib/NetworkManager/conf.d/10-globally-managed-devices.conf`

---
* `sudo ifdown eth0`
* `sudo ifup eth0`

# NetworkManager 配置文件
* 全局配置文件位于：`/etc/NetworkManager/NetworkManager.conf`
* 额外配置文件可以放进 `/etc/NerworkManager/conf.d/`
* ubuntu 下可以把文件 `/usr/lib/NetworkManager/conf.d/10-globally-managed-devices.conf` 复制到 `/etc/NetworkManager/conf.d/10-globally-managed-devices.conf` 然后进行修改
* <mark style="background: #FF5582A6;">通常全局的默认配置不需要改动</mark>
# nmcli 
* 使用 `nmcli c edit "My GPRS Connection"`
* 或者修改 `/etc/NetworkManager/system-connections/` 下的配置文件
# resolv.conf 
1. 在resolv.conf中保留改动,避免文件被修改
	```shell
	chattr +i /etc/resolv.conf 
	```
2. 允许修改此文件
	```shell 
	chattr -i /etc/resolv.conf 
	```
	
## network service 管理
1. 管理*network*服务
```shell
    service networking stop 
	service network-manager start
	sudo service network-manager restart
```
-   执行如下命令，关闭network自启动。
```shell
   chkconfig network off
```
-   执行如下命令，重启dbus和NetworkManager。
```shell
    service dbus restart
    service network-manager restart
```
## 删除network-manager 不能上网
编辑 `/etc/network/interfaces`添加如下代码
```shell 
auto eth0 
iface eth0 inet dhcp
```
# 禁用 NetworkManager
* 服务是通过 dbus 自动启动的, 所以要完全禁用可以用 systemctl 来屏蔽
~~~shell
systemctl mask NetworkManager
systemctl mask NetworkManager-dispatcher
~~~
*  `mask` 一个服务时，会使 `/etc/systemd/system` 的文件连接到 `/dev/null`, 当其他程序需要启动它，会无法启动（只能用于没有危险的服务，`systemctl mask bluetooth.service` 则会失败）
* `unmask` 用于取消连接，取消屏蔽
* `disable` 一个服务时，其他程序调用时，可以再次启动
#Linux/systemd
#### 运行网络脚本
术语 _网络脚本_ 通常是指 `/etc/init.d/network` 及所有它调用的已安装脚本。用户提供的文件通常被视为配置文件，但也可以将其解读为对脚本的修改
只使用 **systemctl** 程序运行脚本则会清除所有现有环境变量，并确保一个干净的执行模式。该命令的格式如下：

```shell
systemctl start|stop|restart|status network
```

**请勿**直接调用 `/etc/init.d/servicename start|stop|restart|status` 运行任何服务
> 首先启动 **NetworkManager**，此时 `/etc/init.d/network` 会使用 **NetworkManager** 检查，以避免破坏 **NetworkManager** 的连接。**NetworkManager** 主要在使用 sysconfig 配置文件的主要应用程序中使用，而 `/etc/init.d/network` 主要是作为备用程序在此要程序中使用

---
# mbim-network
1. 安装：`apt install libmbim-utils`

# 相关连接
![netplan](../../Areas/网络通信/netplan.md)
* [archlinux](https://wiki.archlinux.org/title/NetworkManager_(简体中文))
* [redhat 中文网络配置说明](https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/configuring_and_managing_networking/index) 
* [3.3. Configuring IP Networking with nmcli 英文详细说明文档](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-configuring_ip_networking_with_nmcli)
* <https://man.archlinux.org/man/nm-settings.5#gsm_setting>
* [NetworkManager设置 - 知乎](https://zhuanlan.zhihu.com/p/52731316)
- [NetworkManager (简体中文) - ArchWiki](https://wiki.archlinux.org/title/NetworkManager_ (%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%8A%A0%E5%AF%86%E7%9A%84_Wi-Fi_%E5%AF%86%E7%A0%81)