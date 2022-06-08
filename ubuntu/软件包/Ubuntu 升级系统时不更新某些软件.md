---
tags:
  - Ubuntu
---

## Ubuntu 升级系统时忽略某些包
```shell
sudo apt-mark hold chromium-browser
```
- upgrade 时就不会升级 chromium-browser

## 不保持版本
```
sudo apt-mark unhold chromium-browser
```