---
tags:
  - Bash
---
## source与点命令
-   source 命令的另一种写法是点符号，用法和 source 相同，从 Bourne Shell 而来
-   source 命令可以强行让一个脚本去立即影响当前的环境
-   source 命令会强制执行脚本中的全部命令,而忽略文件的权限
-   source 命令通常用于重新执行刚修改的初始化文件，如 .bash_profile 和 .profile 等等
-   source 命令可以影响执行脚本的父shell的环境，而 export 则只能影响其子shell的环境