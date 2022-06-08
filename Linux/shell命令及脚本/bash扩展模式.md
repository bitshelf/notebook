---
tags: Linux/command
---

# bash 的扩展模式
1. Bash 关闭扩展
~~~shell
$ set -o noglob
# 或者
$ set -f
~~~

2. 打开扩展
~~~shell
$ set +o noglob
# 或者
$ set +f
~~~

* Shell 接收到用户输入的命令以后，会根据空格将用户的输入，拆分成一个个词元（token）。然后，Shell 会扩展词元里面的特殊字符，扩展完成后才会调用相应的命令
* Bash 是先进行扩展，再执行命令。因此，**扩展的结果是由 Bash 负责的**，与所要执行的命令无关。命令本身并不存在参数扩展，收到什么参数就原样执行


## Bash 一共提供八种扩展
-   波浪线扩展
-   `?` 字符扩展：不包括空字符
-   `*` 字符扩展：`*` 字符代表文件路径里面的任意数量的任意字符，包括零个字符
-   方括号扩展
-   大括号扩展
-   变量扩展
-   子命令扩展
-   算术扩展

###  字符类扩展
-   `[[:alnum:]]`：匹配任意英文字母与数字
-   `[[:alpha:]]`：匹配任意英文字母
-   `[[:blank:]]`：空格和 Tab 键
-   `[[:cntrl:]]`：ASCII 码 0-31 的不可打印字符
-   `[[:digit:]]`：匹配任意数字 0-9
-   `[[:graph:]]`：A-Z、a-z、0-9 和标点符号
-   `[[:lower:]]`：匹配任意小写字母 a-z
-   `[[:print:]]`：ASCII 码 32-127 的可打印字符
-   `[[:punct:]]`：标点符号（除了 A-Z、a-z、0-9 的可打印字符）
-   `[[:space:]]`：空格、Tab、LF（10）、VT（11）、FF（12）、CR（13）
-   `[[:upper:]]`：匹配任意大写字母 A-Z
-   `[[:xdigit:]]`：16进制字符（A-F、a-f、0-9）


> [!example] 字符扩展的一些例子
> 1. 输出所有大写字母开头的文件名
> ~~~shell
echo [[:upper:]]*
>~~~
>2. 输出所有不以数字开头的文件名
>~~~shell
echo [![:digit:]]*
>~~~
>* 字符类的第一个方括号后面，可以加上感叹号 `!`，表示否定
>* 字符类也属于文件名扩展，如果没有匹配的文件名，字符类就会原样输出

## 量词语法
量词语法用来控制模式匹配的次数。只有在 Bash 的 `extglob` 参数打开的情况下才能使用，不过一般是默认打开的。下面的命令可以查询
```shell
$ shopt extglob
extglob        	on
```

如果`extglob`参数是关闭的，可以用下面的命令打开。

```shell
$ shopt -s extglob
```

-   `?(pattern-list)`：模式匹配零次或一次
-   `*(pattern-list)`：模式匹配零次或多次
-   `+(pattern-list)`：模式匹配一次或多次
-   `@(pattern-list)`：只匹配一次模式
-   `!(pattern-list)` ：匹配给定模式以外的任何内容

```shell
$ ls abc@(.txt|.php)
abc.php abc.txt
```
* 上面例子中，`@(.txt|.php)` 匹配文件有且只有一个 `.txt` 或 `.php` 后缀名

> [!attention] 
> 量词语法也属于文件名扩展，如果不存在可匹配的文件，就会原样输出
> ```shell
># 没有 abc 开头的文件名
$ ls abc?(def)
ls: 无法访问'abc?(def)': 没有那个文件或目录
>```

#  `shopt` 命令
* `shopt` 命令可以调整 Bash 的行为。它有好几个参数跟通配符扩展有关
* `shopt` 命令的使用方法如下
```shell
# 打开某个参数
$ shopt -s [optionname]

# 关闭某个参数
$ shopt -u [optionname]

# 查询某个参数关闭还是打开
$ shopt [optionname]
```

##  dotglob 参数
打开 `dotglob`，就会包括隐藏文件

~~~shell
$ shopt -s dotglob
$ ls *
abc.txt .config
~~~

## nullglob 参数
`nullglob` 参数可以让通配符不匹配任何文件名时，返回空字符
```shell
$ shopt -s nullglob
$ rm b*
rm: 缺少操作数
```
没有 `b*` 匹配的文件名，所以 `rm b*` 扩展成了 `rm`，导致报错变成了”缺少操作数“

## failglob 参数
`failglob` 参数使得通配符不匹配任何文件名时
~~~shell
$ shopt -s failglob
$ rm b*
bash: 无匹配: b*
~~~

## extglob 参数
`extglob` 参数使得 Bash 支持 ksh 的一些扩展语法。它默认应该是打开的，主要应用是支持量词语法。如果不希望支持量词语法，可以用下面的命令关闭

## nocaseglob 参数
`nocaseglob` 参数可以让通配符扩展不区分大小写
```shell
$ shopt -s nocaseglob
$ ls /windows/program*
/windows/ProgramData
/windows/Program Files
/windows/Program Files (x86)
```

## globstar 参数
*  `globstar` 参数可以使得 `**` 匹配零个或多个子目录。该参数默认是关闭的
* 打开 `globstar` 参数以后，`**` 匹配零个或多个子目录
```shell
$ shopt -s globstar
$ ls **/*.txt
a.txt  sub1/b.txt  sub1/sub2/c.txt
```

# bash 字符串
Bash 只有一种数据类型，就是**字符串**。不管用户输入什么数据，Bash 都视为字符串。因此，字符串相关的引号和转义