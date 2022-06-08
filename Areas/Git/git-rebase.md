---
tags: Git 
---

# rebase
## 修改某次提交
1. 将HEAD移到需要更改的commit上:更改当前就不需要  
```bash  
git rebase -i <commit_id>   #commit要放到需要修改的那次之前，这样编辑页面才能显示到需要修改的commit  
```  

````ad-tip
title: git rebase 根节点
collapse: open
```shell
git rebase --root -i
```

````

2. 此时进入编译页面，找到需要更改的commit, 将行首的pick改成edit, 之后保存退出，此时进入了该commit时的工作区内容  
3. 在工作区更改文件、解决冲突等  
4. git add 将更改的文件添加到暂存  
  
**注意：若有其他仓库已经更新了代码，此时在主仓库追加了更改的情况下，最好回退到更改之前的提交之后再更新，否则由于提交信息不一致将造成冲突**
# VS Code rebase
1. 将 VS Code 设为 rebase 编辑器 
~~~shell
git config --local sequence.editor "code --wait"
~~~

----
# 相关链接
* [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens#powerful-commands-)
<iframe 
    height = 400
    width = 100%
    src="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens#powerful-commands-">
</iframe>