---
tags: Systemd
---

# systemd 启动分析
* 查看系统服务启动的时间
~~~shell
systemd-analyze blame
~~~

* 查看系统服务先后顺序及花费时间
~~~shell
systemd-analyze plot > graph1.svg
~~~
