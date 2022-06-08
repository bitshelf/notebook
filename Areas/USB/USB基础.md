---
tags: USB
---

# USB 基础
## 编码方式
- USB 使用 NRZI 编码方式：当数据为 0 时，电平翻转；数据为 1 时，电平不翻转
- 为了防止出现过长时间电平不变化现象，在发送数据时采用位填充处理。具体过程如下：当遇见连续 6 个高电平时，就强制插入一个 0
- 经过位填充后的数据由串行接口引擎（SIE）将数据串行化和 NRZI 编码后，发送到 USB 的差分数据线上
- 接收端完成的过程和发送端刚好相反

## 软件架构
- USB 的术语中设备（Device）指的是功能（Functions）
- 集线器（Hub）由于作用特殊，按照正式的观点并不认为是 Function
- 直接连接到主机的 Hub 是根（root）Hub

## 端点(管道)
- 管道把主机控制器和被称为端点[Endpoint](https://zh.wikipedia.org/wiki/Endpoint "Endpoint")的逻辑实体连结起来
- 管道和比特流有着相同的含意，USB 词汇中术语端点经常和管道混用
### 管道分为四类
- 控制传输(Control)——一般用于短的、简单的对设备的命令和状态反馈，例如用于总线控制的 0 号管道
- 同步传输(Isochronous)——按照有保障的速度（可能但不必然是尽快地）传输，可能有数据丢失，例如实时的音频、视频
- 中断传输(Interrupt)——用于必须保证尽快反应的设备（有限延迟），例如鼠标、键盘
- 批量传输(Bulk)——使用余下的带宽大量地（但是没有对于延迟、连续性、带宽和速度的保证）传输数据，例如普通的文件传输
> [!info] USB注册
> 一旦设备（功能）通过总线的 Hub 附加到主机控制器，主机控制器就给它分配一个主机上唯一的 7 位地址。主机控制器通过投票分配流量，一般是通过轮询模式，因此没有明确向主机控制器请求之前，设备不能传输数据

## HCD (主机控制器设备 Host Controller Driver)
包含主机控制器和 HUB 的硬件为程序员提供了由硬件实现定义的接口主机控制器设备(HCD)。而实际上它在计算机上就是埠和内存映射
- 通用主机控制器接口（UHCI）：UHCI 更加依赖软件驱动，因此对 CPU 要求更高，但是自身的硬件会更廉价
- 扩展主机控制器接口(EHCI)：EHCI 只支持高速传输

## USB 封包格式
<table><caption>USB封包格式</caption><tbody><tr><th>偏移量</th><th>类型</th><th>大小</th><th>值</th></tr><tr><td>0</td><td>HeaderChksum</td><td>1</td><td>利用添加包头进行效验，不包括包头本身的校验。</td></tr><tr><td>1</td><td>HeaderSize</td><td>1</td><td>包头的大小，包括可用的字串。</td></tr><tr><td>2</td><td>Signature</td><td>2</td><td>数据值为0x1234</td></tr><tr><td>4</td><td>VendorID</td><td>2</td><td>USB提供商的ID</td></tr><tr><td>6</td><td>ProductID</td><td>2</td><td>USB产品ID</td></tr><tr><td>8</td><td>ProductVersion</td><td>1</td><td>产品版本号</td></tr><tr><td>9</td><td>FirmwareVersion</td><td>1</td><td>固件版本号</td></tr><tr><td>10</td><td>USB属性</td><td>1</td><td>USB Attribute:<p>Bit 0：如果设为1，包头包括以下三个字串：语言、制造商、产品字串；如果设为0，包头不包括任何字串。<br>Bit 2：如果设为1，设备自带电源；如果设为0，无自带电源。<br>Bit 3：如果设为1，设备可以通过总线供电；如果设为0，无法通过总线供电。<br>Bits 1 and 4—7：保留。</p></td></tr><tr><td>11</td><td>最大电力</td><td>1</td><td>设备需要的最大电力，以2mA（毫<a href="https://zh.wikipedia.org/wiki/%E5%AE%89%E5%9F%B9" title="安培">安培</a>）为单位。</td></tr><tr><td>12</td><td>设备属性</td><td>1</td><td>Device Attributes:<p>Bit 0：如果设为1，CPU运行在24 MHz；如果设为0，CPU运行在12 MHz。<br>Bit 3：如果设为1，设备的EEPROM可以支持400 MHz；如果设为0，不支持400 MHz。<br>Bits 1, 2 and 4 ... 7：保留。</p></td></tr><tr><td>13</td><td>WPageSize</td><td>1</td><td>I2C的最大写入页面大小</td></tr><tr><td>14</td><td>数据类型</td><td>1</td><td>该数值定义设备是软件EEPROM还是硬件EEPROM。0x02：硬件EEPROM<p>其它数值无效。</p></td></tr><tr><td>15</td><td>RpageSize</td><td>1</td><td>I2C最大读取页面大小。如果值为0，整个负载大小由一个I2C读取装置读取。</td></tr><tr><td>16</td><td>PayLoadSize</td><td>2</td><td>如果将EEPROM作为软件EEPROM使用，表示软件的大小；除此之外该值都是0。</td></tr><tr><td>0xxx</td><td>Language string</td><td>4</td><td>语言字串。以标准USB字串格式表示。（非必要字段）</td></tr><tr><td>0xxx</td><td>Manufacture string</td><td>...</td><td>制造商字串。以标准USB字串格式表示。（非必要字段）</td></tr><tr><td>0xxx</td><td>Product string</td><td>...</td><td>产品字串，以标准USB字串格式表示。（非必要字段）</td></tr><tr><td>0xxx</td><td>Application Code</td><td>...</td><td>表示应用代码。以标准USB字串格式表示。（非必要字段）</td></tr></tbody></table>

---
# Link
- [Site Unreachable](https://zh.wikipedia.org/wiki/USB)