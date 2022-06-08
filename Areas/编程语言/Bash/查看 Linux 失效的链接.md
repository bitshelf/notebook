---
tags:
  - Bash
---
## Linux 查找文件系统中的失效链接
~~~shell
find . -xtype l
~~~
- ? `xtype` 会检查软连接指向的文件类型，不是所有的 `find` 命令都有这个参数

## 使用 `test`
~~~shell
find . -type l ! -exec test -e {} \; -print
~~~

## 使用 `grep`
~~~shell
 find . -type l -exec sh -c 'file -b "$1" | grep -q ^broken' sh {} \; -print
~~~

## link 
- [TengLog / Linux查找文件系统中的失效链接](https://tenglog.com/posts/linux-find-all-broken-symlinks.html)