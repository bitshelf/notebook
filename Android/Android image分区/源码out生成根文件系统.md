---
tags: Android
---

# out 编译生成根文件系统目录
| 目录                             | 作用 |
| -------------------------------- | ---- |
| out/target/product/产品名/root   | 根目录顶层目录机构, 编译系统称为 TARGET_ROOT_OUT     |
| out/target/product/产品名/system | 系统目录，提供各种二进制程序和动态库， java 框架代码二进制程序，编译系统称为 TARGET_SYSTEM_OUT     |
| out/target/product/产品名/vendor | 厂商定制目录     |
|  out/target/product/产品名/data                                | 用户和系统应用数据目录，里面文件基本都是在系统运行中产生，编译时较少     |
