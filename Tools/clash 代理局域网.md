---
tags: Windowns
---

# Windows clash 代理 Linux 网络
1. 打开 clash 的 Allow LAN
2. 设置 Windows 防火墙
	1. 打开运行，输入：`wf.msc`
	2. 新建 TCP 7890 的入站规则（inbound rules）
## 设置 ubuntu 代理
```shell
with_proxy(){
   HTTPS_PROXY=socks5://127.0.0.1:1080 HTTP_PROXY=socks5://127.0.0.1:1080 "$@"
}
```

~~~shell
export HTTP_PROXY=socks5://192.168.2.110:7890
export HTTPS_PROXY=socks5://192.168.2.110:7890
export ALL_PROXY=socks5://192.168.2.110:7890
~~~

```shell
snap set system proxy.http="http://<proxy_addr>:<proxy_port>"
sudo snap set system proxy.https="http://<proxy_addr>:<proxy_port>"
```

# Android adb 设置代理
```shell
adb shell settings put global http_proxy  192.168.2.106:7890
adb shell settings put global https_proxy 192.168.2.106:7890
```

# Git 设置代理
```shell
git config --global https.proxy http://192.168.2.110:7890
git config --global http.proxy http://192.168.2.110:7890
git config --global https.proxy 'socks5://192.168.2.110:7890'
git config --global http.proxy 'socks5://192.168.2.110:7890'
git config --global --unset http.proxy
git config --global --unset https.proxy

#只对github.com
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080

#取消代理
git config --global --unset http.https://github.com.proxy)
```

```config
# .git/config
[http]
        proxy = socks5://127.0.0.1:1080
[https]
        proxy = socks5://127.0.0.1:1080
[http "https://github.com"]
      proxy = socks://192.168.0.17:7890
```

## 自建部署
- [GitHub - haoel/haoel.github.io](https://github.com/haoel/haoel.github.io#81-aws-%E7%BD%91%E7%BB%9C%E6%9E%84%E5%BB%BA)

## 搭建好的压缩包
![](assets/clash.tgz)