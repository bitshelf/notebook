---
tags:
  - yocto
---

## 添加代理
```bash
export http_proxy='http://myproxy.example.com:1080/'
export https_proxy='https://myproxy.example.com:1080/'
export ftp_proxy='http://myproxy.example.com:1080/'
export ALL_PROXY='socks://myproxy.example.com:1080/'
export all_proxy='socks://myproxy.example.com:1080/'
export no_proxy='example.com'
```
## Link
- [Working Behind a Network Proxy - Yocto Project](https://wiki.yoctoproject.org/wiki/Working_Behind_a_Network_Proxy)
- [14 FAQ — The Yocto Project ® 5.2.999 documentation](https://docs.yoctoproject.org/ref-manual/faq.html#how-does-openembedded-fetch-source-code-will-it-work-through-a-firewall-or-proxy-server)