---
tags: Git
---

# git stash
1. 暂存某一个文件
~~~shell
 git stash push filename.txt
~~~

2. 查看暂存区某个文件与工作区的差异
```shell
git diff stash{0} filename
```

3. 查看 stash{0} 与 master 的差异
```shell
git diff stash@{0} master
```

4. 查看暂存区的所有差异
```shell
git stash show -p 0
git stash show -p stash@{0}
git show [options] <object>…
```

5. 查看暂存区某一完整文件
```shell
git show stash@{0}:file_name
```