---
tags:
  - Git
---

# git clean
* `-d`   删除未跟踪目录以及目录下的文件，如果目录下包含其他git仓库文件，并不会删除（-dff可以删除）
* `-f`   如果 git cofig 下的 clean.requireForce 为true，那么clean操作需要-f(--force)来强制执行
* `-i`   进入交互模式
* -n   查看将要被删除的文件，并不实际删除文件