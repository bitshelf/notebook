---
tags: USB 
---

## 清除缓存
```shell
echo 3 > /proc/sys/vm/drop_caches
```

### 排除文件系统影响
- 直接读写 `/dev/` 路径下的 `sd*` 分区节点

## Link 
- `RKDocs/common/usb/Rockchip_Developer_Guide_Linux_USB_Performance_Analysis_CN_V1.1.1.pdf`
