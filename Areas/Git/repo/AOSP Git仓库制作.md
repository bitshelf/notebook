---
tags:
  - Android
  - Git/repo
---
![RK Android repo源码转 Git 仓库](../../../Android/Android源码/RK%20Android%20repo源码转%20Git%20仓库.md)

1. 删除 `.git` 仓库，如果已经建了 git 仓库，需要把原来的重命名 
```shell
find ./ -name ".git" | xargs rm -rf # 注意重命名根目录 .git
git add ./
```
2. 删除 `.gitignore`（可以通过 `git checkout`）
```shell
for file in `find ./ -name .gitignore`; do mv `dirname $file`/{.gitignore,.gitignorebak}; done
```
### 重命名 `.gitignore` 
```shell
for file in `find ./ -name .gitignorebak`; 
do 
	echo $file;
	mv `dirname $file`/{.gitignorebak,.gitignore}; 
done
```

3. 将 `.gitignorebak` 添加到根目录 `.gitignore` 文件为忽略
4. 将之前被 `git add -f` 的文件添加到 Git 仓库
5. 将 `.gitignorebak` 重命名为 `.gitignore`
6. 进入 u-boot kernel 目录
```shell
git status ./ | grep -v gitignore > git.txt
git restore --staged ./

# 将之前被 `git add -f` 的文件添加到 Git 仓库
vim git.txt # 去除其他信息
cat git.txt | xargs git add -f
```


