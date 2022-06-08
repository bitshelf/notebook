---
tags: Linux/command
---

# stty 使用
* `-a`, `--all` :     以容易阅读的方式打印当前的所有配置
* 查看串口设置
~~~shell
stty -a -F /dev/ttyS0
~~~

* 设置串口波特率
```shell
busybox microcom -t 15000 -s 115200 /dev/ttyS0
busybox stty -F /dev/ttyS0 speed 115200
stty ispeed 115200 ospeed 115200 -F /dev/ttyS0
```
* 向串口发送数据
~~~shell
echo hello world! > /dev/ttyS0
~~~

* 读取串口数据
~~~shell
cat /dev/ttyUSB0
~~~

* 设置串口列宽
~~~shell
stty cols N
~~~
* 屏蔽设置
```shell
stty -echo # 禁止回显
stty echo  # 打开回显
```
* `csN`: 设置字符大小为 N 位，N 的范围为 5 到 8

# Link
* <http://linux.51yip.com/search/stty>
