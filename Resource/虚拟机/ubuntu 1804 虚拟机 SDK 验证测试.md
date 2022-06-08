---
tags: Ubuntu
---
## 编译修改
1. 编译 RK3288 Android8.1 修改
```:/etc/java-8-openjdk/security/java.security
#jdk.tls.disabledAlgorithms=SSLv3, TLSv1, TLSv1.1, RC4, DES, MD5withRSA, \
#    DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL, \
#    include jdk.disabled.namedCurves

jdk.tls.disabledAlgorithms=SSLv3, RC4, DES, MD5withRSA, \
    DH keySize < 1024, EC keySize < 224, 3DES_EDE_CBC, anon, NULL, \
    include jdk.disabled.namedCurves
```
* 去除 TLSv1, TLSv1.1


## PX30 Android 编译报错
> [!error] jack-admin start-server
> 报错信息：`jack-admin start-server`

```shell
cd prebuilts/sdk/tools/
./jack-admin kill-server
./jack-admin start-server
```
