---
tags: Android 
---

## Binder Client
- 实现远程调用函数
- open 初始化 binder 驱动
- 查询服务，获取到服务的句柄 handle
- 通过 handle 调用远程调用函数

## Binder Service
1. 定义服务回调函数
	- 取出 code 值
	- 根据 code 值调用对应的函数
	- 函数如果有参数，从 msg 中取出
	- 函数的返回值写入到 reply 中
### 主函数编写
- Binder 初始化
- 注册服务
- 进入 loop，等待 client 请求服务

## Link 
- [写给应用开发的 Android Framework 教程——学穿 Binder 篇之 Binder 程序示例之 C 语言篇 - 掘金](https://juejin.cn/post/7210245482861264955)