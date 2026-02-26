---
tags:
  - Git
---
# Git 不显示远程分支
对望提供 Git 仓库时，不想暴露已有的分支
1. 备份Git设置文件：`cp .git/config ./`
2. 删除远程git连接：`git remote rm origin`
