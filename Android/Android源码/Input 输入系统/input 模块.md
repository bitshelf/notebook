---
tags: Android
---

# Android 输入系统
## Input 模块的主要构成
1. Native 层 `InputReader` 负责从 `EventHub` 取出事件并处理，再交给 `InputDispatcher`
2. `Native` 层的 `InputDispatcher` 接收来自 `InputReader` 的输入事件，并记录 WMS 的窗口信息，用于**派发事件到合适的窗口**
3. Java 层的 `InputManagerService` 跟 WMS 交互，WMS 记录所有窗口信息，并同步更新到 IMS，为 `InputDispatcher` 正确派发事件到 `ViewRootImpl` 提供保障

# Link
1. [为了讲清楚Android触摸事件，我“拆了部手机” ](https://mp.weixin.qq.com/s/H07h84l2YbaU6kQAn6p94A)
2. [Input系统—启动篇](http://gityuan.com/2016/12/10/input-manager/)
3. [Android触摸事件传递机制系列详解](https://www.jianshu.com/p/4aa87d9d3f10)
4. [Android触摸事件原理（InputManagerService）](https://blog.csdn.net/hengfeng430/article/details/109304038)