---
tags: Linux
---

# Linux 虚拟化
#### 查看系统是否支持虚拟化
```shell
grep -c -w "vmx\|svm" /proc/cpuinfo
```