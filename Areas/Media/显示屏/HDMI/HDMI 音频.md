---
tags: HDMI
---

# HDMI 音频
1. 使能 HDMI 音频
 ```c
 &hdmi_sound {
	 status = "okay";
 };
```

## 异常
1. 音量太小，听不到 HDMI 喇叭的声音
2. 第一次上电有声音，重启后没有，是因为耳机音量保护的开关，音量太大，重启后直接把音量变小
```xml:frameworks/base/core/res/res/values/config.xml
<!-- frameworks/base/core/res/res/values/config.xml -->

    <!-- Whether safe headphone volume is enabled or not (country specific). -->
    <bool name="config_safe_media_volume_enabled">false</bool>
```

查看声卡的注册情况
```shell
aplay -l
# 或
cat /proc/asound/cards
```