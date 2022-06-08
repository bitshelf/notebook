---
tags: Ubuntu 
---

## Debian   中文设置
### 查看当前系统语言 
~~~shell
locale
~~~
- @ 可以通过 `apt install locales`

### 中文字体安装
```shell
apt install xfonts-intl-chinese xfonts-wqy
```

### 中文配置
~~~shell
dpkg-reconfigure locales
~~~

### 安装中文输入法
```shell
apt install fcitx fcitx-googlepinyin
```