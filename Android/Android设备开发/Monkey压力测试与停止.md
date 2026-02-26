---
tags:
  - Android/adb
---
## Monkey 命令
标准命令
```shell
adb shell monkey -v 500
```
产生500次随机事件，作用在系统中所有activity（其实也不是所有的activity，而是包含 Intent. CATEGORY_LAUNCHER 或Intent. CATEGORY_MONKEY 的activity）

## 强制停止Monkey测试
```shell
adb shell ps | awk '/com\.android\.commands\.monkey/ { system("adb shell kill " $2) }'
```

## Link
- [【android】monkey压力测试与停止 \| iTimeTraveler](https://itimetraveler.github.io/2016/07/19/%E3%80%90Android%E3%80%91Monkey%E5%8E%8B%E5%8A%9B%E6%B5%8B%E8%AF%95%E4%B8%8E%E5%81%9C%E6%AD%A2/)