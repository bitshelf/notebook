---
tags: U-Boot
---

# u-boot 文件
- 作用： 静态栈使用分析
- 编译选项带 `-fstack-usage` 
- 指定每个函数使用的最大栈容量大小

## 文件组成由三个字段组成
- 函数名称
- 字节数大小
- 限定词：
	- `static`
	- `dynamic`
	- `bounded`

## Link
- [Static Stack Usage Analysis (GNAT User’s Guide for Native Platforms)](https://gcc.gnu.org/onlinedocs/gnat_ugn/Static-Stack-Usage-Analysis.html)
- [Site Unreachable](https://mcuoneclipse.com/2014/09/23/executing-multiple-commands-as-post-build-steps-in-eclipse/)
