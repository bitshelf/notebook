---
tags:
  - OpenHarmony
---
# 部件编译构建规范
## 总体原则

部件编译构建应遵循以下几个原则：

**独立自治**

部件编译态应内聚，新增外部依赖时应慎重，尽量减少编译时的静态依赖。
**合理依赖**

部件间的依赖都应基于部件间的接口，禁止依赖其他部件内部的模块和头文件。

**产品无关**

部件在编译态应是多产品通用的，禁止在编译脚本中使用产品名称

## link
- [部件编译构建规范](https://gitee.com/openharmony/docs/blob/master/zh-cn/device-dev/subsystems/subsys-build-component-building-rules.md#%E6%8F%8F%E8%BF%B0%E6%96%87%E4%BB%B6)
- [部件化编译最佳实践](https://gitee.com/openharmony/build/blob/master/docs/%E9%83%A8%E4%BB%B6%E5%8C%96%E7%BC%96%E8%AF%91%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.md)