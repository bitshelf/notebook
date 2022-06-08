---
tags: Rockchip
---

# RK3568 Android 修改开机动画
1. 修改 device/rockchip/rk356x/BoardConfig-\<product\>. mk
~~~shell
export HAVE_BOOT_ANIMATION=true
~~~
2. 在 desc.txt 添加以下内容
~~~txt
1280 800 12
p 0 3 part2
~~~
3. 添加开机动画图片
~~~shell
part2/
└── 0000.png
~~~

4. 制作压缩文件
~~~shell
zip -0r bootanimation.zip desc.txt part2
~~~
5. 更改压缩文件权限：`chmod 755 bootanimation.zip`
6. 复制到`device/rockchip/common/bootshutdown/`目录下