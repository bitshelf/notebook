---
tags: Linux GPIO
---
# GPIO 配置
```c
&gpio0 {
	gpio-controller;
	#gpio-cells = <2>;
	ngpios = <18>;
	
	gpio-line-names = 
	/* A0-A7 */     "","","","","","","","gpio0a7",
	/* A8-A15 */    "","","","","","","","",
	/* A16-A23 */	"","","","","","","","",
	/* A24-A31 */	"","","","","","","","";
};
```

- `gpio-controller`：表示这个节点是一个 GPIO Controller，它下面有很多引脚
- `#gpio-cells = <2>`：表示这个控制器下每一个引脚要用2个32位的数 (cell)来描述。
	- 用第1个 cell 来表示哪一个引脚，
	- 用第2个 cell 来表示有效电平：GPIO_ACTIVE_HIGH (高电平有效)，GPIO_ACTIVE_LOW (低电平有效)

- `gpio-line-names`： 表示 GPIO 的名字
- `line-name`：用于记录 gpio 的控制者
````ad-info
title:`gpio-hog`
如果希望 gpio 在应用层能够控制，就不能配置 gpio-hog 属性，而没有 gpio-hog 属性的话，line-name 也就没有意义了  
gpio-hog 是为了安全性而提供的一种机制，将需要动态配置的 gpio 在内核态写死
````

---
## Link
- [Linux 驱动开发 五十五：《gpio.txt》翻译\_lqonlylove的博客-CSDN博客\_设备树gpio.txt](https://blog.csdn.net/OnlyLove_/article/details/126913579)
- [gpio.txt - Documentation/devicetree/bindings/gpio/gpio.txt - Linux source code (v6.1.11) - Bootlin](https://elixir.bootlin.com/linux/latest/source/Documentation/devicetree/bindings/gpio/gpio.txt)
- [设备树中gpio属性gpio-line-names和line-name的区别 - zlyang - 博客园](https://www.cnblogs.com/zl-yang/p/14758149.html)