---
tags: buildroot
---

# buildroot 中文手册
### 文章目录

-   [第一部分 入门](https://blog.csdn.net/haimo_free/article/details/107677695#__10)
-   -   [1\. 关于Buildroot](https://blog.csdn.net/haimo_free/article/details/107677695#1_Buildroot_11)
    -   [2\. 系统要求](https://blog.csdn.net/haimo_free/article/details/107677695#2__18)
    -   -   [2.1 强制性软件包](https://blog.csdn.net/haimo_free/article/details/107677695#21__23)
        -   [2.2 可选软件包](https://blog.csdn.net/haimo_free/article/details/107677695#22__46)
    -   [3\. 获取Buildroot](https://blog.csdn.net/haimo_free/article/details/107677695#3_Buildroot_76)
    -   [4\. Buildroot快速入门](https://blog.csdn.net/haimo_free/article/details/107677695#4_Buildroot_97)
    -   [5\. 社区资源](https://blog.csdn.net/haimo_free/article/details/107677695#5__162)
    -   -   [5.1 邮件列表](https://blog.csdn.net/haimo_free/article/details/107677695#51__167)
        -   [5.2 IRC](https://blog.csdn.net/haimo_free/article/details/107677695#52_IRC_171)
        -   [5.3 BUG跟踪](https://blog.csdn.net/haimo_free/article/details/107677695#53_BUG_175)
        -   [5.4 WIKI](https://blog.csdn.net/haimo_free/article/details/107677695#54_WIKI_178)
        -   [5.5 补丁](https://blog.csdn.net/haimo_free/article/details/107677695#55__181)
-   [第二部分 用户指南](https://blog.csdn.net/haimo_free/article/details/107677695#__188)
-   -   [6\. Buildroot配置](https://blog.csdn.net/haimo_free/article/details/107677695#6_Buildroot_189)
    -   -   [6.1 交叉编译工具链](https://blog.csdn.net/haimo_free/article/details/107677695#61__200)
        -   -   [6.1.1 内部工具链](https://blog.csdn.net/haimo_free/article/details/107677695#611__215)
            -   [6.1.2 外部工具链](https://blog.csdn.net/haimo_free/article/details/107677695#612__233)
            -   [6.1.3 使用Buildroot构建外部工具链](https://blog.csdn.net/haimo_free/article/details/107677695#613_Buildroot_255)
        -   [6.2 设备文件管理](https://blog.csdn.net/haimo_free/article/details/107677695#62__282)
        -   [6.3 初始化系统](https://blog.csdn.net/haimo_free/article/details/107677695#63__295)
    -   [7\. 其他组件的配置](https://blog.csdn.net/haimo_free/article/details/107677695#7__304)
    -   -   [7.1 BusyBox](https://blog.csdn.net/haimo_free/article/details/107677695#71_BusyBox_306)
        -   [7.2 uClibc](https://blog.csdn.net/haimo_free/article/details/107677695#72_uClibc_312)
        -   [7.3 Linux kernel](https://blog.csdn.net/haimo_free/article/details/107677695#73_Linux_kernel_314)
        -   [7.4 Barebox](https://blog.csdn.net/haimo_free/article/details/107677695#74_Barebox_320)
        -   [7.5 U-Boot](https://blog.csdn.net/haimo_free/article/details/107677695#75_UBoot_322)
    -   [8\. Buildroot的一般用法](https://blog.csdn.net/haimo_free/article/details/107677695#8_Buildroot_324)
    -   -   [8.1 make技巧](https://blog.csdn.net/haimo_free/article/details/107677695#81_make_325)
        -   [8.2 了解何时需要完全重新构建](https://blog.csdn.net/haimo_free/article/details/107677695#82__425)
        -   [8.3 了解如何重新构建软件包](https://blog.csdn.net/haimo_free/article/details/107677695#83__445)
        -   [8.4 离线构建](https://blog.csdn.net/haimo_free/article/details/107677695#84__461)
        -   [8.5 目录树外构建](https://blog.csdn.net/haimo_free/article/details/107677695#85__469)
        -   [8.7 有效处理文件系统镜像](https://blog.csdn.net/haimo_free/article/details/107677695#87__494)
        -   [8.8 软件包之间的依赖关系图](https://blog.csdn.net/haimo_free/article/details/107677695#88__509)
        -   [8.9 构建时间图表](https://blog.csdn.net/haimo_free/article/details/107677695#89__548)
        -   [8.10 软件包文件系统大小图表](https://blog.csdn.net/haimo_free/article/details/107677695#810__572)
        -   [8.11 顶层并行构建](https://blog.csdn.net/haimo_free/article/details/107677695#811__603)
        -   [8.12 与Eclipse集成](https://blog.csdn.net/haimo_free/article/details/107677695#812_Eclipse_618)
        -   [8.13 高级用法](https://blog.csdn.net/haimo_free/article/details/107677695#813__627)
        -   -   [8.13.1 在Buildroot外部使用生成的工具链](https://blog.csdn.net/haimo_free/article/details/107677695#8131_Buildroot_628)
            -   [8.13.2 在Buildroot中使用gdb](https://blog.csdn.net/haimo_free/article/details/107677695#8132_Buildrootgdb_639)
            -   [8.13.3 在Buildroot中使用ccache缓存](https://blog.csdn.net/haimo_free/article/details/107677695#8133_Buildrootccache_670)
            -   [8.13.4 软件包下载位置](https://blog.csdn.net/haimo_free/article/details/107677695#8134__695)
            -   [8.13.5 软件包make目标](https://blog.csdn.net/haimo_free/article/details/107677695#8135_make_705)
            -   [8.13.6 在开发过程中使用Buildroot](https://blog.csdn.net/haimo_free/article/details/107677695#8136_Buildroot_740)
    -   [9\. 定制项目](https://blog.csdn.net/haimo_free/article/details/107677695#9__801)
    -   -   [9.1 推荐的目录结构](https://blog.csdn.net/haimo_free/article/details/107677695#91__819)
        -   -   [9.1.1 分层定制实现](https://blog.csdn.net/haimo_free/article/details/107677695#911__865)
        -   [9.2 将定制保存在Buildroot之外](https://blog.csdn.net/haimo_free/article/details/107677695#92_Buildroot_900)
        -   -   [9.2.1 外部树布局](https://blog.csdn.net/haimo_free/article/details/107677695#921__942)
            -   -   [9.2.1.1 external.desc](https://blog.csdn.net/haimo_free/article/details/107677695#9211_externaldesc_949)
                -   [9.2.1.2 Config.in和external.mk](https://blog.csdn.net/haimo_free/article/details/107677695#9212_Configinexternalmk_970)
                -   [9.2.1.3 configs/目录](https://blog.csdn.net/haimo_free/article/details/107677695#9213_configs_992)
                -   [9.2.1.4 provides/目录](https://blog.csdn.net/haimo_free/article/details/107677695#9214_provides_997)
                -   [9.2.1.5 其他自定义格式的内容](https://blog.csdn.net/haimo_free/article/details/107677695#9215__1004)
                -   [9.2.1.6 其他Linux内核扩展](https://blog.csdn.net/haimo_free/article/details/107677695#9216_Linux_1013)
                -   [9.2.1.7 布局示例](https://blog.csdn.net/haimo_free/article/details/107677695#9217__1015)
        -   [9.3 保存Buildroot配置](https://blog.csdn.net/haimo_free/article/details/107677695#93_Buildroot_1192)
        -   [9.4 保存其他组件的配置](https://blog.csdn.net/haimo_free/article/details/107677695#94__1200)
        -   [9.5 自定义生成的目标文件系统](https://blog.csdn.net/haimo_free/article/details/107677695#95__1214)
        -   -   [9.5.1 根文件系统叠加 （BR2\_ROOTFS\_OVERLAY）](https://blog.csdn.net/haimo_free/article/details/107677695#951__BR2_ROOTFS_OVERLAY_1218)
            -   [9.5.2 构建后脚本（BR2\_ROOTFS\_POST\_BUILD\_SCRIPT）](https://blog.csdn.net/haimo_free/article/details/107677695#952_BR2_ROOTFS_POST_BUILD_SCRIPT_1224)
            -   [9.5.3 直接修改目标文件系统](https://blog.csdn.net/haimo_free/article/details/107677695#953__1241)
            -   [9.5.4 自定义目标框架（BR2\_ROOTFS\_SKELETON\_CUSTOM）](https://blog.csdn.net/haimo_free/article/details/107677695#954_BR2_ROOTFS_SKELETON_CUSTOM_1245)
            -   [9.5.5 fakeroot脚本（BR2\_ROOTFS\_POST\_FAKEROOT\_SCRIPT）](https://blog.csdn.net/haimo_free/article/details/107677695#955_fakerootBR2_ROOTFS_POST_FAKEROOT_SCRIPT_1255)
            -   [9.5.6 设置文件权限和所有者及添加自定义设备节点](https://blog.csdn.net/haimo_free/article/details/107677695#956__1265)
        -   [9.6 添加自定义用户账号](https://blog.csdn.net/haimo_free/article/details/107677695#96__1275)
        -   [9.7 创建镜像后进行自定义](https://blog.csdn.net/haimo_free/article/details/107677695#97__1281)
        -   [9.8 添加定制项目的补丁](https://blog.csdn.net/haimo_free/article/details/107677695#98__1293)
        -   [9.9 添加定制项目的软件包](https://blog.csdn.net/haimo_free/article/details/107677695#99__1310)
        -   [9.10 存储定制项目自定义配置的快速指南](https://blog.csdn.net/haimo_free/article/details/107677695#910__1333)
    -   [10\. 常见问题和故障排除](https://blog.csdn.net/haimo_free/article/details/107677695#10__1362)
    -   -   [10.1 启动网络后引导挂起……](https://blog.csdn.net/haimo_free/article/details/107677695#101__1363)
        -   [10.2 为什么目标系统上没有编译器？](https://blog.csdn.net/haimo_free/article/details/107677695#102__1374)
        -   [10.3 为何目标系统上没有开发文件？](https://blog.csdn.net/haimo_free/article/details/107677695#103__1389)
        -   [10.4 为何目标系统上没有文档？](https://blog.csdn.net/haimo_free/article/details/107677695#104__1393)
        -   [10.5 为何有些软件包在Buildroot配置菜单中不可见？](https://blog.csdn.net/haimo_free/article/details/107677695#105_Buildroot_1396)
        -   [10.6 为何不将target/目录用作chroot目录？](https://blog.csdn.net/haimo_free/article/details/107677695#106_targetchroot_1403)
        -   [10.7 为何Buildroot不生成二进制软件包（如.deb、.ipkg……）？](https://blog.csdn.net/haimo_free/article/details/107677695#107_Buildrootdebipkg_1411)
        -   [10.8 如何加快构建过程？](https://blog.csdn.net/haimo_free/article/details/107677695#108__1430)
    -   [11\. 已知问题](https://blog.csdn.net/haimo_free/article/details/107677695#11__1439)
    -   [12\. 法律声明和许可](https://blog.csdn.net/haimo_free/article/details/107677695#12__1443)
    -   -   [12.1 符合开源许可协议](https://blog.csdn.net/haimo_free/article/details/107677695#121__1444)
        -   [12.2 符合Buildroot许可协议](https://blog.csdn.net/haimo_free/article/details/107677695#122_Buildroot_1465)
        -   -   [12.2.1 软件包补丁](https://blog.csdn.net/haimo_free/article/details/107677695#1221__1471)
    -   [13\. Buildroot进阶](https://blog.csdn.net/haimo_free/article/details/107677695#13_Buildroot_1475)
    -   -   [13.1 引导生成的镜像](https://blog.csdn.net/haimo_free/article/details/107677695#131__1476)
        -   -   [13.1.1 NFS引导](https://blog.csdn.net/haimo_free/article/details/107677695#1311_NFS_1477)
        -   [13.2 引导CD](https://blog.csdn.net/haimo_free/article/details/107677695#132_CD_1489)
        -   [13.2 Chroot](https://blog.csdn.net/haimo_free/article/details/107677695#132_Chroot_1512)
-   [第三部分](https://blog.csdn.net/haimo_free/article/details/107677695#_1517)
-   -   [14\. Buildroot是如何工作的](https://blog.csdn.net/haimo_free/article/details/107677695#14_Buildroot_1518)
    -   [15\. 编码样式](https://blog.csdn.net/haimo_free/article/details/107677695#15__1538)
    -   -   [15.1 Config.in](https://blog.csdn.net/haimo_free/article/details/107677695#151_Configin_1544)
        -   [15.2 .mk](https://blog.csdn.net/haimo_free/article/details/107677695#152_mk_1564)
        -   [15.3 文档](https://blog.csdn.net/haimo_free/article/details/107677695#153__1639)
        -   [15.4 支持脚本](https://blog.csdn.net/haimo_free/article/details/107677695#154__1641)
    -   [16\. 为特定目标主板添加支持](https://blog.csdn.net/haimo_free/article/details/107677695#16__1643)
    -   [17\. 将软件包添加到Buildroot](https://blog.csdn.net/haimo_free/article/details/107677695#17_Buildroot_1653)
    -   -   [17.1 软件包目录](https://blog.csdn.net/haimo_free/article/details/107677695#171__1657)
        -   [17.2 Config配置文件](https://blog.csdn.net/haimo_free/article/details/107677695#172_Config_1661)
        -   -   [17.2.1 Config.in](https://blog.csdn.net/haimo_free/article/details/107677695#1721_Configin_1663)
            -   [17.2.2 Config.in.host](https://blog.csdn.net/haimo_free/article/details/107677695#1722_Configinhost_1691)
            -   [17.2.3 选择depends on或select](https://blog.csdn.net/haimo_free/article/details/107677695#1723_depends_onselect_1714)
            -   [17.2.4 对目标和工具链选项的依赖](https://blog.csdn.net/haimo_free/article/details/107677695#1724__1787)
            -   [17.2.5 对Linux内核的依赖](https://blog.csdn.net/haimo_free/article/details/107677695#1725_Linux_1854)
            -   [17.2.6 对udev设备管理的依赖](https://blog.csdn.net/haimo_free/article/details/107677695#1726_udev_1867)
            -   [17.2.7 对虚拟软件包的依赖](https://blog.csdn.net/haimo_free/article/details/107677695#1727__1880)
        -   [17.3 .mk文件](https://blog.csdn.net/haimo_free/article/details/107677695#173_mk_1882)
        -   [17.4 .hash文件](https://blog.csdn.net/haimo_free/article/details/107677695#174_hash_1893)
        -   [17.5 具有特定构建系统的软件包的基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#175__1954)
        -   -   [17.5.1 通用软件包教程](https://blog.csdn.net/haimo_free/article/details/107677695#1751__1956)
            -   [17.5.2 通用软件包参考](https://blog.csdn.net/haimo_free/article/details/107677695#1752__2043)
        -   [17.6 基于autotools构建系统的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#176_autotools_2188)
        -   -   [17.6.1 autotools软件包教程](https://blog.csdn.net/haimo_free/article/details/107677695#1761_autotools_2189)
            -   [17.6.2 autotools软件包参考](https://blog.csdn.net/haimo_free/article/details/107677695#1762_autotools_2222)
        -   [17.7 基于cmake的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#177_cmake_2266)
        -   -   [17.7.1 cmake软件包教程](https://blog.csdn.net/haimo_free/article/details/107677695#1771_cmake_2267)
            -   [17.7.2 cmake软件包教程](https://blog.csdn.net/haimo_free/article/details/107677695#1772_cmake_2301)
        -   [17.8 Python软件包的基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#178_Python_2340)
        -   [17.9 基于LuaRocks的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#179_LuaRocks_2341)
        -   [17.10 Perl/CPAN软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1710_PerlCPAN_2342)
        -   [17.11 虚拟软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1711__2343)
        -   -   [17.11.1 虚拟软件包教程](https://blog.csdn.net/haimo_free/article/details/107677695#17111__2347)
            -   [17.11.2 虚拟软件包的Config.in文件](https://blog.csdn.net/haimo_free/article/details/107677695#17112_Configin_2352)
            -   [17.11.3 虚拟软件包的.mk文件](https://blog.csdn.net/haimo_free/article/details/107677695#17113_mk_2365)
            -   [17.11.4 提供者的Config.in文件](https://blog.csdn.net/haimo_free/article/details/107677695#17114_Configin_2378)
            -   [17.11.5 提供者的.mk文件](https://blog.csdn.net/haimo_free/article/details/107677695#17115_mk_2401)
            -   [17.11.6 关于虚拟软件包的注意事项](https://blog.csdn.net/haimo_free/article/details/107677695#17116__2408)
            -   [17.11.7 关于依赖特定提供者的注意事件](https://blog.csdn.net/haimo_free/article/details/107677695#17117__2421)
        -   [17.12 使用kconfig作为配置文件的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1712_kconfig_2444)
        -   [17.13 基于rebar的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1713_rebar_2445)
        -   [17.14 基于Waf的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1714_Waf_2446)
        -   [17.15 基于Meson的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1715_Meson_2447)
        -   [17.16 基于Cargo的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1716_Cargo_2448)
        -   [17.17 Go软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1717_Go_2449)
        -   [17.18 基于QMake的软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1718_QMake_2450)
        -   [17.19 系统内核模块软件包基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1719__2451)
        -   -   [17.19.1 内核模块教程](https://blog.csdn.net/haimo_free/article/details/107677695#17191__2453)
            -   [17.19.2 内核模块参考](https://blog.csdn.net/haimo_free/article/details/107677695#17192__2511)
        -   [17.20 asciidoc文档的基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1720_asciidoc_2537)
        -   [17.21 Linux内核软件包专用的基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#1721_Linux_2538)
        -   -   [17.21.1 Linux内核工具](https://blog.csdn.net/haimo_free/article/details/107677695#17211_Linux_2540)
            -   [17.21.2 Linux内核扩展](https://blog.csdn.net/haimo_free/article/details/107677695#17212_Linux_2594)
        -   [17.22 各个构建步骤支持的hook操作](https://blog.csdn.net/haimo_free/article/details/107677695#1722_hook_2631)
        -   -   [17.22.1 使用POST\_RSYNC钩子](https://blog.csdn.net/haimo_free/article/details/107677695#17221_POST_RSYNC_2669)
            -   [17.22.2 目标生成钩子](https://blog.csdn.net/haimo_free/article/details/107677695#17222__2675)
        -   [17.23 Gettext集成以及与软件包的交互](https://blog.csdn.net/haimo_free/article/details/107677695#1723_Gettext_2677)
        -   [17.24 技巧和窍门](https://blog.csdn.net/haimo_free/article/details/107677695#1724__2678)
        -   -   [17.24.1 软件包名称、配置入口名称及makefile变量之间的关系](https://blog.csdn.net/haimo_free/article/details/107677695#17241_makefile_2679)
            -   [17.24.2 如何检查编码样式](https://blog.csdn.net/haimo_free/article/details/107677695#17242__2690)
            -   [17.24.3 如何测试软件包](https://blog.csdn.net/haimo_free/article/details/107677695#17243__2707)
            -   [17.24.4 如何从GitHub添加软件包](https://blog.csdn.net/haimo_free/article/details/107677695#17244_GitHub_2770)
        -   [17.25 结论](https://blog.csdn.net/haimo_free/article/details/107677695#1725__2788)
    -   [18\. 给软件包打补丁](https://blog.csdn.net/haimo_free/article/details/107677695#18__2792)
    -   [19\. 下载基础结构](https://blog.csdn.net/haimo_free/article/details/107677695#19__2794)
    -   [20\. 调试Buildroot](https://blog.csdn.net/haimo_free/article/details/107677695#20_Buildroot_2796)

Buildroot 2020.02版本用户手册于UTC时间2020-3-28 21:25:08基于git版本5f5477b0ab生成。官网链接：[https://buildroot.org/downloads/manual/manual.html](https://buildroot.org/downloads/manual/manual.html)。

Buildroot用户手册由Buildroot开发人员编写，基于GNU 通用公共许可协议版本2，有关此许可文件的全文，请参阅Buildroot源中的 COPYING文件。

版权所有©2004-2020 Buildroot开发人员。

## 第一部分 入门

## 1\. 关于Buildroot

Buildroot是一个可以使用交叉编译简单且自动化地为嵌入式系统构建完整Linux系统的工具。

为了实现这一目标，Buildroot能够为你的系统生成交叉编译工具链、根文件系统、Linux内核镜像和引导加载程序。BuildRoot可以独立地用于这些选项的任意组合（例如，你可以使用已有的交叉编译工具链，并且仅编译根文件系统）。Buildroot主要用于使用嵌入式系统的开发者。嵌入式系统通常使用的处理器不是PC上使用的常规x86处理器，他们可以是PowerPC处理器、MIPS处理器或者ARM处理器等。

Buildroot支持众多处理器及其变种，它还具有一些可用目标板的默认配置。除此之外，许多第三方项目的BSP或SDK都是基于Buildroot开发。# 欢迎使用Markdown编辑器

## 2\. 系统要求

Buildroot设计为在Linux系统上运行。

尽管Buildroot会自行构建编译所需的大多数宿主软件包，但某些标准的Linux实用程序实际已经在宿主系统安装。你将在下面找到强制性软件包和可选性软件包的概述（注意，软件包名称在Linux不同发行版之间可能有所不同）。

### 2.1 强制性软件包

-   构建工具
    -   which
    -   sed
    -   make (3.81及以上版本)
    -   binutils
    -   build-essential (仅适用于Debian系统)
    -   gcc (4.8及以上版本)
    -   g++ (4.8及以上版本)
    -   bash
    -   patch
    -   gzip
    -   bzip2
    -   perl (5.8.7及以上版本)
    -   tar
    -   cpio
    -   unzip
    -   rsync
    -   file (必须位于 /usr/bin/file)
    -   bc
-   源代码获取工具
    -   wget

### 2.2 可选软件包

-   推荐的依赖项  
    Buildroot的某些功能或实用程序，如legal-info（许可信息）或graph（图形）生成工具，具有其他依赖项。尽管对于简单构建不是必须的，但仍然强烈建议使用：
    -   python （2.7及以上版本）
-   配置界面依赖项  
    对于这些库，你需要同时安装运行时和开发包，在许多Linux发行版中，这些包是单独打包的。开发包通常具有-dev或-devel后缀。
    -   ncurses5 用于memuconfig交互界面
    -   qt5 用于xconfig交互界面
    -   glib2、gtk2、glade2 用于gconfig交互界面
-   源代码获取工具  
    在官方的构建树中，大多数软件包的源码都是使用wget从ftp、http或https下载，一些软件包仅可通过版本控制系统获取。此外，Buildroot能够通过其他工具，如rsync或scp下载源码（参见第19章“下载基础设施“详情）。如果你使用以下方法中的任意一种，你就需要在宿主系统上安装对应的工具。
    -   bazaar
    -   cvs
    -   git
    -   mercurial
    -   rsync
    -   scp
    -   subversion
-   与Java相关的软件包，如果需要为目标系统构建Java应用程序
    -   javac
    -   jar
-   文档生成工具
    -   asciidoc 8.6.3及以上版本
    -   w3m
    -   python（带argparse模块） 2.7+和3.2+版本自带
    -   dblatex 仅适用于pdf手册
-   图生成工具
    -   graphviz graph-depends 和 -graph-depends使用
    -   python-matplotlib 用于graph-build

## 3\. 获取Buildroot

Buildroot每隔三个月发布一次版本，即2月、5月、8月和11月各发布一次。版本号格式YYYY.MM，例如2019.02、2019.08等。

发行版本压缩包可从http://buildroot.org/downloads下载。

方便起见，Buildroot源代码 support/misc/Vagrantfile 目录下提供了一个Vagrantfile，可以用于快速设置具有所需依赖的虚拟机。

如果想在Linux或MacOS上设置隔离的Buildroot环境，在终端上运行以下命令：

```
curl -O https://buildroot.org/downloads/Vagrantfile; vagrant up
```

如果你使用的是Windows系统，在终端上运行以下命令：

```
(new-object System.Net.WebClient).DownloadFile(
"https://buildroot.org/downloads/Vagrantfile","Vagrantfile");
vagrant up
```

如果用于开发，可以使用每日快照或使用git克隆仓库。有关更多详细信息，请参阅Buildroot网站的“ 下载”页面。

## 4\. Buildroot快速入门

_注意：必须使用普通用户权限构建系统，Buildroot中没有任何需要root权限的地方。使用普通用户权限执行所有命令，可以保护你的系统防止软件包配置错误导致的编译和安装问题。_

使用Buildroot的第一步是先创建配置文件，Buildroot提供了一个类似Linux内核或Busybox的配置工具。

在Buildroot根目录执行：

```
$ make *config
```

对于基于原始curses的配置，使用：

```
$ make menuconfig
```

对于基于新版curses的配置，使用：

```
$ make nconfig
```

对于基于QT的配置，使用：

```
$ make xconfig
```

对于基于GTK的配置，使用：

```
$ make gconfig
```

所有这些make命令都需要构建一个配置实用工具（包括交互界面），因此需要根据使用的配置工具安装“开发”包。有关详细信息，请参阅第2章“系统要求”，特别是你喜欢的配置工具交互界面的可选依赖项。

对于配置工具中的每个菜单项，你可以找到描述该菜单项用途的有关帮助。有关某些特定配置项的详细信息，请参阅第6章“Buildroot配置”。

配置好所有内容后，配置工具将生成包含整个配置的.config文件，顶层Makefile将读取该文件。

要启动构建过程，只需运行：

```
$ make
```

默认情况下，Buildroot不支持顶层并行构建，因此没必要运行make -jN。但是Buildroot提供了并行构建的实验性支持，参阅第8.11节“顶层并行构建”。

make命令通常会执行以下步骤：

-   下载源代码文件（如果需要）
-   配置、构建、安装交叉编译工具链，或仅导入外部工具链
-   配置、构建、安装选择的目标软件包
-   构建内核镜像（如果选中）
-   构建引导程序镜像（如果选中）
-   以所选格式生成根文件系统

Buildroot的输出保存在output/目录中，该目录包含多个子目录：

-   images/ 存储所有镜像（内核镜像、引导程序镜像和根文件系统镜像）的位置，这些是你需要放置到目标系统上的文件。
-   build/ 所有组件构建的位置（包含宿主系统需要的工具和目标系统所需的软件包），每个组件都会生成一个子目录。
-   host/ 包含为宿主系统构建的工具和目标工具链的sysroot。前者是宿主系统能正确执行Buildroot所需构建的工具，包括交叉编译工具链。后者是类似根文件系统目录结构的目录，它包含编译和安装其他软件包所需的所有用户空间的头文件和库。但是，此目录并不是根文件系统，它包含许多开发文件、未strip的二进制文件和库，这些文件对于嵌入式系统来说太大。这些开发文件用于编译依赖于其他库的目标系统的库和应用程序。
-   staging/ 是host/sysroot目录的软链，目的是为了向后兼容。
-   target/ 包含目标几乎完整的根文件系统，除了/dev/目录中的设备文件之外所有需要的文件都存在（Buildroot无法创建它们，因为Buildroot不以root权限运行，而且也不想以root权限运行）。此外，它没有正确的权限（例如为Busybox二进制文件setuid）。因此，此目录不应用于目标系统。相反，你应该使用/images目录中的镜像。如果你需要提取根文件系统以支持通过NFS启动，请使用images/中生成的tarball镜像，并以root权限提取。与staging/目录相比，target/目录仅包含运行目标系统应用程序所需的文件和库，开发文件（头文件等）并不存在，且二进制文件剥离了符号信息和调试信息。

make menuconfig | nconfig | gconfig | xconfig 和make，是允许你轻松、快速生成适合你的目标系统镜像的基本命令。有关“make”命令用法的更多详细信息，请参阅第8.1节“make提示”。

## 5\. 社区资源

与其他开源项目一样，Buildroot在社区内外共享信息的方式也不同。

如果你正在寻求帮助、想了解Buildroot，或者想为项目做出贡献，则下面每种方法都可能让你感兴趣。

-   ### 5.1 邮件列表
    

Buildroot有一个用于讨论和开发的[邮件列表](http://lists.buildroot.org/mailman/listinfo/buildroot)，它是Buildroot用户和开发人员的主要交流方法。只有订阅Buildroot邮件列表的人员才能发送邮件到此列表，你可以通过邮件列表页订阅。发送到邮件列表的邮件会在邮件列表中存档，并通过Gmane获得。请在提问前搜索邮件列表存档，因为以前其他人可能问过同样的问题。

-   ### 5.2 IRC
    

Buildroot的IRC渠道#buildroot保存在 [Freenode](http://webchat.freenode.net/)上，这是快速问答或讨论某些主体的好地方。在IRC上寻求帮助时，请使用代码共享网站（如[http://code.bulix.org](http://code.bulix.org/)）共享代码。请注意，对于某些问题，发布到邮件列表可能更好，因为它可以覆盖更多的人群，无论是开发人员还是用户。

-   ### 5.3 BUG跟踪
    

Buildroot中的Bug可以通过邮件列表或Buildroot错误追踪器进行报告。在创建Bug之前，请参阅第21.6节“报告问题/错误或获取帮助”。

-   ### 5.4 WIKI
    

Buildroot的wiki托管在[eLinux](http://elinux.org/)上。它含有一些有用的链接，包括过去或即将发生的事件，以及TODO列表。

-   ### 5.5 补丁
    

Patchwork是一个基于Web的补丁程序跟踪系统，旨在促进对开源项目的贡献和管理。发送到邮件列表的补丁程序将被系统捕获，并显示在网页上。任何补丁程序的说明也会追加到补丁程序页面。有关补丁的详细信息，请参阅[http://jk.ozlabs.org/projects/patchwork](http://jk.ozlabs.org/projects/patchwork)。

Buildroot的补丁网站主要用于Buildroot的维护者以确保不会错误应用补丁程序。它也被Buildroot的补丁程序审阅者使用（另请参阅第21.3.1节“应用补丁程序”）。由于网站在Web界面中公开了补丁程序及其相应的评论，因此对所有Buildroot开发人员都很有用。

Buildroot的补丁管理入口在[http://patchwork.buildroot.org/](http://patchwork.buildroot.org/)。

## 第二部分 用户指南

## 6\. Buildroot配置

make \*config的所有配置项都有说明文本提供了有关该选项的详细信息。

make \*config还提供了一个搜索工具。阅读不同的前端菜单中的帮助信息以了解如何使用它：

-   menuconfig 通过按/调用搜索工具
-   xconfig 通过按Ctrl+F调用搜索工具

搜索结果会显示匹配项的帮助信息。在menuconfig中，左侧栏的数字提供了相应配置项的快捷键，只要按下该数字键即可跳转到该配置项，或者由于缺少依赖项而跳转到包含该配置项的上一级菜单。

虽然菜单结构和帮助文本很容易理解，但仍有许多主题需要额外的说明，这些内容很难在帮助文本中介绍，因此在以下各节中介绍。

### 6.1 交叉编译工具链

编译工具链是一套为系统编译代码的工具。它由一个编译器（在我们的情况下是gcc）、二进制汇编和链接程序（在我们的情况下是binutils）和一个C标准库（例如GNU libc、uClibc-ng）组成。

一般宿主机安装的系统已经具有编译工具链，可以使用该编译工具链来编译能在宿主系统上运行的应用程序。如果使用的是PC，那么该编译工具链将在x86处理器上运行并为x86处理器生成代码。在大多数Linux系统上，编译工具链使用GNU libc（glibc）作为C标准库。该编译工具链称为“宿主机编译工具链”，其运行依赖的系统称为“宿主系统”。

宿主机编译工具链由Linux发行版提供，与Buildroot无关（除了使用它来构建交叉编译工具链和其他运行在宿主机上的工具之外）。

如前所述，宿主系统的编译工具链可在其上运行，并为宿主系统的处理器生成代码。由于嵌入式系统具有不同的处理器，因此需要交叉编译工具链——运行在宿主系统但为目标系统和目标处理器生成代码的编译工具链。例如，宿主系统使用x86，目标系统使用ARM，那么宿主机上的常规编译工具链在x86上运行并为x86生成代码，而交叉编译工具链在x86上运行但为ARM生成代码。

Buildroot为交叉编译工具链提供了两种解决方案：

-   内部工具链，配置界面中称之为 Buildroot toolchain
-   外部工具链，配置界面中称之为 External toolchain

在Toolchain菜单中使用Toolchain Type选项在两种解决方案之间选择。选择任一种解决方案后，将出现许多配置选项，以下各节将详细介绍这些选项。

#### 6.1.1 内部工具链

内部工具链是Buildroot在为目标嵌入式系统构建用户空间应用程序和库之前自己构建的一个交叉编译工具链。  
该交叉编译工具链支持多个C库：uClibc、glibc和musl。

选择内部工具链后，将出现许多选项，重要的有：

-   修改用于构建工具链的Linux内核版本。这个选项需要一些解释。C库会在构建交叉编译工具链的过程中构建，该库提供了用户空间应用程序和Linux内核之间交互的接口。为了知道如何与Linux内核“对话”，C库需要引用Linux内核头文件（即来自Linux内核的.h文件），这些头文件定义了用户空间和内核之间的接口（系统调用、数据结构等）。由于此接口是向后兼容的，因此用于构建工具链的Linux内核头文件版本不需要完全匹配你打算在嵌入式系统上运行的Linux内核版本，只需要具有与要运行的Linux内核相同或更低的版本即可。如果你使用的Linux内核头文件版本比嵌入式系统上运行的Linux内核版本更新，则C库可能使用Linux内核未提供的接口。
-   修改gcc、binutils和C库的版本。
-   选择工具链其他选项（仅uClibc）：工具链是否拥有RPC支持（主要用于NFS）、宽字符支持、语言环境支持（用于国际化）、C++支持、线程支持。根据你选择的选项，在Buildroot菜单中可见的用户空间应用程序和库的数量将发生变化：许多应用程序和库需要启用某些工具链选项。当需要某个工具链选项才能选择某个软件包时，大多数软件包都会显示注释说明。如果需要，你可以通过运行make uclibc-menuconfig进一步优化uClibc配置。需要注意的是，Buildroot中的所有软件包都已针对默认的uClibc选项进行了测试。如果你删除了uClibc的某项配置，某些包可能不能编译。

值得注意的是，无论何时修改了这些选项，都必须重新构建整个工具链和系统。请参阅第8.2节“了解何时需要重新构建”。

该工具链的优点：

-   与Buildroot良好集成
-   快速，只构建必需的内容

该工具链的缺点：

-   执行make clean后需要重新构建工具链，耗费时间。如果你想减少构建时间，请考虑使用外部工具链。

#### 6.1.2 外部工具链

外部工具链允许使用现有的已构建的交叉编译工具链。Buildroot知道许多著名的交叉编译工具链（来自Linaro的ARM，Sourcery CodeBench的ARM、x86-64、PowerPC和MIPS），并且能够自动下载它们。或者指向自定义的工具链，即可以动态下载也可以本地安装。

有三种使用外部工具链的解决方案：

-   使用预定义的外部工具链配置文件，并让Buildroot下载、提取并安装工具链。Buildroot已经知道一些CodeSourcery和Linaro的工具链，只需在Toolchain里选择即可。这绝对是最简单的解决方案。
-   使用预定义的外部工具链配置文件，但不是让Buildroot下载并提取工具链，而是告诉Buildroot你的工具链在系统上的安装位置。只需在Toolchain里选择，不要勾选Download toolchain automatically，并将Toolchain Path指向你的工具链的安装位置。
-   使用完全自定义的外部工具链。这对于使用crosstool-NG生成的工具链特别有用。为此，在Toolchain里选择Custom toolchain，并填写Toolchain path、Toolchain prefix和External toolchain C library选项。之后，你必须告诉Buildroot你的外部工具链支持哪些特性。如果你的工具链使用glibc库，则只需告诉Buildroot你的工具链是否支持C++，以及是否具有内置RPC支持。如果你的外部工具链使用uClibc库，那么你必须告诉Buildroot它是否支持RPC、宽字符、本地化、程序调用、线程和C++。在执行开始时，Buildroot会告诉你所选的选项是否与工具链配置不匹配。

Buildroot的外部工具链支持已经过CodeSourcery和Linaro工具链的测试，以及corsstool-NG生成的工具链和Buildroot生成的工具链的测试。通常，所有支持sysroot功能的工具链都可以工作，如果没有，请立即与开发人员联系。

Buildroot不支持OpenEmbeded或Yocto生成的工具链或SDK，因为这些工具链不是纯工具链（纯工具链只有gcc、binutils和C/C++库），这些工具链包含大量预编译的库和程序。因此Buildroot无法导入工具链的sysroot，因为它含有数百兆预编译的库。  
我们也不支持使用发行版中的工具链（例如，宿主系统安装的gcc/binutils/C库）作为目标系统的工具链。这是因为发行版的工具链不是纯工具链（发行版的工具链仅包含C/C++库），因此我们无法将其正确导入到Buildroot构建环境中。因此，即使正在为x86或x86-64目标构建系统，也必须使用Buildroot或crosstool-NG生成的交叉编译工具链。

如果你想为项目生成自定义工具链（可用于Buildroot的外部工具链），Buildroot开发人员的建议是使用Buildroot进行构建，详情请参阅第6.1.3节“使用Buildroot构建外部工具链”。

外部工具链优点：

-   允许使用众所周知且经过良好测试的交叉编译工具链。
-   节省构建交叉编译工具链的时间，这在嵌入式Linux系统的总体构建时间中通常非常重要。

缺点：

-   如果预构建的外部工具链存在BUG，那么除非使用的是Buildroot或crosstool-NG自己构建的外部工具链，否则可能很难从工具链供应商处获得帮助。

#### 6.1.3 使用Buildroot构建外部工具链

Buildroot内部工具链选项可以用于创建外部工具链。以下是构建内部工具链并将其打包以供Buildroot自身（或其他项目）重用的步骤。

-   为目标CPU体系结构选择适当的目标选项
-   Toolchain菜单，保留Buildroot toolchain里Toolchain type的默认选项，并根据需要配置工具链
-   System configuration菜单里，Init system选择None，/bin/sh选择None
-   Target packages菜单，禁用Busybox
-   Filesystem images菜单，禁用tar the root filesystem

然后，我们开始构建，并要求Buildroot生成SDK。这将方便的生成一个包含工具链的压缩包：

```
make sdk
```

这将在$(output)/images路径下生成SDK压缩包，命名类似于arm-buildroot-linux-uclibcgnueabi\_sdk-buildroot.tar.gz。这就是可以在Buildroot中重复使用的外部编译-工具链。

在其他Buildroot项目的Toolchain菜单中：

-   Toolchain Type设置为External toolchain
-   Custom toolchain设置为Toolchain
-   Toolchain to be downloaded and installed设置为Toolchain origin
-   Toolchain URL设置为file:///path/to/your/sdk/tarball.tar.gz

使用外部工具链时，Buildroot会生成包装程序，该程序将适当的选项（根据配置）透明地传递给外部编译工具链。如果你需要调试此包装程序以检查传递的参数是否正确，可以将环境变量BR2\_DEBUG\_WRAPPER设置为以下值：

-   0，为空或未设置：不调试
-   1：在一行上跟踪所有参数
-   2：每行跟踪一个参数

### 6.2 设备文件管理

在Linux系统上，/dev目录包含设备文件，这些文件允许用户空间的应用程序访问Linux内核管理的硬件设备。没有这些设备文件，即使Linux内核正确识别了硬件设备，用户空间的应用程序也无法使用它们。

在System configuration - /dev manament，Buildroot提供了四种不同的解决方案来处理/dev目录：

-   第一种解决方案是使用静态设备表。这是旧版Linux系统处理设备文件的经典方法。使用这种方法，设备文件会永久存储在根文件系统中（即系统重新引导后它们仍然存在），并且当从系统中添加或删除设备时不会自动创建或删除这些文件。因此，Buildroot使用设备表创建了一组标准的设备文件，默认存储在Buildroot源码的system/device\_table\_dev.txt中。当Buildroot生成最终的根文件系统时将处理该文件，因此，设备文件在output/target目录中不可见。BR2\_ROOTFS\_STATIC\_DEVICE\_TABLE选项允许更改Buildroot使用的默认设备表，或者添加其他设备表，以便Buildroot在构建过程中创建其他设备文件。因此，如果使用这种方法，并且系统中缺少设备文件，则可以创建一个设备表文件，例如board///device\_table\_dev.txt，其中包含新增的设备文件的描述，然后设置BR2\_ROOTFS\_STATIC\_DEVICE\_TABLE为 system/device\_table\_dev.txt board///device\_table\_dev.txt。有关设备表文件格式的更多详细信息，请参阅第23章“Makedev语法文档”。
-   第二种解决方式是仅使用devtmpfs动态处理。devtmpfs是Linux内核的一个虚拟文件，在2.6.32版本中引入（如果使用较旧的内核，则不能适用此选项）。挂载/dev目录后，当从系统中添加或删除设备时，该虚拟文件系统将自动使设备文件显示或消失。该文件系统在重启后不会持久存储，它由内核动态生成并填充。使用devtmpfs需要启用以下内核配置选项：CONFIG\_DEVTMPFS和CONFIG\_DEVTMPFS\_MOUNT。当使用Buildroot为嵌入式设备构建Linux内核时，请确保启用了这两个选项。如果是在Buildroot之外构建Linux内核，则需要自行启用这两个选项（如果不启用，Buildroot系统将无法启动）。
-   第三种解决方案是使用动态devtmpfs+mdev。此方法也需依赖devtmpfs虚拟文件系统（因此CONFIG\_DEVTMPFS和CONFIG\_DEVTMPFS\_MOUNT仍然需要在内核上启用），但是在它上面增加了mdev用户空间程序。mdev是Busybox的一部分，内核每次添加或移除设备时都会被调用。由于/dev/mdev.conf配置文件的存在，mdev可以配置为例如对设备文件设置特定的权限或所有权、在设备出现或消失时调用脚本或应用程序等。基本上，它允许用户空间对设备添加和移除事件做出反应，例如mdev可用于在设备出现在系统上时自动加载内核模块。如果你的设备需要固件，它将负责将固件内容推送给内核。mdev是udev的轻量级实现（功能较少），有关mdev及其配置文件语法的更多详细信息，请参阅[http://git.busybox.net/busybox/tree/docs/mdev.txt](http://git.busybox.net/busybox/tree/docs/mdev.txt)。
-   第四种解决方案是使用动态devtmpfs+eudev。此方法也需依赖devtmpfs虚拟文件系统，但在其上面添加了eudev用户空间守护程序。eudev是一个后台运行的守护程序，当系统添加或移除设备时，内核会调用该守护程序。与mdev相比，它是更重量级的解决方案，但具有更高的灵活性。eudev是udev的一个独立版本，是大多数桌面Linux发行版中使用的原始用户空间守护程序，该守护程序现在是Systemd的一部分。有关更多详细信息，请参阅[http://en.wikipedia.org/wiki/Udev](http://en.wikipedia.org/wiki/Udev)。

Buildroot开发人员的建议是一开始仅使用动态devtmpfs的解决方案，直到需要在添加或移除设备时或需要固件时通知用户空间，在这种情况下，通常使用动态devtmpfs+mdev是一个比较好的解决方案。

请注意，如果init系统选择systemd，那么/dev管理将由systemd的udev程序提供。

### 6.3 初始化系统

init程序是由内核启动的第一个用户空间程序（PID为1），负责启动用户空间服务和程序（如Web服务、图形应用程序、其他网络服务等）。

Buildroot允许使用三种不同的初始化系统，可以在System configuation - Init System选择：

-   第一种解决方案是使用BusyBox。在许多程序中，BusyBox都有一个基本的init程序，对于大多数嵌入式系统而言这已经足够了。启用BR2\_INIT\_BUSYBOX选项将确保BusyBox会生成并安装器init程序，这是Buildroot的默认解决方案。BusyBox的init程序将在引导启动时读取/etc/inittab文件以了解需要做什么。可以在[http://git.busybox.net/busybox/tree/examples/inittab](http://git.busybox.net/busybox/tree/examples/inittab)找到该文件的语法（请注意，BusyBox的inittab语法很特殊，请勿使用网上随意找到的inittab文档来了解BusyBox的inittab语法）。Buildroot的默认inittab保存在system/skeleton/etc/inittab。除了挂载一些重要的文件系统外，默认inittab的主要工作是启动/etc/init.d/rcS脚本，并启动getty程序（提供登录提示）。
-   第二种解决方案是systemV。该方案使用旧的传统的sysvinit程序，该程序被Buildroot打包放在package/sysvinit目录。这是大多数桌面Linux发行版中使用的解决方案，直到他们切换到更新的替代版本为止（如Upstart或者Systemd）。sysvinit也需要inittab文件（语法与BusyBox中的语法略有不同）。使用此解决方案的默认inittab保存在package/sysvinit/inittab。
-   第三种方案是使用systemd。systemd是用于Linux的新一代init系统。它的功能远不止传统init程序提供的功能：强大的并行化功能，使用Socket套接字和D-Bus激活来启动服务，按需启动守护程序，使用Linux控制组跟踪进程，支持快照和恢复系统状态等。systemd在相对复杂的嵌入式系统上很有用，例如需要D-Bus和服务相互通信的系统。需要注意的是，systemd引入了大量的大型依赖项：dbus、udev等等。有关systemd的更多详细信息，请参阅[http://www.freedesktop.org/wiki/Software/systemd](http://www.freedesktop.org/wiki/Software/systemd)。

Buildroot开发人员推荐的解决方案是使用BusyBox初始化程序，对于大多数嵌入式系统已经足够了。systemd可以用于更复杂的场景。

## 7\. 其他组件的配置

在尝试修改下面的任何组件之前，请确保已经配置了Buildroot本身，并启用了相应的软件包。

### 7.1 BusyBox

如果已经有BusyBox的配置文件，可以在Buildroot中使用BR2\_PACKAGE\_BUSYBOX\_CONFIG直接指定此文件。否则Buildroot将使用默认的配置。

要对配置进行修改，请使用meke busybox-menuconfig打开BusyBox的配置编辑器。

也可以通过环境变量指定BusyBox的配置文件，尽管不建议这么做。有关更多详细信息，请参阅第8.6节“环境变量”。

### 7.2 uClibc

uClibc的配置与BusyBox的配置相同。使用BR2\_UCLIBC\_CONFIG指定配置文件，后续的更改命令为make uclibc-menuconfig。

### 7.3 Linux kernel

如果已经有内核配置文件，可以在Buildroot中使用BR2\_LINUX\_KERNEL\_USE\_CUSTOM\_CONFIG直接指定此文件。

如果还没有内核配置文件，可以使用BR2\_LINUX\_KERNEL\_USE\_DEFCONFIG指向Buildroot的默认配置，也可以使用BR2\_LINUX\_KERNEL\_USE\_CUSTOM\_CONFIG创建空文件并将其指定为自定义配置文件。

后续要对配置进行修改，请使用make linux-menuconfig打开Linux内核配置编辑器。

### 7.4 Barebox

Barebox的配置与Linux内核的配置相同，相应的配置变量为BR2\_TARGET\_BAREBOX\_USE\_CUSTOM\_CONFIG和BR2\_TARGET\_BAREBOX\_USE\_DEFCONFIG。要打开配置编辑器，请使用make barebox-menuconfig命令。

### 7.5 U-Boot

U-Boot（2015.04及以上版本）的配置与Linux内核的配置相同，相应的配置变量为BR2\_TARGET\_UBOOT\_USE\_CUSTOM\_CONFIG和 BR2\_TARGET\_UBOOT\_USE\_DEFCONFIG。要打开配置编辑器，请使用make uboot-menuconfig命令。

## 8\. Buildroot的一般用法

### 8.1 make技巧

这是一系列技巧，可以帮助你充分利用Buildroot。

**显示make执行的所有命令：**

```
make V=1 <target>
```

**显示所有带默认配置的目标板列表：**

```
make list-defconfigs
```

**显示所有有效目标：**

```
make help
```

并非所有目标都始终可用，.config文件中的某些配置会隐藏某些目标：

-   busybox-menuconfig 仅在BusyBox启用时有效
-   linux-menuconfig和linux-savedefconfig 仅在Linux启用时有效
-   uclibc-menuconfig 仅在选择uClibc C库时有效
-   barebox-menuconfig和barebox-savedefconfig 仅在Barebox引导加载程序启用时有效
-   uboot-menuconfig和uboot-savedefconfig 仅在U-Boot引导加载程序启用时有效

**清理：** 当CPU体系架构或工具链配置选项更改时，都需要显式清理。要删除所有构建产物（包括output/build/、output/host、output/staging和output/target/等目录及系统镜像和工具链等）：

```
make clean
```

**生成用户手册：** 用户手册源文档位于docs/manual目录，生成的手册位于output/docs/manual。

```
make manual-clean
make manual
```

_注意，生成文档需要某些工具（参阅第2.2节“可选软件包”）。_

**重置Buildroot：** 删除所有构建产物，包括配置文件：

```
make distclean
```

_注意，如果启用缓存，运行make clean或make distclean不会清空该缓存。要删除它，请参阅第8.13.3节“在Buildroot中使用缓存”。_

**转储内部make变量：** 可以转储已知的make变量，以及值。

```
 $ make -s printvars VARS='VARIABLE1 VARIABLE2'
 VARIABLE1=value_of_variable
 VARIABLE2=value_of_variable
```

可以使用一些变量来调整输出：

-   VARS 仅输出与make-patterns匹配的变量，必须设置此变量，否则不打印任何内容
-   QUOTED\_VARS 如果设置为YES，输出的变量值将加上单引号
-   RAW\_VARS 如果设置为YES，将打印未扩展的值

示例：

```
$ make -s printvars VARS=BUSYBOX_%DEPENDENCIES
 BUSYBOX_DEPENDENCIES=skeleton toolchain
 BUSYBOX_FINAL_ALL_DEPENDENCIES=skeleton toolchain
 BUSYBOX_FINAL_DEPENDENCIES=skeleton toolchain
 BUSYBOX_FINAL_PATCH_DEPENDENCIES=
 BUSYBOX_RDEPENDENCIES=ncurses util-linux
```

```
$ make -s printvars VARS=BUSYBOX_%DEPENDENCIES QUOTED_VARS=YES
 BUSYBOX_DEPENDENCIES='skeleton toolchain'
 BUSYBOX_FINAL_ALL_DEPENDENCIES='skeleton toolchain'
 BUSYBOX_FINAL_DEPENDENCIES='skeleton toolchain'
 BUSYBOX_FINAL_PATCH_DEPENDENCIES=''
 BUSYBOX_RDEPENDENCIES='ncurses util-linux'
```

```
$ make -s printvars VARS=BUSYBOX_%DEPENDENCIES RAW_VARS=YES
 BUSYBOX_DEPENDENCIES=skeleton toolchain
 BUSYBOX_FINAL_ALL_DEPENDENCIES=$(sort $(BUSYBOX_FINAL_DEPENDENCIES) $(BUSYBOX_FINAL_PATCH_DEPENDENCIES))
 BUSYBOX_FINAL_DEPENDENCIES=$(sort $(BUSYBOX_DEPENDENCIES))
 BUSYBOX_FINAL_PATCH_DEPENDENCIES=$(sort $(BUSYBOX_PATCH_DEPENDENCIES))
 BUSYBOX_RDEPENDENCIES=ncurses util-linux
```

输出的带引号的变量可以在shell脚本中使用，例如：

```
$ eval $(make -s printvars VARS=BUSYBOX_DEPENDENCIES QUOTED_VARS=YES)
 $ echo $BUSYBOX_DEPENDENCIES
 skeleton toolchain
```

### 8.2 了解何时需要完全重新构建

当通过meke menuconfig、make xconfig或其他配置工具修改系统配置时，Buildroot不会尝试去检测系统的哪些部分需要重新构建。在某些情况下，Buildroot应该重新构建整个系统，在某些情况下，仅需重新构建某个软件包的特定子集。但是，完全可靠的检测到这些非常困难，因此Buildroot开发人员决定不尝试这么做。

相反，用户有责任知道何时需要完全重建。这里有一些经验可以帮助你了解如何使用Buildroot：

-   当目标体系结构配置改变时，需要完全重建。例如，更改CPU体系结构、二进制格式或浮点数策略会对整个系统产生影响。
-   当更改编译工具链配置时，通常需要完全重建。更改工具链配置通常涉及更改编译器版本、C库类型及其配置，或者其他一些基本配置项，这些更改会影响整个系统。
-   添加软件包到配置中时，不一定需要完全重建。Buildroot会检测到从未构建过该软件包，并对其进行构建。但是，如果此软件包是其他已构建的软件包的可选择性使用的依赖项时，Buildroot不会自动重新构建它们。如果你知道需要重建哪些软件包，那么可以手动重建它们，否则你需要进行完全重建。假设，你使用ctorrent包构建了一个系统，但是没有openssl库。你的系统可以运行，但是你意识到希望ctorrent支持SSL，因此你在Buildroot中勾选了openssl并重新开始构建。Buildroot将检测到openssl应该构建并构建它，但是它不会检测到ctorrent应该重新构建以支持openssl。你需要完全重新构建，或者仅重新构建ctorrent。
-   从配置中删除软件包时，Buildroot不会执行任何特殊操作。它不会从根文件系统或工具链sysroot中删除该软件包安装的文件。若要摆脱该软件包需要完全重建才行。但是，通常你不必立即删除该软件包，可以等到休息时再完全重建。  
    更改软件包的选项时，该软件包不会自动重建。进行此类更改后，通常仅重建该软件包就足够了，除非启用的选项会向该软件包添加一些功能，而这些功能对于已构建的另一个软件包很有用。同样，Buildroot不会跟踪何时应该重建软件包，一旦构建了软件包，就不会对其进行重新构建，除非明确要求这么做。
-   更改文件系统格式后，需要完全重建。然而，如果是更改根文件系统的覆盖文件，post-build或post-image脚本将会执行，此时没有必要完全重建，简单的make即可。
-   如果FOO\_DEPENDENCIES列出的软件包重新构建或移除，foo软件包不会自动重新构建。例如，如果foo依赖软件包bar，即FOO\_DEPENDENCIES=bar，当软件包bar的配置更改时，foo不会自动重新构建。在这种情况下，你可能需要重新构建所有引用bar的软件包，或者完全重建以确保所有依赖bar的相关软件包都是最新的。

一般而言，当你遇到构建错误，并且不确定所做的配置更改可能带来的后果时，请完全重建。如果你还是遇到相同的构建错误，则可以确定该错误与软件包的部分重建无关，如果该错误发生在Buildroot的官方构建包中，请立即反馈该问题。随着你对Buildroot的了解加深，你将逐步了解何时真正需要进行完全重建，并且可以节省越来越多的时间。

作为参考，可以通过运行以下命令来进行完全重建：

```
make clean all
```

### 8.3 了解如何重新构建软件包

Buildroot用户提出的最常见的问题之一是如何重建给定的软件包，或如何删除软件包而无需重新构建所有内容。

Buildroot不支持不重新构建的情况下删除软件包。这是因为Buildroot不会跟踪哪个软件包在output/staging和output/target目录中安装了哪些文件，或者哪个软件包将根据另一个软件包的可用性进行不同的编译。

从头开始构建单个软件包的最简单的方法是从output/build目录中删除其构建目录。之后，Buildroot将从头重新开始提取、配置、编译和安装此软件包。可以使用make -dirclean命令执行此操作。

另一方面，如果你只想从编译步骤重新开始软件包的构建过程，则可以运行make -rebuild命名。这将重新开始编译和安装该软件包，它基本上是在软件包内重新执行make和make install命令，所以，它只会重新编译更改过的文件。

如果你想从配置步骤重新开始软件包的构建过程，则可以运行make -reconfigure命令，它将重新配置、编译和安装该软件包。

尽管-rebuild隐含-reinstall并且 -reconfigure隐含-rebuild，但这些目标仅作用于软件包，并且不会触发重新生成根文件系统镜像。如果有必要重新生成根文件系统，则需另外运行make或make all命令。

在内部，Buildroot会创建所谓的stamp文件以跟踪每个软件包已完成的构建步骤，它们存储在output/build/-目录，并命名为.stamp\_。上面详细介绍的命令仅操作这些标记文件即可强制Buildroot重新启动软件包构建过程的一组特定步骤。

有关软件包特殊构建目标的更多详细信息，请参阅第8.13.5节“特定软件包的构建目标”。

### 8.4 离线构建

如果你打算离线构建，并且只是想下载先前在配置器中（menuconfig、nconfig、xconfig或gconfig等）选择的所有软件包源码，运行以下命令：

```
make source
```

之后，你就可以断开网络连接或者拷贝dl目录到其他机器上构建。

### 8.5 目录树外构建

默认情况下，Buildroot生成的所有内容都存储在Buildroot目录树的output目录中。  
Buildroot还支持使用类似于Linux内核的语法在目录树外构建。要使用它，在make命令中增加O=参数：

```
make O=/tmp/build
```

或者：

```
cd /tmp/build; make O=$PWD -C path/to/buildroot
```

所有输出文件将位于/tmp/build目录下。如果O指定的目录不存在，Buildroot将自动创建它。

_注意：O指定的目录既可以是绝对路径，也可以是相对路径。但是，如果是相对路径，必须注意，它是相对于Buildroot源目录（而不是当前工作目录）解释的。_

使用目录树外构建时，Buildroot的.config配置文件和临时文件也存储在输出目录中。这意味着只要使用唯一的输出目录，就可以使用同一源代码安全地并行运行多个构建。

为了便于使用，Buildroot在输出目录中会生成一个Makefile包装器，因此在第一次运行后，你不需要再传递-O=<…>或-C=<…>参数，只需在输出目录中执行：

```
make <target>
```

### 8.7 有效处理文件系统镜像

文件系统镜像可能会变得非常大，具体取决于你选择的文件系统、软件包的数量、是否配置了可用空间等。但是，文件系统镜像中的某些位置可能是空的（例如大段内容都为0），这样的文件称为稀疏文件。

很多工具可以有效地处理稀疏文件，并且只会存储或写入稀疏文件中不为空的部分。例如：

-   tar 接受-S参数指定仅存储稀疏文件的非零块：
    -   tar cf archive.tar -S \[files…\] 将有效地将稀疏文件存储在tar包中
    -   tar xf archive.tar -S 将有效地从tar中提取稀疏文件
-   cp 接受–sparse=WHEN选项（WHEN取值为auto、never或always）：
    -   cp --sparse=always source.file dest.file 如果source.file大段为0，dest.file将生成稀疏文件

其他工具可能也有类似的选项，具体请查阅各自的使用手册。

如果你需要存储文件系统镜像（例如从一台计算机传输到另一台计算机），或者需要发送它们（例如发送给QA团队），那么可以使用稀疏文件。

但是请注意，如果通过dd将稀疏模式保存的文件系统镜像刷到设备可能会导致文件系统损坏（例如，ext2文件系统的块可能会损坏，当你读取这些块时，这些块可能不全为0）。你应该仅在构建机（即宿主机）上使用稀疏文件，而不是将稀疏文件传到目标设备上使用。

### 8.8 软件包之间的依赖关系图

Buildroot的工作之一是了解软件包之间的依赖关系，并确保它们以正确的顺序构建。这些依赖有时可能非常复杂，对于一个给定的系统，通常很难理解为什么Buildroot会将某个软件包引入构建。

为了帮助理解依赖关系，从而更好的理解嵌入式Linux系统中不同组件的作用，Buildroot能够生成软件包之间的依赖关系图。  
要生成已编译的整个系统的依赖关系图，只需运行：

```
make graph-depends
```

你将在output/graphs/graph-depends.pdf找到依赖图。

如果你的系统很大，依赖关系图可能会太负责且难以阅读。因此，可以针对给定的软件包生成依赖关系图：

```
make <package>-graph-depends
```

生成的依赖关系图位于output/graph/-graph-depends.pdf。

请注意，依赖关系图是使用Graphviz项目中的dot工具生成的，该工具必须已安装在宿主系统上才能使用该功能。在大多数发行版中，它都以graphviz软件包的形式提供。

默认情况下，依赖关系图以PDF格式存储。但是，通过设置BR2\_GRAPH\_OUT环境变量可以切换到其他输出格式，譬如PNG、PostScript或SVG，支持dot工具-T参数支持的所有选项。

```
BR2_GRAPH_OUT=svg make graph-depends
```

graph-depends的行为可以通过BR2\_GRAPH\_DEPS\_OPTS环境变量控制，支持的选项有：

-   –depth N, -d N 限制依赖关系深度为N，默认为0，表示没有限制。
-   –stop-on PKG, -s PKG 以PKG结束依赖。PKG可以是实际的软件包名称、全局名称、虚拟软件包的关键字（以虚拟软件包结束）、宿主软件包关键字。该软件包仍然会在关系图上，但没有其他依赖关系。
-   –exclude PKG, -x PKG 与–stop-on一样，但从关系图上忽略了PKG。
-   –transitive, --no-transitive 绘制或不绘制传递依赖，默认不绘制传递依赖。
-   –colors R,T,H 以逗号分隔的颜色列表，用于绘制根软件包（R）、目标软件包（T）和宿主软件包（H）。默认为lightblue,grey,gainsboro。

```
BR2_GRAPH_DEPS_OPTS='-d 3 --no-transitive --colors=red,green,blue' make graph-depends
```

### 8.9 构建时间图表

当系统构建耗时很长时，了解哪些软件包耗时最长，看看是否可以采取措施来加快构建速度，有时会很有用。为了协助进行构建时间分析，Buildroot收集了每个软件包每个构建步骤的耗时时间，并支持基于该数据生成图表。

要在构建完成后生成构建时间图表，运行：

```
make graph-build
```

这将在output/graphs目录下生成一些文件：

-   build.hist-build.pdf 每个软件包构建时间的直方图，按构建顺序排序。
-   build.hist-duration.pdf 每个软件包构建时间的直方图，按持续时间排序。
-   build.hist-name.pdf 每个软件包构建时间的直方图，按软件包名称排序。
-   build.pie-packages.pdf 每个软件包构建时间的饼图。
-   build.pie-steps.pdf 这是在软件包构建过程的每个步骤中花费的全部时间的饼图。

graph-build需要安装Python的Matplotlib和numpy的库（大多数发行版上为python-matplotlib和python-numpy）。如果使用的Python版本低于2.7，还需要argparse模块（大多数发行版上为python-argparse）。

默认情况下，输出的图表格式为PDF，可以使用BR2\_GRAPH\_OUT环境变量选择其他支持的格式，目前可选择的其他格式只有PNG：

```
BR2_GRAPH_OUT=png make graph-build
```

### 8.10 软件包文件系统大小图表

当目标系统增长时，了解Buildroot中每个软件包对整个根文件系统大小的贡献有时会很有用。为了协助进行分析，Buildroot收集每个软件包安装的文件大小，并根据该数据生成图表和CSV文件，详细说明不同软件包的大小。

要在构建完成后生成这些数据，运行：

```
make graph-size
```

这将在output/graphs目录下生成以下文件：

-   graph-size.pdf 每个软件包对整个根文件系统大小的贡献的饼图。
-   package-size-stats.csv CSV文件，给出每个软件包对根文件系统大小的贡献。
-   file-size-stats.csv CSV文件，给出每个已安装文件对其所属软件包的大小贡献及对整个根文件大小的贡献。

graph-size依赖Python Matplotlib库（大多数发行版上为python-matplotlib）。如果Python版本低于2.7，还需要安装argparse库（大多数发行版上为python-argparse）。

与构建时间图表一样，BR2\_GRAPH\_OUT环境变量可以用来调整输出文件的格式。有关此环境变量的详细信息，请参阅第8.8节“软件包之间的依赖关系图”。

此外，可以通过BR2\_GRAPH\_SIZE\_OPTS环境变量进一步调整生成的图表。可接受的选项有：

-   –size-limit X, -l X 会将大小贡献值低于X%的软件包归入“其他”条目。默认情况下，X=0.01，意味着每个大小贡献低于1%的软件包将被归入“其他”。可接受的值得范围为\[0.0, 1.0\]。
-   –iec, --binary, --si, --decimal 使用IEC（二进制，1024的乘方）或SI（十进制，1000的乘方，默认值）前缀。
-   –biggest-first 按降序而不是升序对软件包排序。

注意，仅在完全重新构建之后收集的文件系统大小数据才有意义。在make graph-size之前一定要运行make clean all。

要比较两次Buildroot构建的根文件系统的大小，例如在修改配置或切换到另一个Buildroot版本时，请使用size-stats-compare脚本，它接受两个file-size-stats.csv文件（make graph-size命令生成）作为输入。有关该脚本的帮助文档，请参阅：

```
utils/size-stats-compare -h
```

### 8.11 顶层并行构建

注意：本节介绍了一个非常有用的实验性功能，该功能在某些非常规情况下会失败，使用风险请自负。

Buildroot能够对每个软件包执行并行构建：每个软件包都是由Buildroot使用make -jN（或与Make等效的构建方式）构建的。默认情况下，并行级别是CPU数量+1，但可以使用BR2\_JLEVEL配置选项调整。

一直到2020.02版本，Buildroot都是以串行方式构建软件包：软件包一个接一个的构建，在软件包与软件包之间没有并行构建。从2020.02版本开始，Buildroot对顶层并行构建提供了实验性支持，通过并行构建不具有依赖关系的软件包，可以节省大量的构建时间。但是，此功能被标记为实验性功能，已知在某些情况下不起作用。

为了实验顶层并行构建，必须执行以下操作：

-   在Buildroot中启用BR2\_PER\_PACKAGE\_DIRECTORIES选项。
-   使用make -jN启动构建

在内部，BR2\_PER\_PACKAGE\_DIRECTORIES会启用称之为per-package directory的机制，这将产生以下效果：

-   区别于正常构建的全局target目录和全局host目录，顶层并行构建将分别为每个软件包生成target和host目录，即 ( O ) / p e r − p a c k a g e / < p k g > / t a r g e t / 和 (O)/per-package/<pkg>/target/和 (O)/per−package/<pkg\>/target/和(O)/per-package//host/。在软件包构建开始时，这些文件夹将使用依赖的软件包的文件夹填充。因此，编译器和其他工具将只能查看和访问该软件包依赖的软件包安装的文件。
-   构建结束后，全局target和host目录将被填充，分别位于 ( O ) / t a r g e t 和 (O)/target和 (O)/target和(O)/host目录。这意味着在构建过程中，这些文件夹将为空，并且直到构建的最后才填充他们。

### 8.12 与Eclipse集成

一部分嵌入式Linux开发人员喜欢使用Vim或Emacs等传统文本编辑器和基于命令行的交互方式，而另一部分嵌入式Linux开发人员更喜欢有丰富图形界面的IED帮助他们完成开发工作。Eclipse是最流行的集成开发环境之一，Buildroot可以和Eclipse集成到一起以简化Eclipse用户的开发工作。

Buildroot与Eclipse的集成简化了在Buildroot系统上应用程序和库的编译、远程执行和远程调试。它不集成Buildroot配置，也不使用Eclipse构建自身。因此，使用Ecl集成环境的典型流程是：

-   使用make menuconfig、make xconfig或其他配置界面配置Buildroot系统。
-   运行make编译Buildroot系统。
-   启动Eclipse，开发、运行和调试你自己的应用程序和库，它们依赖于Buildroot构建和安装的库。

Eclipse集成Buildroot安装过程和用法可以参阅https://github.com/mbats/eclipse-buildroot-bundle/wiki。

### 8.13 高级用法

#### 8.13.1 在Buildroot外部使用生成的工具链

你可能希望为目标系统编译未打包在Buildroot中的自己开发的应用程序或其他应用程序，为此你可以使用Buildroot生成的工具链。

Buildroot生成的工具链默认存储在output/host/目录。最简单的使用方式是将output/host/bin加入PATH环境变量，之后就可以使用ARCH-linux-gcc、ARCH-linux-objdump、ARCH-linux-ld等命令。

Buildroot也可以将工具链和所有选中的软件包导出为SDK，只需运行make sdk命令即可。这将把output/host打成一个tar包，并命名为\_sdk-buildroot.tar.gz（可以通过BR2\_SDK\_PREFIX环境变量修改前缀），存储在output/images目录。  
然后，将该tar包分发给其他开发人员，就可以开发尚未打包到Buildroot的软件包。

提取该SDK tar包后，用户必须运行relocate-sdk.sh脚本（位于SDK的顶层目录），以确保所有路径都更新为新路径。

此外，如果你只是想准备SDK但并不想打包（例如，你想移动host目录，或者想手动生成tar包），可以使用make prepare-sdk命令只准备SDK但不实际生成tar包。

#### 8.13.2 在Buildroot中使用gdb

Buildroot支持交叉调试，其中调试器在宿主机运行，通过gdbserver控制运行在目标机上的程序执行。

要做到这一点：

-   如果使用的是内部工具链（由Buildroot生成），必须启用BR2\_PACKAGE\_HOST\_GDB、BR2\_PACKAGE\_GDB和 BR2\_PACKAGE\_GDB\_SERVER。这样可以确保交叉gdb和gdbserver均已构建，并且gdbserver安装到了目标机。
-   如果使用外部工具链，则需要启用BR2\_TOOLCHAIN\_EXTERNAL\_GDB\_SERVER\_COPY，这会将外部工具链附带的gdbserver复制到目标计算机。如果你的外部工具链没有交叉gdb或gdbserver，也可以通过启用与内部工具链一样的选项让Buildroot构建它们。

现在，假设要开始调试foo程序，你需要在目标机执行：

```
gdbserver :2345 foo
```

这样，gdbserver将监听TCP端口2345以侦听来自交叉gdb的连接。

然后，在宿主机上，需要启动交叉gdb：

```
<buildroot>/output/host/bin/<tuple>-gdb -x <buildroot>/output/staging/usr/share/buildroot/gdbinit foo
```

当然，foo必须在当前目录中可用，并且带有调试符号。通常，你应该从foo的构建目录调用以上命名（而不是从剥离了二进制调试符号的output/target目录）。

/output/staging/usr/share/buildroot/gdbinit将告诉交叉gdb在哪里可以找到目标依赖的库。

最后，使用交叉gdb连接目标：

```
(gdb) target remote <target ip address>:2345
```

#### 8.13.3 在Buildroot中使用ccache缓存

ccache是编译器缓存。它存储每个编译过程中产生的目标文件，并能够跳过同一源文件的编译（使用相同的编译器和参数）。当从头开始进行几乎完全相同的构建时，它可以很好地加快构建过程。

Buildroot集成了ccache支持，你只需要在Build options选项中启用Enable compiler cache即可。这将自动构建ccache，并将其应用于所有宿主和目标编译。

缓存位于$HOME/.buildroot-ccache目录，它存储在Buildroot输出目录之外，以便由不同的Buildroot构建共享。如果想取消缓存，只需删除此目录即可。

make ccache-stats命令可以用来获取有关缓存的统计信息，包括大小、命中次数、未命中次数等。

构建目标ccache-options和CCACHE\_OPTIONS变量提供了对ccache更通用的访问控制。例如：

```
# set cache limit size
make CCACHE_OPTIONS="--max-size=5G" ccache-options

# zero statistics counters
make CCACHE_OPTIONS="--zero-stats" ccache-options
```

ccache对源文件和编译选项计算HASH，如果编译选项不同，则不会使用缓存的目标文件。然而，许多编译器选项都包含staging目录的绝对路径，因此，编译到不同输出目录的构建将导致许多缓存未命中。

为避免此问题，Buildroot提供了Use relative paths选项（BR2\_CCACHE\_USE\_BASEDIR），这将把指向内部输出目录的绝对路径重写为相对路径。因此，更改输出目录不会导致缓存未命中。

使用相对路径的一个缺点是最终生成的目标文件中会是相对路径。因此，除非你先cd到输出目录，否则调试器找不到该文件。  
有关此绝对路径重写的更新详细信息，请参阅ccache用户手册“在不同目录中编译”部分。

#### 8.13.4 软件包下载位置

Buildroot下载的各种压缩文件都存储在BR2\_DL\_DIR目录，默认情况下是dl目录。如果要保留一个完成的Buildroot版本以便与相关的压缩包一起使用，你可以复制该文件夹。这将允许你使用相同的版本重新生成工具链和目标文件系统。

如果你需要维护多个Buildroot树，那最好是使用共享的下载路径，可以通过将BR2\_DL\_DIR环境变量指向该目录实现。如果设置了该值，Buildroot配置中的BR2\_DL\_DIR将会被覆盖。以下内容需要添加到<~/.bashrc>。

```
export BR2_DL_DIR=<shared download location>
```

下载路径也可以通过.config文件的BR2\_DL\_DIR选项指定。与.config文件中的大多数选项不同，该值会被BR2\_DL\_DIR环境变量覆盖。

#### 8.13.5 软件包make目标

运行make 将构建并安装该软件包及其依赖项。

对于依赖Buildroot基础设施的软件包，有许多特殊的make目标，可以像这样独立调用：

```
make <package>-<target>
```

软件包构建目标有（按执行顺序排列）：

| 命令/目标 | 描述 |
| --- | --- |
| source | 获取源代码（下载压缩包，克隆源代码仓库等） |
| depends | 构建并安装构建该软件包所需的所有依赖项 |
| extract | 将源代码放到软件包的构建目录中（提取压缩包，复制源代码等） |
| patch | 应用补丁（如果有） |
| configure | 运行configure命令，如果有 |
| build | 运行编译命令 |
| install-staging | 目标软件包：如有必要，在staging目录中安装软件包 |
| install-target | 目标软件包：如有必要，在target目录中安装软件包 |
| install | 目标软件包：运行以上两条安装命令宿主软件包：在host目录中安装软件包 |

此外，还有一些有用的make目标：

| 命令/目标 | 描述 |
| --- | --- |
| show-depends | 显示构建软件包所需的第一级依赖项 |
| show-recursive-depends | 递归显示构建软件包所需的依赖项 |
| show-rdepends | 显示软件包的第一级反向依赖项（即直接依赖于它的包） |
| show-recursive-rdepends | 递归显示软件包的反向依赖项（即直接或间接依赖于它的包） |
| graph-depends | 在当前Buildroot配置上下文中，生成软件包的依赖关系图。有关依赖关系图的更多详细信息，请参阅本节。 |
| graph-rdepends | 生成软件包的反向依赖关系图（即直接或间接依赖于它的软件包） |
| dirclean | 删除整个软件包的构建目录 |
| reinstall | 重新运行安装命令 |
| rebuild | 重新运行编译命令，仅在使用OVERRIDE\_SRCDIR功能或直接在构建目录中修改文件时才有意义 |
| reconfigure | 重新运行configure命令，仅在使用OVERRIDE\_SRCDIR功能或直接在构建目录中修改文件时才有意义 |

#### 8.13.6 在开发过程中使用Buildroot

Buildroot的一般操作是下载tar包、提取、配置、编译和安装该tar包内的软件。源代码提取保存在临时目录output/build/-目录中，当执行make clean时，该目录会被完全删除，并在下一次make时重新创建。即使将Git或Subversion等版本管理系统作为软件包源代码的输入，Buildroot也会从中创建一个tar包，然后像对待一般tar包一样工作。

这种方式非常适合将Buildroot当做集成工具，编译和集成嵌入式Linux系统的所有组件。但是，如果是在开发系统的某些组件的过程中使用Buildroot，这种方式非常不方便：开发者希望对一个软件包的源代码做少许修改，并能够使用Buildroot快速重建系统。  
直接修改output/build/-不是合适的解决方案，因为该目录会在make clean时删除。

因此，Buildroot针对该场景提供了一种特殊的机制，即\_OVERRIDE\_SRCDIR机制。Buildroot读取一个override文件，该文件允许用户告诉Buildroot某些软件包的源代码位置。

默认的override文件是 ( C O N F I G D I R ) / l o c a l . m k ， 由 B R 2 P A C K A G E O V E R R I D E F I L E 配 置 选 项 定 义 。 (CONFIG\_DIR)/local.mk，由BR2\_PACKAGE\_OVERRIDE\_FILE配置选项定义。 (CONFIGDIR)/local.mk，由BR2PACKAGEOVERRIDEFILE配置选项定义。(CONFIG\_DIR)是Buildroot .config配置文件所在的目录，因此local.mk默认情况下与.config文件放在一起，这意味着：

-   Buildroot目录树内构建时位于Buildroot顶层目录中（当O=不使用时）
-   Buildroot目录树外构建时位于目录树外目录（当O=使用时）

如果需要的位置与默认值不同，可以通过BR2\_PACKAGE\_OVERRIDE\_FILE 配置选项指定它。

在override文件里，Buildroot希望找到以下形式的行：

```
<pkg1>_OVERRIDE_SRCDIR = /path/to/pkg1/sources
<pkg2>_OVERRIDE_SRCDIR = /path/to/pkg2/sources
```

例如：

```
LINUX_OVERRIDE_SRCDIR = /home/bob/linux/
BUSYBOX_OVERRIDE_SRCDIR = /home/bob/busybox/
```

当Buildroot发现给定的软件包存在\_OVERRIDE\_SRCDIR定义时，它将不再尝试下载、提取和修补软件包，它将直接使用指定目录中可用的源代码，并且make clean时不会涉及该目录。这允许将Buildroot指向您自己的目录，该目录可以由Git、Subversion或其他版本控制系统管理。为此，Buildroot将使用rsync将软件包的源代码从\_OVERRIDE\_SRCDIR指定的位置复制到output/build/-custom/目录。

该机制最好与make -rebuild和make -reconfigure结合使用。make -rebuild all将rsync源代码从\_OVERRIDE\_SRCDIR到output/build/-custom（只有修改过的文件会被复制），并重新启动这个软件包的构建过程。

在上述Linux软件包的示例中，开发人员可以修改/home/bob/linux目录下的源代码，然后运行：

```
make linux-rebuild all
```

这将在几秒钟内在output/images目录获得更新后的Linux内核镜像。同样，可以修改/home/bob/busybox目录下的BusyBox源代码，运行：

```
make busybox-rebuild all
```

output/images目录下的根文件系统将包含更新后的BusyBox。

大型项目一般有成百上千的文件，很多文件对于构建时是不需要的，但是会减慢rsync复制源代码的过程。可选的，可以定义\_OVERRIDE\_SRCDIR\_RSYNC\_EXCLUSIONS跳过源代码中的某些文件。例如，当处理webkitgtk软件包时，以下内容将从本地WebKit源代码中排除：

```
WEBKITGTK_OVERRIDE_SRCDIR = /home/bob/WebKit
WEBKITGTK_OVERRIDE_SRCDIR_RSYNC_EXCLUSIONS = \
        --exclude JSTests --exclude ManualTests --exclude PerformanceTests \
        --exclude WebDriverTests --exclude WebKitBuild --exclude WebKitLibraries \
        --exclude WebKit.xcworkspace --exclude Websites --exclude Examples
```

默认情况下，Buildroot会跳过VCS信息（例如.git或.svn）的同步。一些软件包在编译过程中会使用VCS信息，例如精确确认提交信息。要取消Buildroot的内置过滤规则，需要重新添加以下目录：

```
LINUX_OVERRIDE_SRCDIR_RSYNC_EXCLUSIONS = --include .git
```

## 9\. 定制项目

对于定制的项目，你可能需要执行的典型操作是：

-   配置Buildroot（包括编译选项和工具链、引导程序、内核、软件包和文件系统镜像类型）
-   配置其他模块，如Linux内核和BusyBox
-   自定义目标文件系统
    -   在目标文件夹添加或覆盖文件（使用BR2\_ROOTFS\_OVERLAY）
    -   修改或删除目标文件系统上的文件（使用BR2\_ROOTFS\_POST\_BUILD\_SCRIPT）
    -   在生成文件系统镜像前执行任意命令（使用BR2\_ROOTFS\_POST\_BUILD\_SCRIPT）
    -   设置文件权限和所有者（使用BR2\_ROOTFS\_DEVICE\_TABLE）
    -   添加自定义设备节点（使用BR2\_ROOTFS\_STATIC\_DEVICE\_TABLE）
    -   添加自定义用户账号（使用BR2\_ROOTFS\_USERS\_TABLES）
-   在生成文件系统镜像后执行任意命令（使用BR2\_ROOTFS\_POST\_IMAGE\_SCRIPT）
-   为某些软件包打补丁（使用BR2\_GLOBAL\_PATCH\_DIR）
-   添加定制项目的软件包

有关定制项目的自定义项的重要说明：请仔细考虑哪些更改是特定于项目的，哪些更改对其他项目的开发人员也有用。Buildroot社区强烈建议并鼓励上游开发者改进软件包和目标板对Buildroot官方项目的支持。当然，由于更改是高度定制或专用的，因此有时上游开发者不可能或不希望这么做。

本节介绍了如何在Buildroot中进行定制项目的自定义配置，以及如何存储使得可以重复构建同一镜像，即使是make clean之后。通过遵循推荐的做法，你甚至可以使用同一Buildroot树来构建多个不同的项目。

### 9.1 推荐的目录结构

为定制项目自定义Buildroot时，你将创建一个或多个需要存储在某处的特定于项目的文件。虽然大多数文件可以放置在任意位置，并将它们的路径在Buildroot配置中指定，但Buildroot开发人员建议使用本节中描述的特定目录结构。

使用以下目录结构，你可以选择将该目录结构放在何处：在Buildroot目录树中，还是Buildroot目录树外（使用br2-external树）。两个选项均有效，如何选择取决于你：

```
+-- board/
|   +-- <company>/
|       +-- <boardname>/
|           +-- linux.config
|           +-- busybox.config
|           +-- <other configuration files>
|           +-- post_build.sh
|           +-- post_image.sh
|           +-- rootfs_overlay/
|           |   +-- etc/
|           |   +-- <some file>
|           +-- patches/
|               +-- foo/
|               |   +-- <some patch>
|               +-- libbar/
|                   +-- <some other patches>
|
+-- configs/
|   +-- <boardname>_defconfig
|
+-- package/
|   +-- <company>/
|       +-- Config.in (if not using a br2-external tree)
|       +-- <company>.mk (if not using a br2-external tree)
|       +-- package1/
|       |    +-- Config.in
|       |    +-- package1.mk
|       +-- package2/
|           +-- Config.in
|           +-- package2.mk
|
+-- Config.in (if using a br2-external tree)
+-- external.mk (if using a br2-external tree)
+-- external.desc (if using a br2-external tree)
```

本章将进一步详细介绍上面列出的文件。

注意：如果你选择将此目录结构放在Buildroot目录树外但在br2-external目录树中，则以及可能的组件可能是多余的，可以省略。

#### 9.1.1 分层定制实现

用户拥有几个部分自定义项相同的项目是很普遍的，建议使用本节所述的分层自定义方法，而不是为每个项目都复制这些自定义项。

Buildroot中几乎所有可用的自定义方法（例如post-build scripts（构建后脚本）和root filesystem overlays（根文件系统覆盖等））都接受以空格分隔的项目列表，所有指定的项目将按从左到右的顺序被处理。通过创建多个这样的项目，一个用于通用的自定义项目，另一个用于针对项目的自定义项目，你可以避免不必要的重复。每层通常由board//里的独立目录体现。根据你的项目，甚至可以引入两个以上的层。

例如，某用户拥有两个自定义层common和fooboard的目录结构如下：

```
+-- board/
    +-- <company>/
        +-- common/
        |   +-- post_build.sh
        |   +-- rootfs_overlay/
        |   |   +-- ...
        |   +-- patches/
        |       +-- ...
        |
        +-- fooboard/
            +-- linux.config
            +-- busybox.config
            +-- <other configuration files>
            +-- post_build.sh
            +-- rootfs_overlay/
            |   +-- ...
            +-- patches/
                +-- ...
```

如果用户将BR2\_GLOBAL\_PATCH\_DIR选项配置为：

```
BR2_GLOBAL_PATCH_DIR="board/<company>/common/patches board/<company>/fooboard/patches"
```

那么首先会应用来自common层的补丁，然后是fooboard层的补丁。

### 9.2 将定制保存在Buildroot之外

如第9.1节“推荐的目录结构”所述，你可以将定制项目的自定义配置放在两个位置：

-   直接放在Buildroot目录树中，通常使用版本控制系统中的分支来维护他们，这样方便升级到Buildroot新版本。
-   使用br2-external机制放在Buildroot目录树外。该机制允许将软件包配置、目标板支持和配置文件保留在Buildroot目录树外，同时仍可以将它们很好地集成到构建环境中，我们称此为br2-external 目录树。本节说明如何使用外部树机制，以及需要在外部树中提供的内容。

可以通过BR2\_EXTERNAL make变量指定要使用的外部树的路径，并且可以指定一个或多个外部树。该变量将传给Buildroot的所有make调用。它会自动保存在output/.br2-external.mk文件中，因此无需每次make都指定BR2\_EXTERNAL。但是，可以随时通过传递新值来改变，也可以通过传递空值删除它。

注意：外部树目录可以是绝对路径，也可以是相对路径。如果传递相对路径，必须注意，它是相对于Buildroot源目录而不是相对Buildroot输出目录。

_注意：如果使用Buildroot 2016.11之前的外部树，则需要先对其进行转换，然后才能将其用于Buildroot 2016.11及更高版本。请参阅第25.1节“迁移到2016.11版本”。_

示例：

```
buildroot/ $ make BR2_EXTERNAL=/path/to/foo menuconfig
```

之后，/path/to/foo外部树将被使用：

```
buildroot/ $ make
buildroot/ $ make legal-info
```

可以随时切换到另一个外部树：

```
buildroot/ $ make BR2_EXTERNAL=/where/we/have/bar xconfig
```

使用多个外部树：

```
buildroot/ $ make BR2_EXTERNAL=/path/to/foo:/where/we/have/bar menuconfig
```

禁用外部树：

```
buildroot/ $ make BR2_EXTERNAL= xconfig
```

#### 9.2.1 外部树布局

外部树必须至少包含以下三个文件，以下各章对此进行介绍：

-   external.desc
-   external.mk
-   Config.in

除了这些强制性文件外，外部树中可能还存在其他可选内容，例如configs/或provides/目录。以下各章将对它们进行描述。稍后还将介绍完整的外部树布局示例。

##### 9.2.1.1 external.desc

该文件用于描述外部树：外部树的名称和描述。

该文件的格式以行分隔，每行以关键字开头，后跟冒号和一个或多个空格，之后是该关键字的值。目前有两个已定义的关键字：

-   name  
    必填，定义了外部树的名称。名称只能使用\[A-Za-z0-9\_\]内的ASCII字符，不允许使用其他字符。Buildroot将 BR2\_EXTERNAL\_$(NAME)\_PATH环境变量设置为外部树的绝对路径，可以使用它来引用外部树。该变量在Kconfig中也可以用，因此你可以使用它为Kconfig和Makefile提供源，以及使用它来从外部树中包含其他Makefile或引用其他文件。  
    注意：由于一次可以使用多个外部树，因此Buildroot使用此名称为每个外部树生成变量。该名称用于Buildroot标识你的外部树，因此请尽量提供一个能真正描述你的外部树的名称，并保持唯一避免与其他外部树冲突，尤其是当你计划以某种方式与第三方共享外部树或使用第三方外部树时。
-   desc  
    可选，提供该外部树的简短描述。它应该放在一行上，并且大部分是自由格式的（请参见下文），在显示有关该外部树的信息时使用（例如，在defconfig文件列表上方，或作为menuconfig中的提示）。因此，应该相对简短（40个字符可能是一个比较好的上限）。可以使用BR2\_EXTERNAL\_$(NAME)\_DESC环境变量访问该值。

示例，外部树名称及其对应的BR2\_EXTERNAL\_$(NAME)\_PATH环境变量：

```
FOO → BR2_EXTERNAL_FOO_PATH
BAR_42 → BR2_EXTERNAL_BAR_42_PATH
```

以下示例中，假设外部树名称为BAR\_42。

_注意：BR2\_EXTERNAL\_KaTeX parse error: Expected group after '\_' at position 25: …TH和BR2\_EXTERNAL\_̲(NAME)\_DESC在Kconfig和Makefile中都有效。这些变量在环境变量中导出，因此可以在post-build、post-image和in-fakeroot脚本中使用。_

##### 9.2.1.2 Config.in和external.mk

这些文件（可以为空）用于定义软件包的特性（类似Buildroot中的foo/Config.in和foo/foo.mk）或其他自定义配置或make逻辑。

Buildroot自动将来自每个外部树的Config.in包含进来，并展现在顶层配置菜单中。同时自动包含每个外部树的external.mk并合并到其余的makefile中。

这些文件的主要用途是用于定义软件包特性。推荐的方法是编写如下所示的Config.in文件：

```
source "$BR2_EXTERNAL_BAR_42_PATH/package/package1/Config.in"
source "$BR2_EXTERNAL_BAR_42_PATH/package/package2/Config.in"
```

然后，编写external.mk文件：

```
include $(sort $(wildcard $(BR2_EXTERNAL_BAR_42_PATH)/package/*/*.mk))
```

之后，在 ( B R 2 E X T E R N A L B A R 4 2 P A T H ) / p a c k a g e / p a c k a g e 1 和 (BR2\_EXTERNAL\_BAR\_42\_PATH)/package/package1和 (BR2EXTERNALBAR42PATH)/package/package1和(BR2\_EXTERNAL\_BAR\_42\_PATH)/package/package2创建普通的Buildroot软件包，参阅第17章“向Buildroot添加新的软件包”。如果你愿意，可以将软件包分组在名为的子目录中，并相应地调整上述路径。

你还可以在Config.in中添加自定义配置，以及在external.mk中添加make逻辑。

##### 9.2.1.3 configs/目录

可以将Buildroot的默认配置文件defconfigs存储在外部树的configs子目录中。Buildroot将在make list-defconfigs命令的输出中自动展示它们，并且允许make \_defconfig命令自动加载它们。执行make list-defconfigs命令时，它们将出现在外部树名称的External configs标签下。

_注意：如果多个外部树中存在defconfig文件，则使用最后一个外部树定义的defconfig。因此，可以覆盖Buildroot或另一个外部树中捆绑的defconfig文件。_

##### 9.2.1.4 provides/目录

对于某些软件包，Buildroot提供了两个甚至多个API兼容的软件包实现方式。例如，可以选择libjpeg或jpeg-turbo，也可以选择openssl或libressl。最后，可以选择一个已知的预配置的工具链。

外部树可以通过提供一组定义这些选项的文件来扩展这些选择：

-   provides/toolchains.in 定义预配置的工具链，然后将其列在工具链选项中。
-   provides/jpeg.in 定义替代的libjpeg实现。
-   provides/openssl.in 定义替代的openssl实现。

##### 9.2.1.5 其他自定义格式的内容

可以在其中存储特定目标板的配置文件，例如内核配置、根文件系统覆盖或Buildroot允许为其设置位置的其他任何配置文件（通过使用BR2\_EXTERNAL\_$(NAME)\_PATH变量）。例如，你可以按以下方式指定全局补丁、根文件系统覆盖和内核配置文件的路径：

```
BR2_GLOBAL_PATCH_DIR=$(BR2_EXTERNAL_BAR_42_PATH)/patches/
BR2_ROOTFS_OVERLAY=$(BR2_EXTERNAL_BAR_42_PATH)/board/<boardname>/overlay/
BR2_LINUX_KERNEL_CUSTOM_CONFIG_FILE=$(BR2_EXTERNAL_BAR_42_PATH)/board/<boardname>/kernel.config
```

##### 9.2.1.6 其他Linux内核扩展

在外部树根目录下的linux/子目录下可以添加Linux内核扩展，参阅第17.20.2节“Linux内核扩展”。

##### 9.2.1.7 布局示例

以下是包含了所有特性的外部树布局示例，示例中的内容都是上边提到过的文件，所有这些文件都是出于演示目的而组建。

```
/path/to/br2-ext-tree/
  |- external.desc
  |     |name: BAR_42
  |     |desc: Example br2-external tree
  |     `----
  |
  |- Config.in
  |     |source "$BR2_EXTERNAL_BAR_42_PATH/toolchain/toolchain-external-mine/Config.in.options"
  |     |source "$BR2_EXTERNAL_BAR_42_PATH/package/pkg-1/Config.in"
  |     |source "$BR2_EXTERNAL_BAR_42_PATH/package/pkg-2/Config.in"
  |     |source "$BR2_EXTERNAL_BAR_42_PATH/package/my-jpeg/Config.in"
  |     |
  |     |config BAR_42_FLASH_ADDR
  |     |    hex "my-board flash address"
  |     |    default 0x10AD
  |     `----
  |
  |- external.mk
  |     |include $(sort $(wildcard $(BR2_EXTERNAL_BAR_42_PATH)/package/*/*.mk))
  |     |include $(sort $(wildcard $(BR2_EXTERNAL_BAR_42_PATH)/toolchain/*/*.mk))
  |     |
  |     |flash-my-board:
  |     |    $(BR2_EXTERNAL_BAR_42_PATH)/board/my-board/flash-image \
  |     |        --image $(BINARIES_DIR)/image.bin \
  |     |        --address $(BAR_42_FLASH_ADDR)
  |     `----
  |
  |- package/pkg-1/Config.in
  |     |config BR2_PACKAGE_PKG_1
  |     |    bool "pkg-1"
  |     |    help
  |     |      Some help about pkg-1
  |     `----
  |- package/pkg-1/pkg-1.hash
  |- package/pkg-1/pkg-1.mk
  |     |PKG_1_VERSION = 1.2.3
  |     |PKG_1_SITE = /some/where/to/get/pkg-1
  |     |PKG_1_LICENSE = blabla
  |     |
  |     |define PKG_1_INSTALL_INIT_SYSV
  |     |    $(INSTALL) -D -m 0755 $(PKG_1_PKGDIR)/S99my-daemon \
  |     |                          $(TARGET_DIR)/etc/init.d/S99my-daemon
  |     |endef
  |     |
  |     |$(eval $(autotools-package))
  |     `----
  |- package/pkg-1/S99my-daemon
  |
  |- package/pkg-2/Config.in
  |- package/pkg-2/pkg-2.hash
  |- package/pkg-2/pkg-2.mk
  |
  |- provides/jpeg.in
  |     |config BR2_PACKAGE_MY_JPEG
  |     |    bool "my-jpeg"
  |     `----
  |- package/my-jpeg/Config.in
  |     |config BR2_PACKAGE_PROVIDES_JPEG
  |     |    default "my-jpeg" if BR2_PACKAGE_MY_JPEG
  |     `----
  |- package/my-jpeg/my-jpeg.mk
  |     |# This is a normal package .mk file
  |     |MY_JPEG_VERSION = 1.2.3
  |     |MY_JPEG_SITE = https://example.net/some/place
  |     |MY_JPEG_PROVIDES = jpeg
  |     |$(eval $(autotools-package))
  |     `----
  |
  |- provides/toolchains.in
  |     |config BR2_TOOLCHAIN_EXTERNAL_MINE
  |     |    bool "my custom toolchain"
  |     |    depends on BR2_some_arch
  |     |    select BR2_INSTALL_LIBSTDCPP
  |     `----
  |- toolchain/toolchain-external-mine/Config.in.options
  |     |if BR2_TOOLCHAIN_EXTERNAL_MINE
  |     |config BR2_TOOLCHAIN_EXTERNAL_PREFIX
  |     |    default "arch-mine-linux-gnu"
  |     |config BR2_PACKAGE_PROVIDES_TOOLCHAIN_EXTERNAL
  |     |    default "toolchain-external-mine"
  |     |endif
  |     `----
  |- toolchain/toolchain-external-mine/toolchain-external-mine.mk
  |     |TOOLCHAIN_EXTERNAL_MINE_SITE = https://example.net/some/place
  |     |TOOLCHAIN_EXTERNAL_MINE_SOURCE = my-toolchain.tar.gz
  |     |$(eval $(toolchain-external-package))
  |     `----
  |
  |- linux/Config.ext.in
  |     |config BR2_LINUX_KERNEL_EXT_EXAMPLE_DRIVER
  |     |    bool "example-external-driver"
  |     |    help
  |     |      Example external driver
  |     |---
  |- linux/linux-ext-example-driver.mk
  |
  |- configs/my-board_defconfig
  |     |BR2_GLOBAL_PATCH_DIR="$(BR2_EXTERNAL_BAR_42_PATH)/patches/"
  |     |BR2_ROOTFS_OVERLAY="$(BR2_EXTERNAL_BAR_42_PATH)/board/my-board/overlay/"
  |     |BR2_ROOTFS_POST_IMAGE_SCRIPT="$(BR2_EXTERNAL_BAR_42_PATH)/board/my-board/post-image.sh"
  |     |BR2_LINUX_KERNEL_CUSTOM_CONFIG_FILE="$(BR2_EXTERNAL_BAR_42_PATH)/board/my-board/kernel.config"
  |     `----
  |
  |- patches/linux/0001-some-change.patch
  |- patches/linux/0002-some-other-change.patch
  |- patches/busybox/0001-fix-something.patch
  |
  |- board/my-board/kernel.config
  |- board/my-board/overlay/var/www/index.html
  |- board/my-board/overlay/var/www/my.css
  |- board/my-board/flash-image
  `- board/my-board/post-image.sh
        |#!/bin/sh
        |generate-my-binary-image \
        |    --root ${BINARIES_DIR}/rootfs.tar \
        |    --kernel ${BINARIES_DIR}/zImage \
        |    --dtb ${BINARIES_DIR}/my-board.dtb \
        |    --output ${BINARIES_DIR}/image.bin
        `----
```

该外部树将在menuconfig中可见，以下为展开后的效果：

```
External options  --->
    *** Example br2-external tree (in /path/to/br2-ext-tree/)
    [ ] pkg-1
    [ ] pkg-2
    (0x10AD) my-board flash address
```

如果使用了不止一个外部树，则看起来会是这样（第二个外部树的名称为FOO\_27，且external.desc文件中没有desc字段）：

```
External options  --->
    Example br2-external tree  --->
        *** Example br2-external tree (in /path/to/br2-ext-tree)
        [ ] pkg-1
        [ ] pkg-2
        (0x10AD) my-board flash address
    FOO_27  --->
        *** FOO_27 (in /path/to/another-br2-ext)
        [ ] foo
        [ ] bar
```

此外，jpeg提供程序将在jpeg选项中可见：

```
Target packages  --->
    Libraries  --->
        Graphics  --->
            [*] jpeg support
                jpeg variant ()  --->
                    ( ) jpeg
                    ( ) jpeg-turbo
                        *** jpeg from: Example br2-external tree ***
                    (X) my-jpeg
                        *** jpeg from: FOO_27 ***
                    ( ) another-jpeg
```

类似地，工具链选项如下：

```
Toolchain  --->
    Toolchain ()  --->
        ( ) Custom toolchain
            *** Toolchains from: Example br2-external tree ***
        (X) my custom toolchain
```

注意：toolchain/toolchain-external-mine/Config.in.options的配置不会出现在Toolchain菜单中，必须在外部树的顶层Config.in配置文件中包含它们才会显示在External options菜单中。

### 9.3 保存Buildroot配置

Buildroot的配置文件可以使用make savedefconfig命令保存。

该命令可以删除默认的配置选项从而简化Buildroot配置文件，结果保存在名为defconfig的文件中。如果想保存到其他位置，请更改BR2\_DEFCONFIG选项，或者调用make savedefconfig BR2\_DEFCONFIG=命令。

推荐的保存Buildroot配置文件的位置是configs/\_defconfig。如果遵循此建议，make help将列出该配置，并可以通过make \_defconfig命令重新设置。

或者，你也可以将该配置文件复制到任意位置，并使用make defconfig BR2\_DEFCONFIG=命令重新构建。

### 9.4 保存其他组件的配置

如果BusyBox、Linux内核、BareBox、U-Boot和uClibc的配置被修改，这些配置也应该保存。对于每一个组件，Buildroot都有一个对应的配置选项指向输入的配置文件，例如BR2\_LINUX\_KERNEL\_CUSTOM\_CONFIG\_FILE。要保存这些配置，请将对应的配置选项指向要保存配置文件的路径，然后参照下边的帮助手册实际存储配置文件。

如第9.1节“推荐的目录结构”所述，存储这些配置文件的推荐路径为：board///foo.config。

请确保在修改BR2\_LINUX\_KERNEL\_CUSTOM\_CONFIG\_FILE等选项之前创建配置文件。否则，Buildroot将尝试访问该配置文件，并返回失败。可以通过运行make linux-menuconfig等命令创建配置文件。

Buildroot提供了一些帮助程序以简化配置文件的保存。

-   make linux-update-defconfig 将Linux配置保存到BR2\_LINUX\_KERNEL\_CUSTOM\_CONFIG\_FILE变量指定的路径。它通过删除默认值来简化配置文件。然而，这仅适用于2.6.33及以上版本，对于低版本，请使用make linux-update-config命令。
-   make busybox-update-config 将BusyBox配置保存到BR2\_PACKAGE\_BUSYBOX\_CONFIG变量指定的路径。
-   make uclibc-update-config 将uClibc配置保存到BR2\_UCLIBC\_CONFIG变量指定的路径。
-   make barebox-update-defconfig 将BareBox配置保存到BR2\_TARGET\_UBOOT\_CUSTOM\_CONFIG\_FILE变量指定的路径。
-   make uboot-update-defconfig 将UBoot配置保存到BR2\_TARGET\_UBOOT\_CUSTOM\_CONFIG\_FILE变量指定的路径。
-   对于at91bootstrap3没有帮助程序，需要手动将配置文件复制到BR2\_TARGET\_AT91BOOTSTRAP3\_CUSTOM\_CONFIG\_FILE变量指定的路径。

### 9.5 自定义生成的目标文件系统

除了通过make \*config命令修改配置外，还有几种方法可以自定义生成的目标文件系统。

推荐的两种方法（可以同时使用）是根文件系统叠加（root filesystem overlay）和构建后脚本（post build script）。

#### 9.5.1 根文件系统叠加 （BR2\_ROOTFS\_OVERLAY）

根文件系统叠加层是一个文件目录树，在目标系统构建完后，将其直接复制到目标文件系统上。要启用此功能，需将BR2\_ROOTFS\_OVERLAY变量（在System configuration菜单）设置为叠加目录树的根目录。甚至可以指定多个以空格分隔的叠加层。如果指定相对路径，则它将相对于Buildroot根目录解析。版本控制系统的隐藏目录（如.git、.svn、.hg等）、.empty文件以及以~结尾的文件将被排除。

如果BR2\_ROOTFS\_MERGED\_USR选项被启用，则叠加层不能包含/bin、/lib、/sbin目录，原因是Buildroot将自动创建指向/usr的符号链接。在这种情况下，如果叠加层有任何程序或库文件，则应将它们放到/usr/bin、/usr/lib、/usr/sbin目录中。

如第9.1节“推荐的目录结构”所述，叠加层的推荐路径为：board///rootfs-overlay。

#### 9.5.2 构建后脚本（BR2\_ROOTFS\_POST\_BUILD\_SCRIPT）

构建后脚本是Buildroot在构建完所选软件包但组装根文件系统前调用的shell脚本。要启用此功能，需将BR2\_ROOTFS\_POST\_BUILD\_SCRIPT变量（在System configuration菜单）设置为以空格分隔的构建后脚本列表。如果指定相对路径，则将相对于Buildroot根目录解析。

使用构建后脚本，可以删除或修改目标文件系统中的任何文件。但是，需要谨慎使用该功能。当发现某个软件包生成错误或有需要删除或修改的文件时，应先修复该软件包的问题，而不是使用构建后脚本来解决问题。

如第9.1节“推荐的目录结构”所述，此脚本的推荐路径为：board///post\_build.sh。

构建后脚本以Buildroot主目录树作为当前工作目录运行。目标文件系统的路径将作为第一个参数传递给每个脚本。如果BR2\_ROOTFS\_POST\_SCRIPT\_ARGS变量不为空，则这些参数也将传递给脚本。所有脚本都将传递完全相同的参数，不支持将不同参数传递给不同脚本。

此外，还可以使用以下环境变量：

-   BR2\_CONFIG Buildroot .config配置文件的路径。
-   HOST\_DIR、STAGING\_DIR、TARGET\_DIR 参阅第17.5.2节“通用软件包参考”。
-   BUILD\_DIR 软件包提取和构建的路径。
-   BINARIES\_DIR 所有二进制文件（镜像）的存储位置。
-   BASE\_DIR 基本输出目录。

下面再介绍三种自定义目标文件系统的方法，但不建议使用。

#### 9.5.3 直接修改目标文件系统

对于临时修改，可以直接修改目标文件系统并重建镜像。目标文件系统位于output/target目录，更改后，运行make命令重建目标文件系统镜像。

此方法允许对目标文件系统执行任何操作，但是如果运行make clean命令，这些修改将会丢失。在某些情况下，必须执行make clean清理，因此这种方法仅对快速测试有效。在验证修改有效后，应使用根文件系统叠加或构建后脚本保留该修改。

#### 9.5.4 自定义目标框架（BR2\_ROOTFS\_SKELETON\_CUSTOM）

根文件系统镜像是从目标框架开始创建的，所有软件包都在其上面安装文件。在构建和安装任何软件包之前，目标框架会被复制到目标目录output/target目录。默认的目标框架提供了标准Unix文件系统布局以及一些基础的初始化脚本和配置文件。

如果默认目标框架（位于system/skeleton目录）不满足需求，通常会使用根文件系统叠加或构建后脚本调整。然而，如果默认框架与你所需的框架完全不同，则使用自定义框架可能更合适。

要启用此功能，需启用BR2\_ROOTFS\_SKELETON\_CUSTOM选项，配置BR2\_ROOTFS\_SKELETON\_CUSTOM\_PATH指向自定义框架的路径。System configuration菜单提供了这些选项。如果指定相对目录，则将相对于Buildroot根目录解析。

自定义框架不需要包含/bin、lib或/sbin目录，它们将在构建过程中自动生成。如果BR2\_ROOTFS\_MERGED\_USR选项启用，则自定义框架不能包含/bin、/lib或/sbin目录，原因是Buildroot将自动创建指向/usr的符号链接。在这种情况下，如果框架中有任何程序或库文件，则应将它们放到/usr/bin、/usr/lib、/usr/sbin目录中。

不建议使用此方法，因为它会复制整个框架，从而导致无法利用Buildroot高版本对默认框架的修复和改进。

#### 9.5.5 fakeroot脚本（BR2\_ROOTFS\_POST\_FAKEROOT\_SCRIPT）

生成最终镜像时，某些部分需要root权限，如：创建/dev设备节点，设置文件或目录的权限或所有者等。为了避免使用实际的root权限，Buildroot会使用fakeroot模拟root权限。这不能完全替代实际的root权限，但足以满足Buildroot的需要。

fakeroot脚本是在fakeroot阶段最后且生成文件系统镜像之前被调用的shell脚本。因此，它们在fakeroot上下文中被调用。fakeroot脚本通常在需要root权限调整文件系统时有用。

_注意：建议使用现有机制设置文件权限或在/dev目录中创建设备节点（参阅第9.5.6节“设置文件权限和所有者及添加自定义设备节点”）或创建用户（参阅第9.6节“添加自定义账户”）。_

_注意：构建后脚本（post-build script）与fakeroot脚本的区别在于，前者不会在fakeroot上下文中被调用。_

_注意：使用fakeroot并不能成为实际root的绝对替代。fakeroot仅在内存中模拟伪造文件访问权限和类型（块或字符设备）和uid/gid。_

#### 9.5.6 设置文件权限和所有者及添加自定义设备节点

有时需要设置文件或设备节点的访问权限和所有者。例如，某些文件可能需要由root用户拥有。由于构建后脚本不是以root身份运行，因此除非在构建后脚本中显示使用fakeroot，否则无法进行此类修改。

对此，Buildroot提供了所谓的权限表支持。要启用此功能，需要设置BR2\_ROOTFS\_DEVICE\_TABLE变量指向以空格分隔的权限表列表，权限表是遵循makedev语法的普通文本文件。

如果使用的是静态设备表（即不使用devtmpfs、mdev或(e)udev），则可以使用相同的语法在设备表中添加设备节点。要启用此功能，需要设置BR2\_ROOTFS\_STATIC\_DEVICE\_TABLE变量指向以空格分隔的设备表列表。

如第9.1节“推荐的目录结构”所述，此类文件推荐的存放位置是：board//。

需要注意的是，如果特定权限或设备节点与特定的应用程序相关，则需要在软件包的.mk文件中定义FOO\_PERMISSIONS和FOO\_DEVICES变量（参阅第17.5.2节“通用软件包参考”）。

### 9.6 添加自定义用户账号

有些时候需要在目标系统中添加特定用户。为了满足此需求，Buildroot提供了所谓的用户表支持。要启用此功能，需要设置BR2\_ROOTFS\_USERS\_TABLES变量指向以空格分隔的用户表列表，这些表是遵循makeusers语法的常规文本文件。

如第9.1节“推荐的目录结构”所示，此类文件的推荐位置是：board//。

需要注意的是，如果自定义用户与特定的软件包相关，则应该在软件包的.mk文件中设置变量FOO\_USERS（参阅第17.5.2节“通用软件包参考”）。

### 9.7 创建镜像后进行自定义

构建后脚本（post-build）在系统镜像、内核和引导程序镜像生成前运行，镜像后脚本（post-image）可以在生成所有镜像后执行某些特定操作。

例如，镜像后脚本可以用于提取根文件系统导出到NFS服务器指定位置，或者创建捆绑根文件系统和内核镜像的特殊固件镜像，或项目所需的任何其他自定义操作。

要启用此功能，需要设置BR2\_ROOTFS\_POST\_IMAGE\_SCRIPT（在System configuration菜单中）指向以空格分隔的镜像后脚本列表。如果指定相对路径，将相对于Buildroot根目录解析。

类似构建后脚本，镜像后脚本以Buildroot主目录树作为当前工作目录。镜像输出目录将作为第一个参数传递给每个脚本。如果BR2\_ROOTFS\_POST\_SCRIPT\_ARGS变量不为空，则这些参数也将传递给脚本。所有脚本都将传递相同的参数，不能将不同参数传递给不同脚本。

类似构建后脚本，这些脚本可以访问这些环境变量：BR2\_CONFIG、HOST\_DIR、STAGING\_DIR、TARGET\_DIR、BUILD\_DIR、BINARIES\_DIR和BASE\_DIR。

镜像后脚本将以执行Buildroot的用户身份执行，该用户通常不应该是root用户。因此，这些脚本中任何需要root权限的操作都需要特殊处理（使用fakeroot或sudo），该处理留给脚本开发人员解决。

### 9.8 添加定制项目的补丁

有时将Buildroot提供的额外补丁程序应用于软件包很有用。例如，用于支持项目中的自定义功能，或者使用新的体系架构时。  
BR2\_GLOBAL\_PATCH\_DIR变量可用于指定一个或多个以空格分隔的补丁目录列表。

对于软件包的特定版本的补丁，可通过以下方式应用补丁：

1.  对于BR2\_GLOBAL\_PATCH\_DIR列出的每个目录，确定目录：

-   如果/// 目录存在，则使用该目录；
-   否则，如果/目录存在，则使用该目录

2.  然后，通过以下方式应用补丁：

-   如果补丁目录下存在series文件，则根据series应用补丁；
-   否则，将按\*.patch文件的字母顺序应用补丁文件。因此，为确保补丁按正确的顺序应用，强烈建议将补丁文件命名为：-.patch，其中指明了应用顺序。

有关如何应用补丁的信息，请参阅第18.2节“如何应用补丁”。

BR2\_GLOBAL\_PATCH\_DIR选项是为软件包应用自定义补丁的首选方法，它可以用于为Buildroot中的任何软件包指定补丁程序目录。还可以使用它代替某些软件包（如U-Boot和BareBox）自定义的补丁程序目录。这样，它将允许用户从一个顶层目录统一管理其补丁程序。

使用BR2\_GLOBAL\_PATCH\_DIR选项指定自定义补丁目录的例外是BR2\_LINUX\_KERNEL\_PATCH。BR2\_LINUX\_KERNEL\_PATCH用于通过URL指定内核补丁。注意，BR2\_LINUX\_KERNEL\_PATCH指定的补丁在BR2\_GLOBAL\_PATCH\_DIR指定的补丁应用之后应用，这是通过Linux软件包的补丁程序hook实现的。

### 9.9 添加定制项目的软件包

通常，任何新软件包都应该直接添加到package目录中，并提交到Buildroot项目组。第17章详细介绍了如何向Buildroot添加软件包，此处不再赘述。但是，你的项目可能需要一些无法提交到Buildroot项目组的软件包。本节将说明，如何将此类软件包保存到定制项目的目录中。

如第9.1节“推荐的目录结构”所述，针对特定项目的软件包的推荐存储位置是package//。如果使用外部目录树功能（参阅第9.2节“将定制保存在Buildroot目录树之外”），推荐的位置是外部树package子目录。

但是，除非执行一些其他步骤，否则Buildroot将无法识别此位置的软件包。如第17章“添加软件包”所述，Buildroot中的软件包基本上由两个文件组成：.mk文件（描述如何构建软件包）和Conifg.in文件（描述该软件包的配置选项）。

Buildroot将自动包含在package第一级子目录的.mk文件（使用package/_/_.mk匹配模式）。如果希望Buildroot包含来自更深层次目录的.mk文件（例如package//package1/）的.mk文件，则只需在第一级子目录添加一个.mk文件，并在该.mk文件中包含子目录的.mk文件。因此，创建package//.mk文件，其内容如下（假设package//下只有一个额外的目录）：

```
include $(sort $(wildcard package/<company>/*/*.mk))
```

对于Config.in文件，创建package//Config.in并包含所有软件包的Config.in文件。由于kconfig不支持通配符，因此必须提供详尽的文件列表。

```
source "package/<company>/package1/Config.in"
source "package/<company>/package2/Config.in"
```

然后，在package/Config.in中包含package//Config.in，最好将其包含在公司特定的菜单中，以使以后升级Buildroot版本更容易。

如果使用外部目录树，参阅第9.2节““将定制保存在Buildroot目录树之外”了解如何编写这些文件。

### 9.10 存储定制项目自定义配置的快速指南

在本章的前面，已经描述了进行定制项目的自定义配置的不同方法。本节将通过提供存储定制项目自定义配置的分步说明来总结这一切。显然，与定制项目无关的步骤可以跳过。

-   make menuconfig 配置工具链、软件包和内核。
-   make linux-menuconfig 更新内核配置，以及BusyBox、uClib等其他组件的配置。
-   mkdir -p board// 创建定制项目目标板文件夹。
-   在board///.config中配置以下选项（如果需要）：
    -   BR2\_LINUX\_KERNEL\_CUSTOM\_CONFIG\_FILE
    -   BR2\_PACKAGE\_BUSYBOX\_CONFIG
    -   BR2\_UCLIBC\_CONFIG
    -   BR2\_TARGET\_AT91BOOTSTRAP3\_CUSTOM\_CONFIG\_FILE
    -   BR2\_TARGET\_BAREBOX\_CUSTOM\_CONFIG\_FILE
    -   BR2\_TARGET\_UBOOT\_CUSTOM\_CONFIG\_FILE
-   编写配置文件：
    -   make linux-update-defconfig
    -   make busybox-update-config
    -   make uclibc-update-config
    -   cp /build/at91bootstrap3-\*/.config board///at91bootstrap3.config
    -   make barebox-update-defconfig
    -   make uboot-update-defconfig
-   创建board///rootfs-overlay/并填充所需的文件，例如board///rootfs-overlay/etc/inittab，设置BR2\_ROOTFS\_OVERLAY=board///rootfs-overlay。
-   创建board///post\_build.sh脚本，设置BR2\_ROOTFS\_POST\_BUILD\_SCRIPT=board///post\_build.sh。
-   如果必须设置setuid权限或创建设备节点，创建board///device\_table.txt，并该路径添加到BR2\_ROOTFS\_DEVICE\_TABLE。
-   如果必须创建其他用户账户，创建board///users\_table.txt，并将该路径添加到BR2\_ROOTFS\_USERS\_TABLES。
-   要将自定义补丁添加到某些软件包，设置BR2\_GLOBAL\_PATCH\_DIR=board///patches/，并为每个需要添加补丁的软件包创建子目录。每个补丁应命名为--.patch。
-   特别是针对Linux内核，还有一个选项BR2\_LINUX\_KERNEL\_PATCH，其主要优点是它可以从指定URL下载补丁。如果不需要此功能，BR2\_GLOBAL\_PATCH\_DIR则是首选。U-Boot、Barebox、at91bootstrap和at91bootstrap3也有单独的选项，但相比BR2\_GLOBAL\_PATCH\_DIR没有任何优势，将来可能会被删除。
-   如果需要添加定制软件包，创建package//并将软件包放在该目录下。创建一个.mk文件，其中包含了所有定制软件包的.mk文件。创建一个Config.in文件，其中包含了所有定制软件包的Config.in文件，然后将该Config.in文件包含到Buildroot的package/Config.in文件。
-   make savedefconfig 保存Buildroot配置。
-   cp defconfig configs/\_defconfig。

## 10\. 常见问题和故障排除

### 10.1 启动网络后引导挂起……

如果boot进程是在显示以下消息后挂起（消息不一定完全相似，具体取决于选择的软件包）：

```
Freeing init memory: 3972K
Initializing random number generator... done.
Starting network...
Starting dropbear sshd: generating rsa key... generating dsa key... OK
```

那么意味着系统正在运行，但没有在串口控制台上启动shell程序。为了使系统在串口控制台上启动shell程序，必须进入Buildroot配置，在System configuration子菜单中修改Run a getty (login prompt) after boot，并在getty options子菜单中设置适当的端口和波特率。这将自动调整生成的/etc/inittab系统文件，以便shell程序在正确的串行端口上启动。

### 10.2 为什么目标系统上没有编译器？

Buildroot已经决定从Buildroot-2012.11版本停止对目标系统上本机编译器的支持，原因：

-   此功能既未维护，也未测试，经常出问题；
-   此功能仅适用于Buildroot工具链；
-   Buildroot主要针对板载资源（CPU、内存、大容量存储）有限的小型或超小型目标硬件，因此在目标机器上编译没有多大意义；
-   Buildroot旨在简化交叉编译，从而无需在目标系统上进行本地编译。

如果仍然需要在目标系统上使用编译器，那Buildroot不适合你的目的。在这种情况下，你需要一个实际的发行版，并且应该选择以下内容：

-   openembedded
-   yocto
-   emdebian
-   Fedora
-   openSUSE ARM
-   Arch Linux ARM
-   ……

### 10.3 为何目标系统上没有开发文件？

由于目标系统上没有可用的编译器（参阅10.2节“为什么目标系统上没有编译器？”），因此浪费空间存储头文件或静态库是没有意义的。

因此，自Buildroot-2012.11版本后，这些文件将会从目标系统删除。

### 10.4 为何目标系统上没有文档？

由于Buildroot主要针对板载资源（CPU、内存、大容量存储）的小型或超小型目标硬件，因此浪费空间存储文档是没有意义的。  
如果仍然需要在目标系统上保留文档数据，那Buildroot不适合你的目的，你需要一个实际的发行版（参阅10.2节“为什么目标系统上没有编译器？”）

### 10.5 为何有些软件包在Buildroot配置菜单中不可见？

如果某个软件包存在于Buildroot目录树中，但是没有出现在Config菜单中，最有可能的原因是未满足该软件包的依赖关系。  
要了解有关软件包依赖项的更多信息，请在配置菜单中搜索该软件包的符号（参阅第8.1节“make技巧”）。

之后，你可能必须递归启用某些选项（与未满足的依赖项对应）才能最终选择该软件包。

如果是由于工具链选项未满足而导致该软件包不可见，那么你需要完全重建才行（有关更多说明，参阅第8.1“make技巧”）。

### 10.6 为何不将target/目录用作chroot目录？

有很多原因不能将target目录用作chroot目录，其中包括：

-   在target目录中，文件所有者、模式、权限并未正确设置；
-   target目录中没有创建设备节点。

由于这些原因，使用target/目录通过chroot命令作为根目录很可能会失败。

如果你通过chroot运行目标文件系统，或将目标文件系统作为NFS根目录，需要以root权限提取images/目录下的tar包镜像。

### 10.7 为何Buildroot不生成二进制软件包（如.deb、.ipkg……）？

Buildroot列表上经常讨论的一项功能是“软件包管理”。总而言之，该想法是增加对软件包安装了哪些文件进行跟踪，目标是：  
当从menuconfig中取消选择某个软件包时，能够删除该软件包安装的文件。

能够生成可以安装在目标系统上的二进制软件包（ipk或其他格式），而无需重新生成新的根文件系统镜像。

通常，大多数人认为这很容易做到：只需跟踪安装了哪个软件包，并在取消选择时将该软件包删除即可。但是，它比这复杂的多：

-   它不仅跟target/目录有关，而且与host//sysroot和host/有关。各种安装包安装到这些目录的文件必须跟踪。
-   从配置中取消选择软件包时，仅删除该软件包安装的文件是不够的。还必须删除其反向依赖关系（即依赖它的软件包）并重新构建这些软件包。例如，软件包A依赖于OpenSSL库。两者都被选中，并且Buildroot被构建。软件包A使用OpenSSL进行加密支持。然后，从配置中取消选择OpenSLL库，但保留了软件包A（OpenSSL是可选依赖项，所所以有这种可能）。如果仅删除OpenSSL的文件，则由软件包A安装的文件将被破坏，它们使用的库已经从目标系统上删除。尽管从技术上讲这是可行的，但它为Buildroot增加了很多复杂性，这与我们一直坚持的简单性原则背道而驰。
-   除了前面提到的问题外，Buildroot甚至不了解可选依赖项。例如，版本1.0的软件包A从未使用过OpenSSL，但是在2.0版本中，它会自动使用OpenSSL（如果有）。如果尚未更新Buildroot的.mk文件以将其考虑在内，则软件包A将不属于OpenSSL的反向依赖关项，在删除OpenSSL时就不会删除并重建软件包A。当然，应该修复软件包的.mk文件添加此可选依赖项，但与此同时，可能出现不可复制的行为。
-   该请求还允许直接将menuconfig中的更改应用于output木，而不必从头开始重新构建所有内容。但是，以一种可靠的方案很难做到这一点：更改包的子选择时会发生什么（我们必须检测到这一点，并从头开始构建，且重建其所有反向依赖项），如果工具链选择改变会发生什么，等等。目前，Buildroot所做的工作既清晰又简单，因为其行为非常可靠，并且易于支持用户。如果在下一次make之后在menuconfig中修改了配置，则它必须保证在所有情况下都能正确地工作，并且不会出现一些异常情况。

基于所有这些原因，得出的结论是，跟踪已安装文件以在取消选择软件包时将其删除或生成软件包的二进制存储库是很难可靠实现的，并且会增加很多复杂性。

在此问题上，Buildroot开发人员发表以下立场声明：

-   Buildroot致力于使生成根文件系统变得很容易（顺便提一下，Buildroot因此得名）。这就是我们想要使Buildroot擅长的：构建根文件系统。
-   Buildroot并不是要成为发行版（或者说是发行版生成器）。大多数Buildroot开发人员都认为，这不是我们应该追求的目标。我们相信，还有比Buildroot更适合生成发行版的其他工具。例如，Open Embedded或openWRT等。
-   我们倾向于将Buildroot推向易于（甚至更容易）生成完整根文件系统的方向，这就是Buildroot在人群中脱颖而出的原因（当然还有其他事情！）。
-   我们认为，对于大多数嵌入式Linux系统，二进制软件包不是必须的，并且可能有害。使用二进制软件包时，意味着可以部分升级系统，这将产生大量可能的软件包版本组合，在嵌入式设备上进行升级之前应先对其进行测试。另一方面，通过一次性升级整个根文件系统镜像来进行完整的系统升级，可以确保部署到嵌入式系统的镜像确实是经过测试和验证的镜像。

### 10.8 如何加快构建过程？

由于Buildroot通常涉及对整个系统进行完整重建，这可能耗时很长。因此，我们提供了下面一些技巧来帮助减少构建时间：

-   使用预构建的外部工具链替代默认的Buildroot内部工具链。使用预编译的Linaro工具链（用于ARM平台）或Sourcery CodeBench工具链（用于ARM、x86、x86-64、MIPS等平台），可以在重建时节省构建工具链的时间，大约可节省15到20分钟。请注意，在系统的其余部分正常工作后，临时使用外部工具链不会阻止你切换回内部工具链（这可能会提供更高级别的自定义）。
-   使用ccache编译缓存（参阅第8.13.3节“在Buildroot中使用ccache”）。  
    了解有关重新构建某个软件包的信息（参阅第8.3节“了解如何重新构建软件包”），但是请注意，有时仍需要完全重建（参阅第8.2节“了解何时需要完全重建”）。
-   确保没有将虚拟机用于运行Buildroot的Linux系统。众所周知，大多数虚拟机技术都会对I/O产生重大的性能影响，这对于构建源代码确实很重要。
-   确保仅使用本地文件，请勿尝试通过NFS进行构建，这会明显减慢构建速度。在本地拥有Buildroot下载文件夹也有帮助。
-   购买新硬件。SSD和大量RAM是加快构建速度的关键。
-   试用顶层并行构建，参阅第8.11节“顶层并行构建”。

## 11\. 已知问题

-   BR2\_TARGET\_LDFLAGS选项不允许包含$符号。例如，以下内容会有问题：BR2\_TARGET\_LDFLAGS="-Wl,-rpath=’$ORIGIN/…/lib’"。
-   libffi软件包不支持SuperH2和ARC体系架构。
-   Sourcery CodeBench 2012.09版本使用SuperH4编译proboom软件包会触发编译器异常。

## 12\. 法律声明和许可

### 12.1 符合开源许可协议

Buildroot的所有最终产品（工具链、根文件系统、内核、引导程序）均包含开源软件，并已获得各种许可。

使用开放源代码软件，可以自由地构建丰富的嵌入式系统，可以从各种软件包中进行选择，但也规定了一些你必须知道和遵守的义务。某些许可协议需要你在产品文档中发布许可协议文本，有些要求你将软件的源代码重新开源。

每个软件包中都记录了有关许可协议的具体要求，你有责任遵守这些要求。为了方便使用，Buildroot可以为你收集一些可能需要的资料。为了生成这些资料，必须在执行make menuconfig、make xconfig或make gconfig后执行以下命令：

```
make legal-info
```

Buildroot将在output/legal-info/目录下输出收集到的与法律有关的资料。在那里，你会发现：

-   README文件，该文件汇总了所产生的资料，并包含了Buildroot无法产生的资料的警告信息。
-   buildroot.config 这是Buildroot的配置文件，通常是使用make menuconfig生成，是重新构建所需的文件。
-   所有软件包的源代码，分别保存在目标和宿主软件包的sources/和host-sources/子目录。设置\_REDISTRIBUTE = NO的软件包的源代码不会保存。应用的补丁也会被保存在series文件中，且与它们所修改的文件具有相同的许可协议。注意：Buildroot将补丁应用到基于autotools的软件包，这些补丁可以在Buildroot的源代码support/libtool目录下找到，由于技术限制，它们不会与软件包源文件一起保存，你可能需要手动收集它们。
-   manifest文件（一个用于目标软件包，一个用于宿主软件包）列出了软件包的配置、版本、许可协议和相关信息。其中某些信息可能未在Buildroot中定义，这些项目将被标记为“未知”。
-   所有软件包的许可协议文本，位于licenses/和host-licenses/目录，分别对应目标和宿主的软件包许可协议。如果未在Buildroot中定义许可协议文本，则不会生成该文件，并且在README中对此进行了警告。

此外，由于技术限制，Buildroot不会生成你需要或可能需要的某些资料，例如某些外部工具链的源码以及Buildroot源代码本身。运行make legal-info，Buildroot会在README文件中生成警告，以通知你无法保存的资料。

此外，请记住，make legal-info的输出基于每个软件包配置文件中的声明性语句。Buildroot开发人员会尽最大努力使这些声明性语句尽可能准确。但是，这些声明性陈述很可能不全部准确或完整，你（或你的法律部门）务必先检查make legal-info的输出再将其用作自己的合规性支付。请参阅Buildroot发行版根目录下COPYING文件中的NO WARRANTY语句（第11和12条）。

### 12.2 符合Buildroot许可协议

Buildroot本身是开源软件，根据GNU通用公共许可协议第2版或任何更高版本发布，以下介绍的软件包补丁程序除外。但是，作为构建系统，它通常不是最终产品的一部分：如果你为设备开发根文件系统、内核、引导加载程序或工具链，则Buildroot的代码仅出现在开发机上，而不会出现在设备上。

但是，Buildroot开发人员的普遍看法是，在发布包含GPL许可协议的软件产品时，你应该发布Buildroot源代码以及其他软件包的源代码。这是因为GNU GPL将可执行文件的“完整源代码”定义为“它包含的所有模块的源代码、相关的接口定义文件，以及用于控制可执行文件编译和运行的脚本”。Buildroot是用于控制可执行文件编译和安装的脚本的一部分，因此，它被视为必须重新发布的资料的一部分。

请记住，这只是Buildroot开发人员的意见，如有任何疑问，请咨询法律部门或律师。

#### 12.2.1 软件包补丁

Buildroot还捆绑了补丁文件，这些补丁文件应用于各种软件包的源代码。这些补丁程序不受Buildroot许可的保护。相反，它们应该受到应用补丁的软件包的许可保护。当上述软件包在多个许可协议下均可用时，Buildroot补丁程序仅在可公开访问的许可协议下提供。

有关技术细节，请参阅第18章“软件包补丁”。

## 13\. Buildroot进阶

### 13.1 引导生成的镜像

#### 13.1.1 NFS引导

要支持NFS引导，在Filesystem images菜单中启用tar根文件系统。

构建完成后，只需运行以下命令来设置NFS根目录：

```
sudo tar -xavf /path/to/output_dir/rootfs.tar -C /path/to/nfs_root_dir
```

请记得将该路径添加到/etc/exports。

之后，你就可以从目标机器上执行NFS引导。

### 13.2 引导CD

要生成引导CD镜像，请在Filesystem images菜单启用ios镜像选项。注意，此选项仅对x86和x86-64平台有效。

可以使用IsoLinux、Grub或Grub2作为引导加载程序构建引导CD镜像，但只有IsoLinux支持将此镜像同时用作引导CD和引导USB（通过Build bybrid镜像选项）。

可以使用QEMU测试引导CD镜像：

```
qemu-system-i386 -cdrom output/images/rootfs.iso9660
```

或者如果是bybrid ISO也可以将其用作硬盘镜像：

```
qemu-system-i386 -hda output/images/rootfs.iso9660
```

可以使用dd命令轻松地烧录至USB驱动器：

```
dd if=output/images/rootfs.iso9660 of=/dev/sdb
```

### 13.2 Chroot

如果要在生成的镜像中使用chroot，则应注意的几件事：

-   应该从tar根文件系统镜像设置新的根。
-   所选目标机体系结构要与宿主机兼容，或者使用qemu-\*二进制文件并在binfmt中设置正确的属性，以便能够在宿主机上运行为目标机构建的二进制文件。
-   Buildroot里目前不提供host-qemu和binfmt的正确构建和设置。

## 第三部分

## 14\. Buildroot是如何工作的

综上所述，Buildroot基本上就是一组Makefile，可以使用正确的选项下载、配置和编译软件。它还包括各种软件包补丁-主要是交叉编译工具链的那些（gcc、binutils和uClibc）。

每个软件包基本上只要一个Makefile，并且以.mk扩展名命名。Makefile分为许多不同的部分：

-   toolchain/ 目录包含与交叉编译工具链有关的所有软件包的Makefiles文件和其他文件：binutils、gcc、gdb、kernel-headers和uClibc。
-   arch/ 目录包含Buildroot支持的所有处理器体系结构的定义。
-   package/ 目录包含Buildroot可以编译并添加到目标根文件系统的所有用户空间的工具和库的Makefiles和相关文件，每个软件包都有一个子目录。
-   linux/ 目录包含Linux内核的Makefiles和相关文件。
-   boot/ 目录包含Buildroot支持的引导加载程序的Makefiles和相关文件。
-   system/ 目录包含对系统集成的支持，例如目标文件系统框架和初始化系统。
-   fs/ 目录包含生成目标根文件系统镜像相关的Makefiles和相关文件。

每个软件包子目录至少包含两个文件：

-   something.mk 是下载、配置、编译和安装something软件包的Makefile文件。
-   Config.in 是配置描述工具的一部分，它描述了软件包有关的选项。

主Makefile执行以下步骤（一旦完成配置）：

-   创建所有的输出目录：在输出目录下（默认为output/，可以使用O=选项指定）创建staging、target、build等。
-   构建目标工具链。当使用内部工具链时，这意味着生成交叉编译工具链。使用外部工具链时，这意味着检查外部工具链的功能并将其导入Buildroot变量。
-   构建TARGETS变量列出的所有目标。该变量由所有单个组件的Makefile填充。生成这些目标将触发用户空间软件包（库、程序等）、内核、引导加载程序以及根文件系统镜像的生成，具体取决于配置。

## 15\. 编码样式

总体而言，这些编码样式规则可以帮助你在Buildroot中添加新文件或重构现有文件。

如果你稍微修改了一些现有文件，那么重要的是保持整个文件的一致性，因此你可以：

-   要么遵循此文件中使用的可能不推荐使用的编码样式，
-   要么重做以使其符合这些规则。

### 15.1 Config.in

Config.in文件包含了几乎所有在Buildroot中可配置的选项。示例：

```
config BR2_PACKAGE_LIBFOO
bool "libfoo"
depends on BR2_PACKAGE_LIBBAZ
select BR2_PACKAGE_LIBBAR
help
  This is a comment that explains what libfoo is. The help text
  should be wrapped.

  http://foosoftware.org/libfoo/
```

-   bool、depends on、select和help行缩进一个Tab。
-   help文本本身缩进一个Tab加两个空格。
-   help文本应换行使其每行长度小于72列，其中制表符占8列，因此文本本身为62个字符。

Config.in是Buildroot使用的配置工具（通常为kconfig）的输入。有关kconfig语言的更多详细信息，请参阅[http://kernel.org/doc/Documentation/kbuild/kconfig-language.txt](http://kernel.org/doc/Documentation/kbuild/kconfig-language.txt)。

### 15.2 .mk

-   头部：mk文件以header开始。它包含模块名称，最好用小写，并包含在由80个哈希组成的分隔符之间。在header后必须有一个空行。

```
################################################################################
#
# libfoo
#
################################################################################
```

-   分配：在=前后各有一个空格，注意不要试图对齐等于号。

```
LIBFOO_VERSION = 1.0
LIBFOO_CONF_OPTS += --without-python-support
```

-   定义：使用制表符缩进。注意，define块内的命令应始终以Tab缩进开头，make会将此识别为命令。

```
define LIBFOO_REMOVE_DOC
$(RM) -fr $(TARGET_DIR)/usr/share/libfoo/doc \
$(TARGET_DIR)/usr/share/man/man3/libfoo*
endef
```

-   可选依赖项：
    -   首选多行语法
    -   保持配置选项和依赖项紧密靠近。

建议：

```
ifeq ($(BR2_PACKAGE_PYTHON),y)
LIBFOO_CONF_OPTS += --with-python-support
LIBFOO_DEPENDENCIES += python
else
LIBFOO_CONF_OPTS += --without-python-support
endif
```

不建议：

```
LIBFOO_CONF_OPTS += --with$(if $(BR2_PACKAGE_PYTHON),,out)-python-support
LIBFOO_DEPENDENCIES += $(if $(BR2_PACKAGE_PYTHON),python,)
```

-   可选hook：在代码块内保持hook声明和定义在一起。

正确：

```
ifneq ($(BR2_LIBFOO_INSTALL_DATA),y)
define LIBFOO_REMOVE_DATA
        $(RM) -fr $(TARGET_DIR)/usr/share/libfoo/data
endf
LIBFOO_POST_INSTALL_TARGET_HOOKS += LIBFOO_REMOVE_DATA
endif
```

错误：

```
define LIBFOO_REMOVE_DATA
        $(RM) -fr $(TARGET_DIR)/usr/share/libfoo/data
endef

ifneq ($(BR2_LIBFOO_INSTALL_DATA),y)
LIBFOO_POST_INSTALL_TARGET_HOOKS += LIBFOO_REMOVE_DATA
endif
```

### 15.3 文档

文档使用asciidoc格式。有关asciidoc语法的更多详细信息，请参见[http://www.methods.co.nz/asciidoc/userguide.html](http://www.methods.co.nz/asciidoc/userguide.html)。

### 15.4 支持脚本

support/和utils/目录中的某些脚本是用Python编写的，应遵循PEP8 Style Guide for Python Code的要求。

## 16\. 为特定目标主板添加支持

Buildroot包含一些公开可用的主板的基本配置，因此使用这些主板的用户可以轻松地构建已知可以正常运行的系统。欢迎您为Buildroot添加对其他目标主板的支持。

为此，你需要创建一个普通的Buildroot配置，该配置为硬件构建一个基本系统，包含工具链、内核、引导加载程序、文件系统和一个简单的仅用户空间的BusyBox。不应该选择特定的软件包，配置应尽可能少，并且应仅为目标平台构建可运行的基本BusyBox系统。当然，你可以为内部项目使用更复杂的配置，但Buildroot项目仅集成基本的目标主板配置。这是因为软件包的选择是高度特定于应用程序的。

一旦你配置好了选项，运行make savedefconfig命令，这将在Buildroot根目录树下生成一个最小化的defconfig文件。将该文件移动到configs目录，并重命名为\_defconfig。

建议尽可能使用Linux内核和引导加载程序的最新版本，并尽可能保持默认内核和引导加载程序配置。如果它们对您的主板不正确或不存在默认值，建议将问题发送给对应的开发人员。

但是，与此同时，你可能需要存储特定于目标主板的内核或引导加载程序的配置或补丁。为此，创建board/目录及子目录board//，然后你可以将补丁程序和配置存储在这些目录中，并从Buildroot主配置中引用他们。参考第9章“定制项目”。

## 17\. 将软件包添加到Buildroot

本节介绍如何将新软件包（用户空间的库或应用程序）集成到Buildroot中。它还显示了如何集成现有的软件包，这是解决问题或调整其配置所必须的。

添加新软件包时，请确保在各种条件下对其进行测试（请参阅第17.23.3节“如何测试您的软件包”），并检查其编码格式（请参阅第17.23.2“如何检查编码格式”）。

### 17.1 软件包目录

首先，在package目录下为你的软件包创建子目录，例如libfoo。

一些软件包已经通过主题子目录进行了分组，如x11r7、qt5和gstreamer。如果你的软件包属于这些类别，请在这些类别中创建软件包目录。不建议使用新的子目录。

### 17.2 Config配置文件

为了使软件包显示在配置界面中，你需要在软件包目录中创建一个Config文件。有两种类型：Config.in和Config.in.host。

#### 17.2.1 Config.in

对于目标机上使用的软件包，创建一个名为Config.in的配置文件。该文件包含与软件包libfoo相关的选项说明，这些选项说明将在配置界面中使用和显示。它基本上包含：

```
config BR2_PACKAGE_LIBFOO
        bool "libfoo"
        help
          This is a comment that explains what libfoo is. The help text
          should be wrapped.

          http://foosoftware.org/libfoo/
```

bool、help行以及其他元数据信息行必须使用一个Tab缩进。帮助文本本身应缩进一个Tab和两个空格，且应换行以适应72列，其中制表符占8字符，因此实际文本本身应以62个字符换行。帮助文本后空一行，说明软件包的URL。

按照Buildroot的约定，属性的顺序如下：

1.  bool、string……：选项类型
2.  default：默认值，如果需要
3.  depends on：对目标机的依赖项
4.  depends on：对工具链的依赖项
5.  depends on：对其他软件包的依赖项
6.  select：需要选择的依赖项
7.  help：帮助文本

你可以在if BR2\_PACKAGE\_LIBFOO…endif语句中添加其他子选项以配置软件中的特定内容，你可以在其他软件包中查看示例。Config.in文件的语法与内核Kconfig文件的语法相同。有关此语法的文档，请参阅：[http://kernel.org/doc/Documentation/kbuild/kconfig-language.txt](http://kernel.org/doc/Documentation/kbuild/kconfig-language.txt)。

最后，你必须将新软件包的libfoo/Config.in添加到package/Config.in（如果你决定将该软件包放到子类别下，则添加到该类别的子目录中）。其中包含的文件按类别按字母顺序排序，除了软件包的名称外不应包含任何其他内容。

#### 17.2.2 Config.in.host

一些软件包还需要为宿主机系统构建。这里有两个选项：

-   如果宿主机软件包只是为了满足一个或多个目标机软件包构建时的依赖项，在这种情况下，仅需在目标软件包的BAR\_DEPENDENCIES变量添加host-foo依赖即可，无需创建Config.in.host文件。
-   宿主机软件包需要用户从配置菜单中明确选择，在这种情况下，请为该软件包创建

```
Config.in.host文件：
config BR2_PACKAGE_HOST_FOO
        bool "host foo"
        help
          This is a comment that explains what foo for the host is.

          http://foosoftware.org/foo/
```

其编码样式和选项与Config.in文件相同。

最后，你必须将新添加的libfoo/Config.in.host添加到package/Config.in.host文件。其中包含的文件按字母顺序排序，除了软件包的名称外不应包含任何其他内容。之后，就可以从Host utilities菜单中看到该软件包。

```
source "package/foo/Config.in.host"
```

#### 17.2.3 选择depends on或select

软件包的Config.in文件需要确保正确设置了依赖关系。通常，Buildroot使用以下规则：

-   使用select指明对库的依赖关系。这些依赖关系通常并不明显，因此让kconfig系统确保选择了依赖项是有意义的。例如，libgtk2软件包使用select BR2\_PACKAGE\_LIBGLIB2确保libglib2库被启用。
-   当用户确实需要了解依赖关系时，使用depends on指明依赖关系。通常，Buildroot使用这种类型的依赖关系来实现对目标体系结构、MMU和工具链的依赖关系（参阅第17.2.4“对目标和工具链选项的依赖”）或对“大”事物（例如X.org系统）的依赖关系。

_注意，当前kconfig语言的问题是，这两个依赖项语义没有内部链接。因此，可以选择依赖项未满足要求的软件包。_

一个同时使用select和depends on的示例：

```
config BR2_PACKAGE_RRDTOOL
        bool "rrdtool"
        depends on BR2_USE_WCHAR
        select BR2_PACKAGE_FREETYPE
        select BR2_PACKAGE_LIBART
        select BR2_PACKAGE_LIBPNG
        select BR2_PACKAGE_ZLIB
        help
          RRDtool is the OpenSource industry standard, high performance
          data logging and graphing system for time series data.

          http://oss.oetiker.ch/rrdtool/

comment "rrdtool needs a toolchain w/ wchar"
        depends on !BR2_USE_WCHAR
```

请注意，这两种依赖关系仅相同类型的依赖关系可以传递。这意味着以下示例：

```
config BR2_PACKAGE_A
        bool "Package A"

config BR2_PACKAGE_B
        bool "Package B"
        depends on BR2_PACKAGE_A

config BR2_PACKAGE_C
        bool "Package C"
        depends on BR2_PACKAGE_B

config BR2_PACKAGE_D
        bool "Package D"
        select BR2_PACKAGE_B

config BR2_PACKAGE_E
        bool "Package E"
        select BR2_PACKAGE_D
```

软件包C仅在软件包B已选择时才可见，且B仅在A已选择时才可见。

若选择软件包E，则软件包D、B将同时被选择，此时不会判断软件包B的依赖项，因此不会选择软件包A。

由于软件包B被选择，而软件包A未选择，因此违反了软件包B对软件包A的依赖关系。因此，在这种情况下，必须显示添加传递依赖项：

```
config BR2_PACKAGE_D
        bool "Package D"
        select BR2_PACKAGE_B
        depends on BR2_PACKAGE_A

config BR2_PACKAGE_E
        bool "Package E"
        select BR2_PACKAGE_D
        depends on BR2_PACKAGE_A
```

总体而言，对于软件包的依赖关系，select应该是首选。

请注意，这些依赖关系仅确保启用了依赖项，但不一定在构建你的软件包之前构建。为此，还需要在.mk文件中明确依赖项。

进一步的样式细节，请参阅第15章“编码样式”。

#### 17.2.4 对目标和工具链选项的依赖

很多软件包依赖于工具链的某些选项：C库的选择、C++支持、线程支持、RPC支持、wchar支持或动态库支持等。某些软件包只能在某些目标体系结构上构建，或者需要CPU支持MMU才可以构建。

这些依赖关系必须在Config.in文件中用适当的depends on语句声明。此外，对于工具链选项的依赖，当选择未开启时需要显示一段提示文本，以使用户明白为什么软件包不可用。对目标体系结构或MMU支持的依赖不应该在注释中显示：因为用户不太可能可以自由选择另一个目标体系结构，因此明确这些依赖关系没有任何意义。  
只有当配置选项本身在满足工具链选项依赖关系可见时，注释才应该可见。这意味着必须在注释中重复软件包的所有其他依赖项（包括对目标体系结构和MMU支持的依赖）。为了保持简洁，对非工具链选项的depends on语句应与对工具链选项的depends on语句分开。如果对同一文件（通常是主程序包）中的配置选项存在依赖关系，那么最好使用全局if……elseif结构，而不是在注释和其他配置选项上重复该depends on语句。

软件包的依赖项注释的一般格式为：

```
foo needs a toolchain w/ featA, featB, featC
mpd needs a toolchain w/ C++, threads, wchar
crda needs a toolchain w/ threads
```

注意，注释文本应保持简短，以使其适合80个字符的终端。

本节的剩余部分列举了不同的目标体系结构和工具链选项、要依赖的配置符号以及在注释中使用的文本。

-   目标体系结构
    -   依赖符号：BR2\_powerpc，BR2\_mips……（请参阅arch/Config.in）
    -   注释文本：无需添加注释
-   MMU支持
    -   依赖符号： BR2\_USE\_MMU
    -   注释文本：无需添加注释
-   Gcc\_sync\* 用于原子操作的GCC内置函数，有1字节、2字节、4字节及8字节的变体版本可用。由于不同的体系结构支持不同大小的原子操作，因此每种大小都有一个依赖符号。
    -   依赖符号： BR2\_TOOLCHAIN\_HAS\_SYNC\_1 、BR2\_TOOLCHAIN\_HAS\_SYNC\_2、BR2\_TOOLCHAIN\_HAS\_SYNC\_4、BR2\_TOOLCHAIN\_HAS\_SYNC\_8
    -   注释文本：无需添加注释
-   Gcc\_atomic\* 用于原子操作的GCC内置函数。
    -   依赖符号： BR2\_TOOLCHAIN\_HAS\_ATOMIC
    -   注释文本：无需添加注释
-   内核头文件
    -   依赖符号：BR2\_TOOLCHAIN\_HEADERS\_AT\_LEAST\_X\_Y（将X\_Y替换为正确的版本，参加toolchain/Config.in）
    -   注释文本：headers >= X.Y and/or headers <= X.Y（将X\_Y替换为正确的版本）
-   Gcc版本
    -   依赖符号：BR2\_TOOLCHAIN\_GCC\_AT\_LEAST\_X\_Y（将X\_Y替换为正确的版本）
    -   注释文本：gcc >= X.Y and/or gcc <= X.Y
-   宿主系统Gcc版本
    -   依赖符号：BR2\_HOST\_GCC\_AT\_LEAST\_X\_Y（将X\_Y替换为正确的版本）
    -   注释文本：无需添加注释  
        注意，通常不是软件包本身需要宿主系统Gcc最小版本限制，而是它所依赖的宿主机软件包需要。
-   C库
    -   依赖符号：BR2\_TOOLCHAIN\_USES\_GLIBC， BR2\_TOOLCHAIN\_USES\_MUSL，BR2\_TOOLCHAIN\_USES\_UCLIBC
    -   注释文本：对于C库，使用的注释文本略有不同，如foo needs a glibc toolchain或foo needs a glibc toolchain w/ C++
-   C++支持
    -   依赖符号：BR2\_INSTALL\_LIBSTDCPP
    -   注释文本：C++
-   D支持
    -   依赖符号：BR2\_TOOLCHAIN\_HAS\_DLANG
    -   注释文本：Dlang
-   Fortran支持
    -   依赖符号：BR2\_TOOLCHAIN\_HAS\_FORTRAN
    -   注释文本：fortran
-   thread支持
    -   依赖符号：BR2\_TOOLCHAIN\_HAS\_THREADS
    -   注释文本：threads（除非BR2\_TOOLCHAIN\_HAS\_THREADS\_NPTL 也需要，在这种情况下，仅指定NPTL就足够了）
-   NPTL thread支持
    -   依赖符号：BR2\_TOOLCHAIN\_HAS\_THREADS\_NPTL
    -   注释文本：NPTL
-   RPC支持
    -   依赖符号：BR2\_TOOLCHAIN\_HAS\_NATIVE\_RPC
    -   注释文本：RPC
-   wchar支持
    -   依赖符号：BR2\_USE\_WCHAR
    -   注释文本：wchar
-   动态库
    -   依赖符号： !BR2\_STATIC\_LIBS
    -   注释文本：dynamic library

#### 17.2.5 对Linux内核的依赖

一些软件包需要Linux内核才能由Buildroot构建，这些通常是内核模块或固件。应该在Config.in文件中添加注释以表名这种依赖性，类似于对工具链选项的依赖。通用格式为：

```
foo needs a Linux kernel to be built
```

如果同时依赖于工具链选项和Linux内核，请使用以下格式：

```
foo needs a toolchain w/ featA, featB, featC and a Linux kernel to be built
```

#### 17.2.6 对udev设备管理的依赖

如果软件包需要udev设备管理，则应依赖于BR2\_PACKAGE\_HAS\_UDEV，并添加以下注释：

```
foo needs udev /dev management
```

如果同时依赖于工具链选项和udev设备管理，请使用以下格式：

```
foo needs udev /dev management and a toolchain w/ featA, featB, featC
```

#### 17.2.7 对虚拟软件包的依赖

某些功能可以由多个软件包提供，例如OpenGL库。有关虚拟软件包的更多信息，请参阅第17.11节“虚拟软件包的基础结构”。

### 17.3 .mk文件

最后，也是最难的部分，创建一个名为libfoo.mk的文件。它描述了如何下载、配置、构建和安装软件包。

根据软件包的类型，.mk文件必须使用不同的基础结构以不同的方式写入文件：

-   通用的Makefile（不使用autotools或CMake）：与基于autotools的软件包的Makefile基础结构类似，但是需要开发人员做更多的工作。它们指明了应如何配置、编译和安装软件包。此基础结构必须用于所有不使用autotools的软件包。将来，可能会为其他构建系统编写其专用基础结构，我们将通过教程和参考资料来介绍它们。
-   基于autotools的Makefile（autoconf、automake等）：由于autotools是非常常见的构建系统，因此Buildroot为此类软件包提供了专用的基础结构。此基础结构必须用于依赖autotools作为其构建系统的软件包。
-   基于CMake的Makefile：由于CMake构建系统越来越常用且具有标准化行为，Buildroot为此类软件包提供了专用的基础结构。此基础结构必须用于依赖CMake作为其构建系统的软件包。
-   Python模块的Makefile：针对使用distutils或setuptools机制的Python模块，Buildroot提供了专用的基础结构。
-   Lua模块的Makefile：通过LuaRocks网站可使用Lua模块的专用基础结构。

更多样式细节，参阅[https://buildroot.org/downloads/manual/manual.html#writing-rules-mk](https://buildroot.org/downloads/manual/manual.html#writing-rules-mk)。

### 17.4 .hash文件

如果可能，你必须添加一个名为lifoo.hash的文件，它包含了libfoo软件包下载文件的哈希值。不添加.hash文件的唯一原因是由于软件包的下载方式无法进行哈希检查。  
当软件包有多个版本可选择时，哈希文件可以存储在以版本号命名的子目录中，例如package/libfoo/1.2.3/libfoo.hash。如果不同版本具有不同的许可条款，但他们又存储在同一文件中，这一点尤其重要。否则，哈希文件应保留在软件包的目录中。  
存储在该文件中的哈希值用于验证下载文件和许可文件的完整性。

该文件的格式为每行一个文件，每行包含以下三个字段，并个两个空格隔开：

-   哈希类型，取以下值之一：
    -   md5、sha1、sha224、sha256、sha384、sha512、none
-   哈希值
    -   none：一个或多个非空字符，通常使用字符串xxx
    -   md5：32个十六进制字符
    -   sha1：40个十六进制字符
    -   sha224：56个十六进制字符
    -   sha256：64个十六进制字符
    -   sha384：96个十六进制字符
    -   sha512：128个十六进制字符
-   文件名
    -   源文件：文件名称，不包含目录
    -   许可文件：FOO\_LICENSE\_FILES设置的文件路径

以#开头的行为注释。注释及空行将被忽略。

一个文件可以有多个哈希值，每个哈希值单独一行。在这种情况下，所有哈希值都必须匹配。

_注意：理想情况下，哈希文件中存储的哈希值应与软件提供商在官网、邮件中发布的哈希值匹配。如果软件提供商提供了多种类型的哈希（如sha1和sha512），则最好添加所有这些哈希值。如果软件提供商不提供任何哈希值，或仅提供md5哈希，则最好自己再计算一个强哈希值（最好是sha256），并在.hash文件的注释行中说明。_

_注意：许可文件的哈希值用于检查软件包版本变更时其许可文件是否变更，在make legal-info运行期间检查许可文件的哈希。对于具有多个版本的软件包（如Qt5），创建子目录并在子目录中创建.hash文件（请参阅第18.2节“如何应用补丁”）。_

哈希类型none用于从仓库下载，如git clone或svnsersion checkout等。

以下示例展示了libfoo-1.2.3.tar.bz2软件包的哈希定义：

```
# Hashes from: http://www.foosoftware.org/download/libfoo-1.2.3.tar.bz2.{sha1,sha256}:
sha1  486fb55c3efa71148fe07895fd713ea3a5ae343a  libfoo-1.2.3.tar.bz2
sha256  efc8103cc3bcb06bda6a781532d12701eb081ad83e8f90004b39ab81b65d4369  libfoo-1.2.3.tar.bz2

# md5 from: http://www.foosoftware.org/download/libfoo-1.2.3.tar.bz2.md5, sha256 locally computed:
md5  2d608f3c318c6b7557d551a5a09314f03452f1a1  libfoo-data.bin
sha256  01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b  libfoo-data.bin

# Locally computed:
sha256  ff52101fb90bbfc3fe9475e425688c660f46216d7e751c4bbdb1dc85cdccacb9  libfoo-fix-blabla.patch

# No hash for 1234:
none  xxx  libfoo-1234.tar.gz

# Hash for license files:
sha256  a45a845012742796534f7e91fe623262ccfb99460a2bd04015bd28d66fba95b8  COPYING
sha256  01b1f9f2c8ee648a7a596a1abe8aa4ed7899b1c9e5551bda06da6e422b04aa55  doc/COPYING.LGPL
```

如果.hash文件存在，并且其中包含一个或多个下载文件的哈希，则Buildroot计算出的哈希必须与.hash文件中存储的哈希匹配。如果一个或多个哈希不匹配，Buildroot会认为下载错误，将删除并终止任务。

如果.hash文件存在，但不不含下载文件的哈希，则Buildroot会认为是错误并终止任务。但是，下载的文件会保留在下载目录中，因为这通常表示.hash文件错误，而下载的文件可能没有问题。

当前会检测从http/ftp服务器、Git仓库、scp复制的文件及本地文件的哈希值，不检查其他版本控制系统（如SVN、CVS等）的哈希。因为从这些版本控制系统下载源码时，Buildroot无法生成可再现的tar包。

应该仅保存稳定文件的哈希值在.hash文件中。例如，不能保证由Github自动生成的补丁是稳定的，因此其哈希值会随着时间而变化。此类补丁不应下载，而应该添加到本地软件包目录。

如果.hash文件不存在，则完全不进行检查。

### 17.5 具有特定构建系统的软件包的基础结构

具有特定构建系统的软件包，是指其构建系统不是标准的autotools或CMake等的软件包，通常其构建系统基于手写的Makefile或Shell脚本。

#### 17.5.1 通用软件包教程

```
01: ################################################################################
02: #
03: # libfoo
04: #
05: ################################################################################
06:
07: LIBFOO_VERSION = 1.0
08: LIBFOO_SOURCE = libfoo-$(LIBFOO_VERSION).tar.gz
09: LIBFOO_SITE = http://www.foosoftware.org/download
10: LIBFOO_LICENSE = GPL-3.0+
11: LIBFOO_LICENSE_FILES = COPYING
12: LIBFOO_INSTALL_STAGING = YES
13: LIBFOO_CONFIG_SCRIPTS = libfoo-config
14: LIBFOO_DEPENDENCIES = host-libaaa libbbb
15:
16: define LIBFOO_BUILD_CMDS
17:     $(MAKE) $(TARGET_CONFIGURE_OPTS) -C $(@D) all
18: endef
19:
20: define LIBFOO_INSTALL_STAGING_CMDS
21:     $(INSTALL) -D -m 0755 $(@D)/libfoo.a $(STAGING_DIR)/usr/lib/libfoo.a
22:     $(INSTALL) -D -m 0644 $(@D)/foo.h $(STAGING_DIR)/usr/include/foo.h
23:     $(INSTALL) -D -m 0755 $(@D)/libfoo.so* $(STAGING_DIR)/usr/lib
24: endef
25:
26: define LIBFOO_INSTALL_TARGET_CMDS
27:     $(INSTALL) -D -m 0755 $(@D)/libfoo.so* $(TARGET_DIR)/usr/lib
28:     $(INSTALL) -d -m 0755 $(TARGET_DIR)/etc/foo.d
29: endef
30:
31: define LIBFOO_USERS
32:     foo -1 libfoo -1 * - - - LibFoo daemon
33: endef
34:
35: define LIBFOO_DEVICES
36:     /dev/foo  c  666  0  0  42  0  -  -  -
37: endef
38:
39: define LIBFOO_PERMISSIONS
40:     /bin/foo  f  4755  foo  libfoo   -  -  -  -  -
41: endef
42:
43: $(eval $(generic-package))
```

该Makefile文件从第7行至11行是元数据信息：软件包的版本（LIBFOO\_VERSION）、包含该软件包的tar包的名称（LIBFOO\_SOURCE）（建议适用.xz.tar包）以及下载连接（LIBFOO\_SITE）、许可协议类型（LIBFOO\_LICENSE）及许可协议文本（LIBFOO\_LICENSE\_FILES）。所有变量都必须以相同的前缀开头，本例中是LIBFOO\_。该前缀始终是软件包名称的大写字母（请参阅下文了解如何定义软件包名称）。

第12行，我们指定此软件包要在staging空间中安装一些东西。通常库会要求这么做，因为他们必须在staging空间安装头文件和库文件。这将确保LIBFOO\_INSTALL\_STAGING\_CMDS变量列出的命令被执行。

第13行，我们指定对LIBFOO\_INSTALL\_STAGING\_CMDS阶段安装的某些文件使用libfoo-config进行修复。这些\*-config文件是可执行的shell脚本文件，位于$(STAGING\_DIR)/usr/bin目录，并由其他第三方包执行，以查找此特定包的位置和链接标志。

问题是，默认情况下，所有这些\*-config文件默认都是错误的，宿主机的链接标志不适合交叉编译。例如，-I/usr/include使用-I ( S T A G I N G D I R ) / u s r / i n c l u d e 代 替 ， − L / u s r / l i b 使 用 − L (STAGING\_DIR)/usr/include代替，-L/usr/lib使用-L (STAGINGDIR)/usr/include代替，−L/usr/lib使用−L(STAGING\_DIR)/usr/lib代替。因此，对这些脚本做了一些变换，以使它们给出正确的标志。提供给LIBFOO\_CONFIG\_SCRIPTS的参数是需要修复的shell脚本的文件名，所有这些文件名都是相对于$(STAGING\_DIR)/usr/bin的。如果需要，可以指定多个文件名，以空格分隔。

此外，LIBFOO\_CONFIG\_SCRIPTS列出的脚本会从$(TARGET\_DIR)/usr/bin移除，因为目标系统并不需要这些文件。

示例17.1 配置脚本：divine软件包  
divine软件包将安装$(STAGING\_DIR)/usr/bin/divine-config脚本。

```
IVINE_CONFIG_SCRIPTS = divine-config
```

示例17.2 配置脚本：imagemagick软件包  
软件包imagemagick将安装以下脚本：$(STAGING\_DIR)/usr/bin/{Magick,Magick++,MagickCore,MagickWand,Wand}-config，其配置为：

```
IMAGEMAGICK_CONFIG_SCRIPTS = \
   Magick-config Magick++-config \
   MagickCore-config MagickWand-config Wand-config
```

第14行，我们指定此程序包所依赖的库列表。这些依赖以软件包的小写名称列出，可以是目标软件包（不带host-前缀），也可以是宿主软件包（带host-前缀）。Buildroot将确保在当前软件包编译之前其他软件包已构建并安装完成。

Makefile的其余部分，第16到29行，定义了在软件包配置、编译和安装的不同步骤应执行的操作。LIBFOO\_BUILD\_CMDS指定应该执行哪些步骤以构建软件包，LIBFOO\_INSTALL\_STAGING\_CMDS指定应执行哪些步骤以在staging目录中安装软件包，LIBFOO\_INSTALL\_TARGET\_CMDS指定应执行哪些步骤才能将软件包安装到目标空间中。

所有这些步骤都依赖 $(@D)变量，该变量包含已提取的软件包源码目录。

第31到33行，我们定义了一个该软件包使用的用户（LIBFOO\_USERS）。例如，以非root用户身份运行守护进程。

第35到37行，我们定义了一个该软件包使用的设备节点文件（LIBFOO\_DEVICES）。

第39到41行，我们定义了该软件包安装的特定文件的权限（LIBFOO\_PERMISSIONS）。

最后，第43行，调用generic-package函数，该函数根据之前定义的变量生成软件包的Makefile代码。

#### 17.5.2 通用软件包参考

通用目标有两个变体。generic-package宏用于交叉编译目标软件包，host-generic-package宏用于编译宿主软件包。可以在一个.mk文件中调用它们：一次创建规则以生成目标软件包，一次创建规则生成宿主软件包。

```
$(eval $(generic-package))
$(eval $(host-generic-package))
```

如果目标软件包的编译需要在宿主机上安装一些工具，这可能会很有用。如果软件包名称为libfoo，则目标软件包的名称也为libfoo，而宿主软件包的名称为host-libfoo。如果有其他软件包依赖该软件包，则在其他软件包的DEPENDENCIES变量中使用libfoo或host-libfoo。

generic-package和host-generic-package宏的调用必须位于.mk文件的最后，且host-generic-package宏位于generic-package宏之后。

对于目标软件包，generic-package宏会使用.mk文件定义的以LIBFOO-\*作为前缀的变量，host-generic-package宏使用HOST\_LIBFOO\_\*为前缀的变量。对于某些变量，如果不存在HOST\_LIBFOO\_为前缀的变量，则使用LIBFOO\_为前缀的变量。

.mk文件中可以用来设置元数据信息的变量有（假设软件包名称为libfoo）：

-   LIBFOO\_VERSION 必填，软件包的版本。请注意，如果HOST\_LIBFOO\_VERSION不存在，则使用LIBFOO\_VERSION。它也可以是修订号或从版本控制系统中获取的TAG。例如：
    -   版本号：LIBFOO\_VERSION = 0.1.2
    -   GIT提交ID：LIBFOO\_VERSION = cb9d6aa9429e838f0e54faa3d455bcbab5eef057
    -   GIT TAG：LIBFOO\_VERSION = v0.1.2  
        注意：不可以使用GIT分支名作为LIBFOO\_VERSION，因为它不起作用并且不像我们期望的那样：
        -   由于本地缓存，Buildroot不会重新获取该仓库，因此希望能够访问远程仓库的人会感到非常惊讶和失望。
        -   由于GIT分支随时都会有提交，所以两个用户使用相同的Buildroot构建相同的配置可能获取到不同的软件源码，从而导致构建结果不同。
-   LIBFOO\_SOURCE 可选，指定软件包的tar包名称，Buildroot会使用该名称从LIBFOO\_SITE下载其源码。如果HOST\_LIBFOO\_SOURCE未指定，则默认为LIBFOO\_SOURCE。如果未指定，则默认值为libfoo-$(LIBFOO\_VERSION).tar.gz。例如：LIBFOO\_SOURCE = foobar-$(LIBFOO\_VERSION).tar.bz2。
-   LIBFOO\_PATCH 可选，指定补丁文件列表，以空格分隔。Buildroot会下载该补丁并将其应用于软件包源码。如果指定的文件名包括://，则Buildroot将假定它是完整的URL并从该位置下载补丁，否则将从LIBFOO\_SITE下载。如果- HOST\_LIBFOO\_PATCH未指定，则默认为LIBFOO\_PATCH。请注意，Buildroot本身包含的补丁程序使用不同的机制：Buildroot package目录中存在的所有\*.patch补丁将在提取源码后应用于该软件包。LIBFOO\_PATCH指定的补丁先与package目录中的补丁被应用。
-   LIBFOO\_SITE 指定软件包的下载地址，可以是URL或本地文件路径，参阅之后关于LIBFOO\_SITE\_METHOD的介绍。如果HOST\_LIBFOO\_SITE未指定，则默认为 LIBFOO\_SITE。
    -   支持HTTP、FTP及SCP。在这种情况下，不要在结尾加上/符号：Buildroot会在适当的目录和文件名之间添加/符号。注意，SCP URLs的格式应为scp://\[user@\]host:filepath，并且该文件路径是相对于用户家目录，因此你可能需要在路径前加上绝对路径的/符号，如scp://\[user@\]host:/absolutepath。
    -   支持Git、Subversion、Mercurial和Bazaar，直接从源代码管理系统中获取源代码。有一个辅助函数可以使得从Github下载源码tar包更容易（有关详细信息，请参阅第17.23.4节“如何从Github添加软件包”）。
    -   支持文件路径，可用于指定tar包或包含软件包源码的目录。

示例：

```
LIBFOO_SITE=http://www.libfoosoftware.org/libfoo
LIBFOO_SITE=http://svn.xiph.org/trunk/Tremor
LIBFOO_SITE=/opt/software/libfoo.tar.gz
LIBFOO_SITE=$(TOPDIR)/../src/libfoo
```

-   LIBFOO\_DL\_OPTS 可选，传递给下载器的选项，以空格分隔。当服务端校验用户名和密码或使用代理时会非常有用。支持LIBFOO\_SITE\_METHOD指定的所有下载方法，具体有效的参数取决于下载方法。
    
-   LIBFOO\_EXTRA\_DOWNLOADS 以空格分隔的需要Buildroot下载的文件列表。如果文件路径包含://则Buildroot假定它是完整的URL，并使用该URL下载文件。否则，Buildroot将假定要下载的文件位于LIBFOO\_SITE。Buildroot对这些文件不会做任何操作，只是下载它们，取决于如何使用它们来打包软件包（由$(LIBFOO\_DL\_DIR)指定）。
    
-   LIBFOO\_SITE\_METHOD 确定用于获取或复制软件包源代码的方法。在多数情况下，Buildroot会根据LIBFOO\_SITE的内容猜测该方法，如果HOST\_LIBFOO\_SITE\_METHOD未指定，则默认为使用LIBFOO\_SITE\_METHOD。LIBFOO\_SITE\_METHOD可能的值为：
    
    -   wget 用于tar包的HTTP/FTP下载。LIBFOO\_SITE开头为http://、https://或 ftp://默认使用该方法。
    -   scp LIBFOO\_SITE开头为scp://时默认使用scp通过SSH下载。
    -   svn 用于从Subversion存储库中检索源代码。LIBFOO\_SITE开头为svn://默认使用该方法。如果LIBFOO\_SITE指定的Subversion存储库URL为http://形式时，必须指定LIBFOO\_SITE\_METHOD为svn。Buildroot会执行代码签出，并保存为压缩包，之后的构建使用该压缩包而不是重新签出代码。
    -   cvs 用于从CVS存储库中检索代码。LIBFOO\_SITE开头为csv://默认使用该方法。所下载的源代码与svn一样会被缓存。
    -   git 用于从GIT存储库中检索代码。LIBFOO\_SITE开头为git://默认使用该方法。所下载的源代码与svn一样会被缓存。
    -   hg 用于从Mercurial存储库中检索代码。当LIBFOO\_SITE指定Mercurial存储库的URL时，必须设定LIBFOO\_SITE\_METHOD=hg。
    -   bzr 用于从Bazaar存储库中检索源代码。LIBFOO\_SITE开头为bzr://默认使用该方法。所下载的源代码与svn一样会被缓存。
    -   file 本地tar包。当LIBFOO\_SITE指定本地tar包文件名时，应该使用此选项。这对于不公开或版本控制不可用的软件很有用。
    -   local 本地源代码路径。当LIBFOO\_SITE指定本地源代码路径时，应该使用此选项。Buildroot会将源代码目录的内容复制到软件包的build目录中。请注意，对于本地软件包，不会应用补丁。如果仍然需要修改代码，请使用LIBFOO\_POST\_RSYNC\_HOOKS，参阅17.22.1“使用POST RSYNC挂钩”。
-   LIBFOO\_GIT\_SUBMODULES 当GIT存储库包含GIT子模块时，可以设置为YES。仅适用于使用GIT下载的软件包（即LIBFOO\_SITE\_METHOD=git）。注意，当GIT存储库包含子模块时，我们更倾向于使用子模块本身的存储库。
    
-   LIBFOO\_STRIP\_COMPONENTS 从tar包提取时从文件名中删除的父目录的层级数量。大多数软件包的tar包包含一个名为“ -”的父目录，因此Buildroot将–strip-components = 1传递给tar包将其删除。对于不具有此父目录的软件包或不止一级父目录的软件包，需要指定该变量并传递给tar，默认值为1。  
    LIBFOO\_EXCLUDES 以空格分隔的从tar包提取文件时删除的目录或文件。每一项都会传给tar --exclude参数，默认为空。
    
-   LIBFOO\_DEPENDENCIES 列出了编译当前软件包的依赖项（以软件包名称表示）。这将确保Buildroot在编译该软件包之前先编译并安装这些依赖项。然而，修改依赖项配置并不会强制重新编译当前软件包。类似的，HOST\_LIBFOO\_DEPENDENCIES列出了当前对宿主的依赖项。
    
-   LIBFOO\_EXTRACT\_DEPENDENCIES 列出了提取当前软件包的依赖项（以软件包名称表示）。这将确保Buildroot在提取该软件包之前先编译并安装这些依赖项。它仅由通用软件包基础架构内部使用，通常不应直接由软件包使用。
    
-   LIBFOO\_PATCH\_DEPENDENCIES 列出了要修补当前软件包所需的依赖项（以软件包名称表示）。这将确保Buildroot在给当前软件包打补丁之前先提取并修补（但不一定构建）这些依赖项。类似的，HOST\_LIBFOO\_PATCH\_DEPENDENCIES列出了对宿主的依赖项。通常很少使用。
    
-   LIBFOO\_PROVIDES 列出了虚拟软件包libfoo的所有实现。参阅第17.11“虚拟软件包的基础结构”。
    
-   LIBFOO\_INSTALL\_STAGING 可以设置为YES或NO（默认）。若设置为YES，将执行LIBFOO\_INSTALL\_STAGING\_CMDS列出的命令将软件包安装到staging目录。
    
-   LIBFOO\_INSTALL\_TARGET 可以设置为YES（默认）或NO。若设置为YES，将执行LIBFOO\_INSTALL\_TARGET\_CMDS列出的命令将软件包安装到target目录。
    
-   LIBFOO\_INSTALL\_IMAGES 可以设置为YES或NO（默认）。若设置为YES，将执行LIBFOO\_INSTALL\_IMAGES\_CMDS列出的命令将软件包安装到images目录。
    
-   LIBFOO\_CONFIG\_SCRIPTS 列出了$(STAGING\_DIR)/usr/ bin目录下的一些文件名称，这些文件的名称需要进行一些特殊的修复才能使其用于交叉编译。可以给出多个文件名称，以空格分隔，所有文件都是相对于$(STAGING\_DIR)/usr/ bin目录。此处列出的文件将从$(TARGET\_DIR)/usr/bin删除，因为目标系统并不需要它们。
    
-   LIBFOO\_DEVICES 列出了使用静态设备表时由Buildroot创建的设备文件。语法使用makedevs，请参阅第24章“Makedev语法文档”。可选选项。
    
-   LIBFOO\_PERMISSIONS 列出了构建结束后需要更改的权限。语法使用makedevs，请参阅第24章“Makedev语法文档”。可选选项。
    
-   LIBFOO\_USERS 列出了该软件包需要创建的用户，如果该程序安装的软件需要使用特定用户运行（例如，守护进程，或定时任务）。语法在本质上与makedevs相似，请参阅第24章“Makedev语法文档”。可选选项。
    
-   LIBFOO\_LICENSE 定义了该软件包发布的一个或多个许可文件。该名称将出现在make legal-info产生的清单文件上。如果许可证出现在SPDX许可证列表中，请使用SPDX的短标识符使清单文件统一。否则，请使用精确简洁的方式描述许可证，避免使用模棱两可的名称，例如BSD实际上是许可证家族的命名。可选选项。如果未定义，软件包的许可证清单文件上将显示为unknown。此变量的预期格式必须符合以下规则：
    
    -   如果软件包的不同部分使用不同的许可证，请单独列出，如LIBFOO\_LICENSE = GPL-2.0+, LGPL-2.1+。如果在哪个许可证许可了哪个组件之间有明显的区别，请在括号里注明该组件，如LIBFOO\_LICENSE = GPL-2.0+ (programs), LGPL-2.1+ (libraries)。
    -   如果某些许可证以启用子选项为条件，请在条件许可证后附加逗号，如FOO\_LICENSE += , GPL-2.0+ (programs)。Buildroot将在内部删除逗号前的空格。
    -   如果软件包是双重许可的，则使用or关键字来分隔许可，如LIBFOO\_LICENSE = AFL-2.1 or GPL-2.0+。
-   LIBFOO\_LICENSE\_FILES 列出了软件包中的许可证文件，以空格分隔。make legal-info将所有这些文件复制到legal-info目录中。可选参数。如果未定义，将产生警告，该警告将在license files中标识为not saved。
    
-   LIBFOO\_ACTUAL\_SOURCE\_TARBALL 仅适用于LIBFOO\_SITE/ LIBTOO\_SOURCE指向的不是源代码，而是二进制文件的情况。这是比较罕见的情况，已知的情况是适用于已经编译好的外部工具链，尽管从理论上可能适用于其他软件包。在这种情况下，实际的源代码通常会提供单独的tar包。设置LIBFOO\_ACTUAL\_SOURCE\_TARBALL为实际源代码的名称，当运行make legal-info收集与法律相关的资料时，Buildroot将下载该tar包并使用它。请注意，在常规构建过程中，都不会下载该tar包，即使是make source。
    
-   LIBFOO\_ACTUAL\_SOURCE\_SITE 提供源码tar包的下载位置，默认为LIBFOO\_SITE。因此，如果源代码和二进制文件位于同一个目录中，则无需设置该变量。如果LIBFOO\_ACTUAL\_SOURCE\_TARBALL未设置，则LIBFOO\_ACTUAL\_SOURCE\_SITE的定义没有意义 。
    
-   LIBFOO\_REDISTRIBUTE 可以设置为YES（默认）或NO指示是否允许重新发布软件包源码。设置为NO表示为非开源软件包。Buildroot在make legal-info时不会收集该软件包的源码。
    
-   LIBFOO\_FLAT\_STACKSIZE 指定内置FLAT二进制格式应用程序的堆栈大小。在NOMMU体系结构处理器上应用程序堆栈大小无法动态扩展。FLAT二进制格式的默认堆栈大小为4k字节。如果应用需要占用更多的堆栈，请在此处指定所需的字节数。
    
-   LIBFOO\_BIN\_ARCH\_EXCLUDE 检查软件包是否正确安装了交叉编译的二进制文件时忽略的目录列表，以空格分隔。很少需要设置这个变量，除非该软件包将软件安装到了非默认位置，/lib/firmware、/usr/lib/firmware、/lib/modules、 /usr/lib/modules、和/usr/share会自动排除。
    
-   LIBFOO\_IGNORE\_CVES 指定软件包需要被Buildroot CVE跟踪工具忽略哪些CVE，以空格分隔。当CVE由软件包外的补丁程序修复时，或者由于某些原因CVE不影响Buildroot软件包时通常使用该方法。在使用该变量前必须添加Makefile注释，例如：
    

```
# 0001-fix-cve-2020-12345.patch
LIBFOO_IGNORE_CVES += CVE-2020-12345
# only when built with libbaz, which Buildroot doesn't support
LIBFOO_IGNORE_CVES += CVE-2020-54321
```

-   LIBFOO\_EXTRACT\_CMDS 指定提取软件包时要执行的操作。通常不需要手动指定，Buildroot会自动处理。然而，如果软件包使用了非标准的存档格式（例如ZIP或RAR格式），或者文件组织结构不标准的tar包，则此变量允许覆盖软件包基础结构的默认行为。
    
-   LIBFOO\_CONFIGURE\_CMDS 指定在编译软件包之前要执行的配置操作。  
    LIBFOO\_BUILD\_CMDS 指定软件包编译操作。
    
-   HOST\_LIBFOO\_INSTALL\_CMDS 指定当软件包是宿主软件包时需要执行的安装操作。软件包必须将其文件安装到给定的$(HOST\_DIR)目录，并且应该安装所有文件，包括头文件等，其他软件包可能会依赖于该软件包才能编译。
    
-   LIBFOO\_INSTALL\_TARGET\_CMDS 指定当软件包是目标软件包时需要执行的安装操作。软件包必须将其文件安装到的给定的$(TARGET\_DIR)目录，并且只需要安装执行所需的文件即可。目标文件系统生成后，头文件、静态库和文档将再次被删除。
    
-   LIBFOO\_INSTALL\_STAGING\_CMDS 指定当软件包是目标软件包时将软件包安装到staging目录需要执行的操作。软件包必须将文件安装到$(STAGING\_DIR)目录，并且应该安装所有文件，其他软件包可能会依赖于该软件编译。
    
-   LIBFOO\_INSTALL\_IMAGES\_CMDS 指定当软件包是目标软件包时将软件包安装到镜像目录时需要执行的操作。软件包必须将其文件安装到$(BINARIES\_DIR)目录。只有不属于$(TARGET\_DIR)目录但对于启动开发板必须的二进制镜像文件需要安装到该目录。例如，如果软件包的二进制文件与系统内核、引导加载程序或根文件系统相似，则应使用此步骤。
    
-   LIBFOO\_INSTALL\_INIT\_SYSV、LIBFOO\_INSTALL\_INIT\_OPENRC、LIBFOO\_INSTALL\_INIT\_SYSTEMD 指定安装启动脚本需要执行的操作，例如systemV初始化系统（busybox、sysvinit等）、openrc或systemd等。仅当安装了相关的初始化系统时这些命令才会执行（即，如果选中systemd为初始化系统，则将仅执行LIBFOO\_INSTALL\_INIT\_SYSTEMD）。唯一的例外是，如果选中openrc作为初始化系统，并且未指定LIBFOO\_INSTALL\_INIT\_OPENRC时，这种情况下LIBFOO\_INSTALL\_INIT\_SYSV将被执行，原因是openrc支持sysv初始化脚本。如果选中systemd为初始化系统，Buildroot将在镜像构建的最后阶段使用systemctl preset-all命令自动启用所有服务。你可以添加预设文件，以防止Buildroot自动启用特定模块。
    
-   LIBFOO\_HELP\_CMDS 指定输出软件包帮助时需要执行的操作，该帮助包含在make help的输出中。这些命令可打印任意格式的内容。由于软件包很少具有自定义规则，因此很少使用。除非你真的知道需要打印帮助，否则请不要使用此变量。
    
-   LIBFOO\_LINUX\_CONFIG\_FIXUPS 指定构建和使用该软件包所需的Linux内核配置选项，没有这些选项，该软件包将无法编译或运行。这些是集成到kconfig的调整选项：CONFIG\_ENABLE\_OPT、 KCONFIG\_DISABLE\_OPT或KCONFIG\_SET\_OPT。该选项很少使用，因为软件包通常对内核选项没有严格的要求。
    

以上选项推荐的定义语法如下：

```
define LIBFOO_CONFIGURE_CMDS
        action 1
        action 2
        action 3
endef
```

在action定义中，可以使用以下变量：

-   $(LIBFOO\_PKGDIR) libfoo.mk和Config.in所在的目录路径。
-   $(@D) 软件包源代码解压后的目录。
-   $(LIBFOO\_DL\_DIR) libfoo源代码下载目录。
-   $(TARGET\_CC)、$(TARGET\_LD)等交叉编译工具。
-   $(TARGET\_CROSS) 交叉编译工具链前缀。
-   $(HOST\_DIR)、$(STAGING\_DIR)和$(TARGET\_DIR) 等，指定软件包安装位置。

最后，你还可以使用hook。有关hook的更多信息，请参阅第17.22节“各构建步骤中可用的钩子”。

### 17.6 基于autotools构建系统的软件包基础结构

#### 17.6.1 autotools软件包教程

首先，让我们看下如何编写基于autotools构建系统的.mk文件，示例如下：

```
01: ################################################################################
02: #
03: # libfoo
04: #
05: ################################################################################
06:
07: LIBFOO_VERSION = 1.0
08: LIBFOO_SOURCE = libfoo-$(LIBFOO_VERSION).tar.gz
09: LIBFOO_SITE = http://www.foosoftware.org/download
10: LIBFOO_INSTALL_STAGING = YES
11: LIBFOO_INSTALL_TARGET = NO
12: LIBFOO_CONF_OPTS = --disable-shared
13: LIBFOO_DEPENDENCIES = libglib2 host-pkgconf
14:
15: $(eval $(autotools-package))
```

第7行，我们声明了软件包的版本。

第8、9行，我们声明了tar包的名称（建议使用.tar.xz包）以及tar包的下载位置，Buildroot将自动从该位置下载tar包。

第10行，我们告诉Buildroot将该软件包安装到staging目录。output/staging/ 是所有软件包（包括头文件、库等）的安装目录。默认情况下，软件包不会安装到staging目录。通常只有库需要安装到staging目录，其他软件包需要依赖于这些库才能编译。同样，默认情况下，启用该选项后，将使用make install命令将软件包安装到staging目录。

第11行，告诉Buildroot不要将该软件包安装到target目录。该目录将成为根文件系统的目录。对于静态库，没必要将它们安装到target目录。默认情况下，该选项为启用状态，几乎不需要将此选项设置为NO。默认情况下，使用make install命令将软件包安装到target目录。

第12行，告诉Buildroot传递自定义选项给./configure命令。

第13行，声明了依赖项，以便在构建该软件包之前先构建其依赖的软件包。  
最后，第15行，调用autotools-package宏，该宏生成构建该软件包的Makefile规则。

#### 17.6.2 autotools软件包参考

autotools软件包基础结构的主要宏是 autotools-package，类似于generic-package宏。通过使用host-autotools-package宏还可以生宿主软件包。

类似通用软件包基础结构，autotools基础结构通过在调用autotools-package宏之前定义多个变量工作。

首先，所有通用软件包基础结构的元数据信息的变量同样存在于autotools基础结构，如：LIBFOO\_VERSION、LIBFOO\_SOURCE、 LIBFOO\_PATCH、LIBFOO\_SITE、LIBFOO\_SUBDIR、LIBFOO\_DEPENDENCIES、LIBFOO\_INSTALL\_STAGING、LIBFOO\_INSTALL\_TARGET。

还可以定义一些特定于autotools基础结构的变量。它们中的许多仅在非常特殊的情况下才有用，因此典型的软件包将仅使用其中的一部分。

-   LIBFOO\_SUBDIR 指定源代码目录中包含configure脚本的子目录的名称。如果configure脚本不在源码的根目录中，这个变量会很有用。如果
    
-   HOST\_LIBFOO\_SUBDIR未指定，则默认为LIBFOO\_SUBDIR。
    
-   LIBFOO\_CONF\_ENV 指定需要传递给configure脚本的其他环境变量，默认为空。
    
-   LIBFOO\_CONF\_OPTS 指定需要传递给configure脚本的配置选项，默认为空。
    
-   LIBFOO\_MAKE 指定备用make命令。如果配置中启动了并行构建（使用BR2\_JLEVEL），但出于某种原因，给定的软件包需要禁用并行构建，则可以使用该变量。默认设置为$(MAKE)，如果软件包不支持并行构建，则应设置为 LIBFOO\_MAKE=$(MAKE1)。
    
-   LIBFOO\_MAKE\_ENV 指定编译阶段需要传递给make命令的其他环境变量，默认为空。
    
-   LIBFOO\_MAKE\_OPTS 指定编译阶段需要传递给make命令的其他选项，默认为空。
    
-   LIBFOO\_AUTORECONF 指定是否应自动重新配置软件包（即是否应通过重新运行autoconf、automake、libtool等重新生成配置脚本和Makefile.in文件）。有效值为YES和NO，默认为NO。
    
-   LIBFOO\_AUTORECONF\_ENV 指定需要传递给autoreconf命令的其他环节变量，仅当LIBFOO\_AUTORECONF=YES时有效，默认为空。
    
-   LIBFOO\_AUTORECONF\_OPTS 指定需要传递给autoreconf命令的其他选项，仅当LIBFOO\_AUTORECONF=YES时有效，默认为空。
    
-   LIBFOO\_GETTEXTIZE 指定是否应该对软件包进行本地化（即，该软件包是否使用了与Buildroot提供的版本不同的gettext版本，此时需要执行gettextize）。仅当LIBFOO\_AUTORECONF=YES有效，默认为NO。
    
-   LIBFOO\_GETTEXTIZE\_OPTS 指定传递给gettextize命令的其他选项，仅当LIBFOO\_GETTEXTIZE=YES时有效。
    
-   LIBFOO\_LIBTOOL\_PATCH 指定是否应使用补丁修复libtool交叉编译问题。有效值为YES和NO，默认为YES。
    
-   LIBFOO\_INSTALL\_STAGING\_OPTS 指定用于将软件包安装到staging目录的make选项，默认为DESTDIR=$(STAGING\_DIR) install。
    
-   LIBFOO\_INSTALL\_TARGET\_OPTS 指定用于将软件包安装到target目录的make选项，默认为DESTDIR=$(TARGET\_DIR) install。
    

基于autotools构建系统的基础结构，已经定义了构建和安装软件包所需的所有步骤，通常适用于大多数基于autotools的软件包。但是，在需要时，仍然可以自定义任意步骤的操作：

-   添加钩子，在执行提取、打补丁、配置、编译或安装后执行自定义操作。  
    重写某个步骤。例如，即使使用autotools基础结构，如果软件包.mk定义了
    
-   LIBFOO\_CONFIGURE\_CMDS变量，也将使用该变量指定的操作替代默认的操作。
    

### 17.7 基于cmake的软件包基础结构

#### 17.7.1 cmake软件包教程

首先，让我们看下如何编写基于cmake构建系统的.mk文件，示例如下：

```
01: ################################################################################
02: #
03: # libfoo
04: #
05: ################################################################################
06:
07: LIBFOO_VERSION = 1.0
08: LIBFOO_SOURCE = libfoo-$(LIBFOO_VERSION).tar.gz
09: LIBFOO_SITE = http://www.foosoftware.org/download
10: LIBFOO_INSTALL_STAGING = YES
11: LIBFOO_INSTALL_TARGET = NO
12: LIBFOO_CONF_OPTS = -DBUILD_DEMOS=ON
13: LIBFOO_DEPENDENCIES = libglib2 host-pkgconf
14:
15: $(eval $(cmake-package))
```

第7行，声明了软件包的版本。

第8、9行，声明了tar包的名称（建议使用.tar.xz），以及tar的下载位置。Buildroot将自动从该位置下载压缩包。

第10行，告诉Buildroot将软件包安装到staging目录。output/staging/是所有软件包的安装目录。默认情况下，软件包不会安装到staging目录。通常只有库需要安装到staging目录，其他软件包需要依赖该库才能编译或运行。开启该选项后，将使用make install命令将软件包安装到此位置。

第11行，告诉Buildroot不要将软件包安装到target目录。该目录将成为目标系统根文件系统的一部分。对于纯静态库，没必要将它们安装到target目录中。默认情况下，该选项为启用，几乎不需要将此变量设置为NO。默认情况下，使用make install命令将软件包安装到此位置。

第12行，告诉Buildroot在配置软件包时传递自定义选项给cmake。

第13行，声明依赖项，以便在构建该软件包之前先构建依赖项。

第15行，调用cmake-package宏，该宏生成构建软件包的所有Makefile规则。

#### 17.7.2 cmake软件包教程

cmake软件包基础结构的主要宏是cmake-package，类似于generic-package宏。通过host-cmake-package宏，还可以构建宿主软件包。

类似通用软件包基础结构，cmake基础结构通过在调用cmake-package宏之前定义多个变量工作。

首先，所有通用软件包基础结构的元数据信息的变量同样存在于cmake基础结构，如：LIBFOO\_VERSION、LIBFOO\_SOURCE、 LIBFOO\_PATCH、LIBFOO\_SITE、LIBFOO\_SUBDIR、LIBFOO\_DEPENDENCIES、LIBFOO\_INSTALL\_STAGING、LIBFOO\_INSTALL\_TARGET。

还可以定义一些特定于cmake基础结构的变量。它们中的许多仅在非常特殊的情况下才有用，因此典型的软件包将仅使用其中的一部分。

-   LIBFOO\_SUBDIR 指定源代码目录中包含CMakeLists.txt文件的子目录的名称。如果CMakeLists.txt文件不在源代码的根目录中，这个变量会很有用。如果HOST\_LIBFOO\_SUBDIR未指定，则默认为LIBFOO\_SUBDIR。
    
-   LIBFOO\_CONF\_ENV 指定需要传递给cmake的其他环境变量，默认为空。
    
-   LIBFOO\_CONF\_OPTS 指定需要传递给cmake的配置选项，默认为空。cmake基础结构设置了许多常见的cmake选项，因此无需在.mk文件中指定，除非你确实要覆盖重写：
    
    -   CMAKE\_BUILD\_TYPE 由BR2\_ENABLE\_DEBUG决定。
    -   CMAKE\_INSTALL\_PREFIX  
        BUILD\_SHARED\_LIBS 由BR2\_STATIC\_LIBS决定。
    -   BUILD\_DOC 已被禁用
    -   BUILD\_EXAMPLE 已被禁用
    -   BUILD\_TEST、BUILD\_TESTS、BUILD\_TESTING 已被禁用
-   LIBFOO\_SUPPORTS\_IN\_SOURCE\_BUILD 当无法在源代码目录中构建该软件包时需要设置为NO。
    
-   LIBFOO\_MAKE 指定备用make命令。如果配置中启动了并行构建（使用BR2\_JLEVEL），但出于某种原因，给定的软件包需要禁用并行构建，则可以使用该变量。默认设置为$(MAKE)，如果软件包不支持并行构建，则应设置为 LIBFOO\_MAKE=$(MAKE1)。
    
-   LIBFOO\_MAKE\_ENV 指定编译阶段需要传递给make命令的其他环境变量，默认为空。
    
-   LIBFOO\_MAKE\_OPTS 指定编译阶段需要传递给make命令的其他选项，默认为空。
    
-   LIBFOO\_INSTALL\_STAGING\_OPTS 指定用于将软件包安装到staging目录的make选项，默认为DESTDIR=$(STAGING\_DIR) install。
    
-   LIBFOO\_INSTALL\_TARGET\_OPTS 指定用于将软件包安装到target目录的make选项，默认为DESTDIR=$(TARGET\_DIR) install。
    

基于cmake构建系统的基础结构，已经定义了构建和安装软件包所需的所有步骤，通常适用于大多数基于cmake的软件包。但是，在需要时，仍然可以自定义任意步骤的操作：

-   添加钩子，在执行提取、打补丁、配置、编译或安装后执行自定义操作。  
    重写某个步骤。例如，即使使用cmake基础结构，如果软件包.mk定义了
    
-   LIBFOO\_CONFIGURE\_CMDS变量，也将使用该变量指定的操作替代默认的操作。
    

### 17.8 Python软件包的基础结构

### 17.9 基于LuaRocks的软件包基础结构

### 17.10 Perl/CPAN软件包基础结构

### 17.11 虚拟软件包基础结构

在Buildroot中，虚拟软件包的功能由一个或多个其他软件包（称为提供者）提供。虚拟包管理提供了一种扩展机制，允许用户选择根文件系统中使用的提供者。

例如，OpenGL ES是嵌入式系统上2D和3D图形系统的API，对于Allwinner Tech Sunxi和德州仪器（TI）的OMAP35xx平台，此API的实现有所不同。因此，libgles是虚拟包，而sunxi-mali和ti-gfx是提供者。

#### 17.11.1 虚拟软件包教程

在下面的示例中，我们将说明如何添加新的虚拟软件包（something-virtual）和提供者（some-provider）。

首先，先创建虚拟软件包。

#### 17.11.2 虚拟软件包的Config.in文件

虚拟软件包的Config.in文件应保持以下内容：

```
01: config BR2_PACKAGE_HAS_SOMETHING_VIRTUAL
02:     bool
03:
04: config BR2_PACKAGE_PROVIDES_SOMETHING_VIRTUAL
05:     depends on BR2_PACKAGE_HAS_SOMETHING_VIRTUAL
06:     string
```

在此文件中，我们声明了两个选项BR2\_PACKAGE\_HAS\_SOMETHING\_VIRTUAL和 BR2\_PACKAGE\_PROVIDES\_SOMETHING\_VIRTUAL，提供者将使用其值。

#### 17.11.3 虚拟软件包的.mk文件

虚拟软件包的.mk文件只调用virtual-package宏。使用host-virtual-package宏还可以创建宿主软件包。

```
01: ################################################################################
02: #
03: # something-virtual
04: #
05: ################################################################################
06:
07: $(eval $(virtual-package))
```

#### 17.11.4 提供者的Config.in文件

将软件包作为提供者，仅Config.in文件需要进行一些修改。

提供者的Config.in文件应该包含以下内容：

```
01: config BR2_PACKAGE_SOME_PROVIDER
02:     bool "some-provider"
03:     select BR2_PACKAGE_HAS_SOMETHING_VIRTUAL
04:     help
05:       This is a comment that explains what some-provider is.
06:
07:       http://foosoftware.org/some-provider/
08:
09: if BR2_PACKAGE_SOME_PROVIDER
10: config BR2_PACKAGE_PROVIDES_SOMETHING_VIRTUAL
11:     default "some-provider"
12: endif
```

第3行，勾选BR2\_PACKAGE\_HAS\_SOMETHING\_VIRTUAL。

第11行，将BR2\_PACKAGE\_PROVIDES\_SOMETHING\_VIRTUAL设置为提供者的软件包名称，前提是选择了该软件包。

#### 17.11.5 提供者的.mk文件

.mk文件需要新增声明SOME\_PROVIDER\_PROVIDES变量，其值包含它所实现的所有虚拟软件包的名称。例如：

```
01: SOME_PROVIDER_PROVIDES = something-virtual
```

#### 17.11.6 关于虚拟软件包的注意事项

添加依赖于虚拟软件包提供的某个特性时，必须使用depends on

```
BR2_PACKAGE_HAS_FEATURE，如：
config BR2_PACKAGE_HAS_FEATURE
    bool

config BR2_PACKAGE_FOO
    bool "foo"
    depends on BR2_PACKAGE_HAS_FEATURE
```

#### 17.11.7 关于依赖特定提供者的注意事件

如果你的软件包确实需要依赖特定的提供者，那你的软件包必须depends on该提供者，而不能select提供者。

假设我们提供以下两个FEATURE的提供者：

```
config BR2_PACKAGE_HAS_FEATURE
    bool

config BR2_PACKAGE_FOO
    bool "foo"
    select BR2_PACKAGE_HAS_FEATURE

config BR2_PACKAGE_BAR
    bool "bar"
    select BR2_PACKAGE_HAS_FEATURE
```

而你需要添加一个软件包依赖FEATUER的foo提供者，而不是bar提供者。

如果你使用select BR2\_PACKAGE\_FOO，那用户仍然可以在make menuconfig中选择BR2\_PACKAGE\_BAR，这将导致配置不一致，从而FATURE将同时启用两个相同的提供者，一个由用户显示设置，另一个由你设置select隐式设置。

因此，你必须使用depends on BR2\_PACKAGE\_FOO，这样可以避免任何隐式设置的不一致。

### 17.12 使用kconfig作为配置文件的软件包基础结构

### 17.13 基于rebar的软件包基础结构

### 17.14 基于Waf的软件包基础结构

### 17.15 基于Meson的软件包基础结构

### 17.16 基于Cargo的软件包基础结构

### 17.17 Go软件包基础结构

### 17.18 基于QMake的软件包基础结构

### 17.19 系统内核模块软件包基础结构

Buildroot提供了一个帮助程序基础结构，以简化编写和构建内核模块。一些软件包仅包含内核模块，一些软件包除内核模块外还包含程序和库。Buildroot系统内核模块软件包的基础结构支持这两种情况。

#### 17.19.1 内核模块教程

让我们从一个示例开始，该示例说明了如何准备一个仅构建内核模块而没有其他组件的简单软件包：

```
01: ################################################################################
02: #
03: # foo
04: #
05: ################################################################################
06:
07: FOO_VERSION = 1.2.3
08: FOO_SOURCE = foo-$(FOO_VERSION).tar.xz
09: FOO_SITE = http://www.foosoftware.org/download
10: FOO_LICENSE = GPL-2.0
11: FOO_LICENSE_FILES = COPYING
12:
13: $(eval $(kernel-module))
14: $(eval $(generic-package))
```

第7-11行，定义了常用的元数据信息，指定了版本、源代码压缩包名称，以及下载链接和许可信息。

第13行，调用kernel-module宏，该宏将生成构建内核模块所需的Makefile规则。  
依赖项linux会自动添加，因此无需在FOO\_DEPENDENCIES中指定。

与其他软件包基础结构不同，我们还需要显示地调用另一个宏generic-package，这将允许软件包构建内核模块。如果允许，还可以使用任何其他软件包基础结构来构建用户级组件（库、可执行文件等）。

让我们再看一个更复杂的例子：

```
01: ################################################################################
02: #
03: # foo
04: #
05: ################################################################################
06:
07: FOO_VERSION = 1.2.3
08: FOO_SOURCE = foo-$(FOO_VERSION).tar.xz
09: FOO_SITE = http://www.foosoftware.org/download
10: FOO_LICENSE = GPL-2.0
11: FOO_LICENSE_FILES = COPYING
12:
13: FOO_MODULE_SUBDIRS = driver/base
14: FOO_MODULE_MAKE_OPTS = KVERSION=$(LINUX_VERSION_PROBED)
15:
16: ifeq ($(BR2_PACKAGE_LIBBAR),y)
17: FOO_DEPENDENCIES = libbar
18: FOO_CONF_OPTS = --enable-bar
19: FOO_MODULE_SUBDIRS += driver/bar
20: else
21: FOO_CONF_OPTS = --disable-bar
22: endif
23:
24: $(eval $(kernel-module))
26: $(eval $(autotools-package))
```

在这里，我们定义了一个基于autotools构建系统的软件包，该软件包同时还构建了位于子目录driver/base下的内核模块。如果启用了libbar，还将构建位于子目录driver/bar目录的内核模块。

#### 17.19.2 内核模块参考

内核模块基础结构的主要宏是kernel-module。与其他软件包基础结构不同，它不能独立存在，必须在其后调用其他\*-package宏。

kernel-module定义了编译和安装后hook钩子。如果软件包的.mk需要访问已构建的内核模块，则应hook调用kernel-module宏后生成的钩子，并在其中访问内核模块。同样，如果软件包的.mk需要在安装后访问内核模块，则应hook调用kernel-module宏后生成的钩子，并在其中访问内核模块。示例如下：

```
$(eval $(kernel-module))

define FOO_DO_STUFF_WITH_KERNEL_MODULE
    # Do something with it...
endef
FOO_POST_BUILD_HOOKS += FOO_DO_STUFF_WITH_KERNEL_MODULE

$(eval $(generic-package))
```

此外，与其他软件包基础结构不同，内核模块没有host-kernel-module宏用于宿主内核模块。

以下变量可以进一步配置内核模块的构建：

-   FOO\_MODULE\_SUBDIRS 可以设置为内核模块所在的一个或多个子目录（相对于软件包源码顶层目录）。如果为空或未设置，则认为内核模块的源码位于软件包源码根目录。
-   FOO\_MODULE\_MAKE\_OPTS 可以设置传递给Linux构建系统的额外选项。  
    你还可以引用以下变量（但不能设置）：
-   LINUX\_DIR 提取后的Linux内核目录，即内核编译目录。
-   LINUX\_VERSION 用户配置的版本字符串。
-   LINUX\_VERSION\_PROBED 内核实际版本字符串，可通过make -C $(LINUX\_DIR) kernelrelease命令获取。
-   KERNEL\_ARCH 当前CPU架构名称，如arm、mips等。

### 17.20 asciidoc文档的基础结构

### 17.21 Linux内核软件包专用的基础结构

Linux内核软件包可以使用基于软件包hook的特定基础结构来构建Linux内核工具和Linux内核扩展。

#### 17.21.1 Linux内核工具

Buildroot提供了一个辅助基础结构用于编译Linux内核源码中运行于用户空间的一些工具。由于它们的源码是内核源码的一部分，因此内核工具（linux-tools）是一个特殊的软件包，使用目标系统的内核。

让我们看一个Linux工具的例子。对于名为foo的Linux工具，在package/linux-tools/Config.in中创建一个新的菜单入口，该文件包含每个内核工具相关的选项说明。示例如下：

```
01: config BR2_PACKAGE_LINUX_TOOLS_FOO
02:     bool "foo"
03:     select BR2_PACKAGE_LINUX_TOOLS
04:     help
05:       This is a comment that explains what foo kernel tool is.
06:
07:       http://foosoftware.org/foo/
```

选项的名称以BR2\_PACKAGE\_LINUX\_TOOLS\_作为前缀，后跟工具的大写名称。  
注意，与其他软件包不同，内核工具软件包显示在Linux内核菜单的Linux Kernel Tools子菜单下，而不是Target packages主菜单下。

然后，针对每个Linux工具编写.mk.in文件，命名为package/linux-tools/linux-tool-foo.mk.in。其内容示例如下：

```
01: ################################################################################
02: #
03: # foo
04: #
05: ################################################################################
06:
07: LINUX_TOOLS += foo
08:
09: FOO_DEPENDENCIES = libbbb
10:
11: define FOO_BUILD_CMDS
12:     $(TARGET_MAKE_ENV) $(MAKE) -C $(LINUX_DIR)/tools foo
13: endef
14:
15: define FOO_INSTALL_STAGING_CMDS
16:     $(TARGET_MAKE_ENV) $(MAKE) -C $(LINUX_DIR)/tools \
17:             DESTDIR=$(STAGING_DIR) \
18:             foo_install
19: endef
20:
21: define FOO_INSTALL_TARGET_CMDS
22:     $(TARGET_MAKE_ENV) $(MAKE) -C $(LINUX_DIR)/tools \
23:             DESTDIR=$(TARGET_DIR) \
24:             foo_install
25: endef
```

第7行，将linux工具foo注册到Linux工具列表中。

第9行，指定该工具依赖的其他软件包。仅在foo工具选中后，这些依赖项才会添加到Linux软件包依赖项列表中。

第11-25行，定义了Linux工具构建不同步骤所执行的具体操作，类似于通用软件包（generic package）。仅在foo被选中后以上操作才会执行，且仅支持以下命令：\_BUILD\_CMDS, \_INSTALL\_STAGING\_CMDS和INSTALL\_TARGET\_CMDS。  
注意，不能调用$(eval $(generic-package))或其他软件包基础结构宏！Linux工具本身不是软件包，而是linux-tools软件包的一部分。

#### 17.21.2 Linux内核扩展

一些软件包提供的特性需要修改Linux内核源码，这可以采用内核补丁的形式实现，也可以采用向内核添加新文件的方式实现。Buildroot的Linux内核扩展基础结构提供了一个简单的解决方案，可以在提取内核源码之后应用内核补丁之前自动执行此操作。使用该机制打包的内核扩展示例包括实时扩展Xenomai和RTAI，以及树外LCD屏幕驱动程序fbtft。

让我们看下如何添加新Linux扩展foo的示例。

首先，创建提供Linux内核扩展的软件包foo：该软件包是标准软件包，有关创建软件包的相关信息请参阅前面的章节。该软件包负责下载源码压缩包、检查哈希、定义许可证信息以及构建用户空间工具（如果有）。

然后，创建Linux扩展：在现有的目录中创建linux/Config.ext.in。该文件包含了将在配置工具中使用和显示的每个内核扩展相关的选项描述。示例如下：

```
01: config BR2_LINUX_KERNEL_EXT_FOO
02:     bool "foo"
03:     help
04:       This is a comment that explains what foo kernel extension is.
05:
06:       http://foosoftware.org/foo/
```

然后，为每个Linux扩展创建.mk文件，命名为linux/linux-ext-foo.mk。示例如下：

```
01: ################################################################################
02: #
03: # foo
04: #
05: ################################################################################
06:
07: LINUX_EXTENSIONS += foo
08:
09: define FOO_PREPARE_KERNEL
10:     $(FOO_DIR)/prepare-kernel-tree.sh --linux-dir=$(@D)
11: endef
```

第7行，将Linux扩展foo添加到Linux扩展的列表中。

第9-11行，定义了该扩展如何修改Linux内核树，这是Linux扩展特有的。可以使用软件包foo定义的变量，如$(FOO\_DIR)、$(FOO\_VERSION)等以及所有的Linux变量，如： $(LINUX\_VERSION)、$(LINUX\_VERSION\_PROBED)、$(KERNEL\_ARCH)等。

### 17.22 各个构建步骤支持的hook操作

通用基础结构（以及基于此派生出的基于autotools和cmake构建系统的基础结构）允许软件包指定hook钩子。这些钩子定义了执行完相应步骤后要执行的其他操作。大多数hook钩子对于通用软件包并不是真正有用，因为该.mk文件已经完全控制了软件包在构建过程每个步骤中执行的操作。

以下是有效的hook点：

-   LIBFOO\_PRE\_DOWNLOAD\_HOOKS
-   LIBFOO\_POST\_DOWNLOAD\_HOOKS
-   LIBFOO\_PRE\_EXTRACT\_HOOKS
-   LIBFOO\_POST\_EXTRACT\_HOOKS
-   LIBFOO\_PRE\_RSYNC\_HOOKS
-   LIBFOO\_POST\_RSYNC\_HOOKS
-   LIBFOO\_PRE\_PATCH\_HOOKS
-   LIBFOO\_POST\_PATCH\_HOOKS
-   LIBFOO\_PRE\_CONFIGURE\_HOOKS
-   LIBFOO\_POST\_CONFIGURE\_HOOKS
-   LIBFOO\_PRE\_BUILD\_HOOKS
-   LIBFOO\_POST\_BUILD\_HOOKS
-   LIBFOO\_PRE\_INSTALL\_HOOKS (只对宿主软件包有效)
-   LIBFOO\_POST\_INSTALL\_HOOKS (只对宿主软件包有效)
-   LIBFOO\_PRE\_INSTALL\_STAGING\_HOOKS (只对目标软件包有效)
-   LIBFOO\_POST\_INSTALL\_STAGING\_HOOKS (只对目标软件包有效)
-   LIBFOO\_PRE\_INSTALL\_TARGET\_HOOKS (只对目标软件包有效)
-   LIBFOO\_POST\_INSTALL\_TARGET\_HOOKS (只对目标软件包有效)
-   LIBFOO\_PRE\_INSTALL\_IMAGES\_HOOKS
-   LIBFOO\_POST\_INSTALL\_IMAGES\_HOOKS
-   LIBFOO\_PRE\_LEGAL\_INFO\_HOOKS
-   LIBFOO\_POST\_LEGAL\_INFO\_HOOKS

这些变量是变量名称的列表，其中包含要在此hook点执行的操作。允许在给定的hook点注册多个hook钩子。示例如下：

```
define LIBFOO_POST_PATCH_FIXUP
        action1
        action2
endef

LIBFOO_POST_PATCH_HOOKS += LIBFOO_POST_PATCH_FIXUP
```

#### 17.22.1 使用POST\_RSYNC钩子

POST\_RSYNC钩子仅针对通过local站点或OVERRIDE\_SRCDIR机制使用本地源的软件包有效。在这种情况下，使用rsync从本地位置将软件包源码复制到Buildroot构建目录中。但是，rsync命令不会从源码目录复制所有文件，例如属于版本控制系统的.git、.hg等文件不会被复制。对于大多数软件包来说这已经足够了，若有特殊情况，可以使用POST\_RSYNC钩子执行其他操作。

原则上，钩子可以包含任意你想要执行的命令。一种常见的用法是使用rsync故意复制版本控制系统的目录。rsync命令中可使用以下变量：

-   $(SRCDIR) 源码目录
-   $(@D) 编译目录

#### 17.22.2 目标生成钩子

软件包也已注册LIBFOO\_TARGET\_FINALIZE\_HOOKS钩子，这些钩子将在所有软件包构建完成且文件系统镜像生成之前运行。它们很少会被使用。

### 17.23 Gettext集成以及与软件包的交互

### 17.24 技巧和窍门

#### 17.24.1 软件包名称、配置入口名称及makefile变量之间的关系

在Buildroot中，它们之间存在一些关系：

-   软件包名称，即软件包目录名称，也是.mk文件名称。
-   配置入口名称为Config.in中声明的名称。
-   makefile变量前缀。

必须使用以下规则确保这些元素之间的一致性：

-   软件包目录和.mk文件名即为软件包名称本身，如package/foo-bar\_boo/foo-bar\_boo.mk。
-   make目录名称是软件包名称本身，如foo-bar\_boo。
-   配置入口名称是软件包名称大写，其中-替换为\_，并以BR2\_PACKAGE\_开头，如BR2\_PACKAGE\_FOO\_BAR\_BOO。
-   .mk文件变量前缀是软件包名称大写，其中-替换为\_，如FOO\_BAR\_BOO\_VERSION。

#### 17.24.2 如何检查编码样式

Buildroot提供了一个脚本（utils/check-package）用于检查新文件或修改修改的编码样式。它不是一个完整的语言验证器，但是它会发现许多常见错误。

该脚本可用于软件包、文件系统、Makefiles文件、Config.in文件等。它不会检查定义软件包基础结构的文件或者其他包含通用代码的类似文件。

要检查编码样式，请运行check-package脚本：

```
$ ./utils/check-package package/new-package/*
```

该脚本也可以用于Buildroot目录树外编译，如：

```
$ check-package -b /path/to/br2-ext-tree/package/my-package/*
```

#### 17.24.3 如何测试软件包

添加新软件包后，必须在各种条件下对其进行测试：是否适用于所有体系结构，是否适用于不同的C库、是否需要线程、NPTL等等。

Buildroot运行autobuilders工具自动测试不同随机配置。但是，该工具仅测试git仓库的master分支。

Buildroot提供了一个脚本utils/test-pkg，该脚本使用与autobuilders相同的基本配置，因此你可以在相同条件下测试你的软件包。

首先，创建一个配置文件，其中包含软件包所需的所有必选选项，但不包含任何体系结构或工具链选项。例如，让我们创建一个仅启用libcurl且没有任何TLS后端的的配置文件：

```
$ cat libcurl.config
BR2_PACKAGE_LIBCURL=y
```

如果你的软件包需要更多配置选项，则可以将他们添加到以上配置文件中。例如，以下是你测试libcurl且使用openssl和curl应用程序的配置文件：

```
$ cat libcurl.config
BR2_PACKAGE_LIBCURL=y
BR2_PACKAGE_LIBCURL_CURL=y
BR2_PACKAGE_OPENSSL=y
```

之后，运行test-pkg脚本：  
$ ./utils/test-pkg -c libcurl.config -p libcurl

默认情况下，test-pkg将根据autobuilders使用的工具链的子集构建软件包，该子集已被Buildroot开发人员选定为最有用且最具代表性的子集。如果要测试所有工具链，请传递-a选项。请注意，在任何情况下，内部工具链都已经排除，因为它们花费的时间太长。

以下列出了所有经过测试的工具链及相应的结果（摘录，结果为假）：

```
$ ./utils/test-pkg -c libcurl.config -p libcurl
                armv5-ctng-linux-gnueabi [ 1/11]: OK
              armv7-ctng-linux-gnueabihf [ 2/11]: OK
                        br-aarch64-glibc [ 3/11]: SKIPPED
                           br-arcle-hs38 [ 4/11]: SKIPPED
                            br-arm-basic [ 5/11]: FAILED
                  br-arm-cortex-a9-glibc [ 6/11]: OK
                   br-arm-cortex-a9-musl [ 7/11]: FAILED
                   br-arm-cortex-m4-full [ 8/11]: OK
                             br-arm-full [ 9/11]: OK
                    br-arm-full-nothread [10/11]: FAILED
                      br-arm-full-static [11/11]: OK
11 builds, 2 skipped, 2 build failed, 1 legal-info failed
```

结果：

-   OK：构建成功。
-   SKIPPED：配置文件中列出的一个或多个配置选项在最终的配置中不存在。这是由于工具链无法满足选项的依赖项，例如depends on BR2\_USE\_MMU使用不支持MMU的工具链。缺少的选项默认输出到~/br-test-pkg/TOOLCHAIN\_NAME/missing.config。
-   FAILED：构建失败。检查logfile以确认具体出错原因：
    -   实际构建失败
    -   法律信息失败
    -   构建步骤之一失败

出现故障并修复软件包后，可以使用-p参数重新运行脚本，无需重新构建该软件包的所有依赖项。

test-pkg脚本支持一些选项，可通过以下方式获得帮助：

```
$ ./utils/test-pkg -h
```

#### 17.24.4 如何从GitHub添加软件包

GitHub通常不提供软件包的发行版tar包下载区域，但是可以直接从GitHub的存储库下载tar包。若需从GitHub下载软件包，需配置如下选项：

```
# Use a tag or a full commit ID
FOO_VERSION = v1.0
FOO_SITE = $(call github,<user>,<package>,$(FOO_VERSION))
```

注意：

-   FOO\_VERSION 可以是tag，也可以是commit ID。
-   github生成的tar包文件名与Buildroot的默认名称匹配，因此无需在.mk文件中指定，如foo-f6fb6654af62045239caed5950bc6c7971965e60.tar.gz。
-   如果使用commit ID作为版本号，需要填写完整的40个十六进制字符。

如果要添加的软件包在GitHub上提供了发行版tar包下载链接，说明维护者可能已上传了发行版tar包，或者该发行版只是指向了git标签中自动生成的tar包。如果维护者上传了发行版tar包，我们最好使用该版本，因为它可能略有不同（例如，它包含配置文件，因此我们无需执行AUTORECONF）。

你可以在GitHub发布页面上看到下载链接：  
![在这里插入图片描述](../Linux/DTS/assets/在这里插入图片描述-8.png)

### 17.25 结论

如你所见，向Buildroot添加软件包仅是编写Makefile并根据软件包所需的编译过程对其进行修改的问题。

如果你打包了可能对其他人有用的软件，请不要忘记将补丁发送到Buildroot邮件列表（详情参阅第21.5节提交补丁）。

## 18\. 给软件包打补丁

待补充。

## 19\. 下载基础结构

待补充。

## 20\. 调试Buildroot

Buildroot构建软件包时，可以检测各步骤的执行情况。定义BR2\_INSTRUMENTATION\_SCRIPTS变量，指向以空格分隔的脚本文件列表。这些脚本将按顺序执行，带有三个参数，分别为：

-   start或end表示各步骤的开始或结束。
-   即将开始或刚刚结束的构建步骤的名称。
-   软件包名称。

示例：

```
make BR2_INSTRUMENTATION_SCRIPTS="/path/to/my/script1 /path/to/my/script2"
```

其中，构建步骤包括：

-   extract
-   patch
-   configure
-   build
-   install-host
-   install-target
-   install-staging
-   install-image

此外，脚本可以访问以下变量：

-   BR2\_CONFIG：Buildroot .config文件的路径
-   HOST\_DIR、STAGING\_DIR、TARGET\_DIR：参见第17.5.2节“通用软件包参考”
-   BUILD\_DIR：提取和构建软件包的目录
-   BINARIES\_DIR：所有二进制文件（即镜像）的存储位置
-   BASE\_DIR：基本输出目录