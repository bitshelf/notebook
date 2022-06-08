---
tags: Linux, command, 
---

# 直接执行
>示例： `./script.sh`
* <mark class="hltr-yellow">要求文件具有可执行权限  </mark> 
* 作为子进程运行
* 文件在当前目录下，不能省略代表当前目录的 `./`，因为 shell 只会在 `PATH` 中寻找命令而不会寻找当前目录
# 解释器执行
>  示例： `sh script.sh`
* <mark class="hltr-yellow">不需要脚本文件具有可执行权限</mark> 
* 作为子进程运行
* 将可执行文件的路径作为命令行参数传给解释器
# source 命令
> 示例：`source script.sh`
* 是专门用来执行 shell 命令的，<mark class="hltr-yellow">不需要脚本具有可执行权限</mark> 
* 点 `.`，是 `source` 命令的一个别名，二者是同一个命令
* 不会创建子进程运行，相当于把 shell 脚本中的命令一条条手动敲进当前 shell
* 它不是一个可执行二进制文件，这一点和 `ls`, `tree` 等位于某路径下的可执行二进制文件提供的命令不同，比如 `ls` 一般在 `/bin` 下；而它直接由**解释器提供**
* 如果文件名不是全路径，则到*$PATH* 路径下找，如果没有找到，则在当前目录下找
* 
