---
tags: buildroot
---

# rootfs-overlay
- 有时候 filesystem overlay 覆盖不完全，可以使用 `BR2_ROOTFS_POST_BUILD_SCRIPT`
```shell
BR2_ROOTFS_POST_BUILD_SCRIPT="board/myproject/post-build.sh"
```

####  post-image 脚本
- 在创建完所有文件系统镜像后，在构建的最后阶段会调用 post-image 脚本
```shell
BR2_ROOTFS_POST_IMAGE_SCRIPT
```

#### init 进程
buildroot 支持多种 init 进程实现
1. **BusyBox init**, the default. Simplest solution
2. **sysvinit**, the old style featureful init implementation
3. **systemd**: the modern init system
4. **OpenRC**, the init system used by Gentoo