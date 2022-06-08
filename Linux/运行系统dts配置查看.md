---
tags: Linux 
---

# 运行系统查看 DTS 配置
1. dts 配置
~~~dts
	i2s0: i2s@ff880000 {
		compatible = "rockchip,rk3399-i2s", "rockchip,rk3066-i2s";
		reg = <0x0 0xff880000 0x0 0x1000>;
		rockchip,grf = <&grf>;
~~~

2. 运行系统查看 
~~~shell
cat /proc/device-tree/i2s\@ff880000/status
~~~

# gpio 配置查看
~~~shell
cat /sys/kernel/debug/gpio
~~~

# pinctrl 配置功能查看
~~~shell
cat /sys/kernel/debug/pinctrl/pinctrl/pinmux-pins
~~~


# 设备 pinctrl 使用查看
~~~shell
cat /sys/kernel/debug/pinctrl/pinctrl-maps
~~~
