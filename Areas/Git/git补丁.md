---
tags: Git 
---

# format-patch
* 某commit以来的修改(不包含该commit):
	  `git format-patch <commit>`
* 两个commit间的修改(包含两个commit)
	  `git format-patch <commit1>..<commit2>`
# am
1. 放弃掉之前的am信息，返回没有打patch的状态
   `git am –abort` 
2. 按照先后顺序打上patch: 
   `git am patch-dir/*.patch`
3. 查看patch的情况: 
   `git apply --stat 0001-***.patch`
4. 检查patch是否能够打上: 
    `git apply --check 0001-***.patch`
# patch 冲突
## 强行打patch
1. 根据`git am`失败的信息，找到发生冲突的具体patch文件，然后用命令`git apply --reject` ，强行打这个patch，发生冲突的部分会保存为.rej文件(例如发生冲突的文件是a.txt，那么运行完这个命令后，发生conflict的部分会保存为a.txt.rej)，未发生冲突的部分会成功打上patch
2. 根据.rej文件，通过编辑该patch文件的方式解决冲突
3. 废弃上一条am命令已经打了的patch：git am --abort