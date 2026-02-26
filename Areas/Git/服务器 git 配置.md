---
tags:
  - Git
---
## ~/.gitconfig 配置
```shell
  cat  /media/loh/rockchip/lr3576_v2/.gitconfig
[user]
	name = xxx
	email = xxx

[includeif "gitdir:~/.config/"]
	path = ~/.config/git/.my-gitconfig

[http]
	proxy = http://192.168.1.175:7897

; [url "https://gh-proxy.com/https://github.com/"]
;     insteadOf = https://github.com/

; [url "https://bgithub.xyz/"]
;     insteadOf = https://github.com/

;[core]
;	pager = bat --style="changes"

[color]
	ui = auto

[filter "lfs"]
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
	required = true

[gc]
	autoDetach = false
```