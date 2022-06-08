---
tags: AOSP Rockchip 
---


1. 删除子目录 `.git` 仓库
2. 重命名原来 master 分支
```shell
git branch -m master master-v1
```

3. 新建一个无关分支
```shell
git checkout --orphan=master
```