---
tags:
  - OpenHarmony/debug
---
## 修改打印等级
读取日志级别命令：
```
param get hilog.loggable.global
```

设置日志级别命令：
```
hilog -b W \\设置全局日志级别为Warn级别。
hilog -b D -T testTag \\设置日志Tag为"testTag"的日志级别为Debug级别。
hilog -b D -D 0x3200 \\设置日志domainID为0x3200的日志级别为Debug级别。
```

注：建议不要将全局的日志级别修改为Debug级别，系统后台D级别日志量过大，会导致日志打印时IPC通信超负荷，从而打印失败，可以通过设置本模块使用的domainID或Tag为debug级别的方式，打印出本模块的Debug日志

## Link
- [hiviewdfx\_hilog: 暂无描述](https://gitee.com/openharmony/hiviewdfx_hilog#2%E6%97%A5%E5%BF%97%E9%85%8D%E7%BD%AE)