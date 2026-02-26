---
tags:
  - Camera/i2c
---
##  Camera 开机通信过程
通信的正常流程是：
1. 开机先上电，控制 clk、pwdn、rst 这些管脚
2. $I_2C$  通信
3. 不管通信是否正常，之后会反向控制 clk、pwdn、rst 这些引脚

## $I_2C$ 误区以及解决
### 反馈量的时候 clk 没有，控制管脚电平不对
正常 $I_2C$ 通信只在开机加载驱动的瞬间有信号，如果不注意抓这个瞬间，那么后续控制反向操作，clk 也关闭了。所以一般触发模式用 $I_2C$ 的 clk 引脚触发，量同时其他几个信号状态。抓的时候，最好 dts 在当前 $I_2C$ 上只有这一个设备

### $I_2C$ 工具 detect 不到
因为后面下电了，那就 detect 不到

### iomux 管脚 clk 等的 iomux 不对
正常因为 $I_2C$ 通信失败，可能会导致 io 复用恢复到默认值。我们可以绕过，让系统加载
成功，然后去看 io 复用状态
> [!tip] 
> `os04a10_check_sensor_id` 函数，直接返回 0，系统会认为读到 id 正常。这样可以去查
> io 状态。`cat /sys/kernel/debug/pinctrl/pinctrl-rockchip-pinctrl/pinmux-pins` 这样可以看 io 复用

