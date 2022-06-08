---
tags: eDP Display 
---

## eDP 强制输出
```shell
echo off > /sys/class/drm/card0-eDP-1/status
echo on > /sys/class/drm/card0-eDP-1/status
```