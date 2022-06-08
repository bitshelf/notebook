---
tags:
  - Android/Audio
---
## 录音机 PCM  数据导出
### 权限设置
```shell
adb root 
adb shell setenforce 0
```

### 录音文件夹配置
```shell
# 创建调试录音文件，不同Android版本，路径不同，可以直接查看代码
touch /data/misc/audioserver/debug_in.pcm

# 设置文件属性
chmod 777 /data/misc/audioserver/debug_in.pcm
setprop vendor.audio.record.in 5 # 设置property 导出 5M
```

### 播放文件夹配置
```shell
# 创建播放调试文件,不同Android版本，路径不同，可以直接查看代码
touch /data/misc/audioserver/debug.pcm

# 设置文件属性
chmod 777 /data/misc/audioserver/debug.pcm
setprop vendor.audio.record.in 5 # 设置property 导出 5M
```

- 导出的音频数据是 RAW 格式的，所以导入到 Audacity 的时候，需要设置对应的格式，音频数据格式可以从下面的代码中查看