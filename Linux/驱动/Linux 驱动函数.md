---
tags: Linux
---

# Linux 驱动函数
## 分配和释放设备编号
- 驱动需要将设备编号与内部函数连接起来，内部函数用来实现设备的操作
### 设备号动态分配
```c
int alloc_chrdev_region(dev_t *dev, unsigned int firstminor, unsigned int count, char *name);
```
- `dev`： 用于输出的参数，调用成功后保存已分配范围的第一个编号
- `firstminor`：请求被使用的第一个**次**设备号
- `count`：连续设备编号的个数
- `name`：和编号范围关联的名称
### 设备号静态分配
```c
int register_chrdev_region(dev_t first, unsigned int count, char *name);
```
- `first` ：要分配的设备编号范围的起始值
- `count`：连续设备编号的个数
- `name`：和编号范围关联的名称
- @ 分配成功是返回 $0$，错误返回负的错误码
### 设备号释放
```c
void unregister_chrdev_region(dev_t first, unsigned int count);
```
## Linux 内核函数加载
1. `reques_module()`
	1. `request_module(module_name);`
	2. `request_module("char-mojor-%d-%d",MAJOR(dev),MINOR(dev));`

## Linux 内核函数导出
* `module_param（参数名，参数类型，参数读/写权限）;`
```c
static char *my_name = "Tony";
static int num = 500;
module_param(num,int,S_IRUGO);
module_param(my_name,charp,S_IRUGO);
```

* 模块被加载后，在/sys/module/目录下将出现以此模块名命名的目录