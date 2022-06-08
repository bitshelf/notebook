---
tags:
  - Ubuntu/debug
---
## 增加符号仓库的位置信息
```shell
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse
deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse
deb http://ddebs.ubuntu.com $(lsb_release -cs)-proposed main restricted universe multiverse"
| sudo tee -a /etc/apt/sources.list.d/ddebs.list
```

## 安装符号文件
```shell
sudo apt install ubuntu-dbgsym-keyring # 这一步是必要的，没有这一步，下一步会失败
sudo apt update

# 比如要安装包含ls的符号coreutils
sudo apt install coreutils-dbgsym
```
- 安装好的符号在`/usr/lib/debug/.build-id/`目录下
- 执行gdb ls尝试调试

## 安装源代码，实现源代码调试
1. 修改sources.list，将原本注释掉的deb-src放出来，也就是将`# deb-src` 替换为`deb-src`
2. 更新仓库信息：`sudo apt update`
3. 安装源代码，比如:  `sudo apt source coreutils`
4. 安装好源代码后，就可以使用dir命令来指定源代码：`（gdb) dir coreutils-8.30/src/`