1. 查询当前网络设备:  
```shell
ifconfig -a
```
2. CAN FD启动:  
关闭CAN:  
```shell
ip link set can0 down
```
设置仲裁段1M波特率，数据段3M波特率:  
```shell
ip link set can0 type can bitrate 1000000 dbitrate 3000000 fd on  
```
注意这里，canfd 多了仲裁段，所以如果按照 can 的方式设置位率时会提示位率错误且，获取到的位率为 0，因为 bitrate 是设置仲裁段了。  

---
打印can0信息:  
```shell
ip -details link show can0  
```
启动CAN:  
```shell
ip link set can0 up  
```
## CAN FD 发送:  
发送（标准帧,数据帧,ID:123,date:DEADBEEF）:  
```shell
cansend can0 123##1DEADBEEF 
``` 
发送（扩展帧,数据帧,ID:00000123,date:DEADBEEF）:  
```shell
cansend can0 00000123##1DEADBEEF
```
## CAN FD 接收:  
开启打印，等待接收:  
```shell
candump can0
```  
同理，设置canfd0 设置仲裁段1M波特率，数据段3M波特率，并开启canfd0：  
```shell
ip link set can0 up type can bitrate 1000000 dbitrate 3000000 fd on
```
