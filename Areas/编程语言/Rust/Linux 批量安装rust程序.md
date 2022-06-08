---
tags: Rust
---

# Linux 批量安装 rust 程序
```bash
#!/bin/bash
# curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh

export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup

tools=(
ripgrep
fd-find
cargo-update
lsd
bat
starship
bottom
procs
du-dust
rm-improved
xcp
#broot
)

for tool in ${tools[@]}
do
	cargo install $tool
done
```
![](assets/cargo.sh)

![Rust 安装](Rust%20安装.md)