---
tags:
  - bluetoothctl
---
## 连接手机
```shell
bluetoothctl # 进入蓝牙控制终端

# 以下命令需要在蓝牙终端执行
power on # 电源打开
system-alias FC900 # 重命名蓝牙名称
discoverable-timeout 0 # 设置永久可被发现
discoverable on # 允许被发现
pairable on # 允许配对
agent on # 启用配对代理
default-agent # 设为默认代理
```

### 低功耗蓝牙连接
```shell
scan le # bluetoothctl 菜单中运行以下命令，以便启动低功耗蓝牙 GATT 扫描
list-attributes <bt_address> # 获取远程设备的属性列表
attribute-info <attribute/UUID> # 获取属性的信息
```

#### Link
- [Qualcomm Linux 蓝牙指南](https://docs.qualcomm.com/bundle/publicresource/topics/80-70017-13SC/bluez-perform-bluetooth-low-energy-gatt-client-functions.html#bluez-perform-bluetooth-low-energy-gatt-client-functions__section_oyf_kts_lcc_navyanka_08-21-24-1425-50-130)
- [为低功耗蓝牙 GATT 功能设置设备](https://docs.qualcomm.com/bundle/publicresource/topics/80-70017-13SC/bluez-gatt.html#bluez-gatt__section_ajz_mss_lcc_navyanka_08-21-24-1419-1-422)