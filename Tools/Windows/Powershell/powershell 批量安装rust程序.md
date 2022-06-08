---
tags: Rust PowerShell
---

# powershell 安装 rust 程序
```powershell
$env:RUSTUP_DIST_SERVER="https://mirrors.ustc.edu.cn/rust-static"
$env:RUSTUP_UPDATE_ROOT="https://mirrors.ustc.edu.cn/rust-static/rustup"

$tools=(
"ripgrep",
"fd-find",
"cargo-update",
"lsd",
"bat",
"starship",
"bottom",
"procs",
"du-dust",
)

foreach ($tool in $tools)
 {
	cargo install $tool
 }
```
![](cargo.ps1)