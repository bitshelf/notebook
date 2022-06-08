---
tags: Linux
---

# Linux使用退格键时出现^H ^?解决方法

> [!error] linux 下执行脚本不注意输错内容需要删除时总是出现`^H`
> 使用回删键（backspace）时，同时按住 ctrl 键

`^H`不是H键的意思，是backspace。主要是当你的终端backspace有问题的时候才需要设置
   
1. 要使用回删键（backspace）时，同时按住 ctrl 键   
2. 设定环境变量 
	* 在脚本的开头或结尾参数 `stty erase ^H stty erase ^?`   
	* 在 bash 下:`$stty erase ^?`   
	* 或者把 `stty erase ^?` 添加到.bash\_profile 中   
	* 在 csh 下：`$stty erase ^H`   
	* 或者把 `stty erase ^H` 添加到.cshrc 中