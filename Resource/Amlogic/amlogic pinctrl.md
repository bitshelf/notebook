---
tags: Amlogic pinctrl
---

# pinctrl 定义和实际引脚对应关系
1. pinctrl 的配置写在 dts 中
	![[Resource/Project/amlogic/attachments/amlogic pinctrl-dts.png]]
2. 管脚定义在 C 代码中
	![[Resource/Project/amlogic/attachments/Amlogic pinctrl-C.png]]
# 调试
查看 pinctrl 占用情况
~~~shell
cat /sys/kernel/debug/pinctrl/
~~~
