---
tags:
  - Makefile
---
## 介绍
automake是一个根据Makefile. am文件自动生成Makefile. in的工具。每个Makefile. am文件都基本上是由一系列make变量定义组成（偶尔可能也会夹杂规则）。由Makefile. am生成的Makefile. in文件与GNU Makefile标准兼容

最典型的automake输入文件就仅仅是一系列变量定义。每个这样的文件都会被处理并创建成一个Makefile.in文件

其中 `congure.ac`、`makefile.am` 是最好是手动编写的

![](assets/Pasted%20image%2020251217100510.png)
## autoscan
1. 辅助工具
2. 扫描源代码目录，生成初步的 configure. scan（可重命名为 configure. ac 并修改）
3. 帮助用户快速创建初始配置模板

## Link
- [几句话说清楚17：用makefile.am和configure.ac构建一个专业的hello world \| DecodeZ](https://decodezp.github.io/2019/02/21/quickwords17-makefileam-configureac/)
- [创建configure脚本 - Autoconf 中文手册](https://www.softool.cn/read/autoconf_cn_manu/002.html)
- [automake中文手册(部分翻译)-CSDN博客](https://blog.csdn.net/m0_37565736/article/details/125700449)
- [自动化编译](https://i.linuxtoy.org/docs/guide/ch18s05.html)
- [GNU Automake - GNU Project - Free Software Foundation](https://www.gnu.org/software/automake/manual/)
- [AutoConf 简介 - Autoconf 入门 ★](https://softool.cn/read/autoconf_getting_start/01.html)
- [configure.ac和Makefile.am的格式解析概述\_configure.ac文件-CSDN博客](https://blog.csdn.net/zhaominyong/article/details/130846447)