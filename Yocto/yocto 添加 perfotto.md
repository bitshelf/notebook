---
tags:
  - yocto/perfotto
---
## yocto 添加 perfotto
```bitbake
IMAGE_INSTALL:append = " perfetto"

# strace, gdb and debug symbols
IMAGE_FEATURES:append = "tools-debug dbg-pkgs"
```

perfotto V31 需要添加补丁
- [ftrace: Avoid crashing if format doesn't match expectations](https://android-review.googlesource.com/c/platform/external/perfetto/+/2583173)

分析界面：[https://ui.perfetto.dev​](https://ui.perfetto.dev/)
## Link
- [inovex.de/wp-content/uploads/OSS-Talk-Advanced-System-Profiling-Tracing-and-Trace-Analysis-with-Perfetto.pdf](https://www.inovex.de/wp-content/uploads/OSS-Talk-Advanced-System-Profiling-Tracing-and-Trace-Analysis-with-Perfetto.pdf)