---
tags: Android 
---

## Android build 签名的 4 组 key
- Media
- Platform
- Shared
- Testkey

## 自定义系统签名的key
在build/target/product/security/目录下有一个README，里面有说明怎么制作这些key并且使用

1. 进入`Development/tools/` 目录
2. 使用 `make_key` 工具生成签名文件
```shell
sh make_key releasekey  '/C=CN/ST=Guangdong/L=Shenzhen/O=Mediatek/OU=MTK/CN=fzll/emailAddress=maoao530@foxmail.com'
```
其中：
- C : Country Name (2 letter code)
- ST : State or Province Name (full name)
- L : Locality Name (eg, city)
- O : Organization Name (eg, company)
- OU : Organizational Unit Name (eg, section)
- CN : Common Name (eg, your name or your server’s hostname)
- emailAddress : Contact email address

## 对APK进行系统签名
为了使apk有system权限，通常我们需要对其进行系统签名：
1. 在应用程序的AndroidManifest. xml中的manifest节点中加入
```xml
android:sharedUserId="android.uid.system"这个属性。
```
2. 修改它的Android. mk文件，加入
```shell
LOCAL_CERTIFICATE := platform
```
## Link 
- [Android系统build阶段签名机制 | 风中老狼的博客](https://maoao530.github.io/2017/01/31/android-build-sign/)