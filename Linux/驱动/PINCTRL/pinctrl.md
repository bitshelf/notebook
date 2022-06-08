---
tags: pinctrl
---

# pinctrl 
## 数据结构
* 使用 struct pinctrl_desc 抽象一个 pin controller
```c:kernel/include/linux/pinctrl/pinctrl.h
// kernel/include/linux/pinctrl/pinctrl.h
/**

 * struct pinctrl_desc - pin controller descriptor, register this to pin

 * control subsystem

 * @name: name for the pin controller

 * @pins: an array of pin descriptors describing all the pins handled by

 *  this pin controller

 * @npins: number of descriptors in the array, usually just ARRAY_SIZE()

 *  of the pins field above

 * @pctlops: pin control operation vtable, to support global concepts like

 *  grouping of pins, this is optional.

 * @pmxops: pinmux operations vtable, if you support pinmuxing in your driver

 * @confops: pin config operations vtable, if you support pin configuration in

 *  your driver

 * @owner: module providing the pin controller, used for refcounting

 * @num_custom_params: Number of driver-specific custom parameters to be parsed

 *  from the hardware description

 * @custom_params: List of driver_specific custom parameters to be parsed from

 *  the hardware description

 * @custom_conf_items: Information how to print @params in debugfs, must be

 *  the same size as the @custom_params, i.e. @num_custom_params

 */

struct pinctrl_desc {

    const char *name;

    const struct pinctrl_pin_desc *pins;

    unsigned int npins;

    const struct pinctrl_ops *pctlops;

    const struct pinmux_ops *pmxops;

    const struct pinconf_ops *confops;

    struct module *owner;

#ifdef CONFIG_GENERIC_PINCONF

    unsigned int num_custom_params;

    const struct pinconf_generic_params *custom_params;

    const struct pin_config_item *custom_conf_items;

#endif
};
```

* pins
变量 pins 和 npins 把系统中所有的 pin 描述出来，并建立索引。驱动为了和具体的 pin 对应上，再将这些描述的这些 pin 组织成一个 struct pinctrl_pin_desc 类型的数组，该类型的定义为:
```c:
// kernel/include/linux/pinctrl/pinctrl.h
/**

 * struct pinctrl_pin_desc - boards/machines provide information on their

 * pins, pads or other muxable units in this struct

 * @number: unique pin number from the global pin number space

 * @name: a name for this pin

 * @drv_data: driver-defined per-pin data. pinctrl core does not touch this

 */

struct pinctrl_pin_desc {

    unsigned number;

    const char *name;

    void *drv_data;

};
```

- pin groups
SoC中，有时需要将很多 pin 组合在一起，以实现特定的功能，例如 uart 接口、i2c 接口等。因此 pin controller 需要以 group 为单位，访问、控制多个 pin，这就是 pin groups
```c:kernel/drivers/pinctrl/core.h
// kernel/drivers/pinctrl/core.h
/**

 * struct group_desc - generic pin group descriptor

 * @name: name of the pin group

 * @pins: array of pins that belong to the group

 * @num_pins: number of pins in the group

 * @data: pin controller driver specific data

 */

struct group_desc {

    const char *name;

    int *pins;

    int num_pins;

    void *data;

};
```

### pinctrl core 在 struct pinctrl_ops 中抽象出三个回调函数，用来获取 pin groups 相关信息，如下
```c
struct pinctrl_ops {
  //获取系统中pin groups的个数，后续的操作，将以相应的索引为单位（类似数组的下标，个数为数组的大小）
 int (*get_groups_count) (struct pinctrl_dev *pctldev);
  //获取指定group（由索引selector指定）的名称
 const char *(*get_group_name) (struct pinctrl_dev *pctldev, unsigned selector);
  //获取指定group的所有pins（由索引selector指定），结果保存在pins（指针数组）和num_pins（指针）中
 int (*get_group_pins) (struct pinctrl_dev *pctldev, unsigned selector, const unsigned **pins, unsigned *num_pins);
 void (*pin_dbg_show) (struct pinctrl_dev *pctldev, struct seq_file *s, unsigned offset);
  //用于将device tree中的pin state信息转换为pin map
 int (*dt_node_to_map) (struct pinctrl_dev *pctldev, struct device_node *np_config, struct pinctrl_map **map, unsigned *num_maps);
 void (*dt_free_map) (struct pinctrl_dev *pctldev, struct pinctrl_map *map, unsigned num_maps);
};
```

