---
tags: Ubuntu
---

# update-alternatives 命令进行版本的切换
## demo
```shell
update-alternatives --list editor
sudo update-alternatives --set editor /usr/bin/vim
sudo update-alternatives --auto editor
update-alternatives --display editor
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/vim 100
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/micro 100 \
    --slave /usr/share/man/man1/editor.1.gz editor.1.gz /usr/share/man/man1/micro.1.gz

sudo update-alternatives --remove editor /usr/bin/vim

update-alternatives --get-selections
```

#### gcc 设置示例
```shell

sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.4 20 \
    --slave /usr/bin/gcc-ar gcc-ar /usr/bin/gcc-ar-4.4 \
    --slave /usr/bin/gcc-nm gcc-nm /usr/bin/gcc-nm-4.4 \
    --slave /usr/bin/gcc-ranlib gcc-ranlib /usr/bin/gcc-ranlib-4.4
```

多版本并存的软件设置默认软件
```shell
update-alternatives [<选项> ...] <命令>
```

```
Commands:
  --install <link> <name> <path> <priority>
    [--slave <link> <name> <path>] ...
                           在系统中加入一组替换项.
  --remove <name> <path>   从 <名称> 替换组中去除 <路径> 项.
  --remove-all <name>      从替换系统中删除 <名称> 替换组.
  --auto <name>            将 <名称> 的主链接切换到自动模式.
  --display <name>         显示关于 <名称> 替换组的信息.
  --query <name>           machine parseable version of --display <name>.
  --list <name>            列出 <名称> 替换组中所有的可用替换项.
  --get-selections         list master alternative names and their status.
  --set-selections         read alternative status from standard input.
  --config <name>          列出 <名称> 替换组中的可选项，并就使用其中
                                 哪一个，征询用户的意见.
  --set <name> <path>      将 <路径> 设置为 <名称> 的替换项.
  --all                    对所有可选项一一调用 --config 命令.
<link> 是指向 /etc/alternatives/<名称> 的符号链接>.
  (e.g. /usr/bin/pager)
<name> 是该链接替换组的主控名.
  (e.g. pager)
<path> 是替换项目标文件的位置.
  (e.g. /usr/bin/less)
<priority> 是一个整数，在自动模式下，这个数字越高的选项，其优先级也就越高.
Options:
  --altdir <directory>     指定不同的可选项目录.
  --admindir <directory>   指定不同的管理目录.
  --log <file>             设置log文件.
  --force                  allow replacing files with alternative links.
  --skip-auto              skip prompt for alternatives correctly configured
                           in automatic mode (relevant for --config only)
  --verbose                详尽的操作进行信息，更多的输出.
  --quiet                  安静模式，输出尽可能少的信息.
  --help                   显示本帮助信息.
  --version                显示版本信息.
```


---
# Link
- [使用update-alternatives命令进行版本的切换](https://blog.csdn.net/JasonDing1354/article/details/50470109)