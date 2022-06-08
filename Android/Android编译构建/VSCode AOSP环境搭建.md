---
tags: Android Vscode
---

# VsCode for Android
## Clangd 配置
环境配置
安装 clangd、bear
```shell
export ARCH=arm
export CROSS_COMPILE=arm-buildroot-linux-gnueabihf-
```

bear命令用来生成compile_commands.json
```shell
bear make [其他make本身的参数]
```
### compile_commands. json
```json
{
	"C_Cpp.intelliSenseEngine": "Disabled",
    "C_Cpp.default.intelliSenseMode": "linux-gcc-arm",
    "C_Cpp.intelliSenseEngine": "Disabled",
    "clangd.path": "/home/book/clangd_13.0.0/bin/clangd",
    "clangd.arguments": [
        "--log=verbose",
        "arm-buildroot-linux-gnueabihf-gcc”,
    ],
}
```

## workspace 配置
```json
{
      "configurations": [
      {
          "name": "Aosp",
          "includePath": [
              "${workspaceFolder}/frameworks/base/core/jni/include",
              "${workspaceFolder}/frameworks/base/libs/androidfw/include",
              "${workspaceFolder}/frameworks/base/libs/services/include",
              "${workspaceFolder}/frameworks/base/libs/storage/include",
              "${workspaceFolder}/frameworks/base/libs/protoutil/include",
              "${workspaceFolder}/frameworks/base/libs/incident/include",
              "${workspaceFolder}/frameworks/base/native/android/include",
              "${workspaceFolder}/frameworks/native/include",
              "${workspaceFolder}/hardware/libhardware/include",
              "${workspaceFolder}/system/core/include",
              "${workspaceFolder}/libnativehelper/include",
              "${workspaceFolder}/libnativehelper/header_only_include",
              "${workspaceFolder}/libnativehelper/include_jni",
              "${workspaceFolder}/art/libnativeloader/include",
              "${workspaceFolder}/bionic/libstdc++/include",
              "${workspaceFolder}/bionic/libc/include",
              "${workspaceFolder}/**"
              ],
          "defines": [],
          //"compilerPath": "/usr/bin/clang++",
          "cStandard": "c11",
          "cppStandard": "gnu++14",
          // "intelliSenseMode": "clang-x64" 
          }
      ],
  "version": 4,
  "C_Cpp.intelliSenseEngine": "Disabled"
}
```

---
# Link
- [Vscode for linux kernel](https://mp.weixin.qq.com/s/0fZjdjn2dk9LIZ7c0S5nFQ)