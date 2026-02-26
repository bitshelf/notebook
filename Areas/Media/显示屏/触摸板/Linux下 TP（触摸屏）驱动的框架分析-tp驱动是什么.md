---
tags:
  - TP
---

 TP驱动也就是触摸屏驱动，一般触摸屏分为
 - 电阻屏
 - 或者电容屏
 现在大多数都是电容屏。涉及：中断--->IIC 子系统--->input子系统。一般的流程是当手指接触到屏幕时，会在 cpu 产生一个中断，中断下半部通过IIC总线，从TP的IC中读取相关的信息，在经过 Input 子系统再对这些数据进行分析，以决定调用哪个事件。

中断：

> -   中断是指在CPU正常运行期间，由于内外部事件或由程序预先安排的事件引起的CPU暂时停止正在运行的程序，转而为该内部或外部事件或预先安排的事件服务的程序中去，服务完毕后再返回去继续运行被暂时中断的程序。Linux中通常分为外部中断（又叫硬件中断）和内部中断（又叫异常）
> -   Linux 中断又分为中断上半部（tophalf）和中断下半部(bottom half)。上半部的功能是"登记中断"，当一个中断发生时，它进行相应地硬件读写后就把中断例程的下半部挂到该设备的下半部执行队列中去。因此，上半部 执行的速度就会很快，可以服务更多的中断请求。但是，仅有"登记中断"是远远不够的，因为中断的事件可能很复杂。因此，Linux引入了一个下半部，来完 成中断事件的绝大多数使命，有些是以工作队列的方式去处理。下半部和上半部最大的不同是下半部是可中断的，而上半部是不可中断的，下半部几乎做了中断处理程序所有的事情，而且可以被新的 中断打断！下半部则相对来说并不是非常紧急的，通常还是比较耗时的，因此由系统自行安排运行时机，不在中断服务上下文中执行。
> -   工作队列：是另外一种将中断的部分工作推后的一种方式，它可以实现一些tasklet不能实现的工作，比如工作队列机制可以睡眠。这种差异的本质原因是，在工作队列机制中，将推后的工作交给一个称之为工作者线程（worker thread）的内核线程去完成。也就是说由工作队列所执行的中断代码会表现出进程的一些特性，最典型的就是可以重新调度甚至睡眠。有些中断下半部就会以工作队列的形式去执行。
>     -    `INIT_WORK (struct work_struct *work,void (*func)(void*), void  *data);` 初始化创建工作队列
>     -   create\_workqueue：  用于创建一个workqueue 队列，为系统中的每个CPU 都创建一个内核线程
>     -   void work\_handler(void \*data) ：将工作队列机制对应到具体的中断程序中，即那些被推后的工作将会在func所指向的那个工作队列处理函数中被执行。
>     -   schedule\_work(&work)：马上调度work，一旦工作线程被唤醒，这个工作就会被执行
>     -   destroy\_workqueue：  释放workqueue 队列

IIC 子系统：（以GT9XX为例）

-   基础知识：
    -   三根通信线：SCL、SDA、GND，是同步、串行、电平、低速、近距离的总线式结构，支持多个设备挂接在同一条总线上。
    -   主从式结构，通信双方必须一个为主（master）一个为从（slave），主设备掌握每次通信的主动权，从设备按照主设备的节奏被动响应。每个从设备在总线中有唯一的地址（slave address），主设备通过从地址找到自己要通信的从设备（本质是广播）。
    -   I2C主要用途就是主SoC和外围设备之间的通信，最大优势是可以在总线上扩展多个外围设备的支持。常见的各种物联网传感器芯片（如gsensor、温度、湿度、光强度、酸碱度、烟雾浓度、压力等）均使用I2C接口和主SoC进行连接。
    -   电容触摸屏芯片的多个引脚构成2个接口。一个接口是I2C的，负责和主SoC连接（本身作为从设备），主SoC通过该接口初始化及控制电容触摸屏芯片、芯片通过该接口向SoC汇报触摸事件的信息（触摸坐标等），我们使用电容触摸屏时重点关注的是这个接口；另一个接口是电容触摸板的管理接口，电容触摸屏芯片通过该接口来控制触摸板硬件。该接口是电容触摸屏公司关心的，他们的触摸屏芯片内部固件编程要处理这部分，我们使用电容触摸屏的人并不关心这里。
-   理解IIC四个关键结构体：i2c\_client 的注册信息是通过 i2c\_adapter 注册时 从 i2c\_register\_board\_info() 的i2c\_board\_info结构体获取 I2C设备信息.里面包含了从机的地址。（不过现在参数的传递用设备树传递比较方便）  
    (1)struct i2c\_adapter                IIC适配器  
    (2)struct i2c\_algorithm             IIC算法，时序  
    (3)struct i2c\_client                   IIC（从机）设备信息  
    (4)struct i2c\_driver                  IIC（从机）设备驱动
