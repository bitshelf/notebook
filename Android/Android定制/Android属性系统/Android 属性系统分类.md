---
tags: Android
---

## Android 属性获取
- 通过 getprop 命令可以获取系统中大部分的属性，一部分因为 selinux 权限原因，不一定获取到到
- 对于老版本 Android 系统，是可以全部获取的

## Android 属性命名
1. 不能以. 开头，也不能以. 结尾，名字长度不小于 1，不大于 PROP_NAME_MAX (32) 字节，值的长度不能 PROP_VALUE_MAX (92) 字节
2. 以点作为分割，不能出现连续的点
3. 字符必须 utf-8 编码方式，可以是 a-z, A-Z, 0-9, _,-,@,:, 其他字符为无效

---
## Link
- [Android系统10 RK3399 init进程启动(三十四) 常见Property属性_旗浩QH的博客-CSDN博客](https://blog.csdn.net/ldswfun/article/details/126130158)