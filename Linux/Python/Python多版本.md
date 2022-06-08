---
tags: Python
---

# 管理多版本 Python
## pyenv
1. 环境搭建
```shell
sudo apt-get install -y git
sudo apt-get install -y build-essential libbz2-dev libssl-dev libreadline-dev \
                        libffi-dev libsqlite3-dev tk-dev
# optional scientific package headers (for Numpy, Matplotlib, SciPy, etc.)
sudo apt-get install -y libpng-dev libfreetype6-dev    
```

2. 安装pyenv（需要科学上网）
```shell
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

3. 添加环境变量
```shell
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

### 设置python环境
1. 安装需要的python解释器
```shell
pyenv install 3.6.0
```
## 指定 Python 为可执行程序
```shell
sudo apt install python-is-python3
# or
alias python=python3
```
### Link 
- [software installation - How do I install Python 3.6 using apt-get? - Ask Ubuntu](https://askubuntu.com/questions/865554/how-do-i-install-python-3-6-using-apt-get)

## Pipenv
1. Pipenv 安装：`pip3 install pipenv`
pip3 安装：
> [!help] 更新
> `pip3 install --user --upgrade pipenv`

2. `pipenv --python 3.6`  指定使用 Python3.6 创建环境
3. `pipenv shell` 激活环境
4. `pipenv --where`   显示目录信息
5. `pipenv --venv`  显示虚拟环境信息
6. `pipenv --py`  显示 Python 解释器信息

---
# Link
1. [pipenv 入门教程_I'm George的博客-CSDN博客](https://blog.csdn.net/weixin_40922744/article/details/103723069)
2. [一文解读 virtualenv & venv & pipenv 之间的联系与区别_I'm George的博客-CSDN博客_pipenv virtualenv](https://blog.csdn.net/weixin_40922744/article/details/103721870)