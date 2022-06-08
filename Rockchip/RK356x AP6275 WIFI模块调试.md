---
tags: Wi-Fi
---

## SDIO 控制器
- SDIO (Secure Digital Input and Output) 即安全数字输入输出接口，定义了一种外设接口

##  RK3568 SDIO 控制器配置
```c
## RK3568 SDIO控制器配置
sdmmc2: dwmmc@fe000000 {
        compatible = "rockchip,rk3568-dw-mshc",
                     "rockchip,rk3288-dw-mshc";

		## SDIO寄存器基地址和映射大小
        reg = <0x0 0xfe000000 0x0 0x4000>; 
        
        ## SDIO中断,对应RK3568 SPI 132（100+32）号中断
        interrupts = <GIC_SPI 100 IRQ_TYPE_LEVEL_HIGH>; 
        
        ## SDIO最大运行频率
        max-frequency = <150000000>;    
        
        ## SDIO控制器时钟
        clocks = <&cru HCLK_SDMMC2>, <&cru CLK_SDMMC2>, 
                 <&cru SCLK_SDMMC2_DRV>, <&cru SCLK_SDMMC2_SAMPLE>;
        clock-names = "biu", "ciu", "ciu-drive", "ciu-sample";
        fifo-depth = <0x100>;
        resets = <&cru SRST_SDMMC2>;
        reset-names = "reset";
        status = "disabled";
};
```

```c
&sdmmc2 {
        max-frequency = <150000000>;
        supports-sdio;
        bus-width = <4>;
        disable-wp;
        cap-sd-highspeed;
        cap-sdio-irq;
        keep-power-in-suspend;
        pinctrl-names = "default";
        pinctrl-0 = <&sdmmc2m0_bus4 &sdmmc2m0_cmd &sdmmc2m0_clk>;
        sd-uhs-sdr104;
        mmc-pwrseq = <&sdio_pwrseq>;
        non-removable;
        status = "disabled";
};
```
- `max-frequency`：SDIO 在该模式下支持的最大运行频率，单位 HZ。
> [!attention] 注意
> 根据不同的模式进行调整该值，注意和数据传输速率（Max Data Transfer rate，MB/s）区别

-  `supports-sdio`：表示为 SDIO 功能，必须添加，否则无法正常初始化。
- `bus-width`：SDIO 使用 4 线模式。
- `cap-sd-highspeed`：high speed SDIO 外设。
- `cap-sdio-irq`：WIFI 模块是否支持 SDIO 中断。
- `keep-power-in-suspend`：支持睡眠时不掉电，默认加入，WIFI 模块默认有睡眠唤醒的需求。
-  `pinctrl-names`：SDIO 控制器引脚。
- `sd-uhs-sdr104`：支持 SDIO 3.0

## Link
- [RK 3568 外接 AP 6275 S WIFI 模块调试详解 ](https://mp.weixin.qq.com/s/vIeh0tgvBrDC1FqD6PQTwQ)