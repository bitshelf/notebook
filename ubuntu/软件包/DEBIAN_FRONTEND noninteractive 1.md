---
tags: apt
---

# ubuntu 非交换模式
- DEBIAN_FRONTEND 这个环境变量，告知操作系统应该从哪儿获得用户输入
- 设置为  `noninteractive`”，可以直接运行命令，无需向用户请求输入（所有操作都是非交互式的）

~~~shell
export DEBIAN_FRONTEND=noninteractive
sudo apt-get -y update
~~~
