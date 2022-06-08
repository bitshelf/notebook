---
tags: Android 
---

## Android 版本查看
```Makefile
 # build/make/core/version_defaults.mk
 PLATFORM_VERSION_LAST_STABLE := 
 # build/make/core/build_id.mk
```
# Rockchip Android 内核版本查看
1. 进入 `kernel/` 执行
	~~~shell
	$ make kernelversion
	4.19.193                                                                                                                                                                                                                                
	~~~
2. `vim kernel/Makefile`
	![[../assets/Android linux kernel version.png]]
---
# Amlogic
* 内核源码所在路径：`SDK/comman`
* 查看内核版本：
~~~shell
common$
make kernelversion
~~~
