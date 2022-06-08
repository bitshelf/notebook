---
tags:
  - Android/repo
---
## RK Android repo 源码转 Git 仓库

> [!tip] 优先处理
> 查找编译时依赖 Git 仓库的模块，需要先特殊处理
> `grep "\.git" --include="*.bp" -rni ./hardware/ ./vendor/`

### 方式一
- 将 repo 仓库转化 git 的目标是：使用 `repo sync -l` 和 `git reset --hard` 得到相同的文件
- 为了加快 `git status` 的速度，可以将不会改动的目录添加 `.gitignore` 文件中，例如 `RKDos`
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

### 方式二
1. 移动备份 repo 仓库
```shell
mv .repo/ ../repo-`date +%Y%m%d`
```

2. 重命名 .git 目录名
	- $  由于源码中各个 `.git` 目录是个软链接，所以重命名添加到 Git 仓库
```shell
for git in `find ./ -name .git`; 
do 
	echo $git; 
	mv `dirname $git`/{.git,.gitlink};
done
```

3. 重命名 `.gitignore`
```shell
 for file in `find ./ -name .gitignore`;  
 do  echo $file; 
 mv `dirname $file`/{.gitignore,.gitignorebak};  
 done

git add -f ./
```

5. 创建 `.gitignore` 把 `.gitignorebak` 添加到根目录的 `.gitignore`
```.gitignore
echo  '*.gitignorebak' > .gitignore
```

-  把被 `git add -f` 添加的文件，添加回来
```shell
git status  | grep -v delete | \
sed  '/It\ took/,/no\ changes\ added/d' | \
sed  '/On\ branch\ master/,/(use\ \"git\ add\ </d' | xargs git add
```

