---
tags:
  - GN
---
## rebase_path

 `rebase_path` 转换目录. 参见 `gn help rebase_path` 更多的帮助和例子. 将相对于当前目录的文件名转换为根目录的典型用法是: `new_paths = rebase_path("myfile.c", root_build_dir)`

GN 的 `rebase_path()` 拥有三个参数，其中后两个可选。它的单参数形式返回一个绝对路径，这种做法[不推荐](https://groups.google.com/a/chromium.org/g/gn-dev/c/WOFiYgcGgjw)。在构建模板和目标中应当避免。`new_base` 的值会根据实际情况发生变化，而 `root_build_dir` 则是其常用选项，因为它是构建脚本执行的地方。请在 `rebase_path()` 的 [GN 参考手册](https://gn.googlesource.com/gn/+/master/docs/reference.md#func_rebase_path)中参阅更多信息

相对路径可以在项目路径或构建输出目录发生改变时保持不变。相较于绝对路径，相对路径有几点优势：

- 不通过构建输出路径泄露潜在敏感信息，保护用户隐私。
- 提升内容定址缓存（content-addressed caches）的效率。
- 使得 bot 间的交互成为可能，例如，一个 bot 跟随另一 bot 的操作运行。


## Link
- [gn-zh/docs/language.zh.md at master · chinanf-boy/gn-zh · GitHub](https://github.com/chinanf-boy/gn-zh/blob/master/docs/language.zh.md)