---
tags:
  - USB
---
## USB 四种描述符
1. 设备描述符
2. 配置描述符
3. 接口描述符
4. 端点描述符
协议中规定 USB 设备必须支持这四种描述符

### USB 设备描述符
```c:include/uapi/linux/usb/ch9.h
// include/uapi/linux/usb/ch9.h
/* USB_DT_DEVICE: Device descriptor */
struct usb_device_descriptor {
        __u8  bLength;
        __u8  bDescriptorType;

        __le16 bcdUSB;
        __u8  bDeviceClass;
        __u8  bDeviceSubClass;
        __u8  bDeviceProtocol;
        __u8  bMaxPacketSize0;
        __le16 idVendor;
        __le16 idProduct;
        __le16 bcdDevice;
        __u8  iManufacturer;
        __u8  iProduct;
        __u8  iSerialNumber;
        __u8  bNumConfigurations;
} __attribute__ ((packed));
```
### 接口描述符
```c
// include/uapi/linux/usb/ch9.h
/* USB_DT_INTERFACE: Interface descriptor */
struct usb_interface_descriptor {
        __u8  bLength;
        __u8  bDescriptorType;

        __u8  bInterfaceNumber;
        __u8  bAlternateSetting;
        __u8  bNumEndpoints;
        __u8  bInterfaceClass;
        __u8  bInterfaceSubClass;
        __u8  bInterfaceProtocol;
        __u8  iInterface;
} __attribute__ ((packed));
```
描述接口本身的信息，一个接口可以有多个设置，使用不同的设置，描述接口的信息会有所不同


## Link
- [带你遨游USB世界-CSDN博客](https://blog.csdn.net/feelabclihu/article/details/105502179)