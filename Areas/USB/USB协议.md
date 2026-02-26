---
tags: USB
---

# USB 概念
* USB 是主从结构的
* 所有的 USB 传输，都是 USB 主机发起，USB 设备没有“主动”通知 USB 主机的能力
* USB 设备的 USB 内部，D-或者 D+接有 1.5K 的上拉电阻，当接入 Host 时，USB 口的 D-或 D+拉高，从硬件的角度通知 host 设备有新的设备接入

## USB 传输类型
1. 控制传输：可靠，实时。比如：USB 的设备的识别过程
2. 批量传输：可靠，没有时间的保证。比如：U 盘
3. 中断传输：可靠，实时。比如：USB 鼠标
4. 实时传输：不可靠，实时。比如：USB 摄像头

## USB 传输对象：端点
* “读 U 盘”可以细化为把 U 盘的端点 2 里的读书数据
* “写 U 盘”可以细化为写到 U 盘的端点 1
* 除端点 0 外，每一个端点只支持一个方向的数据传输
* 端点 0 用于控制传输，既能输出，也能输入

> [!info] 传输方向
> 每一个端点都有传输方向（输入 IN，输出 OUt），而都是基于 USB 主机的立场说的。
>> [!example]
>> 鼠标把数据传到 PC 机，对应的端点称为“输入端点”

# USB 总线驱动程序的作用

![[assets/USB驱动程序框架.excalidraw|100%]]

![USB主机控制器接口](USB主机控制器接口.md)

# USB 总线驱动程序的作用
1. 识别 USB 设备
	1. 分配地址，并告诉 USB 设备（set address）
	2. 发出命令获取命令描述符
2. 查找并安装对应的设备驱动程序
3. 提供 USB 读写函数

# USB 电源管理
* Linux USB 系统提供两个高级电源管理功能
	1. USB auto Suspend
		* 当 USB 主机和 USB 设备之间的 USB 通信空闲一段时间 (例如 3 秒) 时。USB 主机可以使 USB 设备自动进入待机模式。此功能称为 USB 自动待机。。
	1. USB Remote Wakeup
		* USB 远程唤醒允许待机的 USB 设备通过 USB 远程唤醒 USB 主机, 该 USB 主机也可能待机 (例如深度睡眠模式)。USB 设备执行一个活动来唤醒 USB 主机，然后 USB 主机将被远程活动唤醒。

---
# Link 
- [wikipedia USB](https://zh.wikipedia.org/wiki/USB)
- [USB-org | USB-IF](https://www.usb.org/)