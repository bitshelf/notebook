---
tags: [command]
---

# 一些示例
1. `rg 'fast\w+' README.md` ： *fast* 不会匹配，*faste* 匹配
2. `rg 'fn write\('` / `rg -F 'fn write('` **-F** 将模式解释为字面字符串，不是正则表达式
3. `-u` 将禁用 `.gitignore` 处理，`-uu` 将搜索隐藏的文件和目录 `-uuu` 将搜索二进制文件
# 用法
* 搜索指定类型文件：`-g '*.{c,h}'`，排除指定类型文件 `-g '!*.{c,h}'`
* 搜索指定目录：`-g 'foo/**'`，错误用法 `-g foo` 
* `-l` : 只打印匹配的文件名，`--files-without-match` 只打印无匹配的文件名
* `--files` 打印 ripgrip 将要搜索的文件，但不要实际搜索它们
* `-A NUM` ：显示匹配内容后的 NUM 行
* `-C` ：显示匹配内容的前后 NUM 行
* `-c/--count` : 报告总匹配行的计数
* `--sort path` : 强制 ripgrep 将其输出按文件名排序。(这禁用并行性，所以它可能会慢一些。)
* `-M/--max-columns` : 限制 ripgrip 打印的行的长度
* `-s` ：大小写敏感
* `-l` ：只打印文件名
* `-L` ：递归搜索所有链接
* `--hidden` ：搜索隐藏文件和文件夹
* `--max-depth NUM` ：限制文件夹递归搜索深度
* `--max-filesize NUM K/M/G` ：忽略大于 NUM byte 的文件, K/M/G 容量单位
* `--z，--search-zip` : 在 gz，bz2，xz，lzma，lz4 文件类型搜索
* `-a,--text` ：搜索二进制文件
* `--debug` 显示调试信息
# 简介
* ripgrep 是一个以行为单位的搜索工具
* 自动递归搜索
* 自动忽略. gitignore 中的文件以及 2 进制文件
* 支持搜索常见压缩文件