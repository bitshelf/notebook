---
tags:
  - OpenHarmony/hilog
---
## 开启wpa_supplicant的Hilog日志
wpa_supplicant在原始日志中包含一些敏感信息（例如MAC、SSID等），暂未直接输出到Hilog中，当前通过系统配置persist. sys. debug_on控制日志是否输出到Hilog，并在wpa_supplicant进程重启或整机重启后生效
- 开发者可以使用如下命令开启wpa_supplicant日志打印到Hilog的开关：
```shell
hdc param set persist.sys.wpa_debug_on 1
```

- 使用如下命令关闭wpa_supplicant日志打印到Hilog的开关：
```shell
hdc param set persist.sys.wpa_debug_on 0
```

### 避免日志限流、修改Hilog级别等
由于wpa_supplicant日志量较大，易被Hilog限流，因此，在维测时，可以尝试通过以下命令避免日志限流及修改Hilog级别等
```shell
hdc shell hilog -Q pidoff
hdc shell hilog -Q domainoff
hdc shell param set hilog.debug.on true
hdc shell hlog -b DEBUG
```

## Link
- [开启wpa_supplicant的Hilog日志](https://gitee.com/openharmony/third_party_wpa_supplicant/wikis/01-How-To-%E6%8C%87%E5%AF%BC/How%20to%20debug%20%E7%BB%B4%E6%B5%8B%E6%8C%87%E5%AF%BC)