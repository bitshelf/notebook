---
tags: Vim 
---

## 生成 cscope 数据
### 使用 `cscope -Rbq`
```shell
cscope -Rbq
```
- @ 将产生 cscope. out、cscope. in. out 和 cscope. po. out 三个文件
- `-b`：仅构建交叉引用 (cross-reference)文件，即数据库，然后退出，而不会进入下面的交互界面
- `-R`：递归解析所有的子目录
- `-q`：通过倒排索引加速符号的查找过程。该选项会导致 cscope 额外产生 cscope. in. out 和 cscope. po. out 两个文件

## 指定文件产生数据库
```shell
find /my/project/dir -name '*.c' -o -name '*.h' > /foo/cscope.files

cscope -R -b -i cscope.files
```

---
## Link 
- [VIM 中文帮助: 联用 cscope 与 Vim](https://yianwillis.github.io/vimcdoc/doc/if_cscop.html)