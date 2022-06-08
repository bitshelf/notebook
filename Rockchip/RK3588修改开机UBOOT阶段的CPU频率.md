---
tags: Android 
---

## RK3588 修改开机 UBOOT 阶段的 CPU 频率

RK3588 CPU在开机到uboot阶段的电压是固定0.75v（这个电压是pmic的初始电压无法修改），频率也是固定在1.2GHz。  
如果有机器因为硬件设计或者其他原因导致在uboot阶段cpu不稳定，则可以尝试降低cpu的频率，修改方法如下：  
因为uboot阶段的cpu电压是固定的，所以频率不能超过1.2GHz。

```
diff --git a/arch/arm/include/asm/arch-rockchip/cru_rk3588.h b/arch/arm/include/asm/arch-rockchip/cru_rk3588.h
index e96f190bcb..b1dc27fdfc 100644
--- a/arch/arm/include/asm/arch-rockchip/cru_rk3588.h
+++ b/arch/arm/include/asm/arch-rockchip/cru_rk3588.h
@@ -11,7 +11,7 @@
 #define KHz            1000
 #define OSC_HZ         (24 * MHz)
 
-#define LPLL_HZ                (1200 * MHz)
+#define LPLL_HZ                (1008 * MHz)    //也可以改为816MHz或者更低
 #define GPLL_HZ                (1188 * MHz)
 #define CPLL_HZ                (1500 * MHz)
 #define NPLL_HZ         (850 * MHz)
```

修改后需要编译spl，然后烧写loader和uboot.img，才能生效，编译命令如下：

```
@sys2_206:~/3_Android12_29_debug$ cd u-boot/
@sys2_206:~/3_Android12_29_debug/u-boot$ 
@sys2_206:~/3_Android12_29_debug/u-boot$ ./make.sh rk3588 --spl-new
```

## Link 
- [RK3588修改开机UBOOT阶段的CPU频率\_rk3588的的clock-frequency无法到达90hz问题\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/124149188)