---
tags: sed
---

## sed 工作的基本方法
 1. 将文件以行为单位读取到内存（模式空间）
 2. 使用 *sed*  的每个脚本对该行进行操作
 3. 处理完成后输出该行
 4. 使用单引号，那么你没办法通过 `\’` 这样来转义，就有双引号就可以了，在双引号内可以用 `\”` 来转义
## sed 语法
```shell
sed [-hnV] [-e <script>] [-f <script] file.txt
sed SCRIPT INPUTFILE...
```
* `-n` 或- `-quiet` 或 `--silent` **sed**不写编辑行到标准输出, 缺省为打印所有行 (编辑和未编辑)，显示 script 处理后的结果
* `-e <script>` 或 `expression=<script>` 以选项中指定的 script 来处理输入的文本文件
* `-f <script` 文件>或 `--file=<script 文件>` 以选项中指定的 script 文件来处理输入的文本文件
## 动作说明
**sed 后面接的动作，请务必以 '' 两个单引号括住**
* `-p` : 命令可以用来打印编辑行
* `-a` ：新增， a 的后面可以接字串，而这些字串会在新的一行出现 (目前的下一行)
-  `-c` ：取代， c 的后面可以接字串，这些字串可以取代 n1,n2 之间的行！
- `-d` ：删除，因为是删除啊，所以 d 后面通常不接任何东东；
- `-i` ：插入， i 的后面可以接字串，而这些字串会在新的一行出现 (目前的上一行)；
- `-p` ：打印，亦即将某个选择的数据印出。通常 p 会与参数 sed -n 一起运行～
- `-s` ：取代，可以直接进行取代的工作哩！通常这个 s 的动作可以搭配正规表示法！例如 `1, 20s/old/new/g` 
- `-r` : 使用正则表达式
## 元字符
* `.` 匹配除换行符外的任意单个字符
* `*` 匹配任意一个跟在它前面的字符
* `[]` 匹配方括号中的字符类中的任意一个
* `^` 匹配开头
* `$` 匹配结尾 
## 扩展元字符
* `+` 匹配前面的正则表达式至少出现一次
* `?` 匹配前面的正则表达式出现一次或一次
* `|` 匹配它前面的或者后面的正则表达式

## 文本定位 (寻址)
* `/正则表达式/s/old/new/g` ，`/pattern/` 查询包含模式的行，比如 `/disk/` 或者 `/[a-z]/`
* `行号s/old/new/g` 可以是具体的行号也可以是最后一行
* `/pattern/pattern/`   查询包含两个模式的行, 如/ `disk/disks/`
* `\<` 表示词首。如：`\<abc` 表示以 abc 为首的词
* `\>` 表示词尾。如：`abc\>` 表示以 abc 結尾的词

## 示例
1. 在 testfile 文件的第四行后添加一行，并将结果输出到标准输出
	```shell
	sed -e 4a\newline testfile
	```
2.  将 /etc/passwd 的内容列出并且列印行号，同时，请将第 2~5 行删除
	~~~shell
	nl /etc/passwd | sed '2, 5d'
	~~~
3. 搜索 /etc/passwd 有 root 关键字的行 
	~~~shell
	nl /etc/passwd | sed '/root/p'
	~~~
4. 删除/etc/passwd 所有包含 root 的行，其他行输出
	~~~shell
	nl /etc/passwd | sed '/root/d'
	~~~
5. 搜索/etc/passwd, 找到 root 对应的行，执行后面花括号中的一组命令，每个命令之间用分号分隔，这里把 bash 替换为 blueshell，再输出这行,
	 * `p` 打印
	 * `q` 退出
	~~~shell
	nl /etc/passwd | sed -n '/root/{s/bash/blueshell/; p; q}'
	~~~
6. 一条 sed 命令，删除/etc/passwd 第三行到末尾的数据，并把 bash 替换为 blueshell 
	~~~shell
	nl /etc/passwd | sed -e '3,$d' -e 's/bash/blueshell/' # -e 表示多点编辑
	~~~
# 文本替换
### s/old/new/标志位
1. `数字`，第几次出现才进行替换 
2. `g`：每次出现都进行替换
3. `p`：打印模式空间的内容 
	* `sed -n 'script' filename` 默认阻止输出
* `w file`将模式空间的内容写入到文件

### 使用 **&** 来当做被匹配的变量，然后可以在基本左右加点东西
```shell
$ sed 's/my/[&]/g' my.txt 
This is [my] cat, [my] cat's name is betty
```
### 对 3 行到第 6 行，执行命令 `/This/d`
~~~shell
	sed '3, 6 {/This/d}' pets.txt 
~~~
### 对 3 行到第 6 行，匹配/This/成功后，再匹配/fish/，成功后执行 d 命令
~~~shell
sed '3, 6 {/This/{/fish/d}}' pets. txt 
~~~
### 从第一行到最后一行，如果匹配到 This，则删除之；如果前面有空格，则去除空格
~~~shell
sed '1,${/This/d; s/^ *//g}' pets. txt 
~~~
## 使用正则表达式 
~~~shell
sed 's/regexp/new/' filename
sed -r '/扩展正则表达式/new/' filename 
~~~
> [!warning] 单引号与双引号
> 
> * 单引号 (`'`) 之间的元字符不需要转义
> * 双引号（ `"`) 之间的元字符需要转义
## 使用 `N` 命令
把下一行的内容纳入当成缓冲区做匹配
* s 只匹配并替换一次
# Hold Space 保持空间
![[images/sed image 1.png]]
## g 和 G: g 和 G 将保持空间内容取出到模式空间
* `g` ： 将 hold space 中的内容拷贝到 pattern space 中，原来 pattern space 里的内容清除
* `G` ： 将 hold space 中的内容 append 到 pattern space\n 后
## h 和 H: h 和 H 将模式空间内容放到保持空间
* `h` ： 将 pattern space 中的内容拷贝到 hold space 中，原来的 hold space 里的内容被清除
* `H` ： 将 pattern space 中的内容 append 到 hold space\n 后
* `x` ： 交换 pattern space 和 hold space 的内容列出并且列印行号
~~~shell
$ cat t.txt
one
two
three
~~~
### 示例 1
~~~shell
$ sed 'H;g' t.txt
one

one
two

one
two
three 
~~~
![[image/sed image 2.jpg]]
### 示例 2
~~~shell
$ sed '1!G;h;$!d' t.txt
three
two
one
~~~
-   1!G —— 只有第一行不执行G命令，将hold space中的内容append回到pattern space
-   h —— 第一行都执行h命令，将pattern space中的内容拷贝到hold space中
-   $!d —— 除了最后一行不执行 d 命令，其它行都执行 d 命令，删除当前行
![[image/sed image 2.jpg]]
---
# Link & Refrences
* <https://www.gnu.org/software/sed/manual/sed.html>


