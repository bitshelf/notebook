---
tags: buildroot
---

# buildroot 编译
## 编译命令
#### 编译脚本
- `device/rockchip/common/build.sh`
- `device/rockchip/common/mk-buildroot.sh`
#### 编译 buildroot 系统命令
> [!example] rk3399pro（不同平台修改defconfig名字）
> ```shell
> source buildroot/build/envsetup.sh rockchip_rk3399pro
make
>```

#### 配置编译环境
```shell
source buildroot/build/envsetup.sh rockchip_rk3399pro
```

### 编译 rknn_demo 软件包
> [!info] 查看 buildroot 编译帮助
> ```shell
> cd buildroot 
> make help
> ```

#### 下载软件包，以便离线编译
```shell
make rknn_demo-source
```
#### 提取软件包源码
```shell
make rknn_demo-extract
```
#### 应用软件包补丁
```shell
make rknn_demo-patch
```
#### 配置软件包
```shell
make rknn_demo-configure
```
#### 编译软件包
```shell
make rknn_demo-build
```
#### 删除软件包
```shell
make rknn_demo-dirclean
```
#### 修改配置后，重新编译软件包
```shell
make rknn_demo-reconfigure
```
#### 修改代码后，重新编译软件包
```shell
make rknn_demo-rebuild
```

#### 并行编译
添加以下配置项，对一些包编译存在问题
```
BR2_PER_PACKAGE_DIRECTORIES=y
```

> [!info] 编译详细信息查看
> ```shell
> make V=1
> ```


---
#### 列出所有软件包
```shell
make external-deps
```

## buildroot 重新编译工具
buildroot 会通过 `.stamp_*` 文件来判断应用的状态，做出相应的动作
```
 ls buildroot/output/rockchip_rk1808/build/rknn_demo‐1.0.0
 .stamp_built 已经编译过
 .stamp_configured 已经配置过
 .stamp_rsynced
 .stamp_target_installed 已经安装过
```
> [!example] 重新编译rknn_demo
> ```shell
> rm  buildroot/output/rockchip_rk1808/build/rknn_demo-1.0.0/.stamp_*
> ./build.sh
>```

---
## 其他编译命令
```shell
make linux
make linux-update-config # 保存完整的配置文件
make target-post-image # 完整编译
```
## 编译工具链
1.  Buildroot 生成的工具链默认位于 `output/host/`
2. 添加编译工具的简单方法
~~~shell
export PATH=$PWD/output/host/bin:$PATH
export CROSS_COMPILE=arm-linux-
export ARCH=arm64
~~~


# 软件包源码
1. 源码所在位置
~~~shell
output/rockchip_rk3588/build/<linux-custom>/
~~~

---
## Link
- [General Buildroot usage](https://bootlin.com/~thomas/site/buildroot/common-usage.html)
-  [Rockchip Linux软件开发指南](../assets/Rockchip%20Linux软件开发指南%20V1.03-20180716%201.pdf)
- [buildroot 培训PPT](../assets/buildroot-slides-1.pdf)
- [bootlin.com/doc/training/buildroot/buildroot-slides.pdf](https://bootlin.com/doc/training/buildroot/buildroot-slides.pdf)
- [The Buildroot user manual](https://buildroot.org/downloads/manual/manual.html#_getting_started)
