---
tags: command
---

# fzf
### 与 ripgrep 一起使用
```shell
export FZF_DEFAULT_COMMAND='rg --files --no-ignore --hidden --follow --glob "!{.git,node_modules}/*" 2> /dev/null'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND="rg --sort-files --files --null 2> /dev/null | xargs -0 dirname | uniq"
```

### 与 fd 一起使用
```shell
export FZF_DEFAULT_COMMAND='fd --type f --color=never'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
export FZF_ALT_C_COMMAND="fd --type d --color=never"
```

### git ls-tree 用于快速遍历
如果您在大型git存储库中运行fzf,`git ls-tree`可以帮你提高遍历的速度
```shell
export FZF_DEFAULT_COMMAND='
  (git ls-tree -r --name-only HEAD ||
   find . -path "*/\.*" -prune -o -type f -print -o -type l -print |
      sed s/^..//) 2> /dev/null'
```

---
# Link
- [GitHub - chinanf-boy/fzf-zh: cn翻译: <fzf> 一种通用的命令行模糊查找器 ❤ 校对 中](https://github.com/chinanf-boy/fzf-zh#bash%E5%92%8Czsh%E7%9A%84%E6%A8%A1%E7%B3%8A%E5%AE%8C%E6%88%90)
- [Site Unreachable](https://betterprogramming.pub/boost-your-command-line-productivity-with-fuzzy-finder-985aa162ba5d)