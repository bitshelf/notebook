---
tags:
  - bitbake
---
## bitbake
```shell
bitbake world
bitbake --help
bitbake-layers --help
bitbake-layers show-layers
bitbake-layers add-layer <path>
bitbake-layers show-recipes
```

## bitbake 配置编译内核
```shell
# 重新配置内核配置项
bitbake linux-yocto -c menuconfig

# 查看修改后的内核配置项
bitbake linux-yocto -c diffconfig

# 编译内核新配置
bitbake linux-yocto -c kernel_configme -f

# 检查内核配置
bitbake linux-yocto -C kernel_configcheck -f

# 强制编译内核源代码, 不编译依赖
bitbake linux-yocto -c compile -f

# 部署编译好的内核源代码
bitbake linux-yocto -c deploy

bitbake linux-yocto -c build
bitbake linux-yocto -c fetch
bitbake linux-yocto -c unpack
bitbake linux-yocto -c patch
bitbake linux-yocto -c prepare_recipe_sysroot
bitbake linux-yocto -c configure
bitbake linux-yocto -c install
bitbake <component> -g # Lista a dependency tree for component
bitbake <component> -k # Continus past build breaks until a dependency requires stopping
```

## clean
```shell
# Cleans downloads and all cache entries for component, Cleans all entries in working directory
bitbake linux-yocto -c cleanall

# Cleans cache but does not remove the download entry.Cleans out all entries in working directory
bitbake -c cleansstate <component>

# Deploys a component to rootfs with force --sometimes,yocto thinks a component is already deploy so this forces it
bitbake -c deploy -f <component>
```

## bitbake 变量查看
```shell
# package linux-yocto

# 查看什么下载位置
bitbake -e  linux-yocto  | grep ^SRC_URI=

# 查看下载的源码位置
bitbake -e  linux-yocto  | grep ^DL_DIR

bitbake -e  linux-yocto  | grep ^SRCREV
bitbake -e  linux-yocto  | grep ^PACKAGE_CLASSES
bitbake -e  linux-yocto  | grep ^DEPLOY_DIR
bitbake -e  linux-yocto  | grep ^DEPLOY_DIR_RPM
bitbake -e  linux-yocto  | grep ^DEPLOY_DIR_IPK
bitbake -e  linux-yocto  | grep ^DEPLOY_DIR_DEB
bitbake -e  linux-yocto  | grep ^DEPLOY_DIR_TAR
bitbake -e  linux-yocto  | grep ^PACKAGE_ARCH
bitbake -e  linux-yocto  | grep ^TMPDIR
bitbake -e  linux-yocto  | grep ^TARGET_OS
bitbake -e  linux-yocto  | grep ^PN=
bitbake -e  linux-yocto  | grep ^PV=
bitbake -e  linux-yocto  | grep ^PR=
bitbake -e  linux-yocto  | grep ^WORKDIR=
bitbake -e  linux-yocto  | grep ^S=
bitbake -e  linux-yocto  | grep ^BPN=

# file:// search path
bitbake -e  linux-yocto  | grep ^FILESPATH
```