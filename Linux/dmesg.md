---
tags: Linux
---

### dmesg 显示颜色
```shell
dmesg --color=always
```

### dmesg 格式化输出
```shell
dmesg -H
dmesg -T
```

### dmesg 分类
```shell
dmesg -f kern,daemon
```

### dmesg 级别
```
dmesg -l err,crit
```