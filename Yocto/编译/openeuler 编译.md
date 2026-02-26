---
tags:
  - Rockchip/Openeuler
---
## 修改内核配置
```shell
oebuild bitbake
bitbake linux-openeuler -c devshell
cd tmp/work/dgri-powereuler-linux/linux-openeuler/5.10-r0/build/
make menuconfig
```

## 其他编译命令
```prompt:bash
yocto-meta-openeuler/meta-openeuler/recipes-kernel/linux/files/config/arm64/defconfig-kernel	//内核配置文件
oebuild manifest -r -m_dir src/yocto-meta-openeuler/.oebuild/manifest.yaml						//更新基线
oebuild bitbake openeuler-image -c do_populate_sdk		//生成交叉编译工具安装包
oebuild init <work_dir> -b openEuler-22.03-LTS-SP3
oebuild generate -p hi3093 -d build_hi3093
oebuild generate -p qemu-aarch64 -d build_arm64
bitbake linux-openeuler -c devshell						//进入配置环境
bitbake linux-openeuler -c cleanall
bitbake openeuler-image -c cleanall
bitbake openeuler-image -c cleansstate
bitbake openeuler-image
```