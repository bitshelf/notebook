---
tags: Linux
---

# sys 目录说明
设备节点是为设备驱动所创建的，而设备device和驱动driver都是以链表的形式连接在总线bus上的，而设备——驱动——总线的更上一层就是sysfs层。  
sysfs是一个内存文件系统，它把连接在系统上的设备和总线组织成为一个分级的文件，用户空间的程序同样可以利用这些信息，以实现和内核的交互。sysfs文件系统是当前系统上实际设备树的一个直观反映，用mount命令查看可以得知其挂载在“/sys”下 sysfs on /sys type sysfs (rw,seclabel,relatime))。当一个kobject被创建的时候，对应的sys文件和目录也就被创建了；其主要文件目录如下：

-   /sys/block 存放块设备，提供以设备名(如sda)到/sys/devices的符号链接
-   /sys/bus 按总线类型分类，在某个总线目录之下可以找到连接该总线的设备的符号链接，指向/sys/devices。某个总线目录之下的 drivers 目录包含了该总线所需的所有驱动的符号链接对应kernel中的 struct bus_type
-   /sys/class 按设备功能分类，如输入设备在 /sys/class/input 之下，图形设备在 /sys/class/graphics 之下，是指向 /sys/devices 目录下对应设备的符号链接对应kernel中的 struct class
-   /sys/dev 按设备驱动程序分层(字符设备/块设备)，提供以major:minor为名到 /sys/devices 的符号链接对应kernel中的 struct device_driver
-   /sys/devices 包含所有被发现的注册在各种总线上的各种物理设备。  
    所有的物理设备都按其在总线上的拓扑结构来显示，除了 platform devices 和 system devices 。platform devices一般是挂在芯片内部高速或者低速总线上的各种控制器和外设，能被CPU直接寻址。system devices不是外设，他是芯片内部的核心结构，比如CPU，timer等，他们一般没有相关的driver，但是会有一些体系结构相关的代码来配置他们对应kernel中的 struct device  
    上面展现了在sys目录下总线，设备，驱动和类所对应的文件，而他们的区别为：
-   device用于描述各种设备，其保存了所有的设备信息
-   driver 用于驱动 device ，其保存了所有能够被它所驱动的设备链表。
-   bus 是连接 CPU 和 device 的桥梁，其保存了所有挂载在它上面的设备链表和驱动这些设备的驱动链表。
-   class 用于描述一类 device ，其保存了所有该类 device 的设备链表。

  
  
作者：蜗牛行者  
链接：https://www.jianshu.com/p/10653d83909d  
来源：简书  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。