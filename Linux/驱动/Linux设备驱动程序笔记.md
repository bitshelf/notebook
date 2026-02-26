---
tags:
  - linux/drivers
---
# 函数调用
* **应用程序** 可以调用它未定义的函数，因为链接过程能够解析外部引用，从而使用适当的函数库，例如：定义在*libc* 中的`printf`函数就是可以被调用的函数之一
* **内核模块**仅仅被连接到内核，它能调用的函数仅仅是由内核导出的那些函数，不存在任何可链接的函数库
# 内核中的并发
内核代码（几乎）始终不能假定在给定代码中能够独占处理器，即使某段代码没有进入睡眠状态（或者阻塞）
# 其他的一些细节
1. 双下划线的前缀的函数名称(`_ _`)，通常是接口的底层组件，应谨慎使用，实质上，双下划线告诉程序员：“谨慎使用，否则后果自负。” 
# `modprobe`
`modprobe`是处理层叠模块的实用工具一个`modprobe`命令有时候相当于调用几次`insmod`命令,然而，从当前目录装入自己的模块时任然需要使用`insmod`，因为`modprobe`只能从标准的已安装模块中搜索需要装入的模块 
# 内核符号表
```c
EXPORT_SYMBOL(name);
EXPORT_SYMBOL_GPL(name);
```
# 预备知识
专门用于模块的函数
~~~c
#include <linux/module.h>
#include <linux/init.h>
~~~
* `module.h` 包含有可装载模块需要的大量符号和函数定义
* `init.h` 指定初始化函数和清除函数 
## `module_init`
`module_init` 的使用是强制性的，这个宏会在目标的模块代码中增加一个特殊的段。用于说明内核初始化函数所在的位置。没有这个定义，初始化函数永远不会被调用。
* 如果一个模块未定义清除函数，则内核不允许卸载改模块 
 # 错误处理 
# 模块参数 
* 模块参数可以在运行`insmod`或`modprobe`命令装载模块时赋值
* 在`insmod`改变模块参数之前，模块必须让这些参数对`insmod`命令可见。参数必须使用`module_param`宏来声明，这个宏在`moduleparam.h`中定义。 
* `mouule_param`需要三个参数：变量的名称，类型以及用于`sysfs`入口项的访问许可掩码。
* 模块装载器支持数组参数：`module_param_array(name,tpye,num,perm);`
	* `name`是数组的名称
	* `type`是数组元素的类型
	* `num`是一个整数变量
	* `perm`是常见的访问许可值
	* 如果在装载是设置数组参数，则`num`会被设置为用户提供的个数。模块装载器会拒绝接受超过数组大小的值
# 设备号
* **主设备号**：主设备号标识对应的驱动程序
* **次设备号**：次设备号由内核使，用于正确确定设备文件所指的设备，依赖于驱动程序的编写方式，我们可以通过次设备号获得指向内核设备的直接指针
* `dev_t`用来保存次设备编号，包括主设备号和次设备号
	* 将主设备号和次设备号转换为`dev_t`类型：`MKDEV（int major，int minor);`
	* 获得主设备号：`MAJOR(dev_t dev);`
	* 获得次设备号：`MINOR(dev_t dev);`
* 分配静态设备号 
	`int register_chrdev_region(dev_t first,unsigned int count, char* name);`
	* 成功返回$0$,错误返回一个负的错误码
	* `first`:设备编号范围的起始值
	* `count`连续请求设备编号的个数
	* `name`与编号范围关联的设备名称，它将出现在`/proc/devices`和`sys`中
* 分配动态设备号
	* `int alloc_chrdev_region(dev_t *dev,unsigned int firstminor, unsigned int count, char *name);`
	* `dev`是仅用于输出的参数 
	* 一旦分配了设备号，就可以从`/proc/devices`中获得
* 分配设备号
	* `void unregister_chrdev_region(dev_t first,unsigned int count);`
		* 通常是在清除函数中调用`unregister_chrdev_region`函数
### 文件操作
1. `file_operations`是用于将设备号与驱动建立连接
2. 结构定义在`<linux/fs.h>`
3. 每个打开的文件在内部由`file`结构表示和一组函数关联（通过包含指向一个`file_operations`结构的`f_op`字段） 
## `inode`结构
内核用`inode`结构在内部表示文件，因此它和`file`结构不同，后者表示打开的文件描述符。对于单个文件，可能会有许多个表示打开的文件描述符的`file`结构，但他们都指向单个`inode`结构
*  `dev_t i_rdev` 对便是设备文件的`inode`结构，该字段包含了真正的设备编号
* `struct cdev *i_cdev`:`struct cdev`是表示字符设备的内核的内部结构。当`inode`

# 字符设备
### 注册字符设备
`int register_chrdev(unsigned int major, const char *name,struct file_operations *fops);`
* `major`是设备主设备号
* `name`驱动程序的名称（出现在`/proc/devices`中）
* `fops`是默认的`file_operations`结构
 ### 移除字符设备
* `int unregister_chrdev(unsigned int major, const char *name);`
### `open`方法
`int （*open)(struct inode, struct file *filp);`
`open`方法提供给驱动程序以初始化的能力，`open`应完成如下工作
* 检查设备特定的错误（如设备未准备就绪或者类似的硬件问题）
* 如果设备是首次打开，则对其进行初始化
* 如有必要，更新`f_op`指针
* 分配并填写置于`filp->private_data`里的数据结构

# 内存分配
* `void *kmalloc(size_t size, int flages);`
* `void free(void *ptr);`
定义在头文件`<linux/slab.h>`
**不应该将非`kmalloc`返回的指针传递给`kfree`，可以将`NULL`传递给`kfree`**
# `read`和`write`
1. `ssize_t read(struct file *filp, char __user *buff, size_t count, loff_t *offp);`
2. `ssize_t write(struct file *filp, const char __user *buff, size_t count, loff_t *offp);`
* `file` 是文件指针
* `count`是请求传输的数据长度
* `buff`是用户空间的缓冲区，这个缓冲区保存要写入的数据，或者是一个存放新读入数据的空缓冲区
* `offp` 是一个`long offset type`(长偏移量类型)的对象指针。用于指明用户在文件中进行存取的操作的位置。返回值是`signed size type`
 ### `read`和`write`的核心部分
* `unsigned long copy_to_user(void __user *to, const void *from, unsigned long count);`
* `unsigned long copy_from_user(void *to, const void __user *from, unsigned long count);`
	* 用户空间和内核空间之间的拷贝数据
	* 检查用户空间的指针是否有效
	* 如果拷贝过程中遇到无效地址，则仅仅复制部分数据
	* 返回值是还需要拷贝的内存数量值
	* 如果不需要检查用户空间的指针，可以调用`__copy_to_user`和`__copy_from_user`
	![[read参数]]
#### 出错处理
* 出错时，`read`和`write`方法都返回一个负值。
* 大于等于 $0$ 的返回值告诉调用程序成功传输了多少字节。