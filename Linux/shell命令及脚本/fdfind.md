---
tags: [command]
---
# 默认选项
1. 默认忽略大小写
2. 默认情况下,忽略隐藏的目录和文件
3. 忽略匹配你`.gitignore`文件中的模式,默认情况

---
# 选项使用
~~~shell
USAGE:
    fd [FLAGS/OPTIONS] [<pattern>] [<path>...]

FLAGS:
    -H, --hidden            搜索隐藏的文件和目录
    -I, --no-ignore         不要忽略 .(git | fd)ignore 文件匹配
        --no-ignore-vcs     不要忽略.gitignore文件的匹配
    -s, --case-sensitive    区分大小写的搜索（默认值：智能案例）
    -i, --ignore-case       不区分大小写的搜索（默认值：智能案例）
    -F, --fixed-strings     将模式视为文字字符串
    -a, --absolute-path     显示绝对路径而不是相对路径
    -L, --follow            遵循符号链接
    -p, --full-path         搜索完整路径（默认值：仅限 file-/dirname）
    -0, --print0            用null字符分隔结果
    -h, --help              打印帮助信息
    -V, --version           打印版本信息

OPTIONS:
    -d, --max-depth <depth>        设置最大搜索深度（默认值：无）
    -t, --type <filetype>...       按类型过滤：文件（f），目录（d），符号链接（l），
                                   可执行（x），空（e）
    -e, --extension <ext>...       按文件扩展名过滤
    -x, --exec <cmd>               为每个搜索结果执行命令
    -E, --exclude <pattern>...     排除与给定glob模式匹配的条目
        --ignore-file <path>...    以.gitignore格式添加自定义忽略文件
    -c, --color <when>             何时使用颜色：never，*auto*, always
    -j, --threads <num>            设置用于搜索和执行的线程数
    -S, --size <size>...           根据文件大小限制结果。

ARGS:
    <pattern>    the search pattern, a regular expression (optional)
    <path>...    the root directory for the filesystem search (optional)
~~~
1. 直接输入：`fdfind`会类似`ls`
2. 按扩展名过滤：`fdfind -e jpg` `fdfind -e jpg index`(文件名为index)
3. 搜索被`.gitignore`忽略的文件：`fdfind -I filename`
4. 搜索隐藏文件：`-H`或`--hidden`
5. 排除某些结果：`-E`
6. 搜索到的文件并对其执行命令：`-x`或`-exec`
	~~~shell
	fdfind -e jpg -x chmod 644 {} 
	~~~
## 并行命令执行
如果`-x`/`--exec`选项与命令模板一起指定,将创建一个作业池,用于并行执行命令，每个发现的路径则作为输入. 生成命令的语法类似于GNU穿行的语法:
-   `{}`: 将被替换为搜索结果路径的占位符令牌 (`documents/images/party.jpg`)
-   `{.}`: 像`{}`,但没有文件扩展名 (`documents/images/party`)
-   `{/}`:占位符,将被搜索结果的基名替换 (占位符) . `party.jpg`)
-   `{//}`:使用已发现路径的父节点 (`documents/images`)
-   `{/.}`:使用BaseNeNe,将扩展名移除 (`party`)
