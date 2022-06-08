---
tags: LTE 
---

命令工具：
  1. pppd
  2. pppstats
  3. pppdump
  4. chat

配置脚本wcdma

```c
nodetach //不脱离tty设备
lock
debug //显示调试信息
/dev/ttyUSB0 //指定连接的使用设备
115200 //设置连接使用的控制字符传输速率
logfile /var/ppplog //将连接过程中的信息输入到某个文件中
user “card” //用户名
password “card” //用户密码
show-password //log里面显示密码
usepeerdns //使用服务器协商的DNS
noauth //不需要对方验证自己
noipdefault //关闭在没有指定本地IP位址时所进行的预设动作，这是用来由从主机名称决定（如果可能的话）本地IP位址。加上 这个选项的话，彼端将必须在进行IPCP协商时（除非在指令行或在选项档中明确地指定它）提供本地的IP地址。
novj //选中这个选项，将关闭双方的Van Jacobson形式TCP/IP报文头压缩
novjccomp //选中这个选项，将关闭Van Jacobson形式TCP/IP报文头压缩中的连接ID压缩。Pppd将忽略来自Van Jacobson形式压缩TCP/IP报文头中的连接ID字节，也不要求对方这样作。
noccp //关闭压缩控制协议协商。若对方有漏洞会被来自PPPD的压缩控制协议协商请求干扰的情况下，需要设置该选项。
defaultroute //当 IPCP 协商完全成功时， 增加一个预设递送路径到系统的递送表，将彼端当作闸道器使用。这个项目在 ppp 连线中断後会移除。
ipcp-accept-local //加上这个选项的话，表示接受服务器分配的本机 IP 地址
ipcp-accept-remote //加上这个选项的话，表示接受服务器指定的服务器 IP 地址
connect ‘/usr/sbin/chat -s -v -f chat-wcdma-connect’
disconnect ‘/usr/sbin/chat -s -v -f chat-wcdma-disconnect’
```

连接脚本

```c
TIMEOUT 5
ABORT ‘NO CARRIER’
ABORT ‘ERROR’
ABORT ‘NODIALTONE’
ABORT ‘BUSY’
ABORT ‘NO ANSWER’
‘’ \rAT
OK \rATZ //恢复为缺省设置
OK AT+CPIN? //查看SIM卡
OK AT+CSQ //查看信号
OK AT+COPS? //查看服务商
OK AT+CREG? //网络注册。获得手机的注册状态
OK AT+CGATT? //覆盖到GPRS网络，如果返回值是零，则可能是SIM卡内没有钱了或者是覆盖不到GPRS网络
OK \rAT+CGDCONT=1,“IP”,“3GNET”,0,0
OK-AT-OK ATDT*99#
CONNECT \d\c
```

chat script

```Bash
#Chat script for China Mobile, used SIMCOM sim7100 TD module.

# 设置响应超时
TIMEOUT 15

# 若接收到“DELAYED”、“BUSY”、“ERROR”、“NO DIALTONE”、“NO CARRIER”，则退出脚本
ABORT "DELAYED"
ABORT "BUSY"
ABORT "ERROR"
ABORT "NO DIALTONE"
ABORT "NO CARRIER"

# 无期望，直接发送AT字符串
'' AT

# 以下内容可以根据自己模块提供的AT命令手册查询含义
OK ATS0=0
OK ATE0V1

# 设置APN，移动、联通、电信各不相同，见文末表格
OK AT+CGDCONT=1,"IP","CMNET" 
# 拨号开启GPRS服务，号码移动、联通、电信各不相同，见文末表格
OK ATD*99***1#

#期望收到CONNECT
CONNECT
```