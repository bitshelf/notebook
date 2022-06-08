---
tags: LTE Network 
---
# 开发板 4G 操作
 *  `getprop | grep rild` 查看调用的 so 路径
 *  `stop/start  ril–daemon`  进行服务的启动和停止
* `logcat -b radio` 查看相关打印信息
# 源码操作
### 库在源码的位置
~~~shell
device/rockchip/rk3326/libquectel-ril/
~~~
## 编译脚本
~~~shell
device/rockchip/rk3326/device-common.mk
~~~
---
# 异常记录
1. 64 位系统与 32 位系统的 4G 库不通用