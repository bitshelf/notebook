---
tags: Ubuntu
---

# Ubuntu 权限管理
### 执行命令不用输入密码
~~~shell
# If you want to skip password input, you can add the following entry to /etc/sudoers.

# [user or group] ALL= NOPASSWD: [procs binary path]
# example
myuser ALL= NOPASSWD: /usr/local/bin/procs
~~~
