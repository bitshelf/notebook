---
tags: bluetooth
---

## Rockchip 蓝牙测试
### DeviceIOTest
```shell
deviceio_test bluetooth
```

瑞芯微 deviceio_release  ble 测试
1.  手机端安装 BLE 调试助手
2.  运行 demo
3.  demo 输入 1 打开蓝牙
4.  选择 53 bt_test_ble_start 开启 ble 模式
5.  BLE 调试助手 描到设备以后，可以直接点击连接
设备端连接从设备，则需要在 BLE调试助手钟开启从机模式，然后
1.  运行demo
2.  输入 1 打开蓝牙 
3.  选择 53.  bt_test_ble_start 开启 ble 模式  
4. 选择 10.  bt_test_start_discovery_le,  命令：10 input 150000 
5.  选择 13.  bt_test_cancel_discovery 取消扫描
6.  选择 15.  bt_test_display_devices 列出扫描到的设备
7.  选择 60.  bt_test_ble_client_open
8.  选择 62.  bt_test_ble_client_connect，命令：62 input  xx:xx:xx:xx:xx 连接扫描到的设备


### rkwifibt_app_test
~~~shell
rkwifibt_app_test bluetooth
~~~
- source code: `rkwifibt-app/test/bt_test.c`