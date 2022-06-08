---
tags: Ubuntu AHD
---

# ubuntu AHD 摄像头测试
1. 安装软件包：`sudo apt-get install guvcview`
2. 查看摄像头节点：
~~~shell
cat /sys/class/video4linux/video*/name
~~~

