---
tags: GStreamer
---

## Gstreamer 介绍
- Gstreamer是一个跨平台的多媒体框架，应用程序可以通过管道（Pipeline）的方式，将多媒体处理的各个步骤串联起来
- 每个步骤通过元素（Element）基于GObject对象系统通过插件（plugins）的方式实现，方便了各项功能的扩展
![](assets/Gstreamer%20tools.png)

## Gstreamer 概念
### Element
Element是Gstreamer中最重要的对象类型之一。一个element实现一个功能（读取文件，解码，输出等），程序需要创建多个element，并按顺序将其串联起来，构成一个完整的Pipeline

### Pad
Pad是一个element的输入/输出接口，分为src pad（生产数据）和sink pad（消费数据）两种。

两个element必须通过pad才能连接起来，pad拥有当前element能处理数据类型的能力（capabilities），会在连接时通过比较src pad和sink pad中所支持的能力，来选择最恰当的数据类型用于传输，如果element不支持，程序会直接退出。在element通过pad连接成功后，数据会从上一个element的src pad传到下一个element的sink pad然后进行处理

### Bin和Pipeline
Bin是一个容器，用于管理多个element，改变bin的状态时，bin会自动去修改所包含的element的状态，也会转发所收到的消息。如果没有bin，我们需要依次操作我们所使用的element。通过bin降低了应用的复杂度。

Pipeline继承自bin，为程序提供一个bus用于传输消息，并且对所有子element进行同步。当将Pipeline的状态设置为PLAYING时，Pipeline会在一个/多个新的线程中通过element处理数据

---
## Link
- [gst-launch-1.0](https://gstreamer.freedesktop.org/documentation/tools/gst-launch.html?gi-language=c)