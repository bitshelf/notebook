---
tags: Android Rockchip 
---
# 注意
1. Android12.0 不能直接烧写 kernel.img 和 resource.img
2. Android12.0 的 kernel.img 和 resource.img 包含在 boot.img 中, 需要使用 `build.sh -AK` 命令来编译 kernel。编译后烧写 rockdev 下面的 boot.img. 也可以使用如下方法单独编译 kernel。这个过程会重新编译 Android, 所以编译时间会比较长。
> [!info] 单独编译 kernel 生成 boot.img编译原理
> 在 kernel-** 目录下将编译生成的 kerne1. ing 和 resource. imng 替换到旧的 boot.imng



---
1. 查看内核版本：
	~~~shell
	kernel-5.10$ make kernelversion
	5.10.66                                                                                                                                                      
	~~~
	