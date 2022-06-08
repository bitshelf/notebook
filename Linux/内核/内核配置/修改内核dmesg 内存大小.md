---
tags: Kernel 
---

- 在 dts 的 chosen{……}内添加 log_buf_len=2 M；设置一下缓冲区的大小
```c
chosen {
     bootargs = "storagemedia=emmc androidboot.mode=normal androidboot.verifiedbootstate=orange 
     androidboot.slot_suffix= androidboot.serialno=EA4R1B8R7J  rw rootwait earlycon=uart8250,mmio32,0xff130000 
     swiotlb=1 kpti=0 console=ttyFIQ0 root=PARTUUID=614e0000-0000 rootfstype=ext4
coherent_pool=1m
     log_buf_len=2M";
 };
```