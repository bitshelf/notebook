---
tags:
  - journalctl
---
## 将日记设为永久
```
vi /etc/systemd/journald.conf

[...]
[Journal]
Storage=persistent
#Compress=yes
[...]
```

## 查看与特定可执行文件相关的讯息
```shell
journalctl /usr/lib/systemd/systemd
```