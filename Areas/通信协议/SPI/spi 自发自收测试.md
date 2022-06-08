---
tags: SPI
---

# SPI 自发自收
### Rockchip SPI 自发自收配置 dts 配置
```c:pro-rk3568.dts
//pro-rk3568.dts
&spi1 {
	status = "okay";
	pinctrl-names = "default";
	pinctrl-0 = <&spi1m1_cs0 &spi1m1_pins
	
    spi1_dev@0 {
        compatible = "rockchip,spidev";
        reg = <0>;
        spi-max-frequency = <12000000>;
        spi-lsb-first;
    };
};
```

#### 编译测试工具
```shell
make ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu- LDFLAGS=-static -C tools/spi

# 配置编译环境
export ARCH=arm64 LDFLAGS=-static
export CROSS_COMPILE=aarch64-linux-gnu- 

# 编译spi测试工具，linux kernel version > 4.4
cd kernel/toos
make spi
```
- [Building Linux with Clang/LLVM — The Linux Kernel documentation](https://www.kernel.org/doc/html/v5.17/kbuild/llvm.html)

#### 自发自收测试
```shell
# 查看帮助
./spidev_test -h

#  自发自收测试，可以看到收发一致
./spidev_test -D /dev/spidev1.0  -v
```