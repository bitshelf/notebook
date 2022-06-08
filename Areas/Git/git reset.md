---
tags: Git 
---

## git reset 三种模式

### --hard
- 清除所有修改
	- 清除工作区
	- 清除暂存区
	- 清除目标节点之后的所有 commit

### --soft
- commit 之间的修改放到 index 暂存区
- 执行 `git commit` 将修改提交到 repository 
- 工作区的修改保存
- 可以将多个 commit 的修改放到，再合并为一个 commiit

### --mixed
- 将 commit 之间的所有修改放到工作区
- 将暂存区的修改放到工作区
- 之前的工作区修改保留

![](assets/git%20movements%20visualized.webp)