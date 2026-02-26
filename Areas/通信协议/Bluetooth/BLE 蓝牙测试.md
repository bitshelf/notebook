---
tags: bluetooth Rockchip
---

# BLE 蓝牙测试
## 瑞芯微 deviceio_release  ble 测试
### 从设备
1.  手机端安装 BLE 调试助手
2.  开发板运行
~~~shell
deviceio_test  bluetooth
~~~

4.  先输入 $1$，打开蓝牙服务
~~~shell
Please input number or help to run: 1
~~~

6.  选择 53 bt\_test\_ble\_start 开启 ble 模式
7.  BLE 调试助手描到设备以后，可以直接点击连接
    
### 主模式
1. BLE 调试助手钟开启从机模式
2.  运行 demo
3.  输入 1 打开蓝牙
4.  选择 53.  bt\_test\_ble\_start 开启 ble 模式
5.  选择 10.  bt\_test\_start\_discovery\_le,  命令：10 input 150000 
6.  选择 13.  bt\_test\_cancel\_discovery 取消扫描
7.  选择 15.  bt\_test\_display\_devices 列出扫描到的设备
8.  选择 60.  bt\_test\_ble\_client\_open
9.  选择 62.  `bt_test_ble_client_connect`，命令：62 input  xx:xx:xx:xx:xx 连接扫描到的设备