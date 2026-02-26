---
tags:
  - libbpf
---
## libbpf

### BPF 加载器（libbpf）

libbpf 作为一个 BPF 程序加载器（loader）， 处理前面介绍的内核 BTF 和 clang 重定位信息。它

1. 读取编译之后得到的 BPF ELF 目标文件，
2. 进行一些必要的后处理，
3. 设置各种内核对象（bpf maps、bpf 程序等），然后
4. 将 BPF 程序加载到内核，然后触发校验器的验证过程。

**libbpf 知道如何对 BPF 程序进行裁剪，以适配到目标机器的内核上**。

- 它会查看 BPF 程序记录的 BTF 和重定位信息，然后
- 拿这些信息跟当前内核提供的 BTF 信息相匹配。然后
- 解析和匹配所有的类型和字段，更新所有必要的 offsets 和其他可重定位数据。

最终确保 BPF 程序在这个特定的内核上是能正确工作的。

如果一切顺利，你（作为 BPF 应用开发者）将得到一个针对目标机器”定制化裁剪“的 BPF 程序，就像这个程序是专门针对这个内核编译的一样。但这种工作方式无需将 clang 与 BPF 一起打包部署，也没有在目标机器上运行时编译（runtime）的开销。

## link
- [libbpf — libbpf documentation](https://libbpf.readthedocs.io/en/latest/index.html)
- [BCC 到 libbpf 的转换指南【译】 \| Head First eBPF](https://www.ebpf.top/post/bcc-to-libbpf-guid/)