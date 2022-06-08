---
tags: buildroot 
---

1. 环境变量的设定
```shell
source ./envsetup.sh
```

- buildroot 的包主要由 config、build、install 三分部组成
	1. `make <package>-reconfigure`
	2. `make <package>-rebuild`
	3. `make <package>-reinstall`

- 配置裁剪参考：`buildroot/configs/rockchip*`