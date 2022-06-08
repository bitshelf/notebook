---
tags: Android 
---

1. 下载源码放在 android 的 external 目录下解压获得 can-utils
```shell
tar -zxvf can-utils-android.tar.gz
```
2. 编译完在 out 下面的 system/bin 下面生成 candump cansend 等可执行文件
```shell
 out/target/product/xxx/system/bin/
canbusload           can-calc-bit-timing  candump              canfdtest            cangen               canlogserver         canplayer            cansend              cansniffer
```


## 源码
![](assets/can-utils-android.tar.gz)