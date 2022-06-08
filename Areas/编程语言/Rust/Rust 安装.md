---
tags: Rust
---

# Rust 安装
## Linux 安装
```shell
curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh

# curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh
```

### 检查安装是否正确
```shell
rustc --version
```

## 更新与卸载

通过 `rustup` 安装了 Rust 之后，很容易更新到最新版本，只需要在命令行中运行如下更新脚本即可：
```shell
rustup update
```
若要卸载 Rust 和 `rustup`，请在命令行中运行如下卸载脚本:

```shell
rustup self uninstall
```

## 使用清华镜像站
- [cargo 换源](../cargo%20换源.md)
- [RsProxy](https://rsproxy.cn/)
- [rustup | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/rustup/)