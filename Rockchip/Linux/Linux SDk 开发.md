---
tags: Linux 
---
## Linux 适配
### pulseaudio 服务适配
- 绑定脚本参考：`SDK/debian/overlay/etc/pulse/*`
- 声卡配置：`SDK/debian/overlay/usr/share/alsa/ucm2/*`

### WiFi/BT 适配
- 安装包：`SDK/debian/packages/ARCH/rkwifibt/*.deb`
- 类 Debian 系统上层有完整的 WiFi/BT 应用（NetworkManager/blumeman/gnome-bluetooth）, 只需要在系统启动前把接口（`wlan0/hci0`）初始化好

### GSTreamer 适配
- RK 平台对 GStreamer 有有一些定制及 bug 修复
- RK 支持 GStreamer 通用多媒体框架，需要提前安装官方 GStreamer 组件，然后安装 gst-rockchip 插件 `SDK/debian/packages/ARCH/gst-rkmpp/*.deb`
- 源码位置：SDK/external/gstreamer-rockchip/

### RGA 适配
- RGA 作用：`2D` 图形加速，用于加速 `2D` 图形的旋转、裁剪、缩放等操作。
- RK RGA 硬件已经集成到 SOC 中
#### RGA 编译
- 源码目录：`SDK/external/linux-rga`
- `sudo apt build-dep .`
- `sudo DEB_BUILD_OPTIONS=nocheck dpkg-buildpackage -rfakeroot -b -d -us`
- 已编译好的安装包：`SDK/debian/packages/ARCH/rga/*deb`
#### RGA 验证
```shell
./rgalmDemo --copy
```

### mpp 适配
- 基本通路：APP --> gstreamer/rockcit --> mpp --> VPU
- 源码：`SDK/external/mpp`
- 安装包：`SDK/debian/packages/ARCH/mpp/*.deb`
- 适配需要更改节点权限，可以参考
```shell
SDK/debian/overlay/etc/udev/rules.d/99-rockchip-permissions.rules
```
- `99-rockchip-permissions.rules` 不只是 VPU 节点，还有配置 GPU、RGA 节点
#### mpp验证
```shell
mpi_enc_test -w 1920 -h 1080 -t 7 -o /tmp/test.h264
mpi_dec_test -w 1920 -h 1080 -t 7 -i /tmp/test.h264
```
## 性能测试
- rockchip Linux 性能测试：`docs/Linux/Profile/Rockchip_Introduction_Linux_Benchmark_KPI_EN.pdf`
- 功能模块测试：`docs/Linux/Profile/Rockchip_User_Guide_Linux_Software_Test_CN.pdf`


![[../RK buildroot开发定制]]