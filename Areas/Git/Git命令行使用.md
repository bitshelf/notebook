---
tags: Git
---

# Git
1. `git push origin -d feature` 删除远程仓库的*feature* 分支
2. `cat .git/FETCH_HEAD` 查看fetch拉取状态
3. `git pull -v` 查看pull详细信息
4. `git gc`: 清理Git仓库垃圾文件
5. `git lfs track`: 跟踪大文件
6. `git lfs ls-files` 查看大文件
7. `git config commit.gpgsign false` 关闭数字签名
> 官方文档 [Git LFS](https://git-lfs.github.com)
> Git LFS [操作指南](https://gitee.com/help/articles/4235)
> LFS <https://zzz.buzz/zh/2016/04/19/the-guide-to-git-lfs/#advanced-operations>
> LFS 基础操作: <https://zzz.buzz/zh/2016/04/19/the-guide-to-git-lfs/#advanced-operations>
> 阿里云 LFS: <https://help.aliyun.com/document_detail/206889.html>
# Git Submodule
* `git submodule --help` -> 查看帮助
* `git help submodule`-> 查看帮助
* `git submodule init`-> 初始化子模块
* `git submodule add`-> 添加子模块
* `git submodule status` -> 查看子模块状态
* `git submodule update` -> 更新子模块内容
* `git submodule set-branch`-> 切换子模块分支
* `git submodule set-url` -> 设置子模块远程地址
* `git clone --filter=... --recurse-submodules` 递归 clone submodule
## Git 查找更多实用的命令
* `git help tutorial` 初始化帮助
* `git help workflows` 推拉代码
* `git help everyday` 文件操作帮助
* `git hlep revisions` 检查历史和状态

> [!note] Git配置文件
> 
> * Git 自带一个 git config 的工具来帮助设置控制 Git 外观和行为的配置变量
> 	1. `/etc/gitconfig` 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果在执行 `git config `时带上 `--system` 选项，那么它就会读写该文件中的配置变量。
> 	2. 

> [!note] `git add`多功能命令
> > 可以理解为“精确地将内容添加到下一次提交中”而不是“将一个文件添加到项目中”要更加合适
> 
> * 开始跟踪新文件
> * 已跟踪的文件放到暂存区
> * 用于合并时把有冲突的文件标记为已解决状态等
> 
> 
## 删除文件
1. 从 git 仓库和工作区中删除
	~~~shell
	git rm filename
	~~~
2. 从 Git 仓库中删除，保留工作区文件
	~~~shell
	git rm --cached filename 
	~~~
3. 有修改或者已经放到暂存区
	~~~shell
	git rm -f filename 
	~~~
4. 删除目录下下指定文件
	~~~shell 
	git rm log/\*.log 
	~~~

> 注意到星号 `*` 之前的反斜杠 `\`，因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。此命令删除 log/ 目录下扩展名为 .log 的所有文件

## git log 的常用选项
| 选项            | 说明                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| -p              | 按补丁格式显示每个提交引入的差异                                                                          |
| --stat          | 显示每次提交的文件修改统计信息                                                                            |
| --shortstat     | 只显示 --stat 中最后的行数修改添加移除统计                                                                |
| --name-only     | 仅在提交信息后显示已修改的文件清单                                                                        |
| --name-status   | 显示新增、修改、删除的文件清单。                                                                          |
| --abbrev-commit | 仅显示 SHA-1 校验和所有 40 个字符中的前几个字符                                                           |
| --relative-date | 使用较短的相对时间而不是完整格式显示日期（比如“2 weeks ago”）                                             |
| --graph         | 在日志旁以 ASCII 图形显示分支与合并历史                                                                   |
| --pretty        | 使用其他格式显示历史提交信息。可用的选项包括 oneline、short、full、fuller 和 format（用来定义自己的格式） |
| --oneline       | --pretty=oneline --abbrev-commit 合用的简写                                                               |
## git log 限制输出的选项
| 选项              | 说明                                     |
| ----------------- | ---------------------------------------- |
| `-<n>`            | 仅显示最近的 n 条提交                    |
| --since, --after  | 仅显示指定时间之后的提交                 |
| --until, --before | 仅显示指定时间之前的提交                 |
| --author          | 仅显示作者匹配指定字符串的提交           |
| --committer       | 仅显示提交者匹配指定字符串的提交         |
| --grep            | 仅显示提交说明中包含指定字符串的提交     |
| **-S**            | 仅显示添加或删除内容匹配指定字符串的提交 |
## git log --pretty=format 常用选项
> git log --pretty=format:"%h - %an, %ar : %s"

| 选项 | 说明                                          |
| ---- | --------------------------------------------- |
| %H   | 提交的完整哈希值                              |
| %h   | 提交的简写哈希值                              |
| %T   | 树的完整哈希值                                |
| %t   | 树的简写哈希值                                |
| %P   | 父提交的完整哈希值                            |
| %p   | 父提交的简写哈希值                            |
| %an  | 作者名字                                      |
| %ae  | 作者的电子邮件地址                            |
| %ad  | 作者修订日期（可以用 --date=选项 来定制格式） |
| %ar  | 作者修订日期，按多久以前的方式显示            |
| %cn  | 提交者的名字                                  |
| %ce  | 提交者的电子邮件地址                          |
| %cd  | 提交日期                                      |
| %cr  | 提交日期（距今多长时间）                      |
| %s   | 提交说明                                      |

### 查看某个远程仓库
1. `git remote show <remote>`
### 标签
* 轻量标签：创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字
	>轻量标签很像一个不会改变的分支——它只是某个特定提交的引用。轻量标签本质上是将提交校验和存储到一个文件中——没有保存  
任何其他信息
* 附注标签：`git tag -a`
	> 存储在 Git 数据库中的一个完整对象，它们是可以被校验的，其中包含打标签者的名字、电子邮件、地址、日期时间，此外还有一个标签信息，并且可以使用 GNU Privacy Guard （GPG）签名并验证
* `git push` 命令并不会传送标签到远程仓库服务器上，运行 `git push origin <tagname>`

