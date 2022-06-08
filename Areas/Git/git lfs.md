---
tags: Git 
---

## 忽略单次拉取操作
```
GIT_LFS_SKIP_SMUDGE=1 git clone SERVER-REPOSITORY
```
Windows 需要使用两条命令
```
set GIT_LFS_SKIP_SMUDGE=1  
git clone SERVER-REPOSITORY
```
## 全局配置忽略拉取大文件操作
```
git config --global filter.lfs.smudge "git-lfs smudge --skip -- %f"
git config --global filter.lfs.process "git-lfs filter-process --skip"
git clone SERVER-REPOSITORY
```
## 恢复配置
```
git config --global filter.lfs.smudge "git-lfs smudge -- %f"
git config --global filter.lfs.process "git-lfs filter-process"
```
