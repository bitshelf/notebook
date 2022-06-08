---
tags: buildroot
---

# buildroot 显示旋转
## Weston
### 启动参数配置
启动 Weston 时命令所带参数，如 `weston --tty=2`

### weston. ini 配置文件
- 位于运行 buildroot 的 `/etc/xdg/weston/weston.ini`
- SDK 代码中位置于：`buildroot/board/rockchip/common/base/etc/xdg/weston/weston.ini`

#### 显示旋转
```ini
# /etc/xdg/weston/weston.ini
[output]
name=LVDS-1
transform=90
# normal|90|180|270|flipped|flipped-90|flipped-180|flipped-270
```

##### 动态配置屏幕方向
```shell
echo "output:all:rotate90" > /tmp/.weston_drm.conf # 所有屏幕旋转90度
echo "output:eDP-1::rotate180" > /tmp/.weston_drm.conf # eDP-1旋转180度
```
- 参考：[Weston: man/weston.ini.man | Fossies](https://fossies.org/linux/weston/man/weston.ini.man)

### 特殊边境变量
一般设置于 `/etc/init.d/S50launcher`
```shell
# /etc/init.d/S50launcher
start)
...
export WESTON_DRM_MIRROR=1 # 需设置于启动weston前
...
weston --tty=2 -B=drm-backend.so --idle-time=0&
```

----
- [Rockchip_Developer_Guide_Buildroot_Weston_CN](assets/Rockchip_Developer_Guide_Buildroot_Weston_CN.pdf)
---
![Ubuntu 显示旋转](../ubuntu/Ubuntu定制/Ubuntu%20显示旋转.md)