---
tags:
  - Git/repo
---
## repo init报错
```
fatal: double check your --repo-rev setting.
fatal: cloning the git-repo repository failed, will remove ‘.repo/repo’
```
1. 在 `init` 时添加 `--repo-url` 参数
```shell
--repo-url='https://mirrors.tuna.tsinghua.edu.cn/git/git-repo/'
```
2. 设置环境变量
```shell
export REPO_URL='https://mirrors.tuna.tsinghua.edu.cn/git/git-repo'
```
3. 修改 repo 可执行文件
```python
# .bin/repo
REPO_URL = ‘git@xxx.xxx.com.cn:opensource/repo-git.git’ # 修复位置和内容
REPO_REV = ‘stable’
```

## link
- [git-repo | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/git-repo/)
- [repo工具使用方案 / repo guide - develop.phytec.cn - PHYTEC Wiki - develop.phytec.cn - PHYTEC Wiki](https://wiki.phytec.com/pages/viewpage.action?pageId=69503262)