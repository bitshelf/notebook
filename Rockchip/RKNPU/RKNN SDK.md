---
tags:
  - Rockchip/RKNN
---
## 支持的框架
支持 PyTorch、ONNX、TensorFlow、TensorFlow Lite、Caffe、DarkNet  
等模型转为 RKNN 模型

## 开发板查看 RKNN 服务
```shell
# 查看服务是否在运行
ps -A | grep rknn

# 查看版本，要求 RKNN server 与 librknnrt 版本一致
strings /usr/bin/rknn_server | grep -i "rknn_server version"
strings /usr/lib/librknnrt.so | grep -i "librknnrt version"

# 重启 RKNN 服务
restart_rknn.sh
```

