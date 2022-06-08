---
tags:
  - Python
---
## miniconda 安装使用
```shell
with_proxy wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh
```

### 导出 conda 环境变量
```shell
export PATH="$HOME/miniconda3//bin/:$PATH"
```

### 安装 Python2. 7 
```shell
conda create -n py27 python=2.7
conda activate py27
conda deactivate
```
