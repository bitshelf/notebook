---
tags: Linux
---

# Linux  软件包
1. 终端美化： [Starship: Cross-Shell Prompt](https://starship.rs/)
```shell
curl -sS https://starship.rs/install.sh | sh
eval "$(starship init bash)"
```
### xshell 终端
```shell
clear;PS1="\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\r\n\$ ";cd ~/fourth/loh95/;ls
```

###  Tokei
[Tokei](https://github.com/chinanf-boy/tokei-zh#%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%AD%E8%A8%80)
Tokei 是一个显示代码信息的统计程序. Tokei 将显示文件数, 和这些文件中的总行数以及按语言分组的代码, 注释和空格

### zoxide
zoxide is a **smarter cd command**, inspired by z and autojump
[GitHub - ajeetdsouza/zoxide: A smarter cd command. Supports all major shells.](https://github.com/ajeetdsouza/zoxide#installation)
```shell
apt install zoxide # Ubuntu21.04+
curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | bash
eval "$(zoxide init bash)" # ~/.bashrc
```

### fzf
```shell
sudo apt-get install fzf
```
- [GitHub - junegunn/fzf: A command-line fuzzy finder](https://github.com/junegunn/fzf#installation)

### bottom
bottom is both an executable binary that can be run, and a library that can be used in Rust programs
```shell
cargo install -f bottom
```

### git delta
- [GitHub - dandavison/delta: A syntax-highlighting pager for git, diff, and grep output](https://github.com/dandavison/delta)