---
tags: shell 
---

# 从指定字符（子字符串）开始截取
* 无法指定字符串长度，只能从指定字符（子字符串）截取到字符串末尾

## 使用 # 号截取右边字符
~~~shell
${string#*chars}
~~~
* string 表示要截取的字符
* chars 是指定的字符（或者子字符串），
* `*` 是通配符的一种，表示任意长度的字符串
* `*chars` 连起来使用的意思是：忽略左边的所有字符，直到遇见 chars（chars 不会被截取）
* 不需要忽略 chars 左边的字符，那么也可以不写`*`

## 使用 % 截取左边字符
~~~shell
${string%chars*}
~~~

| 格式 | 说明 |
| --- | --- |
| `${string: start :length}` | 从 string 字符串的左边第 start 个字符开始，向右截取 length 个字符。 |
| `${string: start}` | 从 string 字符串的左边第 start 个字符开始截取，直到最后。 |
| `${string: 0-start :length}` | 从 string 字符串的右边第 start 个字符开始，向右截取 length 个字符。 |
| `${string: 0-start}` | 从 string 字符串的右边第 start 个字符开始截取，直到最后。 |
| `${string#*chars`} | 从 string 字符串第一次出现 \*chars 的位置开始，截取 \*chars 右边的所有字符。 |
| `${string##*chars`} | 从 string 字符串最后一次出现 \*chars 的位置开始，截取 \*chars 右边的所有字符。 |
| `${string%*chars}` | 从 string 字符串第一次出现 \*chars 的位置开始，截取 \*chars 左边的所有字符。 |
| `${string%%*chars}` | 从 string 字符串最后一次出现 \*chars 的位置开始，截取 \*chars 左边的所有字符。 |

**一、判断读取字符串值**

<table><tbody><tr><td>${var}</td><td>变量var的值, 与$var相同</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${var-DEFAULT}</td><td>如果var没有被声明, 那么就以$DEFAULT作为其值 *</td></tr><tr><td>${var:-DEFAULT}</td><td>如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值 *</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${var=DEFAULT}</td><td>如果var没有被声明, 那么就以$DEFAULT作为其值 *</td></tr><tr><td>${var:=DEFAULT}</td><td>如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值 *</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${var+OTHER}</td><td>如果var声明了, 那么其值就是$OTHER, 否则就为null字符串</td></tr><tr><td>${var:+OTHER}</td><td>如果var被设置了, 那么其值就是$OTHER, 否则就为null字符串</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${var?ERR_MSG}</td><td>如果var没被声明, 那么就打印$ERR_MSG *</td></tr><tr><td>${var:?ERR_MSG}</td><td>如果var没被设置, 那么就打印$ERR_MSG *</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${!varprefix*}</td><td>匹配之前所有以varprefix开头进行声明的变量</td></tr><tr><td>${!varprefix@}</td><td>匹配之前所有以varprefix开头进行声明的变量</td></tr></tbody></table>

| 表达式   | 含义                    |
| -------- | ----------------------- |
| `${var}` | 变量var的值, 与$var相同 |
|    `${var:-DEFAULT}`    |        如果var没有被声明, 或者其值为空, 那么就以$DEFAULT作为其值                 |
| `${var=DEFAULT}`| 

**二、字符串操作（长度，读取，替换）**

 表达式 含义

<table><tbody><tr><td>${#string}</td><td>$string的长度</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${string:position}</td><td>在$string中, 从位置$position开始提取子串</td></tr><tr><td>${string:position:length}</td><td>在$string中, 从位置$position开始提取长度为$length的子串</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${string#substring}</td><td>从变量$string的开头, 删除最短匹配$substring的子串</td></tr><tr><td>${string##substring}</td><td>从变量$string的开头, 删除最长匹配$substring的子串</td></tr><tr><td>${string%substring}</td><td>从变量$string的结尾, 删除最短匹配$substring的子串</td></tr><tr><td>${string%%substring}</td><td>从变量$string的结尾, 删除最长匹配$substring的子串</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>${string/substring/replacement}</td><td>使用$replacement, 来代替第一个匹配的$substring</td></tr><tr><td>${string//substring/replacement}</td><td>使用$replacement, 代替<em>所有</em>匹配的$substring</td></tr><tr><td>${string/#substring/replacement}</td><td>如果$string的<em>前缀</em>匹配$substring, 那么就用$replacement来代替匹配到的$substring</td></tr><tr><td>${string/%substring/replacement}</td><td>如果$string的<em>后缀</em>匹配$substring, 那么就用$replacement来代替匹配到的$substring</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>

**说明："\*** $substring”可以是一个_正则表达式_.

**二、字符串操作（长度，读取，替换）**

表达式 含义

<table><tbody><tr><td> ${#string}</td><td>$ string 的长度</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td> ${string:position}</td><td>在$ string 中, 从位置 $position开始提取子串</td></tr><tr><td>$ {string:position:length}</td><td>在 $string中, 从位置$ position 开始提取长度为 $length的子串</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>$ {string#substring}</td><td>从变量 $string的开头, 删除最短匹配$ substring 的子串</td></tr><tr><td> ${string##substring}</td><td>从变量$ string 的开头, 删除最长匹配 $substring的子串</td></tr><tr><td>$ {string%substring}</td><td>从变量 $string的结尾, 删除最短匹配$ substring 的子串</td></tr><tr><td> ${string%%substring}</td><td>从变量$ string 的结尾, 删除最长匹配 $substring的子串</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>$ {string/substring/replacement}</td><td>使用 $replacement, 来代替第一个匹配的$ substring</td></tr><tr><td> ${string//substring/replacement}</td><td>使用$ replacement, 代替<em>所有</em>匹配的 $substring</td></tr><tr><td>$ {string/#substring/replacement}</td><td>如果 $string的<em>前缀</em>匹配$ substring, 那么就用 $replacement来代替匹配到的$ substring</td></tr><tr><td> ${string/%substring/replacement}</td><td>如果$ string 的<em>后缀</em>匹配 $substring, 那么就用$ replacement 来代替匹配到的$substring</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table>

**说明："\*** $substring”可以是一个_正则表达式_.

# Link & References
* https://www.1024sou.com/article/224818.html

