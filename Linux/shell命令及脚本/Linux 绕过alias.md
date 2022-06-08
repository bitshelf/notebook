---
tags: Linux
---

# Linux 绕过 alias
## 使用 `\command`
~~~shell
\ls
~~~

## 使用 "command" 或 'command'
~~~shell
"ls"
'ls'
~~~

## 使用内部命令 `command`
~~~shell
command cmd arg1 arg2
command ls
~~~

---
## 移除别名 alias
当前会话的已定义别名列表中移除别名，请使用 `unalias` 命令：
```shell
unalias ls
# 删除所有别名
unalias -a
```
 - 查看所有别名：`alias` 或者 `alias -p`