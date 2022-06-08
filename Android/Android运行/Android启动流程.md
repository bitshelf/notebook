---
tags: Android, 
---

# Android 启动图示
![[../assets/Android启动图示.png]]

1. 启动电源以及系统启动
	加载引导程序BootLoader到RAM，然后执行
2. 引导程序 BootLoader 
	主要作用是把系统OS拉起来并运行
3. Linux 内核启动
	在系统文件中寻找init.rc 文件，并启动init进程
4. init进程启动
	初始化和启动属性服务，并且启动 Zygote 进程
> [!info] init 的第一阶段
> `init` 的第一阶段（即初始化 SElinux 之前）装载 `/system`、`/vendor` 或 `/odm`

5. Zygote 进程启动
	创建Java虚拟机并未Java虚拟机注册JNI方法，创建服务端Socket，启动SystemServer进程
6. SystemServer进程启动
	启动Binder线程池和SystemServiceManager，并且启动各种服务
7. launcher 启动

---
# Link
- [freescale Android启动优化](assets/Android-boot-and-its-optimization-v2.pdf)
- [https://source.android.com/docs/core/architecture/kernel/mounting-partitions-early](https://source.android.com/docs/core/architecture/kernel/mounting-partitions-early)