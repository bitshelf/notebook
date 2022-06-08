---
tags:
  - eBPF
---
## eBPF 开发环境搭建
```shell
sudo apt-get install -y make clang llvm libelf-dev libbpf-dev bpfcc-tools libbpfcc-dev linux-tools-$(uname -r) linux-headers-$(uname -r)
```
- 将 eBPF 程序编译成字节码的 LLVM；
- C 语言程序编译工具 make
- 最流行的 eBPF 工具集 BCC 和它依赖的内核头文件
- 与内核代码仓库实时同步的 libbpf
- 同样是内核代码提供的 eBPF 程序管理工具 bpftool

### eBPF 开发执行流程
1. 使用 C 语言开发一个 eBPF 程序；
2. 借助 LLVM 把 eBPF 程序编译成 BPF 字节码；
3. 通过 bpf 系统调用，把 BPF 字节码提交给内核；
4. 内核验证并运行 BPF 字节码，并把相应的状态保存到 BPF 映射中；
5. 用户程序通过 BPF 映射查询 BPF 字节码的运行状态

## ebpf 工具安装
```shell
sudo apt install bpftrace
```

### bpftrace 
```shell
# 查询所有内核插桩和跟踪点
sudo bpftrace -l
# 使用通配符查询所有的系统调用跟踪点
sudo bpftrace -l 'tracepoint:syscalls:*'
# 使用通配符查询所有名字包含"execve"的跟踪点
sudo bpftrace -l '*execve*'
```
## 添加以下内核配置
```
CONFIG_BPF=y
CONFIG_BPF_SYSCALL=y
CONFIG_BPF_JIT=y
CONFIG_HAVE_EBPF_JIT=y
CONFIG_BPF_EVENTS=y
CONFIG_FTRACE_SYSCALLS=y
CONFIG_FUNCTION_TRACER=y
CONFIG_HAVE_DYNAMIC_FTRACE=y
CONFIG_DYNAMIC_FTRACE=y
CONFIG_HAVE_KPROBES=y
CONFIG_KPROBES=y
CONFIG_KPROBE_EVENTS=y
CONFIG_ARCH_SUPPORTS_UPROBES=y
CONFIG_UPROBES=y
CONFIG_UPROBE_EVENTS=y
CONFIG_DEBUG_FS=y
```