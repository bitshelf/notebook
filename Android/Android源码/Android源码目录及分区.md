---
tags: Android
---

# Android 源码目录
~~~shell
$ tree -d -L 1
.                                                                                                                                                                                                                                       
├── art                   # 全新的 ART 运行环境                                                                                                                                                                                                                     
├── bionic                # 系统 C 库                                                                                                                                                                                                                     
├── bootable              # 启动引导相关代码                                                                                                                                                                                                                     
├── build                 # 存放系统编译规则及 generic 等基础开发包配置                                                                                                                                                                                                                     
├── compatibility                                                                                                                                                                                                                              
├── cts                   # Android 兼容性测试套件标准                                                                                                                                                                                                                     
├── dalvik                # dalvik 虚拟机                                                                                                                                                                                                                      
├── developers            # 开发者目录                                                                                                                                                                                                                     
├── development           # 开发者需要的一些例程及工具                                                                                                                                                                                                                      
├── device                # 设备相关配置                                                                                                                                                                                                                     
├── external              # 开源模组相关文件                                                                                                                                                                                                                     
├── frameworks            # 应用程序框架，Android 系统核心部分，由 Java 和 C++编写                                                                                                                                                                                                                     
├── hardware              # 主要是硬件抽象层的代码                                                                                                                                                                                                                     
├── kernel                                                                                                                                                                                                                              
├── libcore               # 核心库相关文件                                                                                                                                                                                                                     
├── libnativehelper       # 动态库，实现 JNI 库的基础                                                                                                                                                                                                              
├── Makefile
├── mkcombinedroot                                                                                                                                                                                                                      
├── out                   # 编译完成后代码输出在此目录                                                                                                                                                                                                              
├── packages              # 应用程序包                                                                                                                                                                                                              
├── pdk                   # Plug Development Kit 的缩写，本地开发套件                                                                                                                                                                                                              
├── platform_testing      # 平台测试                                                                                                                                                                                                             
├── prebuilts             # x86 和 arm 架构下预编译的一些资源                                                                                                                                                                                                                    
├── release_dir                                                                                                                                                                                                                         
├── rkbin                                                                                                                                                                                                                               
├── RKDocs                                                                                                                                                                                                                              
├── rkst                                                                                                                                                                                                                                
├── RKTools                                                                                                                                                                                                                             
├── rockdev                                                                                                                                                                                                                             
├── sdk                   # SDK 和模拟器                                                                                                                                                                                                              
├── system                # 底层文件系统库、应用及组件——C 语言                                                                                                                                                                                                                     
├── test                                                                                                                                                                                                                                
├── toolchain             # 工具链文件                                                                                                                                                                                                              
├── tools                 # 工具文件                                                                                                                                                                                                              
├── u-boot                                                                                                                                                                                                                              
└── vendor         # 厂家定制内容, 私有文件                                                                                                                                                                                                                     
~~~

---

# 分区
* [super](https://source.android.google.cn/devices/tech/ota/dynamic_partitions?hl=zh-cn) 分区：Android10 之后引入
	<iframe 
    height = 300
    width = 100%
    src="https://source.android.google.cn/devices/tech/ota/dynamic_partitions?hl=zh-cn">
</iframe>
* [ product](https://source.android.google.cn/devices/bootloader/product-partitions?hl=zh-cn#product-partitions-and-permissions) 分区：Android 9 及更高版本支持使用 Android 编译系统构建 /product 分区
	<iframe 
    height = 300
    width = 100%
    src="https://source.android.google.cn/devices/bootloader/product-partitions?hl=zh-cn#product-partitions-and-permissions">
</iframe>
---
# HAL
* HAL 可定义一个标准接口以供硬件供应商实现，可让 Android 忽略较低级别的驱动程序实现
* 为了保证 HAL 具有可预测的结构，每个硬件专用 HAL 接口都要具有在 `hardware/libhardware/include/hardware/hardware.h` 中定义的属性
- 模块代表打包的 HAL 实现，这种实现存储为共享库 (`.so file`)。
`hardware/libhardware/include/hardware/hardware.h` 头文件可定义一个代表模块的结构体 (`hw_module_t`)，其中包含模块的版本、名称和作者等元数据。Android 会根据这些元数据来找到并正确加载 HAL 模块
> [!info] 设备
> 设备是产品硬件的抽象表示。例如，一个音频模块可能包含主音频设备、USB 音频设备或蓝牙 A2DP 音频设备