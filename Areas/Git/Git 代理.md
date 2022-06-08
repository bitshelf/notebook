---
tags:
  - Git
---

## 配置 Git SSH 代理
在 ~/. ssh/config 文件中加入以下配置
```shell
Host github.com
HostName github.com
User git
Port 22
ProxyCommand /usr/bin/ncat --proxy 127.0.0.1:1080 --proxy-type socks5 %h %p
```
- 上面两个配置只是让 HTTPS/SSH 访问走本地 Socks 5 代理，但是并不能保证一定可以连接上 Github

## 配置 Git HTTP/HTTPS 代理
在 ~/. gitconfig 文件中加入以下配置:
```shell
[http]
	proxy = socks5://127.0.0.1:1080
```
- 同于命令 `git config --global http.proxy 'socks5://127.0.0.1:1080'`
- Git 不认 https.proxy， 设置 http.proxy 就可以支持 https 了