-   调用初始化代码 **module\_init** (goodix\_ts\_init) ----> i2c\_add\_driver(&goodix\_ts\_driver) IIC驱动的注册 ----> goodix\_ts\_driver ----> of\_match\_table ----> goodix\_match\_table
-   **goodix\_ts\_probe** ()。goodix\_match\_table.compatible = "goodix,gt9xx" 与 DTSI 文件中的 compatible 一致 ,则执行 probe
    -   i**2c\_check\_functionality** (client->adapter, I2C\_FUNC\_I2C)。 IIC适配器的能力测试，如果适配器不够，则发生错误退出
    -   **gtp\_parse\_dt** (&client->dev)。 从dst设备树获取 INT 中断、RST 引脚的信息
    -   INIT\_WORK (&ts->work, goodix\_ts\_work\_func)。 初始化创建工作队列，中断触发后，事件处理放在下半部，调用队列中的goodix\_ts\_work\_func函数，计算上报坐标值
    -   **gtp\_request\_io\_port** (ts)。 向系统申请所需的io口：INT、RST
    -   **gtp\_get\_chip\_type** (ts)。 当读取到IC是CHIP\_TYPE\_GT9F类型时,才会进行初始化下载。HIP\_TYPE\_GT9F: 内部是Nor Flash,必须每次都要download.CHIP\_TYPE\_GT9: 内部是Nand Flash,除非需要更新配置文件,否则不需要每次下载.
    -   **gtp\_i2c\_test** (client)。 测试IIC通讯是否正常
    -   **gtp\_read\_version** (client, &version\_info)。 获取版本信息
    -   **gtp\_init\_panel** (ts)。 初始化tp固件参数
    -   **gtp\_esd\_switch** (client, SWITCH\_ON)。 esd防静电开启
    -   **gup\_init\_update\_proc** (ts)。 创建一条更新TP固件的线程
    -   **gtp\_request\_input\_dev** (ts)。 注册到 input 输入子系统中去
        
        > -   **input\_allocate\_device**（）：为输入设备分配相应的空间
        > -   ts->input\_dev->evbit\[0\] = BIT\_MASK(EV\_SYN) | BIT\_MASK(EV\_KEY) | BIT\_MASK(EV\_ABS) ;   申明功能：支持同步、按键、绝对坐标
        > -   **input\_set\_capability**(ts->input\_dev, EV\_KEY, touch\_key\_array\[index\])；   //如果有按键，害的申明能够处理的按键事件，这里指的是菜单键，HMOE剑和返回键
        > -   i**nput\_set\_capability**(ts->input\_dev, EV\_KEY, KEY\_POWER);    如果定义滑动唤醒，那就申明电源事件
        > -   **input\_set\_abs\_params**(ts->input\_dev, ABS\_MT\_POSITION\_X, 0, ts->abs\_x\_max, 0, 0);     多点触摸信息是以ABS\_MT承载并按一定顺序发送，如ABS\_MT\_POSITION\_X，ABS\_MT\_POSITION\_Y，然后通过调用 input\_mt\_sync() 产生一个 SYN\_MT\_REPORT event 来标记一个点的结束，并且一帧的数据报完需要 input\_sync（）；
        > -   **input\_set\_abs\_params**(ts->input\_dev, ABS\_MT\_WIDTH\_MAJOR, 0, 255, 0, 0)    触摸的方向可以由 ABS\_MT\_TOUCH\_MAJOR、ABS\_MT\_WIDTH\_MAJOR、ABS\_MT\_MT\_MAJOR 提供
        > -   **input\_set\_abs\_params**(ts->input\_dev, ABS\_MT\_TRACKING\_ID, 0, 255, 0, 0);     用来支持硬件跟踪多点信息，即该店属于哪一条线等
        > -   **input\_register\_device**(ts->input\_dev)  注册input子系统
        
    -   **gtp\_request\_irq**(ts);  //请求中断
        
        > -   **request\_irq**(ts->client->irq, goodix\_ts\_irq\_handler,irq\_table\[ts->int\_trigger\_type\], ts->client->name,  ts);   中断申请函数，指定了中断线与绑定的函数是 goodix\_ts\_irq\_handler，如果发生中断该函数就会被调用。参数1：中断线:2：中断函数，3：触发方式:4：设备名，5：私有数据。
        >     -   **queue\_work**(goodix\_wq, &ts->work);  
        >         -   **goodix\_wq**： goodix\_wq=create\_singlethread\_workqueue("goodix\_wq");  //在函数 goodix\_ts\_init中，创建工作队列和工作线程,初始化时创建线程
        >         -   **&ts->work**：NIT\_WORK(&ts->work,goodix\_ts\_work\_func);  在工作队列&ts->work中增加 goodix\_ts\_work\_func任务。也就是当中断函数触发时，执行中断函数goodix\_ts\_irq\_handler（），中断函数里面对队列调度，调用队列中的goodix\_ts\_work\_func（），坐标点的计算、上报、多点处理都在这个函数中执行。
        > -   **goodix\_ts\_timer\_handler**（）。如果资源有限或者其他因素导致申请失败，那么会采用轮询机制来处理。轮询机制是定义一个定时器来处理，hrtimer 是一种高精度定时器，定时器到期就会调用这个函数。接着调用 hrtimer\_start（）开启定时器功能。
        
    -   **init\_wr\_node**(client);     //如果创建了读写节点接口，基于这个节点的接口，方便用户层与内核通讯
    -   **epay\_pindev\_register**(&ts->pindev)；  // 注册为 PIN 输入设备
    -   **ts->tp\_power\_status = 1**;    //到这边设置为1说明全部初始化 probe成功

input 子系统：

> -   事件处理层：input event，处理核心层传输过来的数据处理成用户说理解的方式，即用 event 结构体方式呈现给用户。 
> -   核心层：为设备驱动层提供规范的接口，把设备驱动层获取得到的数据传送给事件处理层。
> -   设备驱动层：实现对硬件设备的读写访问、中断设置，把触摸的坐标信息通过调用核心层的接口传递给事件处理层。这部分就是驱动工程师所要做的内容。