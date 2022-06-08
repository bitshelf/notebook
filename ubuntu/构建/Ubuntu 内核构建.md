---
tags:
  - Ubuntu
---
## 下载 ubuntu 官方内核
```shell
apt-get source linux-image-unsigned-$(uname -r)
# or failing that:
apt-get source linux-image-$(uname -r)

# use git
git clone git://git.launchpad.net/~ubuntu-kernel/ubuntu/+source/<source package>/+git/<series>
```
- [Kernel/SourceCode - Ubuntu Wiki](https://wiki.ubuntu.com/Kernel/SourceCode)
##  编译安装内核模块
```shell
pushd kernel
make CROSS_COMPILE=${toolchain_tripe} ARCH=${ARCH} revyos_defconfig
make CROSS_COMPILE=${toolchain_tripe} ARCH=${ARCH} -j$(nproc)
make CROSS_COMPILE=${toolchain_tripe} ARCH=${ARCH} -j$(nproc) dtbs
if [ x"$(cat .config | grep CONFIG_MODULES=y)" = x"CONFIG_MODULES=y" ]; then
    sudo make CROSS_COMPILE=${toolchain_tripe}  ARCH=${ARCH} INSTALL_MOD_PATH=${GITHUB_WORKSPACE}/rootfs/ modules_install -j$(nproc)
fi
#sudo make CROSS_COMPILE=${toolchain_tripe}  ARCH=${ARCH} INSTALL_PATH=${GITHUB_WORKSPACE}/rootfs/boot zinstall -j$(nproc)
```

## 构建 perf
```shell
make CROSS_COMPILE=riscv64-unknown-linux-gnu- ARCH=riscv LDFLAGS=-static NO_LIBELF=1 NO_JVMTI=1 VF=1 -C tools/perf/
sudo cp -v tools/perf/perf ${GITHUB_WORKSPACE}/rootfs/sbin/perf-thead
```