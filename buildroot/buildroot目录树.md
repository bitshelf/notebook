---
tags: buildroot
---

# Buildroot 自定义
## 自定义放置目录
1. 直接放在 buildroot 树中，使用版本控制中的分支来维护
2. 在 buildroot 树之外，使用 br2-external 机制。这种机制允许将包菜单、板支持和配置文件保留在 buildroot 树之外


# buildroot 编译输出
* `output/` buildroot 的编译结果全部存储到 `output/` 目录下
* `image/` 所有编译输出的镜像，如内核，BootLoader、文件系统
* `build/` 所有编译输出的组件，包括 host 主机和 target 所需

```
output/
	└─ target/
		├── bin/
		├── etc/
		├── lib/
		├── bin/
		├── usr/bin/
		├── usr/lib/
		├── usr/share/
		└── usr/sbin
```
1. Target目标根文件系统
2. Buildroot不以root身份运行，所有文件都归运行Buildroot的用户所有，而不是setuid等
3. 在images/中生成最终的根文件系统镜像
4. 用到的变量：`TARGET_DIR`

```
output/
	└─ host/
		├── lib/
		├── bin/
		├── sbin/
		├── <tuple>/sysroot/bin
		├── <tuple>/sysroot/lib
		└── <tuple>/sysroot/usr/lib
```
* host (宿主机) 构建的工具 (交叉编译器等) 和工具链的 sysroot
* `<tuple>`是架构、供应商、操作系统、C 库和 ABI 的标识符

```
 buildroot/
	├── configs/ 各类平台的默认配置文件,类似于内核defconfigs
	├── board/  板级文件,如内核配置文件、内核补丁、镜像刷写脚本等
	├── support/ 其他使用程序，如kconfig代码、libtool补丁、下载帮助程序
	├── utils/ 对buildroot开发人员有用的各种使用程序
	├── output/ 全局输出目录，可以通过传递 `O=<dir>` 来设置源码目录外构建
	└── docs/
```

