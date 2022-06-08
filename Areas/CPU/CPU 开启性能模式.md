---
tags: Linux CPU
---

# 打开 CPU 性能模式
```shell
echo performance | tee $(find /sys/ -name *governor)
```