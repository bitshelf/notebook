---
tags:
  - buildroot
---
## Buildroot 截屏
  将 `/etc/init.d/S49weston` 中的:
```shell
/usr/bin/weston&
```
修改成为：  
```shell
/usr/bin/weston --debug &
```
重启就可以使用weston-screenshooter 截屏