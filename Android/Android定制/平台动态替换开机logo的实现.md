---
tags: Android 
---

- 功能的 uboot 需要是 next-dev 分支的
- 在 device 下面的产品目录的 BoardConfig. mk 里面增加
```shell
BOARD_WITH_SPECIAL_PARTITIONS := logo:16M
```

## Link 
- [rockchip Android平台动态替换开机logo的实现\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/125212221)