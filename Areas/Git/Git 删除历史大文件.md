---
tags:
  - Git
---
# Git 大文件
## 查看 Git 仓库大小
```shell
git count-objects -v
```

## 找出历史 commit 所有大文件
~~~shell
git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -5 | awk '{print$1}')"
~~~
* `rev-list`命令用来列出Git仓库中的提交，我们用它来列出所有提交中涉及的文件名及其ID
* `-objects`：列出该提交涉及的所有文件ID
* `-objects`：列出该提交涉及的所有文件ID
* `verify-pack`：命令用于显示已打包的内容
## 删除文件
~~~shell
git filter-branch --force --index-filter 'git rm -rf --cached --ignore-unmatch big-filename' --prune-empty --tag-name-filter cat -- --all
~~~
* `filter-branch`命令可以用来重写Git仓库中的提交
* `--index-filter`参数用来指定一条Bash命令
* `–all`参数表示我们需要重写所有分支