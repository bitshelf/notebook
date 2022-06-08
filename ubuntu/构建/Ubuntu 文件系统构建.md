---
tags: Ubuntu 
---
## Ubuntu 源码下载
1. Ubuntu 源码：[Ubuntu 22.10 (Kinetic Kudu)](http://cdimage.ubuntu.com/releases/22.10/release/source/)
2. Debian 源码：[Index of /debian-cd](https://cdimage.debian.org/debian-cd/)

## 构建
```shell
mkdir stable-chroot
debootstrap stable stable-chroot http://deb.debian.org/debian/
```
- [LiveCDCustomization - Community Help Wiki](https://help.ubuntu.com/community/LiveCDCustomization)
- [LiveCDCustomizationFromScratch - Community Help Wiki](https://help.ubuntu.com/community/LiveCDCustomizationFromScratch)
- [D.3. Installing Debian GNU/Linux from a Unix/Linux System](https://www.debian.org/releases/stable/arm64/apds03.en.html)
- [Debootstrap - Debian Wiki](https://wiki.debian.org/Debootstrap)
- [Debian Installer / debootstrap · GitLab](https://salsa.debian.org/installer-team/debootstrap)
- [Debootstrap a minimal Image for Jetson boards - Code Inside Out](https://www.codeinsideout.com/blog/jetson/custom-image/#flash-to-sd)
## Link 
- https://drbl.nchc.org.tw/lecture/20110621_Opensource_Bridge/Creating_Your_Specific_Live_GNU_Linux_Distribution_with_Debian_Live_Build.pdf
- [how\_to\_create\_ubuntu\_image\_with\_linaro\_image\_tools [Linux Factory]](http://linuxfactory.or.kr/dokuwiki/doku.php?id=how_to_create_ubuntu_image_with_linaro_image_tools&ckattempt=2)
- [open-build-service package : Ubuntu](https://launchpad.net/ubuntu/+source/open-build-service)
- [Debian Live Manual](https://live-team.pages.debian.net/live-manual/html/live-manual/index.en.html)
- [installation - Debian Live Manual](https://live-team.pages.debian.net/live-manual/html/live-manual/installation.en.html)
- [Debootstrap - linux-sunxi.org](https://linux-sunxi.org/Debootstrap)
- [ubuntu-build-service.git - Ubuntu Build Service](https://git.linaro.org/ci/ubuntu-build-service.git/)
- [TomGall/LiveBuild - Ubuntu Wiki](https://wiki.ubuntu.com/TomGall/LiveBuild)
- [livecd-rootfs in Launchpad](https://launchpad.net/livecd-rootfs)
- [Builds & Downloads | Linaro](https://www.linaro.org/downloads/)
- [Linaro Releases](http://releases.linaro.org/96boards/dragonboard410c/linaro/debian/21.12/)

---
文件系统打包脚本：![](assets/mkext4.sh)