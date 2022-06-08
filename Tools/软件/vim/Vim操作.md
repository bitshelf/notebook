---
tags: Vim 
---

# Vim terminal
*  `Ctrl + w + w` ：这个命令会在所有窗口中循环移动
*  `Ctrl + w + t` ：移动到最左上角的窗口
*  `Ctrl + w + b` ：移动到最右下角的窗口
*  `Ctrl + w + p` ：移动到前一个访问的窗口
# 代码阅读
1. 生成函数符号链接：`ctags -R`
2. `<CTRL+]>` 跳转函数定义
# 只读寄存器
* `"%` : 当前文件名
* `"#` : 轮换文件名
* `".` ：上次插入的文本
* `":` ：上次执行的命令
* `"/` ：上次查找的模式（可以用 `let @/ = "something"` 命令显示赋值）
# 分屏
* `sb 1` 水平分屏打开 3 号 buffer（`vert sb 1` 垂直分屏）
* `vertical rightbelow sfind file.txt` ：`sfind` 可以打开在 Vim PATH 中的任何文件
* `vert rightbelow term` ：右分割终端
* `below term` 下分割终端
# buffer 及缓冲区
1. `b <table>` 查看缓冲区
2. 缓冲区 type 释义：
	1. _c_ – characterwise text
	2. _l_ – linewise text
	3. _b_ – blockwise text


## link 
- [Vim 快捷键大全 - 蜕变C - 博客园](https://www.cnblogs.com/codehome/p/10214801.html)