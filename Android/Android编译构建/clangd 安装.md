---
tags: Ubuntu 
---

## clangd 安装
```shell
sudo add-apt-repository -y "deb http://apt.llvm.org/focal/ llvm-toolchain-focal-16 main"

wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key|sudo apt-key add -

sudo apt update
```

- [LLVM Debian/Ubuntu packages](https://apt.llvm.org/)