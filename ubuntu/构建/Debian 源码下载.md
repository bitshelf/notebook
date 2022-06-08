---
tags: Ubuntu  Debian 
---

## Debian 源码下载 
1. 到[网站](https://cdimage.debian.org/debian-cd/current/arm64/jigdo-cd/)下载
	1. `debian-11.6.0-arm64-netinst.jigdo`
	2. `debian-11.6.0-arm64-netinst.template`
2. 系统安装 `jigdo-file` 软件包
```shell
sudo apt install jigdo-file
```

3. 下载 Debian ISO 源码
```shell
jigdo-lite debian-11.6.0-arm64-netinst.jigdo
```

- Files to scan 直接按 enter
- 国家码输入：`cn`

---
## Link
- Debian installer 源码：[Index of /debian/dists](https://deb.debian.org/debian/dists/)
- [Index of /debian-cd/current/arm64/jigdo-cd](https://cdimage.debian.org/debian-cd/current/arm64/jigdo-cd/)
- ISO 镜像 [Index of /debian-cd/11.6.0/arm64/iso-cd](https://cdimage.debian.org/debian-cd/11.6.0/arm64/iso-cd/)