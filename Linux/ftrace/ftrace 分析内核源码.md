---
tags:
  - ftrace
---
# ftrace 分析内核源码
对于给定的一个函数，例如`nvme_probe ()` 函数，如果想分析系统怎样调到这个函数, 也就是想知道函数之前的调用栈，可以在函数中添加`WARN_ON (1)` 打印堆栈，但是这样要重新编译源码，内核提供了ftrace 技术，可以使用ftrace function + 和enable func_stace_trace达到同样的效果。

```shell
cd  /sys/kernel/debug/tracing/
echo nvme_probe > set_ftrace_filter
echo 1 > ./options/func_stack_trace
```

如果nvme\_probe()函数中包含trace\_event的内嵌函数，那就更加方便了，可以使用:

```shell
cd  /sys/kernel/debug/tracing/
echo 1 > ./events/nvme/nvme_probe/enable
echo 1 > ./options/stacktrace 

# 或者 
echo 'stacktrace' > ./events/nvme/nvme_probe/trigger
```

也可以设置内核启动参数：

```shell
trace_options=func_stack_trace,userstacktrace,sym-addr ftrace=function ftrace_filter="nvme_probe"
```

效果图：

![图片](https://mmbiz.qpic.cn/mmbiz_png/QO9OBu0wPg141nibQdiaxhCR8ZVCc3HpYhzmzMXkZKX1iatZ3TZcU20ibWY0q3dQQQHxXYzfwFpeNCgBN6qAnhEzLA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

如果想知道nvme\_probe()函数之后的调用逻辑，可以使用ftrace + func_graph的方式

```shell
debugfs=/sys/kernel/debug
echo nop > $debugfs/tracing/current_tracer
echo 0 > $debugfs/tracing/tracing_on
echo 10 > $debugfs/tracing/max_graph_depth
#echo $$ > $debugfs/tracing/set_ftrace_pid
echo function_graph > $debugfs/tracing/current_tracer
echo nvme_probe > $debugfs/tracing/set_graph_function
echo 1 > $debugfs/tracing/tracing_on
exec "$@"
```

同样也可以设置内核启动参数：

```shell
ftrace=function_graph ftrace_graph_filter="nvme_probe"
```

效果图：  

![图片](https://mmbiz.qpic.cn/mmbiz_png/QO9OBu0wPg141nibQdiaxhCR8ZVCc3HpYhMcbW2fVGQicxJwhCib5jWicw48UfHQMfiaTNh6RpqJSGZJvlYUNZNwicyXw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

(图中白色背景的函数还可以再展开详细查看)

呈现上图的效果可以借助折叠脚本：`function-graph-fold.vim`
使用方法
```shell
vim ./ftrace-nvme/func-graph-nvme-probe.log -S ./function-graph-fold.vim
```
