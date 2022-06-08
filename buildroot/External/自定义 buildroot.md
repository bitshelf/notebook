---
tags:
  - buildroot/external
---
## 文件结构
```
/my_br2_tree/
  +-- board/
  |   +-- <company>/
  |       +-- <boardname>/
  |
  +-- configs/
  |   +-- <boardname>_defconfig
  |
  +-- Config.in
  +-- external.mk
  +-- external.desc
```
- 完整路径的 br2-external 树将被自动设置为 `BR2_EXTERNAL_$(NAME)_PATH`
- board: 修改根文件系统的配置 (overlay)，例如添加一些开机启动的 service
- configs: 保存修改了 Linux Kernel 的配置文件为 `<boardname>_defconfig`
- `external.desc`：定义使用 `Config.in` 的自定义软件包配方，以便它们可以通过 Buildroot 的 make 逻辑进行构建
```
name: DEMO
desc: Custom Project Demo
```
- `Config.in`：使用 `external.mk` 定义自定义包配方，以便它们在顶级 Buildroot 配置菜单中可见
```
source "$BR2_EXTERNAL_DEMO_PATH/package/package-1/Config.in"
source "$BR2_EXTERNAL_DEMO_PATH/package/package-2/Config.in"
```

## Link
- [buildroot customize](https://bootlin.com/~thomas/site/buildroot/customize.html)
- [linux之buildroot(4)配置项目\_buildroot 目录树外构建-CSDN博客](https://blog.csdn.net/Once_day/article/details/134773097)
- [Laird Buildroot br2-external](https://documentation.lairdconnect.com/Builds/IG60-BL654-LINUX/latest/Content/Topics/Laird%20Linux/IG60LL-README/7%20-Laird%20Buildroot%20br2-external.htm)
- [GitHub - DongshanPI/buildroot-external-dongshanpiseven: DongshanPI Seven for STM32MP157DAC.](https://github.com/DongshanPI/buildroot-external-dongshanpiseven/tree/main)
- [Buildroot使用记录 - ArnoldLu - 博客园](https://www.cnblogs.com/arnoldlu/p/17339727.html)
