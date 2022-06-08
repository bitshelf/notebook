---
tags: Linux Ubuntu Debian
---

# ssh 允许 root 登录
1. 修改配置文件：`/etc/ssh/sshd_config`
```shell:/etc/ssh/sshd_config
#PermitRootLogin prohibit-password 改为
PermitRootLogin yes
```

2. 重启 ssh
~~~shell
systemctl restart ssh
~~~
