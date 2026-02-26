---
tags:
  - Git
---
## Git 的高级用法
```shell
git clone --bare https://github.com/antznin/dotfiles.git $HOME/.dotfiles
git --git-dir=$HOME/.dotfiles --work-tree=$HOME config status.showUntrackedFiles no
git --git-dir=$HOME/.dotfiles --work-tree=$HOME checkout
```