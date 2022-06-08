---
tags: [Network,Ubuntu,IP]
---
# 命令格式
```shell
ip [OPTION] OBJECT {COMMAND| help}
```
<table><tbody><tr><td>Object</td><td>Abbreviated form</td><td>Purpose</td></tr><tr><td><kbd><strong>link</strong></kbd></td><td><kbd>l</kbd></td><td>Network device.</td></tr><tr><td><kbd><strong>address</strong></kbd></td><td><kbd>a</kbd><br><kbd>addr</kbd></td><td>Protocol (IP or IPv6) address on a device.</td></tr><tr><td><kbd><strong>addrlabel</strong></kbd></td><td><kbd>addrl</kbd></td><td>Label configuration for protocol address selection.</td></tr><tr><td><kbd><strong>neighbour</strong></kbd></td><td><kbd>n</kbd><br><kbd>neigh</kbd></td><td>ARP or NDISC cache entry.</td></tr><tr><td><kbd><strong>route</strong></kbd></td><td><kbd>r</kbd></td><td>Routing table entry.</td></tr><tr><td><kbd><strong>rule</strong></kbd></td><td><kbd>ru</kbd></td><td>Rule in routing policy database.</td></tr><tr><td><kbd><strong>maddress</strong></kbd></td><td><kbd>m</kbd><br><kbd>maddr</kbd></td><td>Multicast address.</td></tr><tr><td><kbd><strong>mroute</strong></kbd></td><td><kbd>mr</kbd></td><td>Multicast routing cache entry.</td></tr><tr><td><kbd><strong>tunnel</strong></kbd></td><td><kbd>t</kbd></td><td>Tunnel over IP.</td></tr><tr><td><kbd><strong>xfrm</strong></kbd></td><td><kbd>x</kbd></td><td>Framework for IPsec protocol.</td></tr></tbody></table>

## 常用选项
* `link(l)` ：查看和更改网络接口
* `address(addr/a)` ：查看和更改网络协议
* `route(r)` ：查看路由表
* `neigh(n)` ：used to display and manipulate neighbor objects (ARP table)

## ip link 
* `ip link help` ：使用说明
* `ip -s link` ：查看接口统计
* `ip -s link ls [interface]` : 查看某一网络接口统计信息
* `ip -s -s link ls [interface]` : 查看某一网络接口更多统计信息
* `ip link show dev [device]` : 查看特定接口的信息
* `ip link ls up` ：查看在运行的接口
* `ip link set [interface] up` ：启用设备
* `ip link set [interface] down` ：关闭设备
* `ip link set txqueuelen [number] dev [interface]` ：设置传输速率
* `ip link set mtu [number] dev [interface]` ：设置 MTU

# 查看 IP 地址
* `ip addr` ：查看所有设备 IP 地址信息
* `ip addr show` ：查看所有网络接口及关联 IP
* `ip addr show dev [interface]` ：查看指定接口信息
* `ip -4 addr` 查看 IP4 地址
* `ip -6 addr` ：查看 IP6 地址
* `ip addr add [ip_address] dev [interface]` ：指定接口增加 IP 地址
* `ip addr add brd [ip_address] dev [interface]` ：指定接口增加广播 IP 地址
* `ip addr del [ip_address] dev [interface]` ：指定接口移除 IP 地址

# IP route
* `ip route help` 
* `ip route/ip route list` ：查看所有路由表
* `ip route list SELECTOR` 搜索指定信息
> [!info] info
> SELECTOR := [ root PREFIX ] [ match PREFIX ] [ exact PREFIX ] [ table TABLE_ID ] [ proto RTPROTO ] [ type TYPE ] [ scope SCOPE ]
* `ip route list [ip_address]` ：增加新的 IP 地址到路由表
* `ip route add [ip_address] via [gatewayIP]` ：通过网关路由到路由表
* `ip route add default [ip_address] dev [device]`
* `ip route add default [network/mask] via [gatewayIP]`
* `ip route del [ip_address]`
* `ip route del default`
* `ip route del [ip_address] dev [interface]`

# ARP (Address Resolution Protocol) 
* `ip neigh help`
* `ip neigh show` ： display neighbor tables
	1. **REACHABLE** – signifies a valid, reachable entry until the timeout expires
	2. **PERMANENT**– signifies an everlasting entry that only an administrator can remove
	3. **STALE**– signifies a valid, yet unreachable entry; to check its state, the kernel checks it at the first transmission
	4. **DELAY**– signifies that the kernel is still waiting for validation from the stale entry
* `ip neigh add [ip_address] dev [interface]` ：Add a new table entry
* `ip neigh del [ip_address] dev [interface]` ：remove an existing ARP entry
