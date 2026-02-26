---
tags:
  - Android/repo
---
## RK Android repo 源码转 Git 仓库

> [!tip] 优先处理
> 查找编译时依赖 Git 仓库的模块，需要先特殊处理
> `grep "\.git" --include="*.bp" -rni ./hardware/ ./vendor/`

## 方式一
- 将 repo 仓库转化 git 的目标是：使用 `repo sync -l` 和 `git reset --hard` 得到相同的文件
- 为了加快 `git status` 的速度，可以将不会改动的目录添加 `.gitignore` 文件中，例如 `RKDos`


1. 移动备份 repo 仓库
```shell
mv .repo/ ../repo-`date +%Y%m%d`
```

2. 重命名 .git 目录名
	- $  由于源码中各个 `.git` 目录是个软链接，所以重命名添加到新的 Git 仓库
```shell
for git in `find ./ -name .git`; 
do 
	echo $git; 
	mv `dirname $git`/{.git,.gitlink};
done

git add -f ./

# 在 SDK 目录执行，把不会改动的目录添加到 .gitignore
ls -1 > .gitignore # 然后做修改

# 加快 Git 操作
scalar register 
git maintenance start
```

单行命令行
```shell
for gitrepo in $(find ./ -name .git); do echo $gitrepo; mv `dirname $gitrepo`/{.git,.gitlink}; done

# 恢复成 repo
for gitrepo in `find ./ -name .gitlink`; do echo $gitrepo; mv `dirname $gitrepo`/{.gitlink,.git}; done

# 从新的 Git 仓库删除误添加的编译生成文件
git rm --cached  $(git status ./ | grep modi | awk '{print $2}')
```

## 方式二
```shell
# 移动备份 repo 仓库
mv .repo/ ../repo-`date +%Y%m%d`

# 重命名 .git
for git in `find ./ -name .git`; 
do 
	echo $git; 
	mv `dirname $git`/{.git,.gitlink};
done

# 将所有文件添加到 git 仓库
git init 
find . | xargs git add -f
git commit -m "init repo"
```