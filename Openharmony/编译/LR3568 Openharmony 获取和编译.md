---
tags:
  - OpenHarmony
---
## 下载 Openharmony 代码
```shell
# 从版本发布Tag节点获取源码，获取与版本发布时完全一致的源码
repo init -u git@gitee.com:openharmony/manifest.git -b refs/tags/OpenHarmony-v4.1-Release --no-repo-verify

# 下载 LR3568 适配代码
git clone https://gitee.com/bitshelf/manifests_myir.git .repo/local_manifests -b OpenHarmony-v4.1-Release 

repo sync -c
repo forall -c 'git lfs pull'
```

#### 源码下载说明
1. 下载 openharmony 社区源码，具体下载方法查看 [OpenHarmony文档](https://gitee.com/openharmony/docs) 对应版本发行说明中的 **源码获取**（例如 [4.1 Release 源码获取](https://gitee.com/openharmony/docs/blob/master/zh-cn/release-notes/OpenHarmony-v4.1-release.md#%E6%BA%90%E7%A0%81%E8%8E%B7%E5%8F%96)）
2. 下载米尔适配代码

-  [编译环境配置](https://gitee.com/openharmony/docs/blob/master/zh-cn/device-dev/subsystems/subsys-build-all.md#%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)
- [如何编译full-SDK](http://test.openharmony.cn:7780/pages/v4.1/zh-cn/application-dev/faqs/full-sdk-compile-guide.md)

## 源码编译
### 使用 `./build.sh`
```
# 完整编译
./build.sh -p lr3568 --gn-args 'is_use_check_deps=false'
# 编译内核
./build.sh -p lr3568 -T kernel --gn-args 'is_use_check_deps=false'
# 或者
cd out/kernel/src_tmp/linux-5.10/ ； ./make-ohos.sh MYD-LR3568 enable_ramdisk
```
- `--gn-args 'is_use_check_deps=false'` 临时绕过编译检查

## 使用 hb
```shell
hb set # 选择 myir ——> lr3568
hb build --gn-args 'is_use_check_deps=false' # 临时绕过编译检查
```
- 目前 hb 存在编译不通过的情况，建议使用 `build.sh` 编译
