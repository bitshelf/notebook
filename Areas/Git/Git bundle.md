---
tags: Git
---

# git bundle
## `git bundle create` 命令来打包
```shell
 git bundle create repo.bundle HEAD master 
```
- 果你希望这个仓库可以在别处被克隆，你应该像例子中那样增加一个 HEAD 引用

```shell
git clone repo.bundle repo
```
- 如果你在打包时没有包含 HEAD 引用，你还需要在命令后指定一个 `-b master` 或者其他被引入的分支， 否则 Git 不知道应该检出哪一个分支