---
tags:
  - scoop
---
## 安装
```powershell
# 首先设置 SCOOP = D:\Users\luo-j\Scoop
# SCOOP_GLOBAL D:\Users\luo-j\Scoop
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

scoop bucket add abyss https://github.com/abgox/abyss
scoop install abyss/sigoden.Argc-completions

# 搜索软件包
scoop search wezterm
```