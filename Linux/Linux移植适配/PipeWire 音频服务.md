---
tags: Linux
---

# PipeWire 
## 安装回话管理
```shell
sudo apt install pipewire-media-session- wireplumber
systemctl --user --now enable wireplumber.service
```
> [!info]
> 注意：命令末尾有一个“-”表示删除包。 该命令还将自动安装所需的 pipewire-pulse
## 安装 ALSA plug-in
```shell
sudo apt install pipewire-audio-client-libraries
```
## 复制配置文件
```shell
sudo cp /usr/share/doc/pipewire/examples/alsa.conf.d/99-pipewire-default.conf /etc/alsa/conf.d/
```

1. 软件包默认的配置文件：`/usr/share/pipewire/pipewire.conf`
2. 开发板的优先配置文件：`/etc/pipewire/pipewire.conf`

## 允许 root  用户
-  `/lib/systemd/user/pulseaudio.service` 文件里的 `ConditionUser=! root` (注释掉)
## Link
- [pipewire/-/wikis/Troubleshooting](https://gitlab.freedesktop.org/pipewire/pipewire/-/wikis/Troubleshooting)
- [pipewire/-/wikis/FAQ](https://gitlab.freedesktop.org/pipewire/pipewire/-/wikis/FAQ)
- [Enable PipeWire on Ubuntu 22.04](https://gist.github.com/the-spyke/2de98b22ff4f978ebf0650c90e82027e)
- [PipeWire: PipeWire](https://docs.pipewire.org/)