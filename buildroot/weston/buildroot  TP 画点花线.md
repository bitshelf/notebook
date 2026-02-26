---
tags:
  - buildroot
---
## 不启动 weston
```shell
mv /etc/init.d/*weston /root/
reboot 

# 清除 logo 显示
echo 0 | tee /sys/class/graphics/fb0/blank

# 打开画点画线
ts_test
```