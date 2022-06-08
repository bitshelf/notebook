---
tags: OpenHarmony
---

# Openharmony 应用编译安装
1. 下载 DevEco Studio for Openharmony [DevEco Studio](https://developer.harmonyos.com/cn/develop/deveco-studio#download_beta)

> [!attention] 注意
> 注意为 Openharmony 开发应用需要使用 DevEco Studio *** for OpenHarmony，Openharmony 与 harmory 的 DevEco studio 不通用
> ![](assets/DevEco-for-openharmony.png)

# HAP 与 APP

> [!info] HAP
> HarmonyOS Ability Package，一个 HAP 文件包含应用的所有内容，由代码、资源、三方库及应用配置文件组成，其文件后缀名为. hap

* HAP 是可以直接运行在真机设备中的软件包
* APP 则是用于应用/服务上架到应用市场

# 编译报错

> [!error] ERROR: Cause: Can not find sdk. dir or OHOS_SDK_HOME in System Environment Path
> ~~~txt
> hvigor ERROR: A problem occurred in root module:
> ERROR: Cause: Can not find sdk.dir or OHOS_SDK_HOME in System Environment Path
       >  at E:\Users\rpdzkj\Desktop\Documents\Openharmony\app_samples-master\media\JsAudioPlayer\local.properties:1:1
>~~~

解决办法：
在项目根目录下新建 `local.properties` 文件，写入以下内容
~~~
sdk.dir=E:\\Users\\rpdzkj\\Desktop\\Documents\\Openharmony\\SDK
~~~
