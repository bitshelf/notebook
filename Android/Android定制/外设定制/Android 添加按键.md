---
tags:
  - Android
---

## AOSP 添加按键
1. dts 添加按键配置
2. 添加 `kl` 键盘布局文件
```Makefile
$(BOARDDIR)/module/input/input-port-associations.xml:$(TARGET_COPY_OUT_VENDOR)/etc/input-port-associations.xml \

$(call md-path-cur)/gpio-keys.kl:$(TARGET_COPY_OUT_VENDOR)/usr/keylayout/gpio-keys.kl
```

```kl
key 102     HOME          WAKE
key 158        BACK          WAKE
```

## link 
- [Android添加新按键 - liangliangge - 博客园](https://www.cnblogs.com/liangliangge/p/11842760.html)
- [Android framework添加按键\_frameworks/base/data/keyboards/generic.kl添加简直-CSDN博客](https://blog.csdn.net/w2064004678/article/details/107330262)