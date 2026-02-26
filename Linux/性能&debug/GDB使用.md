---
tags: GDB
---

# GDB 命令
1. `tui reg`
2. GDB Debug Leves
	1. `-g0` ：will explicitly produce no debug information
	2. `-g1` : produces minimal information, enough for making  back traces, but no information about local variables and line numbers
	3. `-g2` : default debug level when not specified. Typically this will produce symbols, line numbers, etc. needed for symbolic debugging
		* This is the default for the `-g` option to the compiler
	4. `-g3` : includes extra information, such as all the macro definitions present in the program

> [!info] `-ggdb3`
> This is like `-g3`, but generates debugging information specifically for gdb rather than normal COFF/XCOFF or DWARF 2 of `-g`

# GDB 定义命令和宏
1. 定义一些列命令： `define <name>` 以 `end` 结尾
2. 为自定义命令添加文档：`document <name>`，以 `end` 结尾

# ddd GDB 调试 GUI
~~~shell
ddd -debugger arm-linux-gnueabi-gdb myapp
~~~

# 其他工具
* strace/ltrace
* gprof/gcov
* Valgrind
* LTTng and Ftrace

---
## Link
- [https://e-labworks.com/training/en/ldb/slides.pdf](https://e-labworks.com/training/en/ldb/slides.pdf)