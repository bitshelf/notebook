---
tags: Android
---

# Android 触摸绑定
1. 查看触摸输入：`dumpsys input`
2. 查看显示设备信息：`dumpsys display`

```xml:/vendor/etc/input-port-associations.xml
<!-- Use below commands to get display port number:
# dumpsys SurfaceFlinger - -display-id
Display 4692921138614785 (HWC display 1): port=1 pnpId=DEL displayName="DELL S2740L"
Display 4693505326422272 (HWC display 0): port=0 pnpId=DEL displayName="DELL P2314T"

Use below commands to get touch input location:
# getevent -i | grep location
location: "usb-xhci-hcd.0.auto-1.1.4/input0"
location: "usb-xhci-hcd.0.auto-1.2.4/input0"

Then bind the display port and input location with below table. This table need
to modify according to actual connection.
One display can link with multi-input.
-->
<ports>
	<port display="0" input="usb-xhci-hcd.1.auto-1.1.4/input0" />
	<port display="1" input="usb-xhci-hcd.1.auto-1.2.4/input0" />
	<port display="0" input="usb-xhci-hcd.0.auto-1.1.4/input0" />
	<port display="1" input="usb-xhci-hcd.0.auto-1.2.4/input0" />
	<port display="0" input="usb-xhci-hcd.0.auto-1.4/input0" />
	<port display="1" input="usb-xhci-hcd.1.auto-1.4/input0" />
</ports>
```

# Link
- [Android Q 输入事件关联显示设备](https://blog.csdn.net/D_Music/article/details/103695232)
- [输入路由](https://source.android.com/docs/core/display/multi_display/input-routing)
- [输入设备配置文件](https://source.android.com/docs/core/input/input-device-configuration-files)
- [触摸设备](https://source.android.com/docs/core/input/touch-devices)