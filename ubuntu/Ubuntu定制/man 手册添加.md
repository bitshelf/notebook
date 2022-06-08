---
tags: Linux command
---

## man 手册添加
1. 在 `/etc/` 目录添加 `manpath.config` 文件
2. 到 `/usr/share/man/` 目录下，输入 `find` 命令查看已有示例

### demo
```shell
sudo cp logo-ls.1.gz /usr/share/man/man1/
```