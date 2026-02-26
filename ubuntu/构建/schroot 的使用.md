---
tags:
  - schroot
---
## schroot 安装与配置
```shell
sudo apt install schroot debootstrap
```

- `/etc/schroot/schroot.conf` 全局主配置文件
- `/etc/schroot/chroot.d/` 推荐的独立配置目录
- `/etc/schroot/default` 系统的默认挂载 profile
## CLI 使用
```shell
# 列出宿主机上所有可用的 chroot 环境名称
schroot -l

# 查看指定 chroot 的详细配置与状态
schroot -i -c jammy-arm64

# 查看所有 chroot 环境的详细配置
schroot -i -a

# 以普通用户身份进入 chroot 环境（自动切到当前宿主机的相同工作目录）
schroot -c jammy-arm64

# 以 root 身份进入 chroot 环境
sudo schroot -c jammy-arm64
# 或者使用 -u 指定用户
schroot -c jammy-arm64 -u root

# 不进入交互式 Shell，直接在 chroot 内部运行某条命令（极为常用）
schroot -c jammy-arm64 -- gcc -v
schroot -c jammy-arm64 -- apt update

# 开启一个持久化会话，并返回一个 Session ID（例如：jammy-arm64-a1b2c3d4）
schroot -b -c jammy-arm64

# 使用指定的 Session ID 重新加入会话
schroot -r -c jammy-arm64-a1b2c3d4

# 结束并清理该会话（释放所有挂载点）
schroot -e -c jammy-arm64-a1b2c3d4
```

## 自定义挂载规则 (Profile 定制)
如果默认的 `profile=default` 挂载的项目不符合你的需求，你可以自定义 Profile
