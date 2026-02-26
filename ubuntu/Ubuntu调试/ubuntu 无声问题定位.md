---
tags:
  - Ubuntu/sound
---
## 用户空间排查命令
### pw -config
```shell
pw-config
```
检查配置文件
### alsactl info
```shell
alsactl info
```
观察声音设备
### pw-top
```shell
pw-top
```
查看音频数据播放的活动过程

## 内核空间排查
### 使用动态打印
```shell
cd /sys/kerenl/debug/dynamic_debug
echo "module snd_soc_es8326 +p" > control
echo "module snd_soc_core +p" > control
```
可以在内核启动命令行添加
```shell
dyndbg='module snd_soc_es8326 +p' loglevel=7
```

### 查看寄存器
```shell
cd /sys/kernel/debug/regmap/3-0019
cat registers
```