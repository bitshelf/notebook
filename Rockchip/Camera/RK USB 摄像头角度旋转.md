---
tags:
  - Android/Camera
---
## Android camera 预览
- 需要注意的是摄像头成像长边要跟显示屏长边平行摆放
- 默认竖屏设备前摄 orientation 要为 270，后摄为 90
- 默认横屏设备前后摄 orientation 都为0
- 可以在 xml 中修改下 orientation 
```xml
<!-- device/rockchip/common/external camera config.xml -->
<Orientation degree="0"/>
```