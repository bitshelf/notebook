---
tags: buildroot
---

# buildroot 定制
1. 导入环境变量：`source buildroot/build/envsetup.sh`
2. 定制 buildroot
~~~shell
make ARCH=arm64 menuconfig
~~~

3. 保存配置文件
~~~shell
make savedefconfig
~~~

* buildroot 配置文件：`buildroot/.config`，临时配置文件，需要执行：`make savadefconfig`
* 对于默认的 buildroot 配置，defconfig 为空
* 创建 defconfig：`make savedefconfig`
	* 保存的文件由`.config`中的`BR2—DEFCONFIG`
	* 加载特定 config：`make <foo>_defconfig`

## 清理文件
*  make clean
删除 output、但保留配置文件
* make distclean
	删除所有，包括配置文件、下载的文件