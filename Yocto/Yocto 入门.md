---
tags: Linux
---

# Yocto 入门
~~~shell
 sudo apt install gawk wget git diffstat unzip texinfo gcc build-essential chrpath socat cpio python3 python3-pip python3-pexpect xz-utils debianutils iputils-ping python3-git python3-jinja2 libegl1-mesa libsdl1.2-dev pylint3 xterm python3-subunit mesa-common-dev zstd liblz4-tool
~~~

## 下载 Poky
~~~shell
git clone git://git.yoctoproject.org/poky
~~~

1. 到 [Releases wiki page](https://wiki.yoctoproject.org/wiki/Releases) 页面，确定使用的分支：`git switch ...`
2. 查看配置信息：`less meta-poky/conf/distro/poky.conf`
3. 下载 meta-openembedded：
~~~shell
 git clone https://github.com/openembedded/meta-openembedded.git
~~~

---
## Link
- [Openembedded.org](https://www.openembedded.org/wiki/Main_Page)
- [OpenEmbedded Layer Index - layers](https://layers.openembedded.org/layerindex/branch/master/layers/)