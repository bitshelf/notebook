---
tags: Linux
---

## 内核编译
### make oldconfig
- 使能内核配置选项 `CONFIG_IKCONFIG_PROC` ，将内核配置文件放在 `/proc/config.gz` 下
- 导出板子的内核配置：`zcat /proc/config.gz > .config`
- 配置新内核：`make oldconfig`
通过命令界面配置内核，但是会自动载入既有的`.config` 配置文件，并且只有在遇到先前没有设定过的选项时，才会要求你手动设定。然而，make config 却会要求你手动设定所有的选项，即使你之前曾设定过。开发者通常会通过此方法将他们的配置更新为官方配置选项所做的变更，以避免重新设定整个内核的配置

## Makefile、Kconfig 与. config
- Makefile 文集是整个内核工程编译命令的集合。它根据配置情况，构造出需要编译的内核源码文件列表，然后分别编译，并把目标代码链接到一起，形成内核二进制文件。也就是说 Makefile 只是存储了源码文件构建目标文件的规则，具体是否按着规则去执行还要看那些配置变量
- make menuconfig 时，会出现一个配置菜单，它是由各层 Kconfig 文件组成。Kconfig 文件是以分布式的方式位于源码的各个子目录当中。最底层的 Kconfig 位于源码目录下的 arch/x86/Kconfig。由此入口，使用 source 语句把需要的子 Kconfig 文件加入到上级目录的 Kconfig 中，以此递归下去。Kconfig 文件控制配置菜单是否出现新驱动的配置选项。用户通过 Kconfig 文件产生的配置选项，来控制对新驱动的配置
- 在配置菜单中进行的相关配置（【】，【*】,【M】），最终都会存储于. config 文件当中，因此 Kconfig 文件跟这些配置结果并没有直接的关系，只是提供了配置菜单中的配置选项

---
## Link
- [对Makefile、Kconfig与.config文件的再次理解](http://kerneltravel.net/blog/2020/makefile_3/)