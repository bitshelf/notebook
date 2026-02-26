---
tags:
  - Linux/command
---
# Linux 命令 tips
* **`du -s * | sort -n | tail`** 
> 列出当前目录里最大的10个文件
> 
* **`:w !sudo tee %`** 
> 在vi中保存一个只有root可以写的文件
> 
* **`^old^new`**  
> 替换前一条命令里的部分字符串。  
 场景：`echo "wanderful"`，其实是想输出`echo "wonderful"`。只需要 
 `^a^o`就行了，对很长的命令的错误拼写有很大的帮助。也可以使用 `!!:gs/old/new`
 
* **`> file.txt`** 
> 创建一个空文件，比touch短

* **`mtr coolshell.cn`** 
	>mtr命令比traceroute要好
	
* 命令行前加空格，该命令不会进入history里

* **`ps aux | sort -nk +4 | tail`**
> 列出头十个最耗内存的进程
> 
* **`lsof –i`**
>实时查看本机网络服务的活动状态
>
* **`vim scp://username@host//path/to/somefile`**
> vim一个远程文件
> 
* **`ssh user@server bash < /path/to/local/script.sh`**
> 在远程机器上运行一段脚本。这条命令最大的好处就是不用把脚本拷到远程机器上

* **`ssh user@host cat /path/to/remotefile | diff /path/to/localfile -`**
> 比较一个远程文件和一个本地文件

* `cat > b.txt << EOF` 创建一个文件，并在命令行输入多行文本