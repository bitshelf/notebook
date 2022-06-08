---
tags: Vim 
---
## apt 安装
```shell
sudo apt install vim-youcompleteme
```
## Youcompleteme 错误高亮显示配置
- [消除Vim Youcompleteme 错误提示](https://github.com/ycm-core/YouCompleteMe#the-gycm_filetype_whitelist-option)

## Vim 添加 [Youcompleteme 安装](Youcompleteme%20安装.md) 插件
```shell
vim-addon-manager install youcompleteme -t <path>/.vim
```

## 编译安装
1. 源码下载
```shell
git clone --recurse-submodules --shallow-submodules https://github.com/ycm-core/YouCompleteMe.git
```
2. 编译
```shell
/usr/bin/python3 /home/loh/.vim/plugged/YouCompleteMe/third_party/ycmd/build.py --clangd-completer --java-completer --rust-completer --verbose
```