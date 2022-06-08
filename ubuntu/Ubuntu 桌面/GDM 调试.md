---
tags:
  - GDM
---
## GDM debug
1. 设置 G_DEBUG 使 GLib 打印出调试信息：GLib – 2.0
2. 在 `/etc/gdm/custom.conf` 设置
```shell
[debug]
Enable=True
Gesture=True
```

3. 使用 `journalctl -lr` 查看日志