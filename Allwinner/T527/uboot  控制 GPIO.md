---
tags:
  - T527
---
## T527 uboot 阶段控制 GPIO
### uboot-board. dts 添加 GPIO 配置
```c
/{
	boot_init_gpio: boot_init_gpio {
		boot_gpio_num = <1>;
		gpio0 = <&pio PD2 1 0 0 1>;
		status = "okay";
	};
};
```
![GPIO 说明](../assets/%E5%85%A8%E5%BF%97GPIO%E8%AE%BE%E5%A4%87%E6%A0%91%E4%BF%A1%E6%81%AF.excalidraw)

### 修改 board_common. c
- `brandy/brandy-2.0/u-boot-2018/board/sunxi/board_common.c`
```c
int sunxi_boot_init_gpio(void)
{
#define FDT_PATH_BOOT_INIT_GPIO "/soc/boot_init_gpio"
        user_gpio_set_t gpio_init;
        int nodeoffset;
        int nGpioNum=0;
        int i=0;
        char acGpioName[16];

        if (get_boot_work_mode() != WORK_MODE_BOOT) {
                return 0;
        }
        nodeoffset = fdt_path_offset(working_fdt, FDT_PATH_BOOT_INIT_GPIO);
        if (IS_ERR_VALUE(nodeoffset)) {
                return 0;
        }
        if (!fdtdec_get_is_enabled(working_fdt, nodeoffset)) {
                return 0;
        }

        if (script_parser_fetch(FDT_PATH_BOOT_INIT_GPIO, "boot_gpio_num", (int *)&nGpioNum,sizeof(int) / 4) != 0)
        {
                return 0;
        }
        printf("======YTR======nGpioNum=%d\n",nGpioNum);
        memset(acGpioName,0,sizeof(acGpioName));
        for (i=0;i < nGpioNum; i++)
        {
                sprintf(acGpioName,"gpio%d",i);
                printf("======YTR======acGpioName=%s\n",acGpioName);
                if (fdt_get_one_gpio(FDT_PATH_BOOT_INIT_GPIO, acGpioName, &gpio_init) == 0)
                {
                        sunxi_gpio_request(&gpio_init, 1);
                }

        }



        return 0;
}
```

- 修改后的文件：![](assets/board_common.c)