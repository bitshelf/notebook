---
tags: Linux
---

# Linux gpio 控制
## GPIO character device
- `/dev/gpiochipX`
- 通过 `CONFIG_GPIOLIB` 开启
### 操作方法
- 安装 gpiod 软件包
```shell
sudo apt install gpiod
```
### 示例
- 查看系统提供 gpio：
```shell
gpiodetect
```
- 将 gpio3_C5 置为 1：
```shell
gpioset  gpiochip3 21=1
```
- 查看 GPIO3_C5 的值：
```shell
 gpioget gpiochip3 21
```
- 查看 gpio 信息：
```shell
gpioinfo gpiochip3
```
- demo 程序
```c
#include <stdio.h>
#include <unistd.h>
#include <gpiod.h>

int main(int argc, char *argv[])
{
	struct gpiod_chip *output_chip;
	struct gpiod_line *output_line;
	
	int line_value;
	/* open /dev/gpiochip0 */
	output_chip = gpiod_chip_open_by_number(0);

	/* find BLUE_LED pin */
	output_line = gpiod_chip_find_line(output_chip, "BLUE_LED");

	/* config as output and set a description */
	gpiod_line_request_output(output_line, "gpio_test",
	GPIOD_LINE_ACTIVE_STATE_HIGH);

	while (1) {
	line_value = !line_value;
	gpiod_line_set_value(output_line, line_value);
	sleep(1);
	}
	
	return 0;
}
```

## /sys/class/gpio 接口
- 内核 4.8 之前
- 通过  `CONFIG_GPIO_SYSFS`  开启
### 示例：操作 GPIO0_D3
- 导出 GPIO3_C5 
```shell
echo 21 > /sys/class/gpio/export # 将在 /sys/class/gpio 下生成 gpio21 目录
```
- 查看 GPIO3_C5 的值
```shell
cat /sys/class/gpio/gpio21/value
```
- 将 GPIO3_C5 拉高
```shell
echo out > /sys/class/gpio/gpio21/direction # 必须
echo 1 > /sys/class/gpio/gpio21/value
```

**参考**：
- [Stop using /sys/class/gpio – it’s deprecated – The Good Penguin](https://www.thegoodpenguin.co.uk/blog/stop-using-sys-class-gpio-its-deprecated/)
- [https://ostconf.com/system/attachments/files/000/001/532/original/Linux\_Piter\_2018\_-\_New\_GPIO\_interface\_for\_linux\_userspace.pdf?1541021776](https://ostconf.com/system/attachments/files/000/001/532/original/Linux_Piter_2018_-_New_GPIO_interface_for_linux_userspace.pdf?1541021776)
- [https://elinux.org/images/9/9b/GPIO\_for\_Engineers\_and\_Makers.pdf](https://elinux.org/images/9/9b/GPIO_for_Engineers_and_Makers.pdf)
- [gpio – Gateworks](http://trac.gateworks.com/wiki/gpio)
- [libgpiod/libgpiod.git - C library and tools for interacting with the linux GPIO character device](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/about/)
- [GPIO控制文档](https://doc.embedfire.com/linux/imx6/quick_start/zh/latest/quick_start/libgpiod/libgpiod.html)
- [gpiochip - Rust](https://docs.rs/gpiochip/latest/gpiochip/)
- [gpiod 编译 An Introduction to chardev GPIO and Libgpiod on the Raspberry PI – Beyondlogic](https://www.beyondlogic.org/an-introduction-to-chardev-gpio-and-libgpiod-on-the-raspberry-pi/)
- [General Purpose Input/Output (GPIO) — The Linux Kernel documentation](https://docs.kernel.org/driver-api/gpio/index.html)
- [GPIO 边沿触发示例](https://lloydrochester.com/post/hardware/libgpiod-event-rpi/
- [带命令行参数的 GPIO C 程序](https://github.com/starnight/libgpiod-example/blob/master/libgpiod-scan/main.c)