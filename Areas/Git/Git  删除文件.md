---
tags:
  - Git
---

# 核弹级选项: filter-branch
## 从所有提交中删除一个文件
这个经常发生。有些人不经思考使用 git add .，意外地提交了一个巨大的二进制文件，你想将它从所有地方删除。也许你不小心提交了一个包含密码的文件，而你想让你的项目开源。filter-branch 大概会是你用来清理整个历史的工具。要从整个历史中删除一个名叫 password.txt 的文件，你可以在 filter-branch 上使用–tree-filter 选项：

```
$ git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
Rewrite 6b9b3cf04e7c5686a9cb838c3f36a8cb6a0fc2bd (21/21)
Ref 'refs/heads/master' was rewritten
```

-  `--tree-filter` 选项会在每次检出项目时先执行指定的命令然后重新提交结果
- 在这个例子中，你会在所有快照中删除一个名叫 `password.txt` 的文件，无论它是否存在
- 如果你想删除所有不小心提交上去的编辑器备份文件，你可以运行类似 `git filter-branch -–tree-filter 'rm -f *~'` HEAD 的命令。你可以观察到 Git 重写目录树并且提交，然后将分支指针移到末尾。一个比较好的办法是在一个测试分支上做这些然后在你确定产物真的是你所要的之后，再 hard-reset 你的主分支。
- 要在你所有的分支上运行 filter-branch 的话，你可以传递一个  `–all` 给命令

## link 
- [读《Pro Git》](https://manateelazycat.github.io/2022/12/16/reading-pro-git/)