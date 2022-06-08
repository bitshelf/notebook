---
tags:
  - Git
---
## Git Sparse Checkout
```shell
git init <project>
git remote add origin ssh://<user>@<repository's url>
git config core.sparsecheckout true # 或者 git sparse-checkout init

# 设置 sparse checkout 目录
git sparse-checkout set Test # 或者 echo "Test" >> .git/info/sparse-checkout

# 指定分支 sparse checkout
git pull origin branch-name
```

## link 
- [Git Sparse Checkout使用指南\_git sparse-checkout-CSDN博客](https://blog.csdn.net/shelutai/article/details/123116973)