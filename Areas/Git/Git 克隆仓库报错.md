---
tags: Git
---
# Git 克隆报错
> [!error] server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
> 

```shell
export GIT_SSL_NO_VERIFY=1
#or
git config --global http.sslverify false
```