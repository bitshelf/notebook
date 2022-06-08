---
tags: U-Boot
---

# U-Boot logo
## uboot logo
- logo 通过 Linux kernel dts(U-Boot 显示模块和 Linux kernel 复用同一个 dtb) 中对应显示接口的 route_xxx 节点控制
- uboot 显示 logo：`rockchip_show_logo`

## 更改 logo
- uboot 显示的 logo 是存放在 kernel 目录下的，在编译 kernel 时，会通过 scripts/resource_tool 工具把 BMP 文件打包进 resource. img
- 将图片文件格式转换为 BMP 格式后，替换 kernel 目录下的 logo. bmp，重新编译烧写 kernel 就可以实现 logo 的更改
### logo 要求
- logo 显示只支持 8bit，16bit，24bit、32bit 的 bmp 图片
- U-Boot logo 和 Linux Kernel logo 分辨率相同，而且分辨率必须是偶数
- U-Boot logo 和 Linux Kernel logo 必须同时开启，即 logo.bmp 和 logo_kernel.bmp 必须同时提供，不能只提供其中一个
