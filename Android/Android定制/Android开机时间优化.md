---
tags: Android 
---

## 启动时间判断
### uboot 启动时间
```
Adding bank: 0x100000000 - 0x200000000 (size: 0x100000000)
Adding bank: 0x2f0000000 - 0x300000000 (size: 0x10000000)
Total: 681.930 ms

Starting kernel ...
```

### Kernel 启动完成
```
[    3.487998][    T1] Freeing unused kernel memory: 1344K
[    3.515987][    T1] Run /init as init process
[    3.518634][    T1] init: init first stage started!
```

### Android 阶段
```
[   15.307001][    T1] init: Service 'bootanim' (pid 339) exited with status 0 oneshot service took 10.242000 seconds in background
[   15.307074][    T1] init: Sending signal 9 to service 'bootanim' (pid 339) process group...
```

## Link 
- [Rockchip Android平台内存优化及系统裁剪\_android系统裁剪优化\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/125345132?spm=1001.2014.3001.5502)
- [Rockchip PX30/RK3326 Android开机时间优化\_rk3326和px30的区别\_loitawu的博客-CSDN博客](https://blog.csdn.net/weixin_43245753/article/details/126198686)