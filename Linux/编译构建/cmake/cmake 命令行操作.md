---
tags: cmake
---

# cmake 命令行操作
## cmake 3.0
- `cmake -B build` : 在源码目录用 -B 直接创建 build 目录，并生成 `build/Makefile`
- `cmake --build build -j4` : 自动调用本地的构建系统
- `sudo  cmake --build build --target install` ： 调用本地的构建系统并执行 install 这个目标
```shell
cmake -B build -DCMAKE_BUILD_TYPE=release
cmake --build build --parallel 4
cmake --build build --target install
```

> [!info] cmake -B build
> cmake -B build 免去了先创建 build 目录再切换进去再指定源码目录的麻烦

## CMake 项目构建
1. `-D` : 指定配置环境变量（缓存变量） 
2. `cmake -B build` ： 配置阶段（configure），检测环境并生成构建规则，可以通过`-D` 设置缓存变量，会在 build 目录下生成本地构建系统能够识别的项目文件（Makefile 或者 . sln）
	1. `cmake -B build -DCMAKE_INSTALL_PREFIX=/opt/openvdb-8.0` 安装路径为/opt/openvdb-8.0
	2. `cmake -B build -DCMAKE_BUILD_TYPE=Release` 开启全部优化
3. `cmake --build build` : 构建阶段（build），实际调用编译器来编译代码，在配置阶段可以通过-D 设置缓存变量，第二次配置时，之前的 -D 添加任然会被保留

## 查看 cmake 支持生成的构建系统规则文件
~~~shell
cmake -B build -G
~~~

---
## Link
- [Documentation | CMake](https://cmake.org/documentation/)
