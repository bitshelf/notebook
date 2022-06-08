---
tags: Android
---

# AVB (Android Verified Boot)
- 确保的是即便恶意代码获取了执行权限，也无法修改系统镜像进行持久化。
- Secure Boot 顾名思义就是安全启动，确保设备启动之后所加载执行的代码都是可信的。其中涉及的主要概念有两个：
	- 信任链: 保障执行流程的可靠交接
	- 信任根: 保障初始信任代码的可信

## Chain Of Trust
可信启动的一个核心思路就是在当前启动代码加载下一级代码之前，对所加载的代码进行完整性校验，并且使用 PKI 公钥基础设施进行核实。这些启动代码通常可以分为若干个阶段 (stage)，例如在 ARM 中有：

-   BL1：CPU复位之后执行的第一段代码，即复位向量所指向的位置。通常该位置在ROM里，执行过程中将自身数据复制到SRAM，并进行最小的初始化，比如寄存器和CPU等的初始化操作，随后加载BL2代码执行。
-   BL2：主要工作是执行架构和平台相关的初始化，比如配置MMU完成内存地址和权限的映射，完成外部存储器的初始化等。随后加载BL3代码并执行。
-   BL3：执行运行时的初始化操作，并加载内核执行。
-   内核 -> init -> …
实际上每个启动阶段还会进行细分，但这里的重点是需要清楚信任链的作用是在每一阶段代码加载执行下一阶段代码时都会进行验证。

信任链的作用是对下一阶段要执行的代码进行校验，那么就会回归到一个问题：最初的代码由谁来校验？其实上面有提到，最初的代码即 BL1 的代码，是保存在 BootROM 中，出厂烧写后不可修改的。因此 BootROM 代码需要尽可能简单，只需要进行必要的初始化操作。

## Root Of Trust
信任链的作用是对下一阶段要执行的代码进行校验，那么就会回归到一个问题：最初的代码由谁来校验？其实上面有提到，最初的代码即 BL1 的代码，是保存在 BootROM 中，出厂烧写后不可修改的。因此 BootROM 代码需要尽可能简单，只需要进行必要的初始化操作。
这样一来，信任根就变成了可以烧写 BootROM 代码的芯片厂商。信任是可以传递的，芯片厂商作为信任根将代码执行权限交给下一级之后，比如 OEM 厂商，下级代码就拥有了信任链所有权，也就是说下级代码就变成了新的信任根。但是 ROM 的空间有限，所以通常还使用 OTP (One-Time-Programmable) 来保存不同阶段的签名信息。OTP 是支持一次性编程的硬件，如多晶硅熔断器 (poly-silicon fuses)，烧毁之后无法恢复，从而保证写入后无法被篡改。

> [!info] Verified Boot 2.0
> **Verified Boot 2.0**：对分区尾部的数据格式进行格式化，并增加版本回滚保护的功能。


## A/B System
A/B 系统是在 Android N 中推出的一个新特性，主要目的是优化 OTA 升级的过程，实现无缝升级 (seamless update)。
> [!info]  A/B 之前
> 
>  1. 下载更新包到 cache 或者 data 分区。系统校验更新包的证书/system/etc/security/otacerts. zip，校验通过后提示用户可以进行升级。
> 2. 用户点击升级后系统重启到 recovery，并根据/cache/recovery/command 中的内容找到 OTA 包
> 3. recovery 再次使用公钥/res/keys 校验签名
>  4. 根据 OTA 包中的指令进行更新
>>值得一提的是，对开启了dm-verity校验的文件系统进行文件修改会导致校验失败，也就说在OTA之后设备将无法正常启动；为了解决这个问题需要将file-based OTA改为block-based OTA。


---
# Link
- [浅谈 Android 的安全启动和完整性保护](https://evilpan.com/2020/11/14/android-secure-boot/)
- [Android Verified Boot (AVB) - postmarketOS]( https://wiki.postmarketos.org/wiki/Android_Verified_Boot_ (AVB))
- [Android Verified Boot 2.0 — Das U-Boot unknown version documentation](https://u-boot.readthedocs.io/en/latest/android/avb2.html)