---
tags: Git 
---

# .git/config 配置
## 差异配置
```
[user]
	email = luojianzhi@industio.com
[http]
	 proxy = socks5://192.168.0.36:7890
	;proxy = socks5://localhost:7890
[https]
	 proxy = socks5://192.168.0.36:7890
	;proxy = socks5://localhost:7890
[credential]
       helper = store
```

## 想通配置
~~~git
[core]
        editor = vim
        pager = delta
        quotepath = false
[filter "lfs"]
        clean = git-lfs clean -- %f
        smudge = git-lfs smudge -- %f
        process = git-lfs filter-process
        required = true
[gui]
        encoding = utf-8
[i18n]
        commitencoding = utf-8
        logoutputencoding = utf-8
[svn]
        pathnameencoding = utf-8
[i18n "commit"]
        encoding = utf-8

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true  # use n and N to move between diff sections

[merge]
    conflictstyle = diff3

[diff]
    colorMoved = default
[log]
        date = iso-local
        #date = auto:human
~~~
---
# 命令行设置
1. `git config log.date iso-local`