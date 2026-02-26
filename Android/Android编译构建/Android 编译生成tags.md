---
tags: Android 
---

## 生成 compile_commands. json 
```shell
 export SOONG_GEN_COMPDB=1
 export SOONG_GEN_COMPDB_DEBUG=1
 export SOONG_LINK_COMPDB_TO=$ANDROID_HOST_OUT

# 触发空操作
make nothing

# 方式1：Soong 原生（推荐，Android 14+）
SOONG_GEN_COMPDB=true m nothing
# 产出: out/soong/development/ide/compdb/compile_commands.json

# 方式2：直接 symlink 到项目根
SOONG_GEN_COMPDB=true SOONG_LINK_COMPDB_TO=$PWD m nothing
# 产出: ./compile_commands.json（根目录）
```
- 链接 `compile_commands.json` 到工作区根目录
```shell
ln -sf out/soong/development/ide/compdb/compile_commands.json ./
```

- [Compdb (compile\_commands.json) Generator](https://android.googlesource.com/platform/build/soong/+/HEAD/docs/compdb.md)

## cmake 生成 compile_commands. json 
```shell
cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=YES
```

## AIDEGen
- 为 VsCode 生成 framework 配置文件
```shell
aidegen -i v Settings frameworks
```
- [AIDEGen](https://android.googlesource.com/platform/tools/asuite/+/refs/heads/master/aidegen/README.md)

![Youcompleteme 安装](../../Tools/软件/vim/Youcompleteme%20安装.md)

![clangd 安装](clangd%20安装.md)