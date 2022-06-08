---
tags:
  - Git/repo
---

## repo 让源码恢复到原生状态
```shell
repo sync -d
or
repo forall -vc "git reset --hard"
```
- 清除源码里面的所有记录，让源码回到最初状态

## Link
- [git repo sync – 阿里git客户端工具](https://git-repo.info/zh_cn/docs/multi-repos/git-repo-sync/)