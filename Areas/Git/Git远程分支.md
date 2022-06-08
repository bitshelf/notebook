---
tags: Git
---

# Git 远程分支
#### 将新分支推送到远程
```shell
git push origin new
# or
git push origin new:new
# 本地的 serverfix 分支推送到远程仓库上的 awesomebranch 分支
git push origin serverfix:awesomebranch
```

#### 设置密码保存
```shell
git config --global credential.helper cache
```