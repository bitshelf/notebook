---
tags: Android
---

# Android 启动
## 启动流程
![](assets/Android启动.excalidraw.md)
1. 1st Stage is Boot ROM and Boot Loader
2. 2nd Stage is Kernel
3. 3rd Stage is Init
4. 4th Stage is Zygote and DVM
5. 5th Stage is SystemServer and Managers

### bootloader 
* 源码位置：`<android source>/bootable/bootloader/legacy/usbloader`
* BootLoader 通常分为两个阶段：
	* rimary Boot Loader 
	* Secondary Boot Loader
* 两个重要文件：
	* **Init.s** **::** Initializes stacks, zeros the BSS segments and call_main() in main.c 
	* **Main.c::** Initializes hardware (clocks, board, keyboard, console) and creates Linux tags

## Android init 进程启动流程
- init 把大部分的初始化工作都放到 init. rc 中
### 参考
- [Android系统开发进阶-init 进程启动流程 ](http://qiushao.net/2020/03/10/Android%E7%B3%BB%E7%BB%9F%E5%BC%80%E5%8F%91%E8%BF%9B%E9%98%B6/init%E5%90%AF%E5%8A%A8%E6%B5%81%E7%A8%8B/)

## Android 启动文件系统挂载
![[../Android image分区/assets/Android启动文件挂载 .excalidraw|100%]]

> [!info] Andriod 启动完成的标志
> ```shell
> getprop | grep sys.boot_completed
> ```

查看 Android 命令行工具
~~~shell
ls /system/bin/ls -l
~~~

