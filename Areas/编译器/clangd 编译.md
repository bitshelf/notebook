---
tags:
  - llvm/clangd
---
## clangd 编译
```shell
git clone https://github.com/llvm/llvm-project.git
cd llvm-project

/media/loh/rockchip/lr3576_ubuntu22_bak/cmake-3.27.9-linux-x86_64/bin/cmake \
-G Ninja -S llvm \
-DLLVM_ENABLE_PROJECTS="clang;clang-tools-extra" \
-DCMAKE_BUILD_TYPE=Release \
-DLLVM_ENABLE_RTTI=ON-DCMAKE_INSTALL_PREFIX=$HOME/.local/ \
-B build

# 编译
ninja -C build install
```

> 使用新版的 cmake
> `wget https://github.com/Kitware/CMake/releases/download/v3.27.9/cmake-3.27.9-linux-x86_64.tar.gz`