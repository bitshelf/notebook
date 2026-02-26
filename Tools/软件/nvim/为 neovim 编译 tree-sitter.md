---
tags:
  - nvim
---
## tree-sitter 编译
> [!error]
> 下载的二进制文件，依赖高版本的 glibc 库，导致无法运行

```shell
cargo install --git https://github.com/tree-sitter/tree-sitter tree-sitter-cli

cp ~/.cargo/bin/tree-sitter ~/.local/share/nvim/mason/packages/tree-sitter-cli/tree-sitter-linux-x64
```