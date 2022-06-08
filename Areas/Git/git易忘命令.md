---
tags: Git 
---

# 分支
1. 设置默认编辑器：`git config --global core.editor "vim"`
2. 基于当前分支创建并切换到新分支
	~~~shell
	git checkout -b test
	~~~
3. 基于远程分支创建本地分支
	~~~shell
	git checkout -b master origin/master
	~~~
4. 克隆远程仓库中的指定分支
	~~~shell
	git clone -b master <url>
	~~~
5. 启动一个无历史的新分支
~~~shell
git checkout --orphan NEW_BRANCH_NAME_HERE
~~~
6. 在不切换分支的情况下从其它分支检出文件
~~~shell
git checkout BRANCH_NAME_HERE -- PATH_TO_FILE_IN_BRANCH_HERE
~~~


---
# 补丁管理
1. 生成补丁文件（从最新提交记录往下数 3 个）
	~~~shell
	git format-patch -3
	~~~
2. 生成指定提交记录补丁文件
	~~~shell
	git format-patch -1 <commit-ID>
	~~~
3. 打补丁
	~~~shell
	git am test.patch
	~~~
4. 导出两次提交之间修改过的文件
```shell
git archive -o ../latest.zip NEW_COMMIT_ID_HERE $(git diff --name-only OLD_COMMIT_ID_HERE NEW_COMMIT_ID_HERE)
```
5. 从无关的本地仓库应用补丁
~~~shell
git --git-dir=PATH_TO_OTHER_REPOSITORY_HERE/.git format-patch -k -1 --stdout COMMIT_HASH_ID_HERE| git am -3 -k
~~~
6. 检查您的分支变化是是否其他分支的一部分
~~~shell
git cherry -v OTHER_BRANCH_NAME_HERE
~~~
