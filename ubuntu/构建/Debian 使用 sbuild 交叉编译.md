---
tags:
  - sbuild
---
## sbuild 使用流程
1. 安装必要的软件包
```shell
sudo apt install sbuild mmdebstrap uidmap
```

2. 为 chroot tarball 创建一个目录
```shell
mkdir -p ~/.cache/sbuild
```

3. 创建/更新 tarball
```shell
mmdebstrap --include=ca-certificates --skip=output/dev --variant=buildd unstable ~/.cache/sbuild/unstable-amd64.tar.zst https://deb.debian.org/debian
```

4. 配置 `~/.config/sbuild/config.pl`

5. 交叉编译软件包
```
sbuild --host=arm64
```

## Link
- [sbuild - Debian Wiki](https://wiki.debian.org/sbuild#Setup)