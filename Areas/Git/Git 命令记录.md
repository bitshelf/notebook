---
tags: Git
---

# git
#### 编辑 Git 配置文件
```shell
git config -e [-global]
```
#### 提交暂存区的指定文件到仓库区
~~~shell
git commit [file1] [file2] ... -m [message]
~~~
#### 新建一个分支，与指定的远程分支建立追踪关系
~~~shell
git branch --track [branch] [remote-branch]
~~~
#### 删除远程分支
~~~shell
git push origin --delete [branch-name]
git branch -dr [remote/branch]
~~~
#### 切换到上一个分支
~~~shell
git checkout -
~~~
#### 建立追踪关系，在现有分支与指定的远程分支之间
~~~shell
git branch --set-upstream [branch] [remote-branch]
~~~
#### 搜索提交历史，根据关键词
~~~shell
git log -S [keyword]
~~~
#### 显示某个文件的版本历史，包括文件改名
~~~shell
git log --follow [file]
git whatchanged [file]
~~~
#### 显示指定文件相关的每一次 diff
~~~shell
git log -p [file]
~~~

#### 获取已经删除的 png 图片路径名
~~~shell
 git status | grep png | sed 's/\tdeleted:    /"/; s/png/png"/'
 ~~~

