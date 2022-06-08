---
tags: Obsidian
---

# Obsidian 搜索
1. 空格相当于`AND`
2. 或 `OR`
3. 引号字符作为整体`""`
4. 英文小括号`()`
5. 转义字符 `\R`
6. 文件内容搜索符：`content:`
7. 嵌入搜索结果
````
```query
task-todo: "" OR block # 搜索语句
```
````

## 搜索符
- 文件名搜索符：`file:`
- 路径名搜索符：`path:`
- 文件内容搜索符：`content:`
- 标签内容搜索符：`tag:`
- 行搜索符：`line:`
- 块搜索符：`block:`
- 章节搜索符：`section:`
- 任务栏搜索符：
	- `task:`
	- `task-todo:`
	- `task-done:`
- 大小写控制符：
	- `match-case:`
	- `ignore-case:`