---
tags:
  - DRM
---
## drm framebuffer 查看
```shell
# 查看 framebuffer 占用情况
cat /sys/kernel/debug/dri/0/framebuffer
```
- 根据drm的设计，fb是挂在plane下的