---
tags: Linux/script
---

# C 语言风格的 for 循环

> [!info] 使用建议
> 由于 shell 计算性能差，不建议使用

~~~shell
for((变量初始化;循环判断条件;变量变化))

do 
    循环执行的命令

done
~~~

# 例子
~~~shell
# 写法 1
# 命令行参数有 help 字符串，则显示输出两次

for pos in $* 
do
	if [ "pos" = "help" ]; then
		echo $pos $pos
	fi
done
~~~

~~~shell
# 写法 2

while [ $# -ge 1 ]
do 
	if [ "$1" = "help" ]; help
		echo $1 $1
	fi
	# 循环左移
	shift
done
~~~

