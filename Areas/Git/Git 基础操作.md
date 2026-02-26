---
tags: Git
---
# Git 基础操作
#### Git 配置
```shell
# 显示当前的Git配置
git config --list

# 编辑Git配置文件
git config -e [-global]
```
## 增加/删除/修改文件
```shell
# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
git rm --cached [file]
```
## 代码提交
~~~shell
# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
git commit -a

# 提交时显示所有diff信息
 git commit -v
 
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
git commit --amend [file1] [file2] ...
~~~
## 分支
~~~shell
# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]

# 合并指定分支到当前分支
git merge [branch]
 
# 衍合指定分支到当前分支
git rebase <branch>

# 切换到上一个分支
git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
git branch --set-upstream [branch] [remote-branch]
~~~

## 查看信息
~~~shell
# 搜索提交历史，根据关键词
git log -S [keyword]

# 显示某个文件的版本历史，包括文件改名
git log --follow [file]
git whatchanged [file]

# 显示指定文件相关的每一次 diff
git log -p [file]
~~~

##  其他
~~~shell
# 生成一个可供发布的压缩包
git archive

# 获取已经删除的 png 图片路径名
 git status | grep png | sed 's/\tdeleted:    /"/; s/png/png"/'
 ~~~

