---
tags: buildroot 
---

## 使用 Buildroot + QEMU 构建和运行 Linux

- 来源： [使用Buildroot + QEMU构建和运行Linux\_qemu运行linux](https://blog.csdn.net/xunknown/article/details/124521135)
## 1 .  概述

[Buildroot](https://so.csdn.net/so/search?q=Buildroot&spm=1001.2101.3001.7020)是一个用于为嵌入式系统构建完整的Linux系统（包括Bootloader，Linux kernel以及shell和各种应用软件）的交叉编译工具。

[QEMU](https://so.csdn.net/so/search?q=QEMU&spm=1001.2101.3001.7020)是一个通用的开源机器模拟器和虚拟器。QEMU可以以多种不同的方式使用。最常见的是“系统仿真”，它提供整个机器（CPU、内存和仿真设备）的虚拟模型来运行客户操作系统（guest OS）。

本文介绍如何使用Buildroot工具构建不同体系架构的[嵌入式系统](https://so.csdn.net/so/search?q=%E5%B5%8C%E5%85%A5%E5%BC%8F%E7%B3%BB%E7%BB%9F&spm=1001.2101.3001.7020)的完整Linux系统，并使用QEMU运行该系统，并且可以通过ssh登录。

1.  ******使用Buildroot构建riscv64 Linux系统******
    1.  ******下载Buildroot工具包并解压******

wget [https://buildroot.org/downloads/buildroot-2022.02.tar.xz](https://buildroot.org/downloads/buildroot-2022.02.tar.xz "https://buildroot.org/downloads/buildroot-2022.02.tar.xz")

tar Jxf buildroot-2022.02.tar.xz

后续构建过程中，如果有报软件包找不到的错误，可先参考Buildroot文件检查一下依赖的软件包是否已经安装，把缺少的软件包装上。

1.  1.  ******创建并进入构建输出目录******

这里使用out-of-tree的方式构建，使用这种方式可以同时构建多个系统。

mkdir buildroot-riscv64

cd buildroot-riscv64

1.  1.  ******构建选项概述******

提示：

Buildroot工具源码目录下的configs目录有预定义的配置，可以使用这些配置。如果自定义配置导致编译失败或者QEMU启动失败，可能是由于架构，编译选项，交叉工具链，内核配置等错误导致，可以使用Buildroot自带配置先编译一个版本（有些架构下还会自动生成一个qemu启动脚本），再增加自己需要的软件包。

make O=$PWD -C ../buildroot-2022.02/ menuconfig

第一次执行make命令需要使用O选项指定输出目录，使用-C选项指定Buildroot工具路径，后续在输出目录下执行make命令可以不需要这两个选项。

将menuconfig改为configs目录下的文件名，即可使用Buildroot自带的配置生成.config文件，例如：

make O=$PWD -C ../buildroot-2022.02/ qemu\_riscv64\_virt\_defconfig

注：使用make menuconfig配置选项时，如果退格键无法删除内容，可以加按Ctrl键，即使用Ctrl+backspace组合键。

****主要有以下选项需要配置：****

1.  Target options：目标体系架构，例如riscv，arm，x86等。
2.  Build options：构建选项，例如make过程中使用的命令，源码下载目录，并行构建选项等。
3.  Toolchain：交叉编译工具链选项，例如使用的C库类型。跟体系架构相关。
4.  System configuration：系统配置，例如根文件系统框架，目标系统hostname，bash，root密码等。
5.  Kernel：（可选的）Linux kernel编译选项。
6.  Target packages：安装到目标系统的软件包，例如dhcp，ssh等。
7.  Filesystem images：根文件系统镜像格式，例如ext4镜像根文件系统。根文件系统镜像是Buildroot最主要的输出件。
8.  Bootloaders：（可选的）系统启动引导程序/Bootloader，例如u-boot，grub等。跟体系架构相关。

![](https://img-blog.csdnimg.cn/125f3da2ebc44ee0ad2aac54e59bd065.png)

编译不同架构的Linux系统通常只需要修改目标架构和交叉编译工具相关的选项，其他的可以保持一致。

1.  1.  1.  ******Target options******

配置目标架构，选择RISCV，64位，并配置扩展指令集。

这部分与体系架构强相关，切换体系架构后，这部分需要重新配置。

修改体系架构也会影响到后面的交叉编译工具选项。

![](https://img-blog.csdnimg.cn/435fcfa1bc2644a1997f7c5dd9f8b3ad.png)

1.  1.  1.  ******Build options******

配置构建选项，一般可以使用默认配置。

这部分与体系架构不强相关的，切换体系架构不影响这些配置（保持默认值就好）。

![](https://img-blog.csdnimg.cn/ae6ad82b44204643ba8cb9d12202a055.png)

如果需要修改构建过程中执行的命令，例如给wget加上--no-check-certificate选项，可以通过→ Build options → Commands选项配置：

![](https://img-blog.csdnimg.cn/4900f64882d446ff80f7380fe635b760.png)

在使用代理服务器的情况下，可能需要修改这些配置，避免各种下载错误。

如果使用Buildroot提供的默认配置进行配置的话，为了保存默认配置时（make savedefconfig）不修改Buildroot提供的配置，需要修改($(CONFIG\_DIR)/defconfig) Location to save buildroot config选项，通常可修改为$(CONFIG\_DIR)/defconfig。

下载目录（Download dir）保持默认值$(TOPDIR)/dl（Buildroot工具目录下的dl目录），这样编译其他体系架构的Linux系统时，可以重用已下载的代码。

在→ Build options → Advanced选项下面，选择Use per-package directories (experimental)，可以使用make -j<N>指定并行构建的线程，加快构建过程。

![](https://img-blog.csdnimg.cn/7beec4bc14104f8d860da338b2184762.png)

可以通过libraries选项配置使用动态链接（默认）还是静态链接方式编译目标程序，例如busybox（还需要通过make busybox-menuconfig，修改为静态链接方式）。

需要注意的是，修改libraries选项，可能会导致使用个C库变化。

1.  1.  1.  ******Toolchain******

配置交叉编译工具，大部分选择可以保持默认值。如果没有特别要求，建议使用Buildroot默认的工具链配置。

不同体系架构，Buildroot能够提供交叉编译工具也不相同，切换体系架构后，这部分需要重新配置（主要是工具来源和版本）。

交叉编译工具链的配置会影响到一些软件包的编译（例如openssh），如果编译失败，可以考虑修改交叉编译工具配置，或者使用Buildroot默认选项先编译。

![](https://img-blog.csdnimg.cn/e6ac2b2ebd554568993e4985fa373613.png)

关键选项：

Toolchain type (Buildroot toolchain)：交叉编译工具类型（使用Buildroot自带的还是外部工具链）。

C library (glibc)：使用哪个C库。

Kernel Header Options：编译出来的C库使用的Linux头文件版本（影响使用C库编译的APP，并且跟运行App的目标系统的Linux内核版本有关）。

GCC Options：配置gcc版本。

交叉编译工具选择外部工具链Toolchain type (External toolchain) ，来源选择预安装类型Toolchain origin (Pre-installed toolchain)，可以节省交叉编译工具链的编译时间，但需要给出预编译好的交叉工具下载地址。

![](https://img-blog.csdnimg.cn/759812e8faaf4ecfa7989180a4f92d88.png)

1.  1.  1.  ******System configuration******

系统配置，大部分也是使用默认配置。

这部分与体系架构不强相关，切换体系架构后，这部分配置可以保持不变。

![](https://img-blog.csdnimg.cn/2f5e8d084f4f4f94bb299f71744c8599.png)

![](https://img-blog.csdnimg.cn/2dccd583e5bc4f439c9816765ba04418.png)

重点选项：

(mascot.zone) System hostname：配置目标系统的hostname，可以改为自己喜欢的名字。

(Welcome to mascot.zone) System banner：在登录界面显示的欢迎信息，可以改为自己喜欢的字符串。

Init system (BusyBox) ：目标系统的init进程，没有特别需求则保留默认，否则可能需要根据这个配置增加其他的定制操作（脚本等）。

Enable root login with password：默认选择，允许root用户登录。

Root password：root用户密码，默认为空，构建用于本地测试的Linux建议留空，省事。这个配置很关键，影响到后续ssh登录。

/bin/sh (bash)：默认shell，可以保留默认，可修改为bash等。这个主要是根据不同shell的特点选择。选择bash支持的功能更全面些。默认bash不可选，需要在Target packages选择Show packages that are also provided by busybox之后才能回到这里选择bash。

Run a getty (login prompt) after boot：系统启动后给出登录提示，要求输入用户名和密码（登录后进入 /root目录）。这里默认选择，后续可以通过/etc/inittab脚本关闭登录提示，直接进入系统（这种情况进入系统后当前目录是根目录/）。

需要注意，Run a getty (login prompt) after boot的TTY port配置跟kernel启动参数console有关，console参数不同架构不一样，要与TTY port保持一致。（qemu启动时console参数通过-append参数配置，例如-append "console=ttyS0"）。---实际上，console参数取决于内核，例如arm使用ttyAMA0，ppc和mips使用hvc0，RISC-V和x86\_64使用ttyS0等。

(eth0) Network interface to configure through DHCP：配置通过DHCP自动配置IP的网口，这里可以填eth0。这个配置很关键，影响到后续ssh登录。在这里配置DHCP自动配置网口IP，可以让后续ssh登录省事很多。

Install timezone info，(Asia/Shanghai) default local time：配置时区，主机的时区名称可以通过timedatectl命令查询。如果不配置时区，默认是UTC。

($(BASE\_DIR)/rootfs\_overlay) Root filesystem overlay directories：在生成目标文件系统时，该目录下的文件会覆盖目标文件系统下对应的文件，可以用于简单的定制。这里配置为$(BASE\_DIR)/rootfs\_overlay，其中$(BASE\_DIR)表示构建输出目录（即make的O选项指定的目录），rootfs\_overlay是目标文件系统根目录对应的目录。配置了这个选项，需要在输出目录下先创建一个对应的目录，目录可以为空（相当于不覆盖任何目标文件系统的文件）。为了简化ssh登录，后续会在该目录下增加文件，这一点后面再补充说明。

如果需要其他复杂的定制，还可以通过执行脚本的方式来实现。

1.  1.  1.  ******Kernel******

配置内核源码和内核镜像编译选项。这个是可选的。如果不在这里编译内核镜像，则需要在其他地方单独编译内核镜像，或者使用已经编译好的内核镜像来启动Linux系统。为了方便第一次测试，这里选择编译内核镜像。

这部分跟体系架构不强相关，切换体系架构不影响这些配置。

![](https://img-blog.csdnimg.cn/8d97b93f814f4600afe5fefa0de5a7f2.png)

 主要选项：

Kernel version (Custom tarball)：指定内核源码版本，可以使用默认选项。这里选择使用内核源码tar包并给出下载路径。

Kernel configuration (Use the architecture default configuration)：内核编译的配置选项，这里选择体系架构默认配置。

Kernel binary format (Image)：内核镜像，使用默认的就好，会根据体系架构自动调整。

Kernel compression format (xz compression)：内核镜像压缩方式，默认是gzip，这里改成了xz。

另外，还可以在→ Kernel → Linux Kernel Tools选择编译一些内核工具，例如perf。

内核镜像的编译配置，会影响QEMU启动linux内核。如果QEMU启动失败，可以检查一下kernel的配置。

有些架构，如果要通过QEMU启动kernel，需要选择合适的内核配置选项，具体可以参考QMEU文档。

可以使用make linux-menuconfig命令单独配置内核选项。

1.  1.  1.  ******Target packages******

配置安装到目标文件系统的软件包。

这部分跟体系架构不强相关，切换体系架构后，可以保持原来的配置，这样各个体系架构下都是使用相同的软件包。

![](https://img-blog.csdnimg.cn/09d8776b70c44d7fb4f25b3806174134.png)

关键选项和软件包：

Show packages that are also provided by busybox：选中这个选项，显示Busybox以及支持的软件包，这样可以选择专用的软件包替换busybox提供的软件包，功能比busybox提供的更完整一些。如果默认shell选择bash，要选择这个选项才能看到bash软件包选项。如果没有特殊要求，则可以取消这个选项，这样相同的工具，可以使用busybox提供的工具即可。

Individual binaries：对于Busybox提供的软件，如果不选这个选项，则每个命令都是指向busybox的软连接，如果选择这个选项，则每个命令都是busybox的一个副本重命名。coreutils提供的命令也类似。通常没有必要选择这个选项。

软件包选择建议：

可以先最小选择需要的软件包，后续需要时，再新增选择需要的软件包，重新编译根文件系统。只要没有修改体系架构配置和工具链配置，没有clean编译输出，重新编译只编译新增的软件包，重新生成根文件系统镜像，这个过程比较快。Buildroot编译特点是加法容易减法难，因为可能减不掉，或者减不干净。

为了支持ssh登录，需要选择安装dhcpcd（DHCP自动获取IP地址），以及openssh（或者dropbear）（开启sshd服务）。可以从Networking applications选择这些软件包。

如果需要更丰富的功能，可以选择加入对应的软件包，例如，选择coreutils，iproute2等。

参考软件包：

Audio and video applications  ---> 保持Buildroot默认

Compressors and decompressors  ---> \[\*\] bzip2，\[\*\] gzip，\[\*\] xz-utils

Debugging, profiling and benchmark  ---> \[\*\] lsof，\[\*\] strace

Development tools  ---> \[\*\] diffutils，\[\*\] findutils，\[\*\] gawk，\[\*\] grep，\[\*\] sed，\[\*\] tree

Filesystem and flash utilities  ---> 保持默认或者根据需要选择，如\[\*\] btrfs-progs，\[\*\] cpio

Fonts, cursors, icons, sounds and themes  ---> 保持Buildroot默认

Games  ---> 保持Buildroot默认

Graphic libraries and applications (graphic/text)  ---> 保持Buildroot默认

Hardware handling  ---> 保持Buildroot默认，或者根据需要选择，例如\[\*\] sysstat

Interpreter languages and scripting  ---> \[\*\] python3（其他扩展选项保持默认）

Libraries  ---> 保持Buildroot默认

Mail  ---> 保持Buildroot默认

Miscellaneous  ---> 保持Buildroot默认

Networking applications  ---> \[\*\] dhcpcd（dhcp客户端，动态分配IP地址），\[\*\] ifupdown scripts（默认选择），\[\*\] iproute2（用于网络配置和监控），\[\*\] openssh（及其扩展）（或者用dropbear替代openssh。用于ssh连接guest。openssh支持root用户使用空密码登录，dropbear不支持用户使用空密码登录），\[\*\] tcpdump（及其扩展）

Package managers  ---> 保持Buildroot默认

Real-Time  ---> 保持Buildroot默认

Security  ---> 保持Buildroot默认（默认选择\[\*\] urandom-initscripts）

Shell and utilities  ---> -\*- bash （根据系统配置默认shell自动选择），\[\*\] bash completion，\[\*\] file，\[\*\] time（可选），\[\*\] which（可选），（慎选tmux，可能因编码的原因无法运行）

System tools  ---> \[\*\] coreutils（扩展选项保持默认，不选择Individual binaries），\[\*\] procps-ng（top，ps等功能更丰富，top默认界面可能跟ubuntu不同，可通过t，m等命令切换），\[\*\] tar，可以在Target packages → System tools → util-linux进一步选择更多工具，例如\[\*\]scheduling utilities（包含chrt,taskset等）

Text editors and viewers  ---> 保持Buildroot默认（慎选vim，可能不好用，例如可能只能半屏显示）

注：

1.  选择openssh时，有些架构可能编译失败，例如armeb，或者sshd无法正常启动，例如aarch64，具体原因未明，此时切换交叉编译版本可以解决（可以使用Buildroot提供的config先配置一次再修改配置选项），或者可选择dropbear替代（ssh不支持空密码登录）。
2.  遇到过单独的vim包没有busybox自带的vi好用的问题，可能是没有配置好的原因。选择vim包时需谨慎。
3.  运行tmux报错：tmux: need UTF-8 locale (LC\_CTYPE) but have ANSI\_X3.4-1968

1.  1.  1.  ******Filesystem images******

配置根文件系统的镜像格式。根文件系统镜像是Buildroot最主要的输出。

这部分配置跟体系架构无关，切换体系架构后保持原来的配置即可。

![](https://img-blog.csdnimg.cn/b0c7b60c210a4784989d3204d3ddfef4.png)

![](https://img-blog.csdnimg.cn/eb07c159ad5341eba236481756135f7f.png)

 这里选择输出cpio，ext2/3/4，tar这4个类型的镜像，同时输出对应的压缩镜像（默认都是gzip，可选择xz压缩效果更好）。实际只需要输出ext2/3/4（用于块设备/磁盘文件系统）或者cpio格式（用于RAM文件系统）的镜像即可（不需要压缩镜像）。

ext文件系统镜像大小可以设为256m或者1024m，使用Buildroot提供的默认值可能空间不够大。也可以使用默认配置先编译，等报错时再根据实际大小修改。

以上是RISC-V系统主要的构建配置，其他选项的可以使用默认配置（或者不配置），例如这里不需要编译Bootloaders。

需要注意的是，如果使用Buildroot提供的配置（特别是qemu开头的默认配置），Host utilities会自动选择\[ \] host qemu编译qemu（用于在主机上运行），如果本地已经安装了对应版本的qemu，可以取消这个选项，减少编译时间。注意，取消该选项可能不会自动生成start-qemu.sh脚本（使用board/qemu/post-image.sh生成的），这时可以从Buildroot源码目录下board/qemu/<board>/readme.txt文件找到对应的qemu启动命令。

1.  1.  ******构建Linux系统******

完成配置后，执行make命令开始编译构建：

make -j3 2>&1 | tee log

第一次编译时，Buildroot会下载交叉编译工具的源码或者软件包，下载安装到目标文件系统的软件包，随后执行编译，最后输出根文件系统镜像，保存在images目录下。如果选择编译kernel和bootloader，最后生成的kernel和bootloader的镜像也输出到images目录。

需要注意的是，如果选择了(→ Build options → Advanced)Use per-package directories (experimental)，make -j指定的并行任务数量太多，可能会导致系统挂死（可能跟系统配置有关，低配的系统可以指定比cpu数量少的任务数）。当然，如果没有选择该选项，make总是单个任务串行执行，这个构建时间会长很多。

第一次编译是全量构建，用时可能比较长，这取决于系统配置。

编译成功后，就可以使用image目录中的镜像来启动Linux系统了。

需要注意一点，构建完成后，如果输出目录改名，可能导致后面再执行make会失败，最后不得不重新全量编译。

常见编译失败问题：

1.  openssh编译失败：常见的错误是通常原因是构建选项配置错误，可以尝试使用Buildroot预定义的配置先配置一次，再按需增加openssh等自己需要的软件包。
2.  生成根文件系统失败：从错误日志一般能找到原因，例如镜像大小不够，缺少rootfs\_overlay目录等。

1.  1.  ******定制根文件系统******

Buildroot提供了多种方式定制根文件系统，这里以使用overlay方式为例介绍如何修改根文件系统。

1.  1.  1.  ******修改根文件系统文件******

****例1：简化openssh的ssh登录****

openssh默认不允许root用户登录，也不允许使用空密码登录。这个约束可以通过修改openssh的配置文件sshd\_config取消。

首先从target目录复制该文件到rootfs\_overlay目录：

cp --parents etc/ssh/sshd\_config ../rootfs\_overlay/

cp命令使用--parents选项保持文件路径一致，需要注意的是要进入target目录执行cp命令，否则复制之后路径名称不对。

随后修改rootfs\_overlay目录中的文件：

cd ..

vi rootfs\_overlay/etc/ssh/sshd\_config

1）将PermitRootLogin选项取消注释并改为yes，以允许root用户ssh登录。

2）将PermitEmptyPasswords选项取消注释并改为yes，以允许使用空密码登录。

保存修改之后重新执行make生成新的根文件系统，可以看到target/etc/ssh/sshd\_config文件会被替换为rootfs\_overlay/etc/ssh/sshd\_config文件，image下的根文件系统镜像也更新了（可以根据修改时间简单判断）。

****例2：系统启动后直接进入shell，不需要输入用户名****

cd target/

cp --parents etc/inittab ../rootfs\_overlay/

cd ..

vi rootfs\_overlay/etc/inittab

修改rootfs\_overlay/etc/inittab文件：

将console::respawn:/sbin/getty -L  console 0 vt100 # GENERIC\_SERIAL             

修改为console::respawn:-/bin/sh

保存之后执行make重新生成根文件系统镜像。需要注意的是，这种方式进入shell后，当前目录为根目录/，而不是root用户的home目录/root。

1.  1.  1.  ******增删目标软件包******

编译完成后，如果后续需要增加其他组件，可以使用make menuconfig配置选择新增的组件，执行make就可以了（如果是某个软件包新增部分组件，则可能要先make <pkg>-dirclean先删除对应软件包的输出），这种情况只需要增量编译。

如果要删除已有的组件，则稍微有点麻烦。尝试过可行的方法：

1.  使用make menuconfig取消对应的软件包。
2.  使用make <pkg>-dirclean删除对应软件包的构建输出，其他<pkg>是软件包的名称。
3.  删除整个target目录。
4.  重新执行make命令，这里不会触发全量构建，只会重新生成target目录，重新生成根文件系统镜像。

需要注意的是，如果其他被删除的软件包跟其他软件包有依赖关系，可能会有问题，这种情况就要make clean之后再make，全量编译了。

make menuconfig修改配置后，可以使用compare-config工具（https://gitee.com/xunknown/compare-config）检查一下修改了哪些配置选项，确保无误。

./compare-config -p "BR2\_" -C

1.  ******使用QEMU启动riscv64 Linux系统******
    1.  ******qemu********启动guest******

首先要安装qemu，可以选择apt install安装也可以下载qemu源码编译安装，具体方法可参考qemu文档（也可以通过Buildroot编译qemu，从Host utilities选择\[ \] host qemu）。

通常在Buildroot源码目录下board/qemu/<board>/readme.txt文件可以找到对应的qemu启动命令，结合board/qemu/post-image.sh脚本基本可以写出qemu启动命令，在此基础上再增加其他选项。

这里重点介绍（记录）qemu启动命令。

使用RAM文件系统：

qemu-system-riscv64 -M virt -m 256M -nographic \\

\-kernel images/Image \\

\-device virtio-rng-pci \\

\-initrd images/rootfs.cpio \\

\-device virtio-blk-device,drive=hd0 \\

\-drive file=images/rootfs.ext4,format=raw,id=hd0 \\

\-append "root=/dev/ram rw console=ttyS0" \\

\-device virtio-net-device,netdev=net0 \\

\-netdev user,id=net0,host=10.0.2.1,hostfwd=tcp::5555-:22

或者使用块设备文件系统：

qemu-system-riscv64 -M virt -m 256M -nographic \\

\-kernel images/Image \\

\-device virtio-rng-pci \\

\-initrd images/rootfs.cpio \\

\-device virtio-blk-device,drive=hd0 \\

\-drive file=images/rootfs.ext4,format=raw,id=hd0 \\

\-append "root=/dev/vda rw console=ttyS0" \\

\-device virtio-net-device,netdev=net0 \\

\-netdev user,id=net0,host=10.0.2.1,hostfwd=tcp::5555-:22

以上两个命令只有-append选项中的root参数不同。

riscv64默认打开了9P文件系统（CONFIG\_NET\_9P等选项默认打开），可以通过9P文件系统实现host和guest共享文件夹。增加以下qemu启动选项：

\-fsdev local,id=test\_dev,path=./images,security\_model=none -device virtio-9p-pci,fsdev=test\_dev,mount\_tag=dev9p

如果是自己编译的qemu，如果不支持9P文件系统，需要打开--enable-virtfs选项重新编译qemu。

进入guest系统后，通过mount加载9p文件系统，即可直接访问host的文件夹：

mount -t 9p dev9p /mnt

其中：

\-kernel：指定Linux内核镜像。

\-initrd images/rootfs.cpio：指定根文件系统镜像（无压缩的.cpio或者压缩后.cpio.xz），用于通过RAM文件系统系统启动。这个是可选的，跟-append选项指定的命令行参数root有关，如果root参数为root=/dev/ram，表示使用RAM文件系统，此时要给出-initrd选项。使用RAM文件系统启动，可以确保每次系统启动都使用同样的镜像，因为在系统中做的任何修改在系统退出时都不会被保存。如果要保存系统中的修改，一个方法是可以使用块设备/硬盘镜像启动，另一个方法是可以在系统启动后挂着一个硬盘镜像，将所有修改保存在该硬盘上。

\-device/-drive：指定一个块设备/硬盘，该设备对应/dev/vda文件。如果要使用该设备作为根文件系统，可以修改-append选项中的root参数为root=/dev/vda，这种情况下，在系统中的修改会被保存在-drive选项中file指定的镜像文件中。如果该设备不是根文件系统，则可以在进入系统后使用mount命令（例如mount /dev/vad /mnt）加载该文件系统，用于保存系统中的修改。

\-device/-netdev：给虚拟机配置一个网卡，对应Buildroot构建时配置的通过DHCP自动分配IP地址的eth0网卡。其中host=10.0.2.1是qemu user类型网络的默认网段10.0.2.0/24的一个地址，分配给host使用，guest通过dhcp获取从该网段获取ip地址。hostfwd=tcp::5555-:22是将host的5555端口的数据都转发到guest的22端口（ssh），host可以通过该端口ssh登录到guest。 

上面的示例使用user类型网卡，只能host连接guest。也可以使用tap类型网卡，使用-device virtio-net-device,netdev=tap0 -netdev tap,id=tap0 或者-net tap -net nic选项（可以使用多次，创建多个网卡），需要注意的是，tap类型网卡需要root权限启动qemu。使用tap类型网卡，在guest和host都会创建tap类型的网卡，guest的tap网卡自动配置了ip地址，host的没有配置，可以给它配置同一个网段的ip，例如sudo ip addr add 169.254.62.132/16 dev tap0，就可以双向互相ping通了。

\-append：内核启动参数，可以使用man bootparam了解更多，更准确的，则要看对应内核版本的源码。

\-fsdev/-device：指定9P文件系统选项，开启host和guest共享文件夹功能。其中path指定host文件夹路径，mount\_tag指定在guest加载9P文件系统时，mount的设备名称，即mount命令的device参数。

注意：

不同架构qemu命令参数和内核参数会有些差别，特别是内核参数，例如console在riscv和x86\_64架构下是ttyS0，在arm和aarch64架构下则是ttyAMA0，arm架构还需要指定dtb。复制其他架构的qemu命令来使用时需要注意这点，否则可能看起来像qemu挂死的样子。

1.  1.  ******ssh********登录guest******

虚拟机启动后，host可以使用ssh登录guest：

ssh root@localhost -p 5555

也可以使用scp传递文件。

因为root用户密码为空，ssh和scp都不需要输入密码。

1.  ******构建和运行其他体系架构的Linux系统******

可以复制一份config文件到其他体系架构的输出目录，在此基础上配置，体系架构和交叉编译工具链需要重新配置，而可以省去配置目标软件包，系统配置，根文件系统等选项。

另外，也可以使用Buildroot提供的默认配置生成.config，再修改需要软件包配置，可以解决openssh等软件包编译的问题（需要合适的交叉工具链选项才能编译），或者qemu启动的问题（需要打开一些内核选择才能通过qemu启动）。

在执行make之前，可以使用compare-conig工具检查一下修改了哪些配置选项，确保无误：

./compare-config -p "BR2\_" -C

1.  1.  ******aarch64******

qemu-system-aarch64 -M virt -m 256M -nographic -kernel images/Image -device virtio-rng-pci -append "root=/dev/vda rw console=ttyAMA0" -device virtio-net-device,netdev=net0 -netdev user,id=net0,host=10.0.2.1,hostfwd=tcp::5555-:22 -cpu cortex-a57 -drive if=none,file=images/rootfs.ext4,format=raw,id=hd0 -device virtio-blk-device,drive=hd0

问题：qemu启动后无输出，起来像挂死。

原因：内核启动参数console设置错误（-append "root=/dev/vda rw console=ttyS0"），应该使用console=ttyAMA0。

console参数不同架构不同版本不一样，需要根据硬件和内核版本配置。

问题：ssh登录无反应（卡死）

解决：原因未确定，修改了配置（主要的选项是toolchain-external-arm-aarch64），重新编译之后解决。

1.  1.  ******x86\_64******

qemu-system-x86\_64 -m 256M -nographic \\

\-kernel images/bzImage \\

\-device virtio-rng-pci \\

\-hda data.ext4 \\

\-initrd images/rootfs.cpio.xz \\

\-append "root=/dev/ram rw console=ttyS0" \\

\-device e1000,netdev=net0 \\

\-netdev user,id=net0,host=10.0.2.10,hostfwd=tcp::5555-:22

1.  1.  ******arm******

qemu-system-arm -cpu cortex-a15 -smp 4 -m 4096 -machine type=vexpress-a15 -drive if=sd,driver=file,filename=images/rootfs.ext4  -kernel images/zImage -initrd images/rootfs.cpio -dtb build/linux-custom/arch/arm/boot/dts/vexpress-v2p-ca15-tc1.dtb  -append "console=ttyAMA0 root=/dev/ram ro" -nographic -device virtio-net-device,netdev=net0 -netdev user,id=net0,host=10.0.2.1,hostfwd=tcp::5555-:22

问题：qemu启动后无输出，起来像挂死。

原因：内核启动参数console设置错误（-append "root=/dev/vda rw console=ttyS0"），应该使用console=ttyAMA0。

另外，qemu-system-arm启动需要通过-dtb选项指定dtb。

1.  1.  ******armeb******

qemu启动命令：

qemu-system-arm -cpu cortex-a15 -smp 4 -m 4096 -machine type=vexpress-a15 -drive if=sd,driver=file,filename=images/rootfs.ext4  -kernel images/zImage -initrd images/rootfs.cpio -dtb build/linux-5.15.26/arch/arm/boot/dts/vexpress-v2p-ca15-tc1.dtb  -append "console=ttyAMA0 root=/dev/ram ro" -nographic -device virtio-net-device,netdev=net0 -netdev user,id=net0,host=10.0.2.1,hostfwd=tcp::5555-:22

注意，要指定dtb，console使用ttyAMA0，不然会卡死。

问题：交叉编译工具使用toolchain-external-bootlin版本的出现编译失败。

\>>> host-file 5.41 Autoreconfiguring

...

checking for ANSI C header files... Cannot execute cross-compiler '/home/alpha/Workspace/buildroot/buildroot-armeb/per-package/toolchain-external-bootlin/host/opt/ext-toolchain/bin/armeb-linux-gcc.br\_real'

make\[1\]: \*\*\* \[package/pkg-generic.mk:282: /home/alpha/Workspace/buildroot/buildroot-armeb/build/toolchain-external-bootlin-2021.11-1/.stamp\_configured\] Error 1

make\[1\]: \*\*\* Waiting for unfinished jobs....

...

解决：交叉编译工具改用Buildroot自带的toolchain-external-linaro-armeb版本。

问题：qemu启动后无输出，起来像挂死。

原因：内核启动参数console设置错误（-append "root=/dev/vda rw console=ttyS0"），应该使用console=ttyAMA0。

另外，qemu-system-arm启动需要通过-dtb选项指定dtb。

1.  1.  ******ppc64******

ppc64先使用Buildroot提供的默认配置生成config，再配置软件包比较合适，例如：

make O=$PWD -C ../buildroot-2022.02/ qemu\_ppc64\_e5500\_defconfig

这个默认配置还会自动生成一个qemu启动脚本。

然后使用make menuconfig修改软件包等配置（例如增加openssh）。

qemu启动命令：

qemu-system-ppc64 -M ppce500 -cpu e5500 -m 512 -kernel images/uImage -drive file=images/rootfs.ext4,if=virtio,format=raw -initrd images/rootfs.cpio -append "console=ttyS0 rootwait root=/dev/ram" -serial mon:stdio -nographic -device e1000,netdev=net0 -netdev user,id=net0,host=10.0.2.1,hostfwd=tcp::5555-:22

1.  1.  ******样例配置和脚本******

参考：https://gitee.com/xunknown/buildroot-samples.git

1.  1.  ******一些问题解决******

1、qemu要使用什么类型网卡？e1000？virtio-net-device？如果不能启动网卡，可以考虑使用-nic user启动，根据kernel日志判断qemu默认使用的网卡类型，再使用-device配置对应的网卡，进一步可以配置详细参数（例如转发）。例如mips架构通过这个方式可以看到qemu默认使用的是pcnet网卡。  

1.  ******参考******

1.  Buildroot：[https://buildroot.org/downloads/manual/manual.html](https://buildroot.org/downloads/manual/manual.html "https://buildroot.org/downloads/manual/manual.html")
2.  QEMU：[https://wiki.qemu.org/Documentation](https://wiki.qemu.org/Documentation; "https://wiki.qemu.org/Documentation")
3.  QEMU：[Welcome to QEMU’s documentation! — QEMU documentation](https://www.qemu.org/docs/master/ "Welcome to QEMU’s documentation! — QEMU  documentation")
4.  QEMU 9P文件系统：https://wiki.qemu.org/Documentation/9psetup
5.  compare-config：https://gitee.com/xunknown/compare-config
6.  样例配置和脚本：https://gitee.com/xunknown/buildroot-samples.git
7.  [用QEMU实现的网络模式](https://www.freesion.com/article/2371791491/ "用QEMU实现的网络模式")