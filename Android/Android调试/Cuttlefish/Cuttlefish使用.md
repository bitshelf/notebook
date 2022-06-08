---
tags: Android 
---

## 使用加速图形模式
### GfxStream
```shell
launch_cvd --gpu_mode=gfxstream
```
### Virgl
```shell
launch_cvd --gpu_mode=drm_virgl
```
- 此模式不支持 Vulkan

## 停止
### 停止上次 `launch_cvd` 调用启动的所有设备
```shell
# Launch and interact with your devices
launch_cvd --num_devices=N --daemon
# Stop all your devices
stop_cvd
# Restart devices in their original states
launch_cvd --daemon --num_devices=N --resume=false
```

## 使用 WebRTC
```shell
launch_cvd --start_webrtc=true
```
- 添加 `--start_webrtc=true`

## 构建 CTS
```shell
source build/envsetup.sh
m -j cts WITH_DEXPREOPT_BOOT_IMG_AND_SYSTEM_SERVER_ONLY=false TARGET_PRODUCT=aosp_x86_64
```

### 运行 CTS 稳定版子集
```shell
source build/envsetup.sh
lunch aosp_cf_x86_64_phone-userdebug
cts-tradefed run cts-virtual-device-stable --no-enable-parameterized-modules --max-testcase-run-count 2 --retry-strategy RETRY_ANY_FAILURE --reboot-at-last-retry --shard-count 8
```