---
tags:
  - apt
---
## apt 设置 sock5 代理
- `/etc/apt/apt.conf.d/proxy.conf`
```shell
Acquire::http::Proxy "socks5h://172.17.0.1:1080";
Acquire::https::Proxy "socks5h://172.17.0.1:1080";
Acquire::socks::Proxy "socks5h://172.17.0.1:1080";
```
- `/etc/apt/apt.conf.d/proxy.conf`
```shell
Acquire::http::Proxy "http://192.168.56.102:3128/";
Acquire::https::Proxy "http://192.168.56.102:3128/";
```
- `/etc/apt/apt.conf.d/proxy.conf`
```shell
Acquire {
  http::Proxy "http://proxy-IP-address:proxyport/";
  https::Proxy "http://proxy-IP-address:proxyport/";
}
```

## Link 
- [如何为 APT 命令设置代理 \| LCTT x X-CMD](https://lctt.x-cmd.com/202305/20230422.0%20%E2%AD%90%EF%B8%8F%20How%20to%20Set%20Proxy%20Settings%20for%20APT%20Command)
- [syntax for SOCKS proxy in apt.conf - Ask Ubuntu](https://askubuntu.com/questions/35223/syntax-for-socks-proxy-in-apt-conf)
- [Configure proxy for APT? - Ask Ubuntu](https://askubuntu.com/questions/257290/configure-proxy-for-apt)

## git 使用 socks5代理
```shell
git config --global http.proxy 'socks5://127.0.0.1:7070'
```