### pin configuration
除了上面的 pin 和 pin group，有些管脚可以配置，比如上拉，下拉，高阻等。pin configuration 来封装这些功能，具体体现在 struct pinconf_ops 数据结构中，如下
```c
struct pinconf_ops {
#ifdef CONFIG_GENERIC_PINCONF
 bool is_generic;
#endif
  //获取指定 pin 的当前配置，保存在 config 指针中
 int (*pin_config_get) (struct pinctrl_dev *pctldev, unsigned pin, unsigned long *config);
  //设置指定pin的配置
 int (*pin_config_set) (struct pinctrl_dev *pctldev, unsigned pin, unsigned long *configs, unsigned num_configs);
  //获取指定pin group的配置项
 int (*pin_config_group_get) (struct pinctrl_dev *pctldev, unsigned selector, unsigned long *config);
  //设置指定pin group的配置项
 int (*pin_config_group_set) (struct pinctrl_dev *pctldev, unsigned selector, unsigned long *configs, unsigned num_configs);
  ......
  ```

### pin mux
为了兼容不同的应用场景，有很多管脚可以配置为不同的功能，例如 A 和 B 两个管脚，既可以当作普通的 GPIO 使用，又可以配置为 I2C 的的 SCL 和 SDA，也可以配置为 UART 的 TX 和 RX，这称作管脚的复用（简称 pin mux）。使用 struct pinmux_ops 来抽象 pin mux 有关的操作，如下：
```c
struct pinmux_ops {
  //检查某个pin是否已作它用，用于管脚复用时的互斥
 int (*request) (struct pinctrl_dev *pctldev, unsigned offset);
  //request的反操作
 int (*free) (struct pinctrl_dev *pctldev, unsigned offset);
  //获取系统中function的个数
 int (*get_functions_count) (struct pinctrl_dev *pctldev);
  //获取指定function的名称
 const char *(*get_function_name) (struct pinctrl_dev *pctldev, unsigned selector);
  //获取指定function所占用的pin group
 int (*get_function_groups) (struct pinctrl_dev *pctldev, unsigned selector, const char * const **groups, unsigned *num_groups);
  //将指定的pin group（group_selector）设置为指定的function（func_selector）
 int (*set_mux) (struct pinctrl_dev *pctldev, unsigned func_selector, unsigned group_selector);
  //以下是gpio相关的操作
 int (*gpio_request_enable) (struct pinctrl_dev *pctldev, struct pinctrl_gpio_range *range, unsigned offset);
 void (*gpio_disable_free) (struct pinctrl_dev *pctldev, struct pinctrl_gpio_range *range, unsigned offset);
 int (*gpio_set_direction) (struct pinctrl_dev *pctldev, struct pinctrl_gpio_range *range, unsigned offset, bool input);
  //为true时，说明该pin controller不允许某个pin作为gpio和其它功能同时使用
 bool strict;
};
```

###  pin state
pinctrl driver 抽象出来了一些离散的对象：pin（pin group）、function、configuration，并实现了这些对象的控制和配置方式。然后我们回到某一个具体的 device 上（如 lpuart，usdhc）。一个设备在某一状态下（如工作状态、休眠状态、等等），所使用的 pin（pin group）、pin（pin group）的 function 和 configuration，是唯一确定的。所以固定的组合可以确定固定的状态，在设备树里用 pinctrl-names 指明状态名字，pinctrl-x 指明状态引脚。

### pin map
pin state 有关的信息是通过 pin map 收集
```c
struct pinctrl_map {
  //device的名称
 const char *dev_name;
  //pin state的名称
 const char *name;
  //该map的类型
 enum pinctrl_map_type type;
  //pin controller device的名字
 const char *ctrl_dev_name;
 union {
  struct pinctrl_map_mux mux;
  struct pinctrl_map_configs configs;
 } data;
};

enum pinctrl_map_type {
 PIN_MAP_TYPE_INVALID,
 //不需要任何配置，仅仅为了表示state的存在
 PIN_MAP_TYPE_DUMMY_STATE,
 //配置管脚复用
 PIN_MAP_TYPE_MUX_GROUP,
 //配置pin
 PIN_MAP_TYPE_CONFIGS_PIN,
 //配置pin group
 PIN_MAP_TYPE_CONFIGS_GROUP,
};

struct pinctrl_map_mux {
 //group的名字
 const char *group;
 //function的名字
 const char *function;
};

struct pinctrl_map_configs {
 //该pin或者pin group的名字
 const char *group_or_pin;
 //configuration数组
 unsigned long *configs;
 //配置项的个数
 unsigned num_configs;
};
```

pinctrl driver 确定了 pin map 各个字段的格式之后，就可以在 dts 文件中维护 pin state 以及相应的 mapping table。pinctrl core 在初始化的时候，会读取并解析 dts，并生成 pin map。

而各个 consumer，可以在自己的 dts node 中，直接引用 pinctrl driver 定义的 pin state，并在设备驱动的相应的位置，调用 pinctrl subsystem 提供的 API（pinctrl_lookup_state，pinctrl_select_state），active 或者 deactive 这些 state

---
## Link
-  [https://www.kernel.org/doc/Documentation/pinctrl.txt](https://www.kernel.org/doc/Documentation/pinctrl.txt)
- [pinctrl 子系统](https://mp.weixin.qq.com/s/XPS6KXCtu-Rcw6pNQs22QA)