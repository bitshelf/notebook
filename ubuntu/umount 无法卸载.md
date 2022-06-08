---
tags: [Ubuntu,Debian,command]
---
# umount 无法卸载
> umount 无法卸载：target is busy
~~~shell
sudo fuser -vm fs #必须使用 root，查看那些进程正在访问挂载点

#-f will send a signal (default: SIGKILL) to each process using the mount
sudo fuser -km <path>

sudo umount -l <path> # -l,--lazy
~~~
