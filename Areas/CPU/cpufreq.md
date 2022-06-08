---
tags: CPU
---

# CPU 统计数据
* 所在目录：`/sys/devices/system/cpu/cpu0/cpufreq/stat`
* **reset**
	* 只写属性，可用于重置统计计数器。这对于评估不同调节器下的系统行为非常有用，且无需重启
```shell
	echo 1 > reset
```

* **time_in_state**
	* 此项给出了这个 CPU 所支持的每个频率所花费的时间。cat 输出的每一行都会有”`<frequency>` `<time>`”对，表示这个 CPU 在`<frequency>`上花费了`<time>`个 usertime 单位的时间。这里的 usertime 单位是 10mS（类似于/proc 中输出的其他时间）
* **total_trans**
	* 给出了这个 CPU 上频率转换的总次数。cat 的输出将有一个单一的计数，这就是频率转换的总数

* **trans_table**
	* 提供所有 CPU 频率转换的细粒度信息。这里的 cat 输出是一个二维矩阵，其中一个条目<i, j>（第 i 行，第 j 列）代表从 Freq_i 到 Freq_j 的转换次数。Freq_i 行和 Freq_j 列遵循驱动最初提供给 cpufreq 核的频率表的排序顺序，因此可以排序（升序或降序）或不排序。这里的输出也包含了每行每列的实际频率值
	* 如果转换表大于 PAGE_SIZE，读取时将返回一个-EFBIG 错误

## 配置 cpufreq-stats
```txt
Config Main Menu
        Power management options (ACPI, APM)  --->
                CPU Frequency scaling  --->
                        [*] CPU Frequency scaling
                        [*]   CPU frequency translation statistics
```
