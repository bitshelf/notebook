---
tags: Git
---

# Git 中文乱码
~~~shell
git config --global core.quotepath false
~~~

在.git/config(Windows: `code ~/.gitconfig`) 添加如下：
```git 
 
[gui] 
	encoding = utf-8 
[core] 
	quotepath = false 
[i18n] 
	commitencoding = utf-8 
	logoutputencoding = utf-8 
[svn] 
	pathnameencoding = utf-8 
[i18n "commit"] 
	encoding = utf-8
```
### 如果以上修改还没有解决问题，尝试以下方法：
```git 
export LESSCHARSET=utf-8
```

