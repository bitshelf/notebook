---
tags:
  - Rockchip/NPU
---
## 查看 GPU 负载
```shell
cat /sys/class/devfreq/fb000000.gpu/load 
```


## 查看 DDR 的负载
```shell
cat /sys/class/devfreq/dmc/load
```


## 查看 NPU 负载
```shell
cat /sys/kernel/debug/rknpu/load
```


## link 
- [RK3588 CPU GPU DDR NPU定频和性能模式设置\_rk3588 npu频率 scmi\_clk\_np-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/123141527?spm=1001.2014.3001.5502)