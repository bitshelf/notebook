---
tags: GPIO
---

## 一般流程
~~~c
//请求一个/一组gpio
gpio_request/devm_gpio_request、gpio_request_one/devm_gpio_request_one、gpio_request_array   ---------<1>
...
//设置gpio方向为输入/输出
gpio_direction_input或者gpio_direction_output        ---------<2>
...
//将该gpio通过sys文件系统导出，应用层可以通过文件操作gpio
gpio_export                                          ---------<3>
...
//如果gpio为输入，获取gpio值，如果gpio为输出，可以设置gpio高低电平
gpio_get_value、gpio_set_value                       ---------<4>
...
//将gpio转为对应的irq，然后注册该irq的中断handler
request_irq(gpio_to_irq(gpio_num)...)                ---------<5>
...
//释放请求的一个或者一组gpio
gpio_free/devm_gpio_free、gpio_free_array              ---------<6>
...

~~~

# gpio_request()
```shell
int gpio_request(unsigned gpio, const char *label)
```
* `gpio_request_one`、`gpio_request_array`是它的扩展，`devm_`为前缀的是gpio devres机制的实现
* 参数为gpio号和为该gpio指定的表签名
##  `gpio_request` 主要做了以下动作
1. 检查是否已经被申请，没有的话，标记为已申请 
2. 填充label到该pin数据结构，用于debug 
3. 如果chip driver提供了request回调，调用它 
4. 如果chip driver提供了get_direction回调，调用它,通过它更新pin数据结构，标明gpio方向

## gpio_request_one()
`gpio_request_one`多一个flags参数，通过该参数，可以指定`GPIOF_OPEN_DRAIN`、`GPIOF_OPEN_SOURCE`、`GPIOF_DIR_IN`、`GPIOF_EXPORT`等标志
* 指定了`GPIOF_DIR_IN`，那么后面就不需要自己再额外调用`gpio_direction_input`或者`gpio_direction_output`
* 指定了`GPIOF_EXPORT`，后面就不需要自己调用`gpio_export`

## gpio_request_array()
`gpio_request_array`是对`gpio_request_one`的封装，用于处理同时申请多个gpio的情形

## gpio_direction_input()/gpio_direction_output()
`gpio_direction_input`或者`gpio_direction_output`用来设置该gpio为输入还是输出，它们主要是回调gpio chip driver提供的`direction_input`或者`direction_output`来设置该gpio寄存器为输入、输出

## gpio_export()
`gpio_export`主要用于调试，它会将该gpio的信息通过sys文件系统导出，这样应用层可以直接查看状态、设置状态等

## gpio_get_value或者gpio_set_value
`gpio_get_value`或者`gpio_set_value`和input、output类似，如果为输入，获取该gpio的值，如果为输出，设置该gpio的值，内部也是调用gpio chip driver提供的get、set。

## gpio_to_irq（）
`gpio_to_irq`用于获取该gpio对应的中断号，这个需要设备树里的该gpio节点描述使用哪个中断号（并不是所有的gpio都可以触发中断的）。它里面的实现就是回调gpio chip driver提供的`to_irq`
