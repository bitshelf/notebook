## MaskRom 
进入 `MaskRom` 的原理是人为的把 EMMC 的数据脚与地线短接，系统会认为 EMMC 数据出错，从而清除 EMMC 数据

> [!info]
> parameter.txt 文件中包含了固件的分区信息
> 

# buildroot
``` ad-info 
title:buildroot的文件下载
Buildroot 会根据配置 `package/<package>/<package>.mk`，自动从网络获取对应的软件包，包括一些第三方库，插件，实用工具等，放在 `dl/` 目录
```
* 软件包会解压在 `output/rockchip_rk3568/build/<package>-<version>` 目录下
* 编译完成后，会将需要的编译生成文件拷贝到`output/rockchip_rk3568/target/` 目录
## 编译输出目录
编译完成后，在编译输出目录 `output/rockchip_rk3568` 会生成子目录，说明如下：

-   `build/` 包含所有的源文件，包括 Buildroot 所需主机工具和选择的软件包，这个目录包含所有软件包源码。
    
-   `host/` 主机端编译需要的工具，包括交叉编译工具。
    
-   `images/` 包含压缩好的根文件系统镜像文件。
    
-   `staging/` 这个目录类似根文件系统的目录结构，包含编译生成的所有头文件和库，以及其他开发文件，不过他们没有裁剪，比较庞大，不适用于目标文件系统。
    
-   `target/` 包含完整的根文件系统，对比 `staging/`，它没有开发文件，不包含头文件，二进制文件也经过 `strip` 处理
## 重建
### 1. 重建软件包
* 若修改了某个软件包的源码，Buildroot自动 不会重新编译该软件包，可以使用如下命令手动重建
1. ```sh
		make <package>-rebuild
	```
2. 
	```sh
	# 删除软件包的编译输出目录
	rm -rf output/rockchip_rk3568/build/<package>-<version>
	# 编译
	make <package
	```
### 2. 完全重建
