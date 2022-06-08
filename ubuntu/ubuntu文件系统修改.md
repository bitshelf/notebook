# ubuntu 系统启动菜单Debian目录名修改
1. `vim usr/share/desktop-directories/lxde-debian.directory`
2. 在目录`usr/share/pixmaps`添加ubuntu的 Icon
### 可能用到的命令：
1. 查找启动菜单所在目录：`grep -rn "Sound & Video" ./`
2. 查找logo所在目录`sudo  find . -name "*debian-logo*" -print`
3. 查看loge像素`file debian-logo.png`
	