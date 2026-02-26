---
tags:
  - Ubuntu
---
## 查看是否注册
查看`/dev/`目录下面是否有`ttyUSB*`节点
# 手动拨号
`pppd call quectel-ppp`
# ubuntu 4G 拨号软件安装
~~~shell
#命令安装：
sudo apt install ppp 
#pppd call quectel-ppp& 
sudo pppd call quectel-ppp & 
#如果出现 Connect script failed 执行 
sudo /etc/ppp/peers/quectel-ppp-kill 后重启
~~~
1. **chat**：调制解调器的自动对话脚本，Chat程序定义了一个计算机和调制解调器之间对话交流，其主要目的是用来在本地PPPD和远端PPPD程序之间建立连接（简单说就是与4G模块进行AT命令交互的流程表，最终实现与ISP运营商的连接
2. **pppd**：点对点协议守护进程，其功能为实现ppp策略性的内容，包括所有鉴权、压缩/解压和加密/解密等扩展功能的控制协议
3. **pppdump**：将使用pppd记录选项编写的文件转换为人类可读的格式
4. **pppstats**：显示PPP连线状态。pppstats(point to point protocol status)
# ubuntu 不能上网
1. 解决方式一：从可以上网的文件系统（*ubuntu/debian*) 中拷贝 `/etc/ppp/` 目录
