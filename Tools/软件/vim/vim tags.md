---
tags: Vim 
---

1. 生成 tags：`ctags -R .`
2. 要对目录下所有 C 代码生成 tags 文件
```shell
ctags --languages=c --langmap=c:.c.h --fields=+S -R .
```

3. 为 Java 文件生成 tags 
```shell
ctags -R --java-kinds=+l
```
# vim 设置 tags
~~~vim
set tags=./tags;,tags,/usr/local/etc/systags
~~~
* `;` 表示向上递归