---
tags:
  - Vscode
---
## vscode 弹出文件限制
> [!warning] 
> 容易导致服务器内存，CPU 占用多

> [!attention] 
> Unable to watch for file changes. Please follow the instructions link to resolve this issue.

当前系统的文件监控上限
```shell
cat /proc/sys/fs/inotify/max_user_watches
```

在文件中添加  `/etc/sysctl.conf`
```shell
fs.inotify.max_user_watches=524288  # 需考虑内存
```
使修改生效：`sudo sysctl -p`