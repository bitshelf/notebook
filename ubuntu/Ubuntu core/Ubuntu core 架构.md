---
tags:
  - Ubuntu/core
---
## Ubuntu core 
1. 是一个基于squashFS文件系统的文件．它包含应用代码及包含有一个应用特有的叫做snap.yaml的metadata文件．它含有一个只读的文件系统．一旦安装，它会创建一个应用特有可以写的区域，任何其它的应用都不可以访问这个区域
2. 它完全独立于系统．在snap包里，它包含了它可以运行的所有需要的库及runtime（比如python或Java等），并且它可以通过网路更新，同时也可以退回到上一个版本，而不影响系统的其它部分的运行
3. 它是受限的．通过安全机制，它具有沙箱的属性，不可以随意访问外部资源，并和系统的其它部分进行隔离．它可以通过良好设计的安全策略和其它的snap进行交互
![](assets/ubuntu%20snap.png)


## Link
1. [Ubuntu Core介绍及其使用](https://blog.csdn.net/UbuntuTouch/article/details/51886345?ops_request_misc=%257B%2522request%255Fid%2522%253A%25224bfbdf042ea2555c0ad9ba805b9da796%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=4bfbdf042ea2555c0ad9ba805b9da796&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-4-51886345-null-null.nonecase&utm_term=ubuntu)