---
tags:
  - Android/App
---
## Android app 打包
apk 创建好之后，需要使用工具 jarsigner 对其进行签名

签名之后会生成 META_INF 文件夹，此文件夹中保存着跟签名相关的各个文件
- `CERT.SF`：生成每个文件相对的密钥
- `MANIFEST.MF`：数字签名信息
- `XXX.SFJAR`: 文件的签名文件
- `XXX.DSA`：对输出文件的签名和公钥