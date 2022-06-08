---
tags:
  - Android/Debug
---

# Last log
### 使能 Last log
在 dts 文件添加下面两个节点
```c
ramoops_mem: ramoops_mem {
reg = <0x0 0x110000 0x0 0xf0000>;
reg-names = "ramoops_mem";
};
ramoops {
compatible = "ramoops";
record-size = <0x0 0x20000>;
console-size = <0x0 0x80000>;
ftrace-size = <0x0 0x00000>;
pmsg-size = <0x0 0x50000>;
memory-region = <&ramoops_mem>;
};
```

- `/sys/fs/pstore # ls`
	- `dmesg-ramoops-0` 上次内核 panic 后保存的 log
	- `pmsg-ramoops-0` 上次用户空间的 log，android 的 log
	- `ftrace-ramoops-0` 打印某个时间段内的 function trace
	- `console-ramoops-0` 上次启动的 kernel log，但只保存了优先级比默认 log level 高的 log
	- `logcat -L （pmsg-ramoops-0）` 通过 logcat 取出来并解析

## pstore 
- 路径：`/sys/fs/pstore`
- `console-ramoops` 保存最近一次的 dmesg 输出
- 内存掉电则 `pstore` 目录为空
- 强行系统崩溃： 
```shell
echo c > /proc/sysrq-trigger
```
