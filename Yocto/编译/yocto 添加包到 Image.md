---
tags:
  - yocto/image
---
## 三个方式
1. 在 `local.conf` 中使用 `CORE_IMAGE_EXTRA_INSTALL`
```shell
CORE_IMAGE_EXTRA_INSTALL+="<pkg1> <pkg2>"
```

2. 把包的 recipes 添加到 `IMAGE_INSTALL` 下面
3. 创建包含一系列软件包的 group，把 package group 添加到 image recipe