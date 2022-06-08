---
tags: Git 
---

## Git 配置
```.gitconfig
[core]
      editor = vim
      fscache = false
[log]
      date = format-local:%Y-%m-%d
[alias]
      lg = log --pretty=format:\"%C(yellow)%h%Creset %ad | %s %Cred%d%Creset %Cblue[%an]\" --date=short

[delta]
      navigate = true    # use n and N to move between diff sections
      light = false
      side-by-side = true
```