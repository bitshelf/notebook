---
tags: Linux Kernel
---

# Linux kernel 编译
```shell
make help
```

## clangd  生成 compile_commands. json
```shell
./scripts/clang-tools/gen_compile_commands.py
# 使用 make 
make compile_commands.json

# 指定目录生成 compile_commands.json
find . -name '*.cmd' | scripts/gen_compile_commands.py
```
## Link
- [2.5.59+ kernel makefile documentation LWN net]( https://lwn.net/Articles/21835/ )
- [android googlesource Linux Kernel Makefiles](https://android.googlesource.com/kernel/common/+/5c811e59ada9d31f79c8d340f28184084a3aea5b/Documentation/kbuild/makefiles.txt) 
- [Building and Installing Custom Linux Kernels - Documentation](https://docs.rockylinux.org/guides/custom-linux-kernel/)
- [Redhat ref-guide](https://ftp.kh.edu.tw/Linux/Redhat/en_6.2/doc/ref-guide/)