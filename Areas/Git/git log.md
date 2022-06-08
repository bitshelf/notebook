---
tags: Git 
---


# git log
1. `git log` 信息时间格式设置：`git config log.date iso-local`（缺省为 ` --local`）
2. 简短易读格式：`git config --add log.date auto:human`

# Git 修改最近一次提交
1. 修改用户名和邮箱
~~~shell
git commit --amend --author "New Authorname <authoremail@mydomain.com>"
~~~

> [!info] Git 修改所有历史
> 修改所有历史, 参考 'git filter-branch'的指南

## git log 时间格式修改
```shell
git config --add log.date  short
git config --add log.date format-local:'%Y-%m-%d'
```

## git log 别名
```shell
git config  alias.lg 'log --pretty=format:"%C(yellow)%h%Creset %ad | %Cgreen%s%Creset %Cred%d%Creset %Cblue[%an]" --date=short'

# commit 信息无颜色
git config alias.lg 'log --pretty=format:"%C(yellow)%h%Creset %ad | %s %Cred%d%Creset %Cblue[%an]" --date=short'
```

## git log 格式定制
```shell
git config --add format.pretty "%h%x09%an%x09%ad%x09%s"
git config --global pretty.mylog "%h%x09%an%x09%ad%x09%s"
```

```
# .git/config
[pretty]
    dateline = format:%C(yellow)%h%Creset%x09%Cred%<(13)%an%Creset%x09%Cblue%ad%Creset%x09%s

[format]
    pretty = dateline
```
- [[gitconfig]]
>format. pretty
           The default pretty format for log/show/whatchanged command, See git-log (1), git-show (1), git-whatchanged (1).

- [formatting - Git how to save a preset git log --format - Stack Overflow](https://stackoverflow.com/questions/1441156/git-how-to-save-a-preset-git-log-format)

# Link
- [explainshell.com - git log --all -M -C --numstat --date=short --pretty=format:'--%h--%ad--%an' --no-renames](https://explainshell.com/explain?cmd=git+log+--all+-M+-C+--numstat+--date%3Dshort+--pretty%3Dformat:%27--%25h--%25ad--%25an%27+--no-renames)
- [Git log format history | Use Git log to format the commit history | Edureka](https://www.edureka.co/blog/git-format-commit-history/)