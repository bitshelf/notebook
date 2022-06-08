---
tags:
  - Git
---
## 删除一个 submodule , 一般需要做下面的几步:
1. 删除项目源码子目录
2. 删除 .gitmodules 文件中 submodule 的信息
3. 删除 .git/config 文件中 submodule 的信息
4. 删除 .git/modules/ 目录下 sumodule 的子目录