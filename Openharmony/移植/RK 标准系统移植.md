---
tags: OpenHarmony rk356x
---

# Openharmony 标准移植

> [!tips] 参考网址
> < [zh-cn/device-dev/porting/standard-system-porting-guide.md · OpenHarmony/docs - Gitee.com](https://gitee.com/openharmony/docs/blob/master/zh-cn/device-dev/porting/standard-system-porting-guide.md)

### 构建产品配置
在`//vendor/MyProductVendor/{product_name}`名称的目录下创建一个 `config.json` 文件
```json
{
    "product_name": "MyProduct",
    "version": "3.0", // 构建系统的版本，1.0/2.0/3.0
    "type": "standard",
    "target_cpu": "arm",
    "ohos_version": "OpenHarmony 1.0",
    "device_company": "MyProductVendor", // 单板厂商名，用于编译时找到/device/board/ 厂商目录
    "board": "MySOC", // 单板名，用于编译时找到/device/board/vendor/ 下的目录
    "enable_ramdisk": true,
    "subsystems": [
      {
        "subsystem": "ace",
        "components": [
          { "component": "ace_engine_lite", "features":[""] }
        ]
      }，
	    …
    ]
}
```
* product_name：产品名称必填
* version：版本 必填
* type：配置的系统级别，包含（small，standard …) 必填
* target_cpu ：设备的 cpu 类型（根据实际情况，这里的 target_cpu 也可能是 arm64 、riscv、 x86 等。） 必填
* ohos_version：操作系统版本选填
* device_company：device 厂商名必填
* enable_ramdisk：是否启动 ramdisk 必填
* kernel_type 选填
* kernel_version 选填 kernel_type 与 kernel_version 在 standard 是固定的不需要写。
* subsystems: 系统需要启用的子系统。子系统可以简单理解为一块独立构建的功能块。必填
* product_company：不体现在配置中，而是目录名，vendor 下一级目录就是 product_company，BUILD.gn 脚本依然可以访问。
- 已定义的子系统可以在“//build/subsystem_config.json”中找到

### 移植验证
~~~shell
./build.sh --product-name MyProduct
~~~
![](assets/OpenHarmony标准系统芯片适配指南.jpg)
## link
- [轻量带屏解决方案之恒玄芯片移植案例](https://gitee.com/openharmony/docs/blob/OpenHarmony-4.1-Release/zh-cn/device-dev/porting/porting-bes2600w-on-minisystem-display-demo.md)
- [标准系统方案之瑞芯微RK3568移植案例](https://gitee.com/openharmony/docs/blob/master/zh-cn/device-dev/porting/porting-dayu200-on_standard-demo.md)
- [DevEco Device Tool 编译RK3568开发板源码](https://device.harmonyos.com/cn/docs/documentation/guide/ide-rk3568-compile-0000001238957517)