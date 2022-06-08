---
tags:
  - Kernel/rust
---
## 安装环境
```shell
export RUSTUP_DIST_SERVER="https://rsproxy.cn"
export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"

curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh

cargo install --locked bindgen-cli
rustup component add rust-src
```
## linux 内核 rust 支持检测
```shell
make LLVM=1 rustavailable
```

## 编译配置
```shell
# for aarch64
make ARCH=arm64 CLANG_TRIPLE=aarch64_linux_gnu LLVM=1 menuconfig
make ARCH=arm64 CLANG_TRIPLE=aarch64_linux_gnu LLVM=1 -j4
```
## Link
- [Quick Start — The Linux Kernel documentation](https://docs.kernel.org/rust/quick-start.html)
