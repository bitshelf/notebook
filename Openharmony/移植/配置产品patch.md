---
tags:
  - OpenHarmony
---
## 配置产品 patch
- 配置产品 Patch（可选，视产品涉及部件是否需要打补丁而定） 在产品目录下创建 patch. yml 文件。patch. yml 需按产品实际情况配置，一个典型的 patch. yml 文件如下
```yml
  # 需要打patch的路径
foundation/communication/dsoftbus:
  # 该路径下需要打的patch存放路径
  - foundation/communication/dsoftbus/1.patch
  - foundation/communication/dsoftbus/2.patch
third_party/wpa_supplicant:
  - third_party/wpa_supplicant/1.patch
  - third_party/wpa_supplicant/2.patch
  - third_party/wpa_supplicant/3.patch
```

- 配置完成后，编译时增加--patch 参数，即可在产品编译前将配置的 Patch 文件打到对应目录中，再进行编译：
```shell
hb build -f --patch
```


---
## Link 
- [zh-cn/device-dev/subsystems/subsys-build-product.md · OpenHarmony/docs - Gitee.com](https://gitee.com/openharmony/docs/blob/master/zh-cn/device-dev/subsystems/subsys-build-product.md)