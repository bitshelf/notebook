---
tags: Serial
aliases： XR21
---

## 串口驱动测试
1. 安装 microcom
```shell
sudo apt install microcom
```

2. 测试收发
```shell
microcom -p /dev/ttyXR0 -s 9600
```
- 短接串口
- 按下按键，串口有对应的字符输出