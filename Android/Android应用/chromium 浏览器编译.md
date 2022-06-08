---
tags:
  - Android/chromium
---
## 源码下载
```shell
# 下载depot_tools 仓库
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# 创建并进入 Chromium 目录
mkdir ~/chromium && cd ~/chromium

# 使用 fetch 命令获取代码
fetch --nohooks android

# 安装额外的构建依赖
build/install-build-deps.sh

# 运行钩子, 载额外的二进制文件和其他可能需要的东西
gclient runhooks
```

## link 
- [Chromium for Android 浏览器的编译和安装\_android chromium-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/144408463)