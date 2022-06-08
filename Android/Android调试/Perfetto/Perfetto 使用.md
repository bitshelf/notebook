---
tags:
  - Android/Perfetto
---
## Perfetto 使用
#### 使用配置文件
1. 生成 trace 配置文件：[Perfetto UI](https://ui.perfetto.dev/#!/record)
2. 可以手动修改`duration_ms`参数来修改抓取trace时间

#### 使用命令行
```shell
adb shell perfetto -o /data/misc/perfetto-traces/trace_file.perfetto-trace -t 20s \
sched freq idle am wm gfx view binder_driver hal dalvik camera input res memory
```

## link 
- [Perfetto分析进阶-CSDN博客](https://blog.csdn.net/feelabclihu/article/details/126672666)
- [性能分析工具 之 Perfetto基本使用\_perfetto使用-CSDN博客](https://blog.csdn.net/qrx941017/article/details/128984365)