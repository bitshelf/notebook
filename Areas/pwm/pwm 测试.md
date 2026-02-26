---
tags: PWM
---

## pwm 测试
```shell
cd /sys/class/pwm/pwmchip<N>
ehco 0 > export
echo 10000 > period
echo 5000 > duty_cycle
echo 1 > enable
```
- **npwm**：这是一个只读属性，读取该文件可以得知该 PWM 控制器下共有几路 PWM 输出
-  **export**: 0 表示一个编号，注意，每个 PWM 控制器（pwmchipX）下，使用 export 属性文件导出 PWM 时，编号都是从 0 开始
- export 文件和 unexport 文件都是只写的、没有读权限

### pwm0 目录
- **enable**：可读可写，写入"0"表示禁止 PWM；写入"1"表示使能 PWM。读取该文件获取 PWM 当前是禁止还是使能状态
- **polarity**：用于设置极性，可读可写。可能值：`normal`、`inversed`
- **period**：用于配置 PWM 周期，可读可写；写入一个字符串数字值，以 ns（纳秒）为单位
- **duty_cycle**：用于配置 PWM 的占空比，可读可写；写入一个字符串数字值，同样也是以 ns 为单位
## 查看 pwm 设备信息
```bash
cat /sys/kernel/debug/pwm
```

## Link
- [linux/pwm – Gateworks](http://trac.gateworks.com/wiki/linux/pwm)
- [PWM overview - stm32mpu](https://wiki.stmicroelectronics.cn/stm32mpu/wiki/PWM_overview)

