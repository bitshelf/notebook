---
tags: [Git]
---

# 定位那一次提交引入错误
1. 启动查错：`git bisect start 终点 起点`
	* *终点*：是最近的提交
	* *起点*：更久以前的提交
	~~~shell
	git bisect start HEAD pre-commit
	~~~
	或者
	~~~shell
	git bisect start
	git bisect bad
	git bisect good commit1-commit2 # commit1-commit2 is know to be good
	~~~
2. `git bisect bad`
3. `git bisect good`
4. 退出查错，回到最近一次代码提交： `git bisect reset` / `git bisect <commit>`
5. checkout 到引入 bug 的 commit： `git bisect reset bisect/bad` 
6. 查看测试结果：`git bisect log`
7. `git bisect visualize` / `git bisect visualize --stat` ：查看剩余需要测试的 commit
8. `git bisect log > bisect.log` ：保存 bisect  log，可以修改*good/bad*使用 `git bisect replay bisect.log` 回到 bisect 状